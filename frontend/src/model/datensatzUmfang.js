/** Dataset scope for the results screen and the protocol export; both must show identical numbers. */
export function datensatzUmfang(spaltenNamen, matchingMethode) {
    const namen = Array.isArray(spaltenNamen) ? spaltenNamen : [];
    const unbenannte = namen.filter((name) => name.trim() === "").length;
    const preVariablen = namen.length - unbenannte;
    // match.data adds propensity score, Matching weight and MatchingID; exact matching has no propensity score
    const matchingSpalten = matchingMethode === "Exaktes Matching" ? 2 : 3;
    return { preVariablen, postVariablen: preVariablen + matchingSpalten };
}
