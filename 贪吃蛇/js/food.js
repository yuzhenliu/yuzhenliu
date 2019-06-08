//食物的自调用函数
		(function(){

			//创建一个数组 来存放元素
			var elements=[];

			//食物就是一个对象 有宽 有高 有颜色 有横纵坐标 先有构造函数 然后创建对象
			function Food(width,height,color,x,y){
				//元素的宽和高 默认20
				this.width=width||20;
				this.height=height||20;
				//元素的颜色 默认绿色
				this.color=color||"green";
				//元素的横纵坐标 默认为0 
				this.x=x||0;
				this.y=y||0;
			}
			
			//为元素添加初始化的方法 最好放原型里 公用 在页面上显示 所以需要map
			Food.prototype.init=function(map) {
				//先删除食物
				//外部无法访问的函数
				remove();
				// 创建元素
				var div=document.createElement("div");
				// 把元素追加到map中
				map.appendChild(div);
				// 设置元素的样式 宽 高 颜色 
				div.style.width=this.width+"px";
				div.style.height=this.height+"px";
				div.style.backgroundColor=this.color;
				//先脱离文档流
				div.style.position="absolute";
				//横纵坐标随机产生的
				this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
				this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
				//元素的横纵坐标
				div.style.left=this.x+"px";
				div.style.top=this.y+"px";

				//把div元素追加到elements数组中
				elements.push(div);
			};	

			//私有的函数  删除食物的
			function remove(){
				//elements数组中有这个食物
				for(var i=0;i<elements.length;i++){
					var ele=elements[i];
					//找到这个食物的父级元素 从地图上删除食物
					ele.parentNode.removeChild(ele);
					//删除数组的div元素 在i处删除一项
					elements.splice(i,1);
				}
			}

			//把Food暴露给window
			window.Food=Food;
		}());