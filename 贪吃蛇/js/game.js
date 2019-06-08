//游戏的自调用函数
		(function(){

			var that=null;
			//游戏的构造函数
			function Game(map){
				this.food=new Food();//食物对象
				this.snake=new Snake();//小蛇对象
				this.map=map;//地图
				that=this;//保留当前的实例对象到that变量中 此时that 就是this
			}

			//游戏初始化
			Game.prototype.init=function(){
				//食物初始化
				this.food.init(this.map);
				//小蛇初始化
				this.snake.init(this.map);//先让小蛇显示
				//调用设置小蛇移动的方法
				this.runSnake(this.food,this.map);
				//调用按键的方法
				this.bindKey();
			};

			//添加原型函数 设置小蛇可以自由移动
			Game.prototype.runSnake=function(food,map){
				//此时的this是实例对象
				//setInterval 方法是通过window调用的 this指向改变了
				var timeId=setInterval(function(){
					this.snake.move(food,map);
					this.snake.init(map);
					//横坐标的最大值 map的属性在style标签中
					var maxX=map.offsetWidth/this.snake.width;
					//纵坐标的最大值
					var maxY=map.offsetHeight/this.snake.height;
					var headX=this.snake.body[0].x;
					var headY=this.snake.body[0].y;
					// 横坐标方向的检测
					if(headX<0||headX>=maxX){
						//撞墙了 停止定时器
						clearInterval(timeId);
						alert("游戏结束");
					}
					//纵坐标方向的检测
					if(headY<0||headY>=maxY){
						//撞墙了 停止定时器
						clearInterval(timeId);
						alert("游戏结束");
					}
				}.bind(that),200);//绑定到that中 即实例对象
			};

			//获取用户的按键 改变小蛇的方向
			Game.prototype.bindKey=function(){
				//这里的this 应该是触发keydown事件的对象  --document
				//所以这里的this就是document
				//获取用户的按键
				document.addEventListener("keydown",function(e){
					switch(e.keyCode){
						case 37: 
							this.snake.direction="left";
							break;
						case 38: 
							this.snake.direction="top";
							break;
						case 39: 
							this.snake.direction="right";
							break;
						case 40: 
							this.snake.direction="bottom";
							break;
					}
				}.bind(that),false);//绑定实例对象
			};

			//暴露给window
			window.Game=Game;
		}());