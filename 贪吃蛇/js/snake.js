//小蛇的自调用函数
		(function(){

			//定义一个数组 存放小蛇
			var elements=[];

			// 小蛇的构造函数
			function Snake(width,height,direction){
				//每个部分的宽和高
				this.width=width||20;
				this.height=height||20;
				//小蛇的身体部分
				this.body=[
					{x:3,y:2,color:"red"},//小蛇的头部
					{x:2,y:2,color:"orange"},//小蛇的身体
					{x:1,y:2,color:"orange"}//小蛇的身体
				];
				//方向
				this.direction=direction||"right";
			}

			//通过原型添加方法，给小蛇添加初始化方法
			Snake.prototype.init=function(map){
				remove();
				//循环遍历
				for(var i=0;i<this.body.length;i++){
					//每一个数组元素都是一个对象
					var obj=this.body[i];
					//创建div 
					var div=document.createElement("div");
					//追加到map中
					map.appendChild(div);
					//设置div的样式
					div.style.position="absolute";
					div.style.width=this.width+"px";
					div.style.height=this.height+"px";
					//横纵坐标
					div.style.left=obj.x*this.width+"px";
					div.style.top=obj.y*this.height+"px";
					//背景颜色
					div.style.backgroundColor=obj.color;
					//方向暂定
					//把div追加到elements数组中  目的是为了删除
					elements.push(div);
				}
			};

			//通过原型添加move方法 
			Snake.prototype.move=function(food,map) {
				//小蛇的身体部分 把前一个的横纵坐标给下一个
				var i=this.body.length-1;
				//逆序循环
				for(;i>0;i--){
					this.body[i].x=this.body[i-1].x;
					this.body[i].y=this.body[i-1].y;
				}

				// 判断方向 改变小蛇的头部的坐标
				switch(this.direction){
					case "right":
					this.body[0].x+=1;
					break;
					case "left":
					this.body[0].x-=1;
					break;
					case "top":
					this.body[0].y-=1;
					break;
					case "bottom":
					this.body[0].y+=1;
					break;
				}

				//判断有没有吃到食物
				//小蛇的头的坐标和食物的坐标一致
				var headX=this.body[0].x*this.width;
				var headY=this.body[0].y*this.height;
				//判断小蛇的头部坐标和食物的坐标是否相同
				if(headX==food.x&&headY==food.y){
					//获取小蛇的最后的尾巴
					var last=this.body[this.body.length-1];
					//加入到数组中 以对象的方式加入
					this.body.push({
						x:last.x,
						y:last.y,
						color:last.color
					});
					//把食物删除 初始化食物
					food.init(map);
				}
			};

			//添加私有的删除函数
			function remove(){
				var i=elements.length-1;
				//逆序 找到这个元素的父元素 删除
				for(;i>=0;i--){
					var ele=elements[i];
					//从地图上删除元素
					ele.parentNode.removeChild(ele);
					//从数组中删除
					elements.splice(i,1);
				}
			}

			//把Snake暴露给window
			window.Snake=Snake;
		}());