# ele

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 一 meta标签配置
```
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```
## 二 样式重置文件,移动端 1px 问题,移动端300ms问题
 ```
 /*
    *因为不同的浏览器默认的样式不同，将所有html标签的默认样式统一化
    所以在main.js中引入 reset.css

    *不同屏幕的设备像素比（devicePixelRatio）不同，即 1 css像素与设备的像素比不同，导致 1px 大小不一样。
    所以 main.js 引入 border.css

    * 移动端的 touch 事件会及时触发 ，click会在 300ms后触发，会造成 点击穿透（touchstart触发的div消失，透露出下面的跳转连接，300ms后，触发click事件，跳转）,所以 用 fastclick.js
 */
    import "./assets/style/reset.css"
    import "./assets/style/border.css"

    //npm install fastclik  --save
    import fastClick from 'fastclick'
    fastClick.attach(document.body);

 ```
