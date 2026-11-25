// Builds the "Matching-Parameter" rows for the matching protocol: only parameters relevant to the chosen method and actually set (default values = unset)
import { matchingMethodLabel } from "./matchingMethodLabel";

const DEFAULTS = {
    matchingMethode: "defaultMethode",
    zielvariable: "defaultZielvariable",
    gruppenindikator: "defaultFälleKontrollenGruppenindikator",
    verhältnis: "defaultVerhältnis",
    scoreMethode: "defaultScoreMethode",
    algorithmus: "defaultAlgo",
    übereinstimmungswert: "defaultÜbereinstimmungswert",
};

// Display names for the internal algorithm values (see MatchingAlgorithmus.js)
const ALGORITHMUS_LABELS = {
    nearest: "Nearest Neighbour",
    "Optimal Matching": "Optimal Matching",
};

const isGesetzt = (wert, standard) =>
    wert !== undefined && wert !== null && wert !== "" && wert !== standard;

const variablenName = variable =>
    typeof variable === "object" && variable !== null
        ? variable.var || variable.name || variable.label || variable.text || ""
        : variable;

const variablenNamen = variables => {
    if (Array.isArray(variables)) {
        return variables.map(variablenName).filter(name => name !== "" && name !== null && name !== undefined);
    }
    if (typeof variables === "object" && variables !== null) {
        const name = variablenName(variables);
        return name ? [name] : [];
    }
    return variables ? [variables] : [];
};

const verhältnisText = isVerhältnis =>
    isGesetzt(isVerhältnis, DEFAULTS.verhältnis) ? `1:${isVerhältnis}` : null;

// Toleranzen liegen als Array parallel zu den Matching-Variablen
// (eintragsweise Variable + Toleranzwert, siehe Matchingtoleranz.js).
const toleranzText = (isMatchingtoleranz, isAllMatchingvariablen) => {
    if (!isGesetzt(isMatchingtoleranz, "")) return null;
    const toleranzen = Array.isArray(isMatchingtoleranz)
        ? isMatchingtoleranz.map(toleranz => (typeof toleranz === "string" ? toleranz.trim() : toleranz))
        : [isMatchingtoleranz];
    const variablen = variablenNamen(isAllMatchingvariablen);
    if (variablen.length > 0 && variablen.length === toleranzen.length) {
        return variablen.map((name, index) => `${name}: ±${toleranzen[index]}`).join(", ");
    }
    return toleranzen.join(", ");
};

/** Builds [parameter, value] rows for the matching protocol from the AppContext values. */
export function buildMatchingParameterRows({
    isMatchingMethode,
    isZielvariable,
    isFälleKontrollenGruppenindikator,
    isAllKontrollvariablen,
    isAllMatchingvariablen,
    isVerhältnis,
    isScoreMethode,
    isAlgorithmus,
    isErsetzung,
    isÜbereinstimmungswert,
    isMatchingtoleranz,
}) {
    if (!isGesetzt(isMatchingMethode, DEFAULTS.matchingMethode)) return [];

    const rows = [["Matching-Methode", matchingMethodLabel(isMatchingMethode)]];

    const push = (label, value) => {
        if (isGesetzt(value, null)) rows.push([label, String(value)]);
    };

    if (isMatchingMethode === "Propensity Score") {
        const zielvariable = isGesetzt(isZielvariable, DEFAULTS.zielvariable)
            ? isZielvariable
            : (isGesetzt(isFälleKontrollenGruppenindikator, DEFAULTS.gruppenindikator)
                ? isFälleKontrollenGruppenindikator
                : null);
        push("Gruppenindikator", zielvariable);
        push("Zu balancierende Variablen", variablenNamen(isAllKontrollvariablen).join(", ") || null);
        push("Methode zur Berechnung des Propensity Scores", isGesetzt(isScoreMethode, DEFAULTS.scoreMethode) ? isScoreMethode : null);
        push("Matching Algorithmus", isGesetzt(isAlgorithmus, DEFAULTS.algorithmus)
            ? (ALGORITHMUS_LABELS[isAlgorithmus] || isAlgorithmus)
            : null);
        push("Toleranzwert (Caliper)", isGesetzt(isÜbereinstimmungswert, DEFAULTS.übereinstimmungswert)
            ? `±${isÜbereinstimmungswert}`
            : null);
        push("Ersetzung bzw. Mehrfachverwendung der Kontrollen", isErsetzung === "TRUE" || isErsetzung === true
            ? "Ja"
            : (isErsetzung === "FALSE" || isErsetzung === false ? "Nein" : null));
        push("Matching-Verhältnis", verhältnisText(isVerhältnis));
    } else if (isMatchingMethode === "Exaktes Matching") {
        push("Vergleichsgruppen", isGesetzt(isFälleKontrollenGruppenindikator, DEFAULTS.gruppenindikator)
            ? isFälleKontrollenGruppenindikator
            : null);
        push("Matching-Variablen", variablenNamen(isAllMatchingvariablen).join(", ") || null);
        push("Matching-Toleranz", toleranzText(isMatchingtoleranz, isAllMatchingvariablen));
        push("Matching-Verhältnis", verhältnisText(isVerhältnis));
    }

    return rows;
}
