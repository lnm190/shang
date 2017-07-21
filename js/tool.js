    // 获取浏览器宽高兼容封装
	function getInner(){
		if(typeof window.innerWidth!='undefined'){
			return{
				width:window.innerWidth,
				height:window.innerHeight
			}
		}else{
			return {
				width:document.documentElement.clientWidth,
				height:document.documentElement.clientHeight
			}
		}
	} 
    // 获取行内和非行内style的兼容封装,得出来的css样式为：..px
	function getStyle(element,attr){   
		if(typeof window.getComputedStyle!='undefined'){
				return window.getComputedStyle(element,null)[attr];
		}else if(typeof element.currentStyle!='undefined'){
				return element.currentStyle[attr];
		}
	}
	function getScroll(){
		return {
			top:document.documentElement.scrollTop || document.body.scrollTop,
			left:document.documentElement.scrollLeft || document.body.scrollLeft
		}
	}
	function getInnerText(element){
		return (typeof element.textContent == 'string')?element.textContent:element.innerText;
	}
	function setInnerText(element,text){
		if(typeof element.textContent == 'string'){
			element.textContent = text;
		}else{
			element.innerText = text;
		}
	}
	function hasClass(element,className){
		return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
	}
	function inArray(array,value){
		for(var i in array){
			if(array[i] == value) return true;
		}
		return false;
	}
	function insertRule(sheet,selectorText,cssText,position){
		if(typeof sheet.insertRule!='undefined'){
			sheet.insertRule(selectorText+'{'+cssText+'}',position);
		}else if(typeof sheet.addRule!='undefined'){
			sheet.addRule(selectorText,cssText,position);
		}
	}
	function deleteRule(sheet,index){
		if(typeof sheet.deleteRule!='undefined'){
			sheet.deleteRule(index);
		}else if(typeof sheet.removeRule!='undefined'){
			sheet.removeRule(index);
		}
	}
	function scrollTop(str){
		document.documentElement.scrollTop = str;
		document.body.scrollTop = str;
	}
	function docScrollTop(){
		return document.documentElement.scrollTop || document.body.scrollTop;
	} 
	function offsetTop(element){
		var top = element.offsetTop;
		var parent = element.offsetParent;
		while(parent!=null){
			top+=parent.offsetTop;
			parent = parent.offsetParent;
		}
		return top;
	}
	function getEvent(event){
		return event || window.event;
	}
	function preDef(event){
		var e = getEvent(event);
		if(typeof e.preventDefault!='undefined'){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	}
	function addEvent(obj,type,fn){
		if(typeof obj.addEventListener!='undefined'){
			obj.addEventListener(type,fn,false);
		}else if(typeof obj.attachEvent!='undefined'){
			obj.attachEvent('on'+type,fn);
		}
	}
	function removeEvent(obj,type,fn){
		if(typeof obj.removeEventListener!='undefined'){
			obj.removeEventListener(type,fn,false);
		}else if(typeof obj.detachEvent!='undefined'){
			obj.detachEvent('on'+type,fn);
		}
	}
	function trim(str){
		return str.replace(/(^\s*)|(\s*$)/g,'');
	}
	function target(e){
		return e.target || e.srcElement;
	}