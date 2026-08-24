import type { AstPath, ParserOptions, Plugin, Printer } from 'prettier'
import * as prettierMarkdownPlugin from 'prettier/plugins/markdown'
import { TABLE_LAYOUT } from './constants'
import options from './options'
import { printCompactTable } from './print-compact-table'

const originalPrinter = prettierMarkdownPlugin.printers.mdast

export const parsers = {
  markdown: prettierMarkdownPlugin.parsers.markdown,
  mdx: prettierMarkdownPlugin.parsers.mdx,
  remark: prettierMarkdownPlugin.parsers.remark,
}

export const printers: { mdast: Printer } = {
  mdast: {
    ...originalPrinter,
    print(path, options, print) {
      const node = path.node as { type?: string }
      const parserOptions = options as ParserOptions & { tableLayout?: string }
      if (
        node.type === 'table' &&
        (parserOptions.tableLayout === TABLE_LAYOUT.COMPACT ||
          parserOptions.tableLayout === TABLE_LAYOUT.COMPACT_NO_PADDING)
      ) {
        return printCompactTable(
          path as AstPath<{ align: Array<'center' | 'left' | 'right' | null> }>,
          parserOptions,
          print,
          parserOptions.tableLayout === TABLE_LAYOUT.COMPACT
        )
      }
      return originalPrinter.print(path, options, print)
    },
  },
}

export { options }

const plugin: Plugin = {
  parsers,
  printers,
  options,
}

export default plugin
