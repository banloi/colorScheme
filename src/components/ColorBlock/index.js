import React, { useRef, useEffect } from 'react'
import './index.scss'

function ColorBlock (props) {
  const itemRef = useRef(props.hex)
  const { info } = props
  function drawArcAndLine (cmyk, rgb) {
    var canvas = itemRef.current
    var context = canvas.getContext('2d')
    var lineHeight = 278 - 150

    canvas.width = 50
    canvas.height = 278
    cmyk.forEach(function (v, i) {
      var ctx = canvas.getContext('2d')
      var endAngle = (-90 + (360 * v / 100)) * (Math.PI / 180)

      if (v === 0) endAngle = 1.5 * Math.PI
      ctx.beginPath()
      ctx.arc(14, 31.3 * (i + 1), 9, 1.5 * Math.PI, endAngle)
      ctx.lineWidth = 6
      context.strokeStyle = 'white'
      ctx.stroke()
    })
    context.fillStyle = '#222'
    context.lineWidth = 1
    context.moveTo(18, 150)
    context.lineTo(18, 150 + lineHeight * (rgb[0] / 255))
    context.moveTo(21, 150)
    context.lineTo(21, 150 + lineHeight * (rgb[1] / 255))
    context.moveTo(24, 150)
    context.lineTo(24, 150 + lineHeight * (rgb[2] / 255))
    context.stroke()
  }
  useEffect(() => { drawArcAndLine(info.CMYK, info.RGB) }, [info.CMYK, info.RGB])
  return (
    <div className='item' style={{ borderTop: `6px solid ${info.hex}` }}>
      <a disabled onClick={() => props.onSelect(info.hex, info.name)}>
        <span className='name'>
          {info.name}
        </span>
        <span className='pinyin'>{info.pinyin}</span>
        <span className='rgb'>{info.hex}</span>
        <canvas ref={itemRef} style={{ width: '50px', height: '278px' }} />
      </a>
    </div>
  )
}

export default ColorBlock
