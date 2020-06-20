import React, { useRef, useEffect } from 'react'
import { swatcheGenerator, shadeGenerator, setFontColor } from '../../utils'
import './index.scss'

function Gradient (props) {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const lists = shadeGenerator(props.color)
  return (
    <div className='gradient'>
      {
        lists.map((color, index) => {
          return (
            <div
              className='gradient-item'
              key={color + index}
              style={{ backgroundColor: color, color: setFontColor(color) }}
            >
              <span>{color}</span>
            </div>
          )
        })
      }
      {/* {list.map(index => {
        const color = swatcheGenerator(props.color, index)
        return (
          <div
            className='swatche-item'
            key={index + color}
            style={{ backgroundColor: color.color, color: color.fontColor }}
          >
            <span>{color.color}</span>
          </div>
        )
      })} */}
    </div>
  )
}

export default Gradient
