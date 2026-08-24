import { base } from '@tofrankie/prettier'
import * as compactMarkdownTablePlugin from './src/index.js'

export default {
  ...base,
  embeddedLanguageFormatting: 'off',
  plugins: [compactMarkdownTablePlugin],
  tableLayout: 'compact',
}
