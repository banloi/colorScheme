import React from 'react'
import './index.scss'
import { setFontColor } from '../../utils'

function Swatche (props) {
  const { list, handleRemove } = props
  return (
    <div className='swatche'>
      {
        list.map((item, index) => {
          return (
            <div key={index} style={{ backgroundColor: item.hex }}>
              <span style={{ color: setFontColor(item.hex) }}>{item.name}</span>
              <span onClick={(index) => { handleRemove(item.hex) }}>x</span>
            </div>
          )
        })
      }
    </div>

  )
}

export default Swatche
