
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if (winW / winH < desW / desH) {//按照高去缩放
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {//按照宽去缩放
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oLis, function () {
    //第一个当前项，第二个当前项索引，第三个当前类数组
    arguments[0].index = arguments[1];
    arguments[0].addEventListener("touchstart", start, false);
    arguments[0].addEventListener("touchmove", move, false);
    arguments[0].addEventListener("touchend", end, false);
});
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    var moveTouch = e.changedTouches[0].pageY;
    var movePos = moveTouch - this.startY;
    var index = this.index;
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
        if (arguments[1] !== index) {
            arguments[0].style.display = "none";
        }
        arguments[0].firstElementChild.id="";
    });
    if (movePos > 0) {
        //往下滑动
        this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winH + movePos;
    } else if (movePos < 0) {
        this.prevSIndex = (index == oLis.length - 1 ? 0 : index + 1);
        var duration = winH + movePos;
    }
    this.style.webkitTransform = "scale(" + (1 - Math.abs(movePos / winH )*1/2)+ ") translate(0,"+movePos+"px)";
    oLis[this.prevSIndex].style.webkitTransform = "translate(0," + duration + "px)";
    oLis[this.prevSIndex].className = "index";
    oLis[this.prevSIndex].style.display = "block";
}
function end(e) {
    oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
    oLis[this.prevSIndex].style.webkitTransition="0.5s ease-out";
    oLis[this.prevSIndex].addEventListener("webkitTransitionEnd",function(e){
        if(e.target.tagName=="LI"){
            this.style.webkitTransition="";
        }
        this.firstElementChild.id="a"+(this.index+1);
    },false)
}