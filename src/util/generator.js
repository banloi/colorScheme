const tinycolor = require('tinycolor2')

var hueStep = 2
var saturationStep = 16
var saturationStep2 = 5
var brightnessStep1 = 5
var brightnessStep2 = 15
var lightColorCount = 5
var darkColorCount = 4

function generator (color, index) {
  const isLight = index <= 6
  let fontColor = '#eee'
  const hsv = tinycolor(color).toHsv()
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1
  const newColor = tinycolor({
    h: setHue(hsv, i, isLight),
    s: setSaturation(hsv, i, isLight),
    v: setValue(hsv, i, isLight)
  })
  const hexColor = newColor.toHexString()
  if (newColor.toHsv().v > 0.87) {
    fontColor = '#989898'
  }
  return {
    color: hexColor.toUpperCase(),
    fontColor: fontColor.toUpperCase()
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

export default generator