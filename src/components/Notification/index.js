import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// 第三方动画库，用于实现动画效果
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Notice from './notice'
import './index.scss'
import './icons'

// 通知容器
class Notification extends Component {
  constructor () {
    super()
    this.transitionTime = 300 // 动画时间
    this.state = { notices: [] } // 通知列表
    this.removeNotice = this.removeNotice.bind(this) // 移出通知方法
  }

  // 获取通知的key，用于移出时查找
  getNoticeKey () {
    const { notices } = this.state
    return `notice-${new Date().getTime()}-${notices.length}`
  }

  // 添加通知
  addNotice (notice) {
    const { notices } = this.state
    notice.key = this.getNoticeKey()
    if (notices.every(item => item.key !== notice.key)) { // 确认通知没有重复
      if (notices.length > 0 && notices[notices.length - 1].type === 'loading') { // 判断最新的通知为loading类型
        notices.push(notice)
        setTimeout(() => {
          this.setState({ notices })
        }, this.transitionTime)
      } else {
        notices.push(notice)
        this.setState({ notices }) // 加入通知列表
      }
      if (notice.duration > 0) {
        setTimeout(() => {
          this.removeNotice(notice.key) // 添加移除定时事件
        }, notice.duration)
      }
    }
    /*     return () => {
      console.log('jajajja')
      this.removeNotice(notice.key)
    } */
  }

  // 移除通知方法
  removeNotice (key) {
    const { notices } = this.state
    this.setState({
      notices: notices.filter(notice => { // 根据key过滤通知
        if (notice.key === key) { // 移除时判断是否有自定义的函数
          if (notice.onClose) setTimeout(notice.onClose, this.transitionTime)
          return false
        }
        return true
      })
    })
  }

  render () {
    const { notices } = this.state
    return (
      <TransitionGroup className='toast-notification'>
        {notices.map(notice => (
          <CSSTransition
            key={notice.key}
            classNames='toast-notice-wrapper notice' // 这里的classNames是前缀，根据组件的状态添加/移除class样式，从而达到动画效果
            timeout={this.transitionTime} // 动画延时
          >
            <Notice {...notice} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    )
  }
}

function createNotification () { // 创建通知容器
  const div = document.createElement('div') // 创建一个 div 标签
  document.body.appendChild(div) // 添加到 body 后面
  const ref = React.createRef() // 引用 Notification
  ReactDOM.render(<Notification ref={ref} />, div)
  return {
    addNotice (notice) {
      return ref.current.addNotice(notice) // 为容器添加新增通知方法
    },
    destroy () { // 移除通知容器方法
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    }
  }
}

let notification
const notice = (type, content, duration = 2000, onClose) => {
  if (!notification) notification = createNotification() // 判断是否已经存在通知容器，不存在则新建一个
  return notification.addNotice({ type, content, duration, onClose }) // 添加一条新通知
}

// export api
export default {
  info (content, duration, onClose) {
    return notice('info', content, duration, onClose)
  },
  success (content, duration, onClose) {
    return notice('success', content, duration, onClose)
  },
  warning (content, duration, onClose) {
    return notice('warning', content, duration, onClose)
  },
  error (content, duration, onClose) {
    return notice('error', content, duration, onClose)
  },
  loading (content, duration = 0, onClose) {
    return notice('loading', content, duration, onClose)
  }
}
