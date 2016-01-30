function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var oDivs = document.querySelectorAll("#all>div");
var oLis=document.querySelectorAll("#listKill>li");
console.log(oDivs);
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oDivs, function () {
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
    [].forEach.call(oDivs, function () {
        arguments[0].className = "";
        if (arguments[1] !== index) {
            arguments[0].style.display = "none";
        }
        arguments[0].id="";
    });
    [].forEach.call(oLis,function(){
        arguments[0].id="";
    });
    var duration = 0;
    if (movePos > 0) {
        //往下滑动
        this.prevSIndex = index == 0 ? oDivs.length - 1 : index - 1;
        duration = -winH + movePos;
    } else if (movePos < 0) {
        //往上滑动
        this.prevSIndex = index == oDivs.length - 1 ? 0 : index + 1;
        duration = winH + movePos;
    }
    this.style.webkitTransform = "scale(" + (1 - Math.abs(movePos / winH) * 1 / 2) + ") translate(0," + movePos + "px)";
    oDivs[this.prevSIndex].style.webkitTransform = "translate(0," + duration + "px)";
    oDivs[this.prevSIndex].className = "index";
    oDivs[this.prevSIndex].style.display = "block";
}
function end(e) {
    oDivs[this.prevSIndex].style.webkitTransform = "translate(0,0)";
    oDivs[this.prevSIndex].style.webkitTransition = "0.5s ease-out";
    oDivs[this.prevSIndex].addEventListener("webkitTransitionEnd", function (e) {
        if (e.target.tagName == "DIV") {
            this.style.webkitTransition = "";
        }
        this.id = "d" + (this.index + 1);
        //if(this.id==="d3"){
        //    var l=0;
        //    var lTimer=window.setInterval(function(){
        //        l+=1;
        //        if(!oLis[l-1]){window.clearInterval(lTimer);l=0;return;}
        //        oLis[(l-1)].id="l"+l;
        //    },500);
        //}else if(this.index===3){
        //
        //}

    }, false)
}
