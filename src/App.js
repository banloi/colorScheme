import React, { useState } from 'react'
import { ColorBlock, Swatche } from './components'
import { setFontColor } from './utils'
import './style/container.scss'
import data from './assets/colors.json'
function App () {
  const [backgroundColor, setbackgroundColor] = useState('#989898')
  function handleSelect (color) {
    setbackgroundColor(color)
  }
  return (
    <div className='warapper' style={{ backgroundColor: backgroundColor }}>
      <div className='container'>
        <div className='list' style={{ color: setFontColor(backgroundColor) }}>
          {data.map((list) => {
            return <ColorBlock onSelect={handleSelect} key={list.hex + list.pinyin} info={list} />
          })}
        </div>
        <Swatche
          color={backgroundColor}
        />
      </div>
    </div>
  )
}

export default App
