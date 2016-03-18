import chai from 'chai'
import cheerio from 'cheerio'
import { createElement } from 'react'
import { renderToStaticMarkup as render } from 'react/lib/ReactDOMServer'

import ExampleTest from './ExampleTest.jsx'

chai.should()

describe('Example Test', () => {
  it('renders rows with content from props', () => {
    const props = { values: ['hello', 'world'] }

    const html = render(createElement(ExampleTest, props))
    const $ = cheerio.load(html)

    const rows = $('li')

    rows.length.should.equal(2)

    const rowContent = rows.map((i, el) => {
      return $(el).text()
    }).get().join(' ')

    rowContent.should.equal('hello world')
  })
})
