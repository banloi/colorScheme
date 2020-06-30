## 中国传统色

### 使用方法

##### 安装 `yarn install`

下载并安装依赖包

##### 启动 `yarn start`

在开发模式下启动项目，并自动打开浏览器预览

##### 构建 `yarn build`

将生产版本的应用程序构建到`build`文件夹下，供上线发布使用。

### 功能简介

#### 展示中国传统颜色

色谱采用 [Perchouli](http://dmyz.org/) 提供的文件，色彩的展示样式参照 [Perchouli](http://dmyz.org/) 制作的 [中国色](http://zhongguose.com/ ) 网站，只根据文字的可读性对字体颜色进行了调整。

中国色网站每一项色彩的文本颜色都不一样，对应着颜色名，点击一项颜色以后，整个网页的背景颜色随之改变。这就会导致在某些背景颜色下，文本的可读性过低的问题，比如说白色背景下的黄色文本，深色背景下的深色文本都难以辨认。调整的过程如下：

一开始尝试的方案是根据`HSV`色彩模型的亮度 `V` 调整文本颜色，亮度值越高，颜色中的白色比例越高。当 `V > 0.87` 时，使用深色字体，否则使用白色字体。这种方案能解决一部分问题，但是不同色系之间的文本可读性不相同，色彩的饱和度 `S ` 可见性，添加饱和度判断条件以后，效果有所提升，但不明显。还要解决不同色调`H `的对比度问题。

> `HSB`又称`HSV`，表示一种颜色模式：在`HSB`模式中，`H(hues)`表示色相，`S(saturation)`表示饱和度，B（brightness）表示亮度HSB模式对应的媒介是人眼。
>
> 色相`（H,hue）`：在`0~360°`的标准色轮上，色相是按位置度量的。在通常的使用中，色相是由颜色名称标识的，比如红、绿或橙色。黑色和白色无色相。
>
> 饱和度`（S,saturation）`：表示色彩的纯度，为`0`时为灰色。白、黑和其他灰色色彩都没有饱和度的。在最大饱和度时，每一色相具有最纯的色光。取值范围`0～100%`。
>
> 亮度`（B,brightness或V,value）`：是色彩的明亮度。为0时即为黑色。最大亮度是色彩最鲜明的状态。取值范围`0～100%`。
>
> 参看 https://www.zhihu.com/question/22077462/answer/342570140  



>  `HSL`即是代表色相，饱和度，明度三个通道的颜色。 
>
>  `HSL`的`H(hue)`分量，代表的是人眼所能感知的颜色范围，这些颜色分布在一个平面的色相环上，取值范围是0°到360°的圆心角，每个角度可以代表一种颜色。
>
>  `HSL`的`S(saturation)`分量，指的是色彩的饱和度，它用`0%`至`100%`的值描述了相同色相、明度下色彩纯度的变化。数值越大，颜色中的灰色越少，颜色越鲜艳，呈现一种从灰度到纯色的变化。 
>
>  `HSL`的`L(lightness)`分量，指的是色彩的明度，作用是控制色彩的明暗变化。它同样使用了`0%`至`100%`的取值范围。数值越小，色彩越暗，越接近于黑色；数值越大，色彩越亮，越接近于白色。 
>
>  参看:  [AK23的回答](https://www.zhihu.com/question/22077462/answer/342570140) 

后来查阅了很多关于计算色彩空间模型中，计算两种色彩的距离资料，想用空间距离来量化色彩之间的差异大小。后来考虑到，就算是相同距离，文本可读性也不尽相同。就拿白色背景为参照，在圆锥底面的环上，黄色系的可见性是最低的。所以用空间距来衡量文本可读性是不准确的。

![img](https://pic1.zhimg.com/80/v2-85fad6cfeb62c0b223af5a198c835bf1_1440w.jpg)

最后发现 W3C 标准对网页文本的可辩别性有明确规定，文本颜色利用**对比度**设置才是正解啊。

> |               | 普通文本和文本图像对比度 | 大文本对比度 |
> | ------------- | ------------------------ | ------------ |
> | AA级 （最小） | 4.5 : 1                  | 3 : 1        |
> | AAA级（加强） | 7: 1                     | 4.5 : 1      |
>
> 参看：[W3C可辩别性准则](https://www.w3.org/Translations/WCAG20-zh/WCAG20-zh-20141009/#visual-audio-contrast)

关于计算对比度，可以使用 [TinyColor](https://github.com/bgrins/TinyColor) 的[可读性](https://github.com/bgrins/TinyColor/blob/ab58ca0a3738dc06b7e64c749cebfd5d6fb5044c/tinycolor.js#L726)算出，该函数返回一个对比度的值。具体的实现过程如下：

```js
// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1); // 将各种格式的颜色转换成 TinyColor 中固定格式的颜色对象
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};
```

`getLuminance` 函数内容如下

```js
getLuminance: function() {
    //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    var rgb = this.toRgb(); // 将颜色对象转换成 RGB 格式
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r/255;
    GsRGB = rgb.g/255;
    BsRGB = rgb.b/255;

    if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
    if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
    if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
    return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
}
```

查资料的过程中还发现一个小技巧：

>  在彩色背景上使用灰色文本会降低对比度。 使用透明的黑白色文本和彩色背景的时候，文本颜色会混合成相应的深色。这样做的好处是背景颜色变化的时候文本颜色会自动混合成对应的深色，不必改变文本的颜色值。 
>
>  参看： [提高网页设计里文本地易读性](https://zhuanlan.zhihu.com/p/45424881)

终极方案就是利用对比度来判断文本颜色，我个人偏好白色作为字体颜色，所以设置了当浅色文本和背景颜色对比度大于 `2` 的时候，就使用浅色作为文本颜色，否则使用深色字体，并且使用`RGBa`作为文本色彩格式来设置透明度。当然用 `2` 作为对比度的标准确实不符合`W3C` 的可辩别性准则。

本项目中所有涉及到文本颜色的情况都是这样处理。

#### 生成渐变色

关于渐变色的功能，一开始是使用 `Ant Design 3.x` 中的色板生成色法。使用此算法的对主色地正确选取要求很高，但是本项目中，存在各种饱和度和明度的颜色，对于不符合[主色范围限制](https://ant.design/docs/spec/colors-cn#%E8%89%B2%E5%BD%A9%E6%A8%A1%E5%9E%8B)（ 饱和度建议不低于70 ，亮度建议不低于70 ）的颜色，生成的渐变色几乎完全不可用。详细内容参看 [Ant Design 色板生成算法演进之路](https://zhuanlan.zhihu.com/p/32422584)。这里是 [Less 源码](https://github.com/ant-design/ant-design/blob/master/components/style/color/colorPalette.less)。

本项目需要一种更加普适的渐变色生成算法。经过一番寻找，最终采用了模拟 [Coolors.co](https://coolors.co/) 的渐变色生成方案。

这个方案大致分以下几个步骤：

1. 将颜色转换成 HSL 格式
2. 通过颜色亮度（百分比）确定主色在渐变色带中的位置
3. 根据设置的亮度间距（4%），生成其他的颜色

#### 色彩搭配



未完待续





