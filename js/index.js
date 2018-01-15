//获取元素css属性值
function getStyle(ele,attr){
    if(ele.style[attr]) return ele.style[attr];
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele,null)[attr];
    }
}
//缓冲动画函数
function animal(obj,attr,val,mode,s){
    clearInterval(obj.timer);
    var speed = 0;
    var p = 0;
    obj.timer = setInterval(function(){
        p = parseInt(getStyle(obj,attr));
        speed = mode?Math.ceil((val - p)/s):Math.floor((val-p)/s);
        p+=speed;
        obj.style[attr] = p + "px";
        if(speed == 0){
            clearInterval(obj.timer);
            return;
        }
    },20);
}
//改变透明度函数
function setOpacity(ele,val,fn){
    clearInterval(ele.timer);
    var v = 30*val;
    var cv = parseFloat(getStyle(ele,"opacity")) * 30;
    if(v == cv) return;
    var x = v - cv;
    ele.timer = setInterval(function(){
        x>0?cv++:cv--;
        ele.style.opacity = cv/30;
        if(cv == v){
            if(fn) fn();
            clearInterval(ele.timer);
            return;
        }
    },20);
}
var searchShow = false;

window.onload = function(){
    function seti(){
        var curr = document.getElementsByClassName("curr")[0];
        var curra = curr.getElementsByTagName("a")[0];
        var w = parseInt(curra.offsetWidth) - 2*parseInt(getStyle(curra,"paddingLeft"));
        var i = curr.getElementsByTagName("i")[0];
        animal(i,"width",w,true,10);
    }
    seti();
    var ul = document.getElementById("menu");
    var lis = ul.getElementsByTagName("li");
    for(var i=0;i<lis.length;i++){
        lis[i].onclick = function(){
            for(var j=0;j<lis.length;j++){
                lis[j].className = "";
                lis[j].getElementsByTagName("i")[0].style = null;
            }
            this.className = "curr";
            seti();
        }
    }
    var s = document.getElementById("s_img");
    s.onclick = function(e){
        e = event||window.event;
        if(searchShow){
            //执行搜索函数...
        }else{
            animal(s,"width",256,true,10);
            searchShow = true;
        }
        if(e && e.stopPropagation){
            //W3C取消冒泡事件
            e.stopPropagation();
        }else{
            //IE取消冒泡事件
            window.event.cancelBubble = true;
        }
    }
    document.body.onclick = function(){
        document.getElementById("s_ipt").value = "";
        animal(s,"width",62,false,10);
        searchShow = false;
    }
    //侧边菜单按钮绑定事件
    var sideMenu = document.getElementById("side_menu");
    var sideWrap = document.getElementById("side_wrap");
    var side = document.getElementById("side");
    sideMenu.onclick = function(){
        sideWrap.style.display = "block";
        setOpacity(sideWrap,0.6);
        animal(side,"right",0,true,6);
    }
    sideWrap.onclick = function(){
        animal(side,"right",-445,false,6);
        setOpacity(sideWrap,0,function(){sideWrap.style.display = "none";});
    }

    var likes = document.getElementsByClassName("like");
    for(i = 0;i<likes.length;i++){
        likes[i].onclick = function(){
            this.style.background = "url(./asset/images/liked.png) no-repeat 0 center";
        }
    }

}
