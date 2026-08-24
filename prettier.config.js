import { base } from '@tofrankie/prettier'

export default {
  ...base,
  embeddedLanguageFormatting: 'off',
  plugins: ['prettier-plugin-compact-markdown-table'],
}
