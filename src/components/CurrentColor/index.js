import React from 'react'
import { setForegroundColor } from '../../utils'
import './index.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import copyDark from '../../assets/icons/copy-dark.png'
import copyLight from '../../assets/icons/copy-light.png'

// const dark = '../../assets/icons/copy-dark.png'
function CurrentColor (props) {
  const { info, fontColor } = props
  let copyIcon
  if (setForegroundColor(info.hex)) {
    copyIcon = copyDark
  } else {
    copyIcon = copyLight
  }
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
      <div className='copy-box'>
        <CopyToClipboard text={info.hex}>
          <>
            <div className='copy' style={{ backgroundImage: `url(${copyIcon})` }} />
            <span className='tips'>点击复制 Hex</span>
          </>
        </CopyToClipboard>
      </div>

    </div>
  )
}

export default CurrentColor
