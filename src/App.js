import React, { useState } from 'react'
import { ColorBlock, Swatche, CurrentColor } from './components'
import { setFontColor } from './utils'
import './style/container.scss'
import data from './assets/colors.json'
function App () {
  const [backgroundColor, setbackgroundColor] = useState('#5698c3')
  const [currentInfo, setCurrentInfo] = useState({
    hex: '#5698c',
    name: '晴蓝'
  })
  const [lockBackgroundColorWhite, setLockBackgroundColorWhite] = useState(false)
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
    setCurrentInfo({
      hex: color,
      name: name
    })
    if (!lockBackgroundColorWhite) {
      setbackgroundColor(color)
    }
  }

  function handleAdd (item) {
    setSelected([...selected, item])
  }

  function handleLockWhite () {
    setLockBackgroundColorWhite(!lockBackgroundColorWhite)
    if (!lockBackgroundColorWhite) {
      setbackgroundColor('#fff')
    }

    if (lockBackgroundColorWhite) {
      setbackgroundColor(currentInfo.hex)
    }
  }

  function handleRemove (color) {
    const list = [...selected]
    const result = list.filter((item) => {
      return item.hex !== color
    })
    setSelected(result)
  }

  return (
    <div className='warapper' style={{ backgroundColor: backgroundColor }}>
      <div className='container'>
        <div className='list' style={{ color: setFontColor(backgroundColor) }}>
          {data.map((list) => {
            return <ColorBlock onSelect={handleSelect} key={list.hex + list.pinyin} info={list} />
          })}
        </div>
        <CurrentColor
          info={currentInfo}
          handleAdd={handleAdd}
          handleLockWhite={handleLockWhite}
          fontColor={setFontColor(backgroundColor)}
        />
        <Swatche
          list={selected}
          handleRemove={handleRemove}
        />
        {/*         <Swatche
          color={backgroundColor}
        /> */}
      </div>
    </div>
  )
}

export default App
