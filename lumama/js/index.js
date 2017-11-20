//JS适配屏幕方法
//shiPei();
//function shiPei(){
//	var widt = document.querySelector('html').offsetWidth;//获取屏幕宽度
//	console.log(widt);
//	var gen= widt * 100 / 640;
//	document.querySelector("html").style.fontSize=gen+"px";
//}
//window.onresize=function(){
//	shiPei();
//}
//轮播图
touchSlide(".crUl").alternate({
	picnum:9, //轮播图片
	color:"red",//索引颜色
	setTime:1500  //间隔时间
});
//封装过的移动端轮播图
function touchSlide(dom){
    var   obj=document.querySelector(dom);
    obj.alternate=function(parameter){
      var objs={
            picnum:parameter.picnum, //图片数量
            directions:parameter.directions || "left", //轮播方向
            setTime:parameter.setTime || 1000,  //间隔时间
            tranTime:parameter.tranTime || 0.5, // 过渡时间
            indexer:parameter.indexer || true, // 是否有索引器,默认true 
            swipe:parameter.swipe || true, //是否有滑动事件, 默认true
            color:parameter.color || "#fff" //索引器颜色 ,默认白色
        }
            obj.style.width=objs.picnum+"00%";
            obj.parentNode.style.position="relative";
            obj.parentNode.style.overflow="hidden";
            var childli = obj.querySelectorAll("li");
            for(var m = 0;m<childli.length;m++){
                childli[m].style.float="left";
                childli[m].style.width=""+(1/objs.picnum*100)+"%";
            }
            if(objs.indexer){
                var secondUl = document.createElement('ul');
                secondUl.className = 'indexer';
                obj.parentNode.appendChild(secondUl);
                var html = "";
                for(var linum = 0;linum<objs.picnum-2;linum++){
                    html+="<li></li>"
                }
                secondUl.innerHTML = html;
                var obj1 = document.querySelector('.lunbo');
                var lis = document.querySelectorAll(".indexer>li");
                secondUl.style.position = "absolute";
                secondUl.style.left = "50%";
                secondUl.style.transform = "translateX(-50%)";
                secondUl.style.bottom = "5px";
                for(var n = 0;n<lis.length;n++) {
                    lis[n].style.float = "left";
                    lis[n].style.width = ".10rem";
                    lis[n].style.height = ".10rem";
                    lis[n].style.borderRadius = "50%";
                    lis[n].style.border = "1px solid #f1f1f1";
                    lis[n].style.marginLeft = ".05rem";
                    lis[0].style.backgroundColor=objs.color;
                }
            }
            var activeLi = function (tmpIndex){
            for (var i = 0; i < lis.length; i++){
                var element = lis[i];
                element.style.backgroundColor="";
            }
            tmpIndex = tmpIndex>=objs.picnum-1?1:tmpIndex;
            tmpIndex = tmpIndex<=0?objs.picnum-2:tmpIndex;
                lis[tmpIndex-1].style.backgroundColor=objs.color;
        }
            obj.style.transform = "translateX(-"+(1/objs.picnum*100)+"%)";
            var lunboIndex = 1;
            if(objs.directions=="left"){
            setLunbo =  setInterval(function () {
                  lunboIndex++;
                     obj.style.transition = "transform " + objs.tranTime + "s"
                     obj.style.transform = "translateX(-" + (lunboIndex/objs.picnum*100) + "%)";
                     if(objs.indexer){
                         activeLi(lunboIndex)
                     }
                 }, objs.setTime)
            }else{
                setLunbo =  setInterval(function () {
                    lunboIndex--;
                    obj.style.transition = "transform " + objs.tranTime + "s"
                    obj.style.transform = "translateX(-" + (lunboIndex/objs.picnum*100) + "%)";
                    if(objs.indexer){
                        activeLi(lunboIndex)
                    }
                }, objs.setTime)
            }
            if(objs.swipe){
                var startX, startY;
                var startTime;
                obj.addEventListener("touchstart", function (e) {
                    if (e.targetTouches.length > 1) {
                        return;
                    }
                    startX = e.targetTouches[0].clientX;
                    startY = e.targetTouches[0].clientY;
                    startTime = Date.now();
                })
                obj.addEventListener("touchend", function (e) {
                    if (e.changedTouches.length > 1) {
                        return;
                    }
                    var endX = e.changedTouches[0].clientX;
                    var endY = e.changedTouches[0].clientY;
                    var direction = "";
                    if (Math.abs(endX - startX) > 15) {
                        direction = endX > startX ? "right" : "left";
                    } else if (Math.abs(endY - startY) > 15) {
                        direction = endY > startY ? "down" : "up";
                    }else{
                        return ;
                    }
                    var endTime=Date.now();
                    if(endTime-startTime>2000){
                        return;
                    }
                    clearInterval(setLunbo);
                    switch (direction){
                        case "left":
                            lunboIndex++;
                            break;
                        case "right":
                            lunboIndex--;
                            break;
                        default:
                            break;
                    }
                    activeLi(lunboIndex);
                    obj.style.transition = "transform .3s";
                    obj.style.transform = "translateX(-" + (lunboIndex/objs.picnum*100) + "%)";
                    setLunbo =  setInterval(function () {
                        lunboIndex++;
                        obj.style.transition = "transform " + objs.tranTime + "s"
                        obj.style.transform = "translateX(-" + (lunboIndex/objs.picnum*100) + "%)";
                        if(objs.indexer){
                            activeLi(lunboIndex)
                        }
                    }, objs.setTime)
                })
            }
            obj.addEventListener("transitionend",function () {
            if(lunboIndex>=objs.picnum-1){
                lunboIndex=1;
                obj.style.transition = "none";
                obj.style.transform = "translateX(-" + (lunboIndex/objs.picnum*100) + "%)";
            }else if(lunboIndex<=0){
                lunboIndex=objs.picnum-2;
                obj.style.transition = "none";
                obj.style.transform = "translateX(-" + (lunboIndex/objs.picnum*100) + "%)";
            }
        })
        return obj;
    }
    return obj;
}
