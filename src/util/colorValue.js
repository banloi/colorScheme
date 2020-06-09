const tinycolor = require('tinycolor2')

function setFontColor (color) {
  const hsvColor = tinycolor(color).toHsv()
  const white = tinycolor.readability(hsvColor, '#fff')
  const black = tinycolor.readability(hsvColor, '#000')
  console.log(white)
  console.log(black)
  return white > 2 || white > black ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.4)'
}

export default setFontColor
