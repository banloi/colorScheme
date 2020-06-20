import React from 'react'
import './index.scss'

function CurrentColor (props) {
  const { info, fontColor } = props
  return (
    <div className='current-color' style={{ color: fontColor }}>
      <title>
        {info.name}
      </title>
      <span>
        {info.hex}
      </span>
      <button
        onClick={() => { props.handleAdd({ name: info.name, hex: info.hex }) }}
      >
        +
      </button>
      <button
        onClick={props.handleLockWhite}
      >
        锁定白色背景
      </button>
    </div>

  )
}

export default CurrentColor
