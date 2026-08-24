import { base } from '@tofrankie/prettier'
import compactMarkdownTablePlugin from '@tofrankie/prettier-plugin-compact-markdown-table'

export default {
  ...base,
  embeddedLanguageFormatting: 'off',
  plugins: [compactMarkdownTablePlugin],
  tableLayout: 'compact',
}
