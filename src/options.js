const options = {
    tableLayout: {
        type: "choice",
        category: "Markdown",
        default: "compact",
        description: "Table formatting style.",
        choices: [
            { value: "compact", description: "No cell padding, minimal separators." },
            { value: "aligned", description: "Pad cells to align columns (Prettier default)." },
        ],
    },
};

export default options;
