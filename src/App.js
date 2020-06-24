import React, { useState } from 'react'
import { ColorBlock, Swatche, CurrentColor } from './components'
import { setFontColor } from './utils'
import './style/container.scss'
import data from './assets/colors.json'
function App () {
  const [currentInfo, setCurrentInfo] = useState({
    hex: '#5698c3',
    name: '晴蓝',
    backgroundColor: '#5698c3'
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
    if (!lockBackgroundColorWhite) { // 未锁定白色，则设置背景颜色
      setCurrentInfo({
        hex: color,
        name: name,
        backgroundColor: color
      })
      return
    }
    setCurrentInfo({
      hex: color,
      name: name,
      backgroundColor: '#fff'
    })
  }

  function handleAdd (item) {
    setSelected([...selected, item])
  }

  function handleLockWhite () {
    setLockBackgroundColorWhite(!lockBackgroundColorWhite)
    if (!lockBackgroundColorWhite) {
      setCurrentInfo({
        hex: currentInfo.hex,
        name: currentInfo.name,
        backgroundColor: '#fff'
      })
    }

    if (lockBackgroundColorWhite) {
      setCurrentInfo({
        hex: currentInfo.hex,
        name: currentInfo.name,
        backgroundColor: currentInfo.hex
      })
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
    <div className='warapper' style={{ backgroundColor: currentInfo.backgroundColor }}>
      <div className='container'>
        <div className='list' style={{ color: setFontColor(currentInfo.backgroundColor) }}>
          {data.map((list) => {
            return <ColorBlock onSelect={handleSelect} key={list.hex + list.pinyin} info={list} />
          })}
        </div>
        <CurrentColor
          info={currentInfo}
          locked={lockBackgroundColorWhite}
          handleAdd={handleAdd}
          handleLockWhite={handleLockWhite}
          fontColor={setFontColor(currentInfo.backgroundColor)}
        />
        <Swatche
          list={selected}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  )
}

export default App
