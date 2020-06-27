import React from 'react'
import './index.scss'
import { setFontColor, setForegroundColor } from '../../utils'
import removeDark from '../../assets/icons/remove-dark.png'
import removeLight from '../../assets/icons/remove-light.png'

function Swatche (props) {
  const { list, handleRemove } = props
  return (
    <div className='swatche'>
      {
        list.map((item, index) => {
          let removeIcon
          if (setForegroundColor(item.hex)) {
            removeIcon = removeDark
          } else {
            removeIcon = removeLight
          }
          return (
            <div className='swatche-item' key={index} style={{ backgroundColor: item.hex }}>
              <span style={{ color: setFontColor(item.hex) }}>{item.name}</span>
              <div className='icon-box' onClick={(index) => { handleRemove(item.hex) }}>
                <div
                  className='icon'
                  style={{ backgroundImage: `url(${removeIcon})` }}
                />
                <span className='tips'>删除</span>
              </div>
            </div>
          )
        })
      }
    </div>

  )
}

export default Swatche
