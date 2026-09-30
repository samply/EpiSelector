// Internal matching method values are compared throughout the app; this maps them to display text.
const LABELS = {
    'Exaktes Matching': 'Variable matching',
    'Zufallsprinzip': 'Random selection',
};

export function matchingMethodLabel(method) {
    return LABELS[method] ?? method;
}
