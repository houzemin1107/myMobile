function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var list = getEle("#list");
var oLis = document.querySelectorAll("#list>li");
var sound = getEle("#sound");
var song = getEle("#song");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
//var desW = 640;
//var desH = 960;
//if (winW / winH <= desW / desH) {
//    main.style.webkitTransform = "scale(" + winH / desH + ")";
//} else {
//    main.style.webkitTransform = "scale(" + winW / desW + ")";
//}
song.play();
sound.addEventListener("touchstart", function (e) {
    if (this.className) {
        song.pause();
        this.className="";
    } else {
        song.play();
        this.className="sing";
    }
}, false);

[].forEach.call(oLis, function () {
    //第一个当前项，第二个当前项索引，第三个当前类数组
    arguments[0].index = arguments[1];
    arguments[0].addEventListener("touchstart", start, false);
    arguments[0].addEventListener("touchmove", move, false);
    arguments[0].addEventListener("touchend", end, false);
});
function start(e){
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    e.preventDefault();
    var moveTouch = e.changedTouches[0].pageY;
    this.movePos = moveTouch-this.startY;
    var index = this.index;
    if(Math.abs(this.movePos)>30){
        [].forEach.call(oLis,function(){
            arguments[0].className = "";
            if(arguments[1]!=index){
                arguments[0].style.display = "none";
            }
            arguments[0].firstElementChild.id="";
        });
        if(this.movePos>0){
            var pos = -winH+this.movePos;
            this.prevsIndex = (index ==0?oLis.length-1:index-1);
        }else if(this.movePos<0){
            var  pos = winH+this.movePos;
            this.prevsIndex = (index == oLis.length-1?0:index+1);

        }
        oLis[this.prevsIndex].className = "index";
        oLis[this.prevsIndex].style.display = "block";
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+pos+"px)";
        //this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+") " +
        //    " translate(0,"+movePos+"px)";
    }

}

function end(e){
    if(this.flag&&Math.abs(this.movePos)>30){
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName == "LI"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="d"+(this.index+1);
        },false)
    }
}
//function start(e) {
//    //->记录当前元素的开始的坐标
//    var touchPoint = e.changedTouches[0];
//    this["strX"] = touchPoint.pageX;
//    this["strY"] = touchPoint.pageY;
//}
//function move(e) {
//    //->获取最新的坐标
//    var touchPoint = e.changedTouches[0];
//    this["endX"] = touchPoint.pageX;
//    this["endY"] = touchPoint.pageY;
//    var index = this.index;
//    var duration = null;
//    //->判断是否发生滑动，并且获取滑动的方向
//    this["swipeFlag"] = isSwipe(this["strX"], this["endX"], this["strY"], this["endY"]);
//    //->说明发生了滑动
//    if (this["swipeFlag"]) {
//        //判断活动的方向，以滑动多的为基准
//        this["swipeDir"] = swipeDirection(this["strX"], this["endX"], this["strY"], this["endY"]);
//        //->只有上下滑动才操作
//        if (/^(Down|Up)$/.test(this["swipeDir"])) {
//            [].forEach.call(oLis, function () {
//                arguments[0].className = "";
//                if (arguments[1] !== index) {
//                    arguments[0].style.display = "none";
//                }
//                arguments[0].firstElementChild.id = "";
//            });
//            //->计算滑动的距离
//            this["changeY"] = this["endY"] - this["strY"];
//            if (this["changeY"] > 0) {//向下滑动
//                this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
//                duration = -(winH ) + this["changeY"];
//                //duration=-(winH*1.8);
//            } else if (this["changeY"] < 0) {//向上滑动
//                this.prevSIndex = (index == oLis.length - 1 ? 0 : index + 1);
//                duration = (winH ) + this["changeY"];
//                //duration=winH;
//            }
//            oLis[this.prevSIndex].style.webkitTransform = "translate(0," + duration + "px)";
//            oLis[this.prevSIndex].className = "index";
//            oLis[this.prevSIndex].style.display = "block";
//            this.style.webkitTransform = "scale("+(1-Math.abs(this["changeY"])/winH*1/2)+") " +
//                " translate(0,"+this["changeY"]+"px)";
//        }
//    }
//
//}
//function end(e) {
//    if (/^(Down|Up)$/.test(this["swipeDir"])) {
//        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
//        oLis[this.prevSIndex].style.webkitTransition = "0.5s";
//        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function (e) {
//            if (e.target.tagName == "LI") {
//                this.style.webkitTransition = "";
//            }
//            this.firstElementChild.id = "d" + (this.index + 1);
//        }, false)
//    }
//}

function isSwipe(strX, endX, strY, endY) {
    return Math.abs(endX - strX) > 30 || Math.abs(endY - strY) > 30;
    //if(Math.abs(endX - strX) > 30 || Math.abs(endY - strY) > 30){
    //    return true;
    //}
}

function swipeDirection(strX, endX, strY, endY) {
    var changeX = endX - strX;
    var changeY = endY - strY;
    return Math.abs(changeX) > Math.abs(changeY) ? (changeX > 0 ? "Right" : "Left") : (changeY > 0 ? "Down" : "Up");
}