import type { AstPath, Doc, ParserOptions } from 'prettier'
import { builders, printer as docPrinter } from 'prettier/doc'

const { breakParent, hardlineWithoutBreakParent, join } = builders
const { printDocToString } = docPrinter

interface TableNode {
  align: Array<'center' | 'left' | 'right' | null>
}

type TablePath = AstPath<TableNode> & AstPath
type Print = (selector?: string | number | Array<string | number> | AstPath) => Doc

export function printCompactTable(
  path: TablePath,
  options: ParserOptions & { tableLayout?: string },
  print: Print,
  withPadding = false
): Doc {
  const { node } = path

  const childrenPath = path as AstPath
  const contents = childrenPath.map(
    () => childrenPath.map(() => printDocToString(print(), options).formatted, 'children'),
    'children'
  )

  const rows = [
    contents[0],
    printSeparator(node, options, contents[0].length, withPadding),
    ...contents.slice(1),
  ].map(columns => (withPadding ? `| ${columns.join(' | ')} |` : `|${columns.join('|')}|`))

  return [breakParent, join(hardlineWithoutBreakParent, rows)]
}

function printSeparator(
  node: TableNode,
  options: ParserOptions,
  headerLength: number,
  withPadding = false
): string[] {
  return node.align
    .map((align, index) => {
      if (options.parser !== 'mdx' && index >= headerLength) {
        return null
      }
      const left = align === 'center' || align === 'left' ? ':' : ''
      const right = align === 'center' || align === 'right' ? ':' : ''
      if (withPadding) {
        return `${left || '-'}-${right || '-'}`
      }
      return `${left}-${right}`
    })
    .filter((value): value is string => value !== null)
}
