// 1.找对象，获取一些Dom元素
let banner = document.querySelector('.banner');
let banner_inner = document.querySelector('.banner_inner');
let indicators = document.querySelectorAll('.indicators li');
let itemWidth = banner.clientWidth;
let timer = null;
let i = 1;

// 2.正常播放，通过定时器
timer = setInterval(function(){
    setTransition();
    setTransform(itemWidth*++i);
},2000);

//3.不间断播放
banner_inner.addEventListener('transitionend',function(){
    if( i >= 6 ){
        i = 1;
        removeTransition();
        setTransform(itemWidth*i);
    }else if (i <= 0 ){
        i = 5;
        removeTransition();
        setTransform(iitemWidth*i);
    }
    setIndicators();
})

/*关于移动端的事件
    (1)事件类型
    touchstart: 手指开始按下
    touchmove: 手指移动
    touchend: 手指移开

    (2)事件对象
    touches: 触摸手指的列表
    targetTouches: 触摸时手指对应的DOM的列表
    changedTouches: 事件对应的手指列表

    (3)对象属性
    clientX/clinetY: 浏览器的坐标
    pageX/pageY: 页面的坐标
    screenX/screenY: 屏幕的坐标
*/

let startX = 0;
let moveX = 0;
let distanceX = 0;

banner.addEventListener('touchstart',function(e){
    clearInterval(timer);
    startX = e.touches[0].pageX;
})

banner.addEventListener('touchmove',function(e){
    moveX = e.touches[0].pageX;
    distanceX = startX - moveX;
    
    setTransform(distanceX + itemWidth * i);
})

banner.addEventListener('touchend',function(e){
    timer = setInterval(function(){
        setTransition();
        setTransform(itemWidth*++i);
    },2000);

    if(Math.abs(distanceX) < 1 / 3 * itemWidth){
        setTransition();
        setTransform(itemWidth * i);
    }else if(distanceX > 0){
        setTransform(itemWidth * ++i);
    }else{
        setTransform(itemWidth * --i);
    }
})

//把一些功能打包为函数

// 1.过渡函数
function setTransition(){
    banner_inner.style.transition = 'all ' + 0.5 + 's';
}

//2.取消过渡函数
function removeTransition(){
    banner_inner.style.transition = 'none';
}

//3.设置移动函数
function setTransform(distance){
    banner_inner.style.transform = 'translate(-' + distance + 'px)';
}

// 4.设置小圆点轮播函数
function setIndicators(){
    let active = document.querySelector('.active');
    active.classList.remove('active');
    indicators[i-1].classList.add('active');
}