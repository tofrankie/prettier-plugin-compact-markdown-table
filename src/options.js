import { TABLE_LAYOUT } from './constants.js'

const options = {
  tableLayout: {
    type: 'choice',
    category: 'Markdown',
    default: TABLE_LAYOUT.COMPACT,
    description: 'Table formatting style.',
    choices: [
      {
        value: TABLE_LAYOUT.COMPACT,
        description: 'One space of cell padding and minimal separators.',
      },
      {
        value: TABLE_LAYOUT.COMPACT_NO_PADDING,
        description: 'No cell padding and minimal separators.',
      },
      {
        value: TABLE_LAYOUT.ALIGNED,
        description: 'Pad cells to align columns (Prettier default).',
      },
    ],
  },
}

export default options
