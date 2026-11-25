import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppContext from '../../AppContext';
import MatchingErgebnis from './MatchingErgebnis';

const noop = jest.fn();

function renderMatchingResult(overrides = {}) {
    const context = {
        setErgebnisse: noop,
        setSummaryData: noop,
        setResultData: noop,
        isDatei: 'data.csv',
        isVollständigeDatei: {
            BPMeds: [0, 1],
            age: [40, 50]
        },
        isAllKontrollvariablen: [{ var: 'age' }],
        isKontrollvariablen: 'age',
        isMatchingMethode: 'Propensity Score',
        isDateiSpaltenNamen: ['BPMeds', 'age'],
        isBeobachtungen: 2,
        isFälleKontrollenGruppenindikator: '',
        isZielvariable: 'BPMeds',
        setWorkflow: noop,
        isErsetzung: 'FALSE',
        isToleranzBereichSet: 'FALSE',
        isVerhältnis: '1',
        isÜbereinstimmungswert: '0.2',
        isToleranzBereich: '',
        isAlgorithmus: 'nearest',
        isScoreMethode: 'glm',
        isMatchingtoleranz: [],
        isMatchingvariablen: [],
        isAllMatchingvariablen: [],
        ...overrides
    };

    return render(
        <MemoryRouter>
            <AppContext.Provider value={context}>
                <MatchingErgebnis />
            </AppContext.Provider>
        </MemoryRouter>
    );
}

describe('matching caliper requests', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => new Promise(() => {}));
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('sends the configured propensity-score caliper to result and summary endpoints', () => {
        renderMatchingResult();

        expect(global.fetch).toHaveBeenCalledTimes(2);

        const requests = global.fetch.mock.calls.map(([url]) => new URL(url, 'http://localhost'));
        expect(requests.map((request) => request.pathname)).toEqual([
            '/control_selection/result_data',
            '/control_selection/summary'
        ]);

        for (const request of requests) {
            expect(request.searchParams.get('mmethod')).toBe('nearest');
            expect(request.searchParams.get('mcaliper')).toBe('0.2');
            expect(request.searchParams.get('mcalipervariables')).toBe('');
        }
    });

    test('keeps named per-variable tolerances for exact matching', () => {
        renderMatchingResult({
            isMatchingMethode: 'Exaktes Matching',
            isFälleKontrollenGruppenindikator: 'BPMeds',
            isAllMatchingvariablen: [{ var: 'age' }, { var: 'BMI' }],
            isMatchingtoleranz: ['0', '0.5']
        });

        const requests = global.fetch.mock.calls.map(([url]) => new URL(url, 'http://localhost'));
        for (const request of requests) {
            expect(request.searchParams.get('mmethod')).toBe('exact');
            expect(request.searchParams.get('mcaliper')).toBe('0.5');
            expect(request.searchParams.get('mcalipervariables')).toBe('BMI');
        }
    });

    test('does not send a caliper for optimal matching', () => {
        renderMatchingResult({ isAlgorithmus: 'Optimal Matching' });

        const requests = global.fetch.mock.calls.map(([url]) => new URL(url, 'http://localhost'));
        for (const request of requests) {
            expect(request.searchParams.get('mmethod')).toBe('optimal');
            expect(request.searchParams.get('mcaliper')).toBe('');
            expect(request.searchParams.get('mcalipervariables')).toBe('');
        }
    });
});
