/**
 * 简单的首页动画。
 * 使用方法：在需要动画的元素上加上p-animate。如果需要延迟，就加上delay300，delay600等类（具体看animate.css，可自定义一些类、动画）。
 * 需要注意的一点是如果绑定的元素是img，为保证效果顺畅，会等到img资源彻底加载完成后才会启动动画；否则直接启动动画。
 */
(function(){
  const animateDoms = document.querySelectorAll('.p-animate')

  document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', animate)
    animate()
  })

  function animate() {
    animateDoms.forEach(isDomInViewPort)
  }

  function isDomInViewPort(dom) {
    const offset = getElementTop(dom)
    const scrollY = window.scrollY
    const windowInnerHeight = window.innerHeight

    // console.log(dom, offset, scrollY, windowInnerHeight)
    if(offset - scrollY < windowInnerHeight && offset > scrollY) { // 动画元素是否在视窗内
      if(!dom.getAttribute('isAnimated')) { // 判断动画元素是否发生过动画

        if(dom.src) {
          // 判断图片是否加载完毕，加上动画类
          imgLoad(dom, function(img) {
            if(img.classList) {
              img.classList.add('p-fadeInUp')
            } else {
              img.className += ' ' + 'p-fadeInUp'
            }
          })
        } else {
          if(dom.classList) {
            dom.classList.add('p-fadeInUp')
          } else {
            dom.className += ' ' + 'p-fadeInUp'
          }
        }
        
        dom.setAttribute('isAnimated', true)
      }
    }
  }

  function imgLoad(img, cb) {
    const timer = setInterval(function() {
        if (img.complete) {
          cb(img)
          clearInterval(timer)
        }
    }, 50)
  }

  function getElementTop(element){
    let actualTop = element.offsetTop
    let current = element.offsetParent
    while (current !== null){
      actualTop += current.offsetTop
      current = current.offsetParent
    }
    return actualTop
  }
})()