//->动态计算REM的换算比例
~function (desW) {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / desW * 100 + "px";
}(640);

//->给滑屏区域进行初始化设置
~function () {
    var step = 0, divList = null;
    var swp = new Swiper(".swiper-container", {
        loop: true,
        direction: 'vertical',
        onSlidePrevEnd: function () {
            step--;
            change();
            if (step === 0) {
                step = 2;
            }
        },
        onSlideNextEnd: function () {
            step++;
            change();
            if (step === 3) {
                step = 1;
            }
        }
    });


    function change() {
        divList = document.querySelectorAll(".swiper-slide");
        [].forEach.call(divList, function (curDiv, index) {
            curDiv.id = index === step ? curDiv.getAttribute("trueId") : null;
        });
    }

    //->给区域增加一个loop:true的时候,会自己往开头和结尾各增加一张一模一样的,但是我还需要把区域定位到“真实的第一张”,所以开始会自己向下切换一次,我们让初始的step=0即可
}();
//音频的自动播放

~function () {
    var audioBox=document.querySelector(".audio");
    var myAudio=audioBox.getElementsByTagName("audio")[0];
    window.setTimeout(function () {
        myAudio.play();
        myAudio.addEventListener("canplay", function () {
            audioBox.style.display="block";
            audioBox.className+= " audioMove";
        },false)
    },1000)
    audioBox.addEventListener("click", function () {
        if(myAudio.paused){
            myAudio.play();
            audioBox.className+= " audioMove";
            return
        }
        myAudio.pause();
        audioBox.className = "audio";
    },false)
}();

//移动端的click事件存在300ms是延迟（300ms之内存在单击和双击）
//解决方案一：使用click，用FastClick插件
//解决方案二：使用touch事件模拟单击效果;
  //移动端和pc端事件不同，移动端不存在鼠标，所有操作依靠手指：点击、单击、双击、长按、滑动、上滑、下滑、左滑、右滑==>“单手指操作”:用touch事件模型模拟
//点击&&滑动区别：手指结束位置和起始位置的偏移距离，小于30px属于点击。
//单击&&双击： 300ms内是否触发了touchstart两次；
//长按：在750ms内手机是否离开屏幕，没有离开属于长按
//==>“多手指操作”：放大、缩小、旋转、：用gesture模拟

//移动端专有事件库：
//1)Zepto.js(移动端小型的jQuery库)，在这个库中提供了移动端的专用事件以及提供了CSS3动画的支持；(区别：兼容、大小、其他方法)
    ///$("#div").tap(function(){});单手指方法都支持
    //touch.js(百度云touch手势事件库)
    //hammer.js(国际touch手势事件库)



