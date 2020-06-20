const tinycolor = require('tinycolor2')

function setFontColor (color) {
  const hsvColor = tinycolor(color).toHsv()
  const white = tinycolor.readability(hsvColor, '#fff')
  const black = tinycolor.readability(hsvColor, '#000')
  return white > 2 || white > black ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.4)'
}

var hueStep = 2
var saturationStep = 16
var saturationStep2 = 5
var brightnessStep1 = 5
var brightnessStep2 = 15
var lightColorCount = 5
var darkColorCount = 4

function swatcheGenerator (color, index) {
  const isLight = index <= 6
  const hsv = tinycolor(color).toHsv()
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1
  if (i === 0) {
    return {
      color: tinycolor(color).toHexString().toUpperCase(),
      fontColor: setFontColor(color)
    }
  }
  let newHue, newStauration
  // if the color id pure gray, keep the hue and stauration zero and just change the value
  if (hsv.h === 0 && hsv.s === 0) {
    newHue = 0
    newStauration = 0
  } else {
    newHue = setHue(hsv, i, isLight)
    newStauration = setSaturation(hsv, i, isLight)
  }
  const newColor = tinycolor({
    h: newHue,
    s: newStauration,
    v: setValue(hsv, i, isLight)
  })
  const hexColor = newColor.toHexString().toUpperCase()
  return {
    color: hexColor,
    fontColor: setFontColor(hexColor)
  }
}

// 设置色调
var setHue = function (hsv, i, isLight) {
  var hue
  if (hsv.h >= 60 && hsv.h <= 240) {
    hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i
  } else {
    hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i
  }
  if (hue < 0) {
    hue += 360
  } else if (hue >= 360) {
    hue -= 360
  }
  return Math.round(hue)
}
// 设置饱和度
var setSaturation = function (hsv, i, isLight) {
  var saturation
  if (isLight) {
    saturation = Math.round(hsv.s * 100) - saturationStep * i
  } else if (i === darkColorCount) {
    saturation = Math.round(hsv.s * 100) + saturationStep
  } else {
    saturation = Math.round(hsv.s * 100) + saturationStep2 * i
  }
  if (saturation > 100) {
    saturation = 100
  }
  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10
  }
  if (saturation < 6) {
    saturation = 6
  }
  return Math.round(saturation)
}
// 设置亮度
var setValue = function (hsv, i, isLight) {
  if (isLight) {
    return Math.round(hsv.v * 100) + brightnessStep1 * i
  }
  return Math.round(hsv.v * 100) - brightnessStep2 * i
}

function shadeGenerator (color) {
  const hslColor = tinycolor(color).toHsl()
  const { h, s } = hslColor
  const position = Math.round(hslColor.l * 100 / 4)
  console.log(position)
  const list = []
  list[position - 6] = tinycolor(color).toHslString()
  for (let i = 1; i <= 18; i++) {
    if (list[i - 1] === undefined) {
      list[i - 1] = tinycolor({
        h: h,
        s: s,
        l: (i + 5) * 0.04
      }).toHslString()
    }
  }
  console.log(list)
  console.log(position)
  return list
}

export { setFontColor, swatcheGenerator, shadeGenerator }
