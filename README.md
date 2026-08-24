# prettier-plugin-compact-markdown-table

> Forked from [myl7/prettier-plugin-compact-markdown-table](https://github.com/myl7/prettier-plugin-compact-markdown-table/tree/v0.1.0) v0.1.0

Prettier plugin for compact markdown tables without column alignment

Resolves [prettier/prettier#12074](https://github.com/prettier/prettier/issues/12074), [prettier/prettier#14722](https://github.com/prettier/prettier/issues/14722), [prettier/prettier#16954](https://github.com/prettier/prettier/issues/16954).

## Features

- **Compact tables**: Reduce separators and avoid column alignment while preserving readable cell spacing by default.
- **Save LLM tokens**: A 5-column, 10-row table saves ~21% of table tokens and ~32% of characters with compact formatting.
- **Fit character limits**: Useful for submissions with strict character budgets, e.g., OpenReview rebuttals capped at 5000 characters.

## Prerequisites

- Prettier >= 3.0.0

## Get Started

Install the plugin alongside Prettier:

```bash
npm install prettier @tofrankie/prettier-plugin-compact-markdown-table -D
```

Add the plugin to your `prettier.config.js`:

```js
export default {
  plugins: ['@tofrankie/prettier-plugin-compact-markdown-table'],
}
```

Or import the default plugin object:

```js
import compactMarkdownTablePlugin from '@tofrankie/prettier-plugin-compact-markdown-table'

export default {
  plugins: [compactMarkdownTablePlugin],
}
```

Then format as usual:

```bash
prettier --write "**/*.md"
```

Before:

```md
| Name  | Age | City |
| ----- | --- | ---- |
| Alice | 30  | NYC  |
| Bob   | 25  | LA   |
```

After:

```md
| Name | Age | City |
| --- | --- | --- |
| Alice | 30 | NYC |
| Bob | 25 | LA |
```

## Config

### `tableLayout`

| Value | Description |
| :-- | :-- |
| `compact` (default) | Compact layout with one space around each cell. |
| `compact-no-padding` | Compact layout without cell padding. |
| `aligned` | Pad cells to align columns (Prettier default). |

Set in `prettier.config.js`:

```js
export default {
  tableLayout: 'compact'
}
```

Or pass via CLI:

```bash
prettier --table-layout aligned --write "**/*.md"
```

## License

Copyright (C) 2026 Yulong Ming <i@myl7.org>

Apache License, Version 2.0
