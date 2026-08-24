import { builders, printer as docPrinter } from 'prettier/doc'

const { breakParent, hardlineWithoutBreakParent, join } = builders
const { printDocToString } = docPrinter

function printCompactTable(path, options, print, withPadding = false) {
  const { node } = path

  const contents = path.map(
    () => path.map(() => printDocToString(print(), options).formatted, 'children'),
    'children'
  )

  const rows = [
    contents[0],
    printSeparator(node, options, contents[0].length, withPadding),
    ...contents.slice(1),
  ].map(columns => (withPadding ? `| ${columns.join(' | ')} |` : `|${columns.join('|')}|`))

  return [breakParent, join(hardlineWithoutBreakParent, rows)]
}

function printSeparator(node, options, headerLength, withPadding = false) {
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
    .filter(Boolean)
}

export { printCompactTable }
