import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import './index.scss'
import { setFontColor, setForegroundColor } from '../../utils'
import removeDark from '../../assets/icons/remove-dark.png'
import removeLight from '../../assets/icons/remove-light.png'
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

function Swatche (props) {
  const { list, handleRemove } = props
  /* useEffect(() => {
    setLayout(list)
  }, [b, list]) */
  return (
    <div className='swatche'>
      <ResponsiveGridLayout
        className='layout'
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        width={560}
        rowHeight={60}
        verticalCompact
      >
        {
          list.map((item, index) => {
            let removeIcon
            if (setForegroundColor(item.hex)) {
              removeIcon = removeDark
            } else {
              removeIcon = removeLight
            }
            return (
              <div className='swatche-item' key={index} style={{ backgroundColor: item.hex }}>
                <span style={{ color: setFontColor(item.hex) }}>{item.name}</span>
                <div className='icon-box' onClick={(index) => { handleRemove(item.hex) }}>
                  <div
                    className='icon'
                    style={{ backgroundImage: `url(${removeIcon})` }}
                  />
                  <span className='tips'>删除</span>
                </div>
              </div>
            )
          })
        }
      </ResponsiveGridLayout>
      {/*       {
        list.map((item, index) => {
          let removeIcon
          if (setForegroundColor(item.hex)) {
            removeIcon = removeDark
          } else {
            removeIcon = removeLight
          }
          return (
            <div className='swatche-item' key={index} style={{ backgroundColor: item.hex }}>
              <span style={{ color: setFontColor(item.hex) }}>{item.name}</span>
              <div className='icon-box' onClick={(index) => { handleRemove(item.hex) }}>
                <div
                  className='icon'
                  style={{ backgroundImage: `url(${removeIcon})` }}
                />
                <span className='tips'>删除</span>
              </div>
            </div>
          )
        })
      } */}
    </div>

  )
}

export default Swatche
