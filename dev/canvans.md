### 第一步、安装插件

~~~
npm install html2canvas
或
yarn add html2canvas
~~~

### 第二步、引入插件

~~~
import html2canvas from 'html2canvas'
~~~

### 第三步、导出图片

~~~
// 获取要导出的DOM
const rect = document.querySelector('#chart').getBoundingClientRect()
html2canvas(document.querySelector('#chart'), {
	width: rect.width,
	height: rect.height
}).then(function (canvas) {
   const pageData = canvas.toDataURL('image/jpeg', 1.0)
   const imgData = pageData.replace('image/jpeg', 'image/octet-stream')
   const imgName = '生成图片.jpg'
   const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
   save_link.href = imgData 
   save_link.download = imgName 
   const event = document.createEvent('MouseEvents')
   event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
   save_link.dispatchEvent(event)
})
~~~