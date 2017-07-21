  //登陆弹框
   var signIn = {               
           init:function(){  
             var me = this;
             me.render();
             me.bind();
           },
           render:function(){
             var me = this;
             me.box = $('#b');
             me.deng = $('.deng');
             me.screen = $('.screen');
             me.close = $('.close');
             me.a = $('.deng').find('a');
           },
           bind:function(){
             var me = this;
             me.a.click(function(){
			  	me.screen.lock();
			  	me.box.show();
			 })
			 me.close.click(function(){
			  	me.screen.unlock();
			  	me.box.hide();
			 })
			 me.box.center(400,300);
		     me.box.resize(function(){
		   	    me.box.center(400,300);
		     });
		     me.box.drag();
           },
   }
   signIn.init(); 
   // 悬浮导航
   var floatSearch = {              
           init:function(){  
             var me = this;
             me.render();
             me.bind();
           },
           render:function(){
             var me = this;
             me.content = $('.md-row-1l-cotent');
             me.search = $('.float-search');
           },
           bind:function(){
           	   var me = this;
	           window.onscroll = function(){
			   	         if(docScrollTop()>me.content.offsetTop()){
				   	  	     me.search.animate({
				   	  	   	    type:'1',
				   	  	   	    attr:'y',
				   	  	   	    target:'0',
				   	  	   	    t:'40',
				   	  	   	    step:'10'
				   	  	     });
			   	         }else(
			   	  	         me.search.animate({
				   	  	   	     type:'1',
				   	  	   	     attr:'y',
				   	  	   	     target:'-50',
				   	  	   	     t:'20',
				   	  	   	     step:'30'
			   	  	         })
			   	         )
                }
           },
   }
   floatSearch.init(); 

   // 主题产品二级菜单
   var daoMenu = {               
           init:function(){  
             var me = this;
             me.render();
             me.bind();
           },
           render:function(){
             var me = this;
             me.li = $('.dao').find('li');
             me.menu = $('.dao-menu');
           },
           bind:function(){
               var me = this;
               me.li.hover(function(){
			   	    var index = $(this).index();
			   	    me.menu.show();
			   	    $('.dao-menu').find('div').hide();
			   	    $('.dao-menu').find('div').eq(index).show();
			   },function(){
			   	    me.menu.hide();
			   })
			   me.menu.hover(function(){
			   	    $(this).show();
			   },function(){
			   	    $(this).hide();
			   })
           },
   }
   daoMenu.init(); 