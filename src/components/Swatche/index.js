import React from 'react'
import './index.scss'

function Swatche (props) {
  const { list } = props
  return (
    <div className='swatche'>
      {
        list.map((item, index) => {
          return (
            <div key={index} style={{ backgroundColor: item.hex }}>
              <span>{item.name}</span>
            </div>
          )
        })
      }
    </div>

  )
}

export default Swatche
