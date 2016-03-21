import React, { PropTypes } from 'react'
import classNames from 'classnames'

// Destructure values from props to create variable names when helpful
//   props = {
//     items: [...]
//   }
export default function ExampleTest({ items }) {
  const row = (item, index) => {
    // Use the classnames module for dynamic class names
    const itemClassnames = classNames(
      { [`${item.name}-color`]: item.isFeatured },
      { 'on-sale': item.onSale}
    )

    return (
      <li className={itemClassnames} key={index}>
        {item.name}
      </li>
    )
  }

  return (
    <ul>
      { items.map(row) }
    </ul>
  )
}

ExampleTest.propTypes = {
  items: PropTypes.array.isRequired
}
