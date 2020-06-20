import React from 'react'
import AddButton from './AddButton'
import './index.scss'
import { setFontColor } from '../../utils'

function CurrentColor (props) {
  return (
    <div className='current-color' style={{ color: setFontColor(props.hex) }}>
      <title>
        {props.name}
      </title>
      <span>
        {props.hex}
      </span>
      <button
        onClick={() => { props.handleAdd({ name: props.name, hex: props.hex }) }}
      >
        +
      </button>
    </div>

  )
}

export default CurrentColor
