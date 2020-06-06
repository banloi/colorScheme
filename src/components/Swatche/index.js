import React, { useRef, useEffect } from 'react'
import generator from '../../util/generator'
import './index.scss'

function Swatche (props) {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className='swatche'>
      {list.map(index => {
        const color = generator(props.color, index)
        console.log(color)
        return (
          <div key={index + color} style={{ backgroundColor: color.color }}>
            <span className='color' style={{ color: color.fontColor }}>{color.color}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Swatche
