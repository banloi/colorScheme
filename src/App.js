import React, { useState } from 'react'
import { ColorBlock, Swatche, CurrentColor } from './components'
import { setFontColor } from './utils'
import './style/container.scss'
import data from './assets/colors.json'
function App () {
  const [backgroundColor, setbackgroundColor] = useState('#5698c3')
  const [backgroundColorName, setbackgroundColorName] = useState('晴蓝')
  const [selected, setSelected] = useState([
    {
      name: '天蓝',
      hex: '#1677b3'
    },
    {
      name: '海青',
      hex: '#22a2c3'
    }
  ])

  function handleSelect (color, name) {
    setbackgroundColor(color)
    setbackgroundColorName(name)
  }

  function handleAdd (item) {
    setSelected([...selected, item])
  }

  return (
    <div className='warapper' style={{ backgroundColor: backgroundColor }}>
      <div className='container'>
        <div className='list' style={{ color: setFontColor(backgroundColor) }}>
          {data.map((list) => {
            return <ColorBlock onSelect={handleSelect} key={list.hex + list.pinyin} info={list} />
          })}
        </div>
        <CurrentColor hex={backgroundColor} name={backgroundColorName} handleAdd={handleAdd} />
        <Swatche list={selected} />
        {/*         <Swatche
          color={backgroundColor}
        /> */}
      </div>
    </div>
  )
}

export default App
