	var $ = function(args){
		return new Base(args);
	};
	function Base(args){
		this.elements = [];
		if(typeof args == 'string'){
			switch(args.charAt(0)){
				case '#':this.getid(args.substring(1));
				   break;
				case '.':this.getClass(args.substring(1));
				   break;
				default:
				   this.getTagName(args);
			}
		}else if(typeof args == 'object'){
			if(args!=undefined){
				this.elements[0] = args;
			}
		}
	};
	Base.prototype.getid = function(id){
		this.elements.push(document.getElementById(id));
		return this;
	};
	Base.prototype.getTagName = function(tag){
		var tags = document.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			this.elements.push(tags[i]);
		}
		return this;
	};
	Base.prototype.getClass = function(className,idName){
		var node = null;
		if(arguments.length == 2){
			node = document.getElementById(idName);
		}else{
			node = document;
		}
		var all = node.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
			// if(all[i].className == className){
			if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
				this.elements.push(all[i]);
			}
		}
		return this;
	};
	Base.prototype.find = function(str){
		var childElement = [];
		for(var i=0;i<this.elements.length;i++){
			switch(str.charAt(0)){
				case '#':
				    childElement.push(document.getElementById(str.substring(1)));
				    break;
				case '.':
				    var all = this.elements[i].getElementsByTagName('*');
				    for(var j=0;j<all.length;j++){
				    	if(all[j].className == str.substring(1)){
				    		childElement.push(all[j]);
				    	}
				    }
				    break;
				default:
				    var tags = this.elements[i].getElementsByTagName(str);
				    for(var j=0;j<tags.length;j++){
				    	childElement.push(tags[j]);
				    }
			}
		}
		this.elements = childElement;
		return this;
	};
	Base.prototype.getElement = function(num){
		return this.elements[num];
	};
	Base.prototype.first = function(){
		return this.elements[0];
	};
	Base.prototype.last = function(){
		return this.elements[this.elements.length-1];
	};
	Base.prototype.eq = function(num){
		var element = this.elements[num];
		this.elements = [];
		this.elements[0] = element;
		return this;
	};
	Base.prototype.next = function(){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i] = this.elements[i].nextSibling;
			if(this.elements[i] == null) throw new Error('cant find next node');
			if(this.elements[i].nodeType == 3) this.next();
		}
		return this;
	};
	Base.prototype.prev = function(){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i] = this.elements[i].previousSibling;
			if(this.elements[i] == null) throw new Error('cant find prev node');
			if(this.elements[i].nodeType == 3) this.prev();
		}
		return this;
	};
	Base.prototype.addClass = function(className){
		for(var i=0;i<this.elements.length;i++){
			if(!hasClass(this.elements[i],className)){
			   this.elements[i].className +=' '+className;				
			}
		}
		return this;
	};
	Base.prototype.removeClass = function(className){
		for(var i=0;i<this.elements.length;i++){
			if(hasClass(this.elements[i],className)){
			   this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');				
			}
		}
		return this;
	};
	Base.prototype.addRule = function(num,selectorText,cssText,position){
		var sheet = document.styleSheets[num];
		insertRule(sheet,selectorText,cssText,position);
		return this;
	};
	Base.prototype.removeRule = function(num,index){
		var sheet = document.styleSheets[num];
		deleteRule(sheet,index);
		return this;
	};
	Base.prototype.form = function(name){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i] = this.elements[i][name]
		}
		return this;
	};
	Base.prototype.val = function(str){
		for(var i=0;i<this.elements.length;i++){
			if(arguments.length == 0){
				return this.elements[i].value;
			}
			this.elements[i].value = str;
		}
		return this;
	};
	Base.prototype.length = function(){
		return this.elements.length;
	}
	Base.prototype.index = function(){
		var children = this.elements[0].parentNode.children;
		for(var i=0;i<children.length;i++){
			if(children[i] == this.elements[0]){
				return i;
			}
		}
	}
	Base.prototype.show = function(){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style.display = 'block';
		}
		return this;
	};
	Base.prototype.hide = function(){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style.display = 'none';
		}
		return this;		
	};
	Base.prototype.center = function(width,height){
		var top = (document.documentElement.clientHeight-height)/2;
		var left = (document.documentElement.clientWidth-width)/2;
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style.top = top+'px';
			this.elements[i].style.left = left+'px';
		}
		return this;
	};
	Base.prototype.resize = function(fn){
		for(var i=0;i<this.elements.length;i++){
			var element = this.elements[i];
			window.onresize = function(){
				fn();
				if(element.offsetLeft>getInner().width - element.offsetWidth){
					element.style.left = getInner().width - element.offsetWidth+'px';
				}
				if(element.offsetTop>getInner().height - element.offsetHeight){
					element.style.top = getInner().height - element.offsetHeight+'px';
				}
			}
			// addEvent(window,'resize',function(){
			// 	fn();
			// 	if(element.offsetLeft>getInner().width - element.offsetWidth){
			// 		element.style.left = getInner().width - element.offsetWidth+'px';
			// 	}
			// 	if(element.offsetTop>getInner().height - element.offsetHeight){
			// 		element.style.top = getInner().height - element.offsetHeight+'px';
			// 	}				
			// })
		}
		return this;
	};
	Base.prototype.css = function(attr,value){
		for(var i=0;i<this.elements.length;i++){
			if(arguments.length == 1){
				return getStyle(this.elements[i],attr);
			}
			this.elements[i].style[attr] = value;
		}
		return this;
	};
	Base.prototype.html = function(str){
		for(var i=0;i<this.elements.length;i++){
			if(arguments.length == 0){
				return this.elements[i].innerHTML;
			}
			this.elements[i].innerHTML = str;
		}
		return this;
	};
	Base.prototype.text = function(str){
		for(var i=0;i<this.elements.length;i++){
			if(arguments.length == 0){
				// return this.elements[i].innerHTML;
				return getInnerText(this.elements[i]);
			}
			// this.elements[i].innerHTML = str;
			setInnerText(this.elements[i],str)
		}
		return this;
	}
	Base.prototype.offsetTop = function(){
		return offsetTop(this.elements[0]);
	};
	Base.prototype.attr=function(attr,value){
		for(var i=0;i<this.elements.length;i++){
			if(arguments.length == 1){
				return this.elements[i].getAttribute(attr);
			}else if(arguments.length == 2){
				this.elements[i].setAttribute(attr,value);
			}
		}
		return this;
    };
    Base.prototype.opacity = function(num){
    	for(var i=0;i<this.elements.length;i++){
    		this.elements[i].style.opacity = num/100;
    		this.elements[i].style.filter = 'alpha(opacity='+num+')';
    	}
    	return this;
    }
    Base.prototype.trim = function(str){
    	return str.replace(/(^\s*)|(\s*$)/g,'');
    }
	Base.prototype.click = function(fn){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].onclick = fn;
		}
		return this;
	};
	Base.prototype.bind = function(event,fn){
		for(var i=0;i<this.elements.length;i++){
			addEvent(this.elements[i],event,fn);
		}
		return this;
	}
	Base.prototype.hover = function(over,out){
		for(var i=0;i<this.elements.length;i++){
			// this.elements[i].onmouseover = over;
			// this.elements[i].onmouseout = out;
			addEvent(this.elements[i],'mouseover',over);
			addEvent(this.elements[i],'mouseout',out);
		}
		return this;
	};
	Base.prototype.toggle = function(){
		for(var i=0;i<this.elements.length;i++){
			(function(element,args){
				var count = 0;
				addEvent(element,'click',function(){
					args[count++ % args.length].call(this); //让参数在this的作用域下执行
				});
			})(this.elements[i],arguments);
		}
		return this;
		// args[count++](); //能够直接执行toggle里的函数
		// count%=args.length;
		// if(count>=args.length) count=0;
	};
	Base.prototype.lock = function(){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style.width = getInner().width+'px';
			this.elements[i].style.height = getInner().height+'px';
			this.elements[i].style.display = 'block';
			document.documentElement.style.overflow = 'hidden';
		}
		return this;
	};
	Base.prototype.unlock = function(){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style.display = 'none';
			document.documentElement.style.overflow = 'auto';
		}
		return this;
	};
	Base.prototype.drag = function(){
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].onmousedown = function(e){
				var e = getEvent(event);
				var _this = this;
				var diffX = e.clientX-_this.offsetLeft;
				var diffY = e.clientY-_this.offsetTop;
			    if(target(e).tagName == 'H3'){
				    preDef(event);
			    	document.onmousemove = move;
			    	document.onmouseup = up;
			    }else{
			    	document.onmousemove = null;
			    	document.onmouseup = null;
			    }
				function move(e){ 
					var e = getEvent(event);
					var left = e.clientX-diffX;
					var top = e.clientY-diffY;
					if(left<0){
						left = 0;
					}else if(left>getInner().width-_this.offsetWidth){
						left = getInner().width-_this.offsetWidth;
					}
					if(top<0){
						top = 0;
					}else if(top>getInner().height-_this.offsetHeight){
						top = getInner().height-_this.offsetHeight;
					}
					_this.style.left = left+'px';
					_this.style.top = top+'px';			
					if(typeof _this.setCapture!='undefined'){
						_this.setCapture();
					}		
				}
				function up(){
			    	document.onmousemove = null;
			    	document.onmouseup = null;
					if(typeof _this.releaseCapture!='undefined'){
						_this.releaseCapture();
					}
				}
			};
		}
		return this;
	};
	Base.prototype.animate = function(obj){
		for(var i=0;i<this.elements.length;i++){
			var element = this.elements[i];
			// var attr = obj['attr']!=undefined?obj['attr']:'left';
			var attr = obj['attr'] == 'x'?'left':obj['attr'] == 'y'?'top':
			           obj['attr'] == 'w'?'width':obj['attr'] == 'h'?'height':
			           obj['attr'] == 'o'?'opacity':obj['attr']!=undefined?obj['attr']:'left'; 
			var start = obj['start']!=undefined?obj['start']:
			            attr == 'opacity'?parseFloat(getStyle(element,attr))*100:
			                              parseInt(getStyle(element,attr));
			var t = obj['t']!=undefined?obj['t']:50;
			var step = obj['step']!=undefined?obj['step']:10;
			var target = obj['target']; 
			var alter = obj['alter'];
			// var target = obj['target']+parseInt(getStyle(element,attr)); //增加的量
			var speed = obj['speed']!=undefined?obj['speed']:6;
			var type = obj['type']==0?'contant':obj['type'] == 1?'buffer':'contant';
			if(alter!=undefined && target==undefined){
				target = alter + start;
			}else if(alter == undefined&&target == undefined){
				throw new Error('alter or target must one!');
			}
			if(parseInt(getStyle(element,attr))>target)step = -step;
			if(attr == 'opacity'){
				element.style.opacity = parseInt(start)/100;
				element.style.filter = 'alpha(opacity='+start+')';
			}else{
				element.style[attr] = start + 'px';
			}
			clearInterval(window.timer);  //相当于全局变量，作成插件就无所谓全局变量
			timer = setInterval(function(){
				if(type == 'buffer'){
					step = Math.ceil((target - parseInt(getStyle(element,attr)))/speed);
				}
				if(attr == 'opacity'){
					if(step == 0){
						setOpacity();
					}
					if(step>0 && Math.abs(parseFloat(getStyle(element,attr))*100-target)<=step){
						setOpacity();
					}else if(step<0 && (parseFloat(getStyle(element,attr))-target)*100<=-step){
						setOpacity();
					}else{
						var temp = parseFloat(getStyle(element,attr))*100;
						element.style.opacity = parseInt(temp + step)/100;
						element.style.filter = 'alpha(opacity='+parseInt(temp + step)+')';						
					}					
				}else{
					if(step == 0){
						setTarget()
					}
					if(step>0 && Math.abs(parseInt(getStyle(element,attr))-target)<=step){
						setTarget()
					}else if(step<0 && (parseInt(getStyle(element,attr))-target)<=-step){
						setTarget()
					}else{
					    element.style[attr] = parseInt(getStyle(element,attr))+step+'px';
					}					
				}
			},t)
			function setTarget(){
					element.style[attr] = target + 'px';
					clearInterval(timer);
					if(obj.fn!=undefined)obj.fn();									
			}
			function setOpacity(){
				    element.style.opacity = parseInt(target)/100;
				    element.style.filter = 'alpha(opacity='+parseInt(target)+')';
				    clearInterval(timer);
				    if(obj.fn!=undefined)obj.fn();
			}
		}
		return this;
		// $('.c').animate({
		// 	'attr':'x',
		// 	// 't':'90',
		// 	'type':1,
		// 	// 'start':200,
		// 	'step':0,
		// 	'alter':200,
		// 	// 'target':200,
		// 	'speed':10
		// });
	};
	Base.prototype.extend = function(name,fn){
		Base.prototype[name] = fn;
	};