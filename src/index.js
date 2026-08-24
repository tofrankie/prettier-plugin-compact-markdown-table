import * as prettierMarkdownPlugin from 'prettier/plugins/markdown'
import options from './options.js'
import { printCompactTable } from './print-compact-table.js'

const originalPrinter = prettierMarkdownPlugin.printers.mdast

export const parsers = {
  markdown: prettierMarkdownPlugin.parsers.markdown,
  mdx: prettierMarkdownPlugin.parsers.mdx,
  remark: prettierMarkdownPlugin.parsers.remark,
}

export const printers = {
  mdast: {
    ...originalPrinter,
    print(path, options, print) {
      if (path.node.type === 'table' && options.tableLayout === 'compact') {
        return printCompactTable(path, options, print)
      }
      return originalPrinter.print(path, options, print)
    },
  },
}

export { options }
