/** Builds the matching protocol as Markdown, mirroring the PDF export in Dataexport.js. */
export function buildMatchingProtokollMarkdown({ parameterRows, tableColumn, tableRows, counts }) {
    // Escape pipes and newlines so they cannot break the markdown table body
    const zelle = (wert) => String(wert ?? '')
        .replace(/\|/g, '\\|')
        .replace(/\r?\n/g, ' ');

    const zeilen = [];

    zeilen.push('# Matching Protokoll', '');

    if (parameterRows.length > 0) {
        zeilen.push('## Matching-Parameter', '');
        zeilen.push('| Matching-Parameter | Einstellung |');
        zeilen.push('| --- | --- |');
        parameterRows.forEach(([label, wert]) => {
            zeilen.push(`| ${zelle(label)} | ${zelle(wert)} |`);
        });
        zeilen.push('');
    }

    zeilen.push('# Matching Ergebnisse', '');

    if (counts) {
        const { variablenPre, variablenPost, vorFall, vorKontrolle, nachFall, nachKontrolle } = counts;
        zeilen.push(`- **Pre-Matching:** ${variablenPre} Variablen, ${vorFall + vorKontrolle} Beobachtungen`);
        zeilen.push(`- **Post-Matching:** ${variablenPost} Variablen, ${nachFall + nachKontrolle} Beobachtungen`);
        zeilen.push('');
    }

    // Markdown has no column groups (colSpan like the PDF band), so group membership becomes a column-head prefix
    const kopf = tableColumn.map((titel, index) => {
        if (index >= 1 && index <= 3) return `Pre: ${titel}`;
        if (index >= 4 && index <= 6) return `Post: ${titel}`;
        return titel;
    });

    // Right-align numeric columns so the decimal points line up in monospace rendering
    const ausrichtung = ['---', '---:', '---:', '---:', '---:', '---:', '---:', ':---:'];

    zeilen.push(`| ${kopf.map(zelle).join(' | ')} |`);
    zeilen.push(`| ${ausrichtung.join(' | ')} |`);
    tableRows.forEach(tabellenZeile => {
        zeilen.push(`| ${tabellenZeile.map(zelle).join(' | ')} |`);
    });
    zeilen.push('');

    // Legend text must match the PDF verbatim; two trailing spaces force the line break
    zeilen.push('PS: Propensity Score  ');
    zeilen.push('stetige Variablen: Mittelwert bzw. standardisierte Mittelwertsdifferenz (SMD)  ');
    zeilen.push('kategoriale Variablen: Anteile bzw. rohe Differenz in den Anteilen');

    return zeilen.join('\n') + '\n';
}
