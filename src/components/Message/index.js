import React from 'react'
import classNames from 'classnames'
import './index.scss'

function Message (props) {
  const content = props.content
  const messageClass = classNames({
    'message-box': true,
    'move-in': true
  })
  console.log(props.content)
  return (
    <>
      {
        content
          ? <div className={messageClass} key={Math.random()}>
            <span>
              {content}
            </span>
            </div>
          : null
      }
    </>

  )
}

export default Message
