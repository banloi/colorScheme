import React from 'react'
import { setForegroundColor } from '../../utils'
import './index.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import copyDark from '../../assets/icons/copy-dark.png'
import copyLight from '../../assets/icons/copy-light.png'
import addDark from '../../assets/icons/add-dark.png'
import addLight from '../../assets/icons/add-light.png'
import lockDark from '../../assets/icons/lock-dark.png'
import lockLight from '../../assets/icons/lock-light.png'
import unlockLight from '../../assets/icons/unlock-light.png'
import unlockDark from '../../assets/icons/unlock-dark.png'

// const dark = '../../assets/icons/copy-dark.png'
function CurrentColor (props) {
  const { info, fontColor, locked } = props
  let copyIcon, addIcon, lockIcon
  console.log(info.backgroundColor, setForegroundColor(info.backgroundColor))
  if (setForegroundColor(info.backgroundColor)) {
    locked ? lockIcon = lockDark : lockIcon = unlockDark
    addIcon = addDark
    copyIcon = copyDark
  } else {
    locked ? lockIcon = lockLight : lockIcon = unlockLight
    addIcon = addLight
    copyIcon = copyLight
  }
  return (
    <div className='current-color' style={{ color: fontColor }}>
      <title>
        {info.name}
      </title>
      {/* <span>
        {info.hex}
      </span> */}
      <div className='operate'>

        <div className='icon-box' onClick={() => { props.handleCopy(info.hex.toUpperCase()) }}>
          <CopyToClipboard text={info.hex}>
            <div className='icon' style={{ backgroundImage: `url(${copyIcon})` }} />
          </CopyToClipboard>
          <span className='tips'>点击复制 Hex</span>
        </div>
        <div className='icon-box'>
          <div
            className='icon'
            onClick={props.handleLockWhite}
            style={{ backgroundImage: `url(${lockIcon})` }}
          />
          <span className='tips'>
            {
              locked ? '解除锁定' : '锁定白色背景'
            }
          </span>
        </div>
        <div className='icon-box'>
          <div
            className='icon'
            onClick={() => { props.handleAdd({ name: info.name, hex: info.hex }) }}
            style={{ backgroundImage: `url(${addIcon})` }}
          />
          <span className='tips'>添加至色板</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentColor
