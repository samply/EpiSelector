// Interne Werte der Matching-Methode werden an vielen Stellen verglichen und in gespeicherten Masken
// abgelegt; diese Funktion liefert den angezeigten Namen.
const LABELS = {
    'Exaktes Matching': 'Variablen Matching',
};

export function matchingMethodLabel(method) {
    return LABELS[method] ?? method;
}
