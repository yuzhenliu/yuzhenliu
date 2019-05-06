window.onload = function () {

	// 1. 搜索部分
	search()

	// 2. 轮播图
	banner()

	// 3. 倒计时
	downTime()

}

// 1. 搜索部分
var search = function () {

	// 1. 默认固定顶部透明背景
	var searchBox = document.querySelector('.jd_search_box')
	// 这里我忘记了 . 结果 console.log(banner) 是 null
	var banner = document.querySelector('.jd_banner')
	var height = banner.offsetHeight

	// 监听页面滚动事件
	window.onscroll = function () {
		// var scrollTop = document.body.scrollTop
		var scrollTop = document.documentElement.scrollTop
		// console.log(scrollTop)
		// 默认的 opacity 值
		var opacity = 0
		// scrollTop 跟 height 对比
		if (scrollTop < height) {
			// 2. 当页面滚动的时候 --- 随着页面卷曲的高度变大透明度变大
			opacity = scrollTop / height * 0.85
		}else {
			// 3. 当页面滚动的时候 --- 超过某一个高度的时候透明度不变
			opacity = 0.85
		}
		searchBox.style.background = 'rgba(201, 21, 35, '+opacity+')'
	}
}

// 2. 轮播图
var banner = function () {
	// 1. 自动轮播图无缝  定时器 + 过渡
	// 2. 点要随着图片的轮播改变  根据索引切换
	// 3. 滑动效果	利用 touch 事件完成
	// 4. 滑动结束的时候	 如果滑动的距离不超过屏幕的 1/3 吸附回去
	// 5. 滑动结束的时候  如果滑动的距离超过屏幕的 1/3 切换(上一张, 下一张) 根据滑动的方向 过渡


	// 轮播图
	var banner = document.querySelector('.jd_banner')
	// 屏幕宽度
	var width = banner.offsetWidth
	// 图片容器
	var imageBox = banner.querySelector('ul:first-child')
	// 点容器
	var pointBox = banner.querySelector('ul:last-child')
	// 所有的点
	var points = pointBox.querySelectorAll('li')

	// 加过渡
	var addTransition = function () {
		imageBox.style.transition = 'all 0.2s'
		imageBox.style.webkitTransition = 'all 0.2s'
	}

	// 清除过渡
	var removeTransition = function () {
		imageBox.style.transition = 'none'
		imageBox.style.webkitTransition = 'none'
	}

	// 做位移
	var setTranslateX = function (translateX) {
		imageBox.style.transform = 'translateX('+translateX+'px)'
		imageBox.style.webkitTransform = 'translateX('+translateX+'px)'
	}

	// 程序的核心 index
	var index = 1
	var timer = setInterval(function () {
		// 这句我当时忘了 结果 index 一直都是 1
		index ++
		// 加过渡
		addTransition()
		// 做位移
		setTranslateX(-index * width)
		
		// console.log(index)	
		}, 1000)
		// console.log(index)

	// 需要等最后一张动画结束去判断 是否瞬间定位第一张
	// 在这里的 transitionend 我少写了个 n 结果根本就不会进入这个函数
	imageBox.addEventListener('transitionend', function () {
		// 自动滚动无缝
		// console.log('1')
		if (index >= 9) {
			// 瞬间定位
			index = 1
			// 清除过渡
			removeTransition()
			// 做位移
			setTranslateX(-index * width)
		}

		// 滑动的时候也需要无缝
		else if (index <= 0) {
			index = 8
			// 瞬间定位
			// 清除过渡
			removeTransition()
			// 做位移
			setTranslateX(-index * width)
		}
			// 在这里调用 setPoint 方法 就可以不用再考虑 0 9
			setPoint()
	})

	// 让点跟着图片切换
	var setPoint = function () {
		// index 1 - 8			0,8 / 1,9 一样
		// points 是个伪数组 不能使用 foreach 方法
		// 清除样式
		for (var i = 0; i < points.length; i ++) {
			// 用 h5c3 的方法
			points[i].classList.remove('now')
		}

		// 给当前元素加上 now 样式
		points[index - 1].classList.add('now')
	}

	// 绑定事件
	var startX = 0
	var distanceX = 0
	var isMove = false
	imageBox.addEventListener('touchstart', function (e) {
		
		// 清除定时器
		// 这里当时有一个错误: 我写成了 'timer' 结果没有报错但是效果错了
		clearInterval(timer)
		// 记录起始位置的 x 坐标
		startX = e.touches[0].clientX
		// console.log(startX)
	})
	imageBox.addEventListener('touchmove', function (e) {
		// 记录滑动过程当中的 X 坐标
		var moveX = e.touches[0].clientX
		// console.log(moveX)
		// 计算位移  有正负方向
		distanceX = moveX - startX
		// console.log(distanceX)
		// 计算目标元素的位移  不用管正负
		// 元素将要的定位 = 当前定位 + 手指移动的距离 
		var translateX = -index * width + distanceX
		// 滑动 ---> 元素随着手指的滑动做位置的改变
		removeTransition()
		setTranslateX(translateX)
		isMove = true
	})
	imageBox.addEventListener('touchend', function (e) {
		// 确保一定是滑动过的
		if (isMove) {
				// 4, 5	实现
			// 要使用移动的距离
			if (Math.abs(distanceX) < width / 3) {
				// 吸附回去
				addTransition()
				setTranslateX(-index * width)
			}else {
				// 切换
				// 往右滑动 上一张	 > 0
				if (distanceX > 0) {
					// console.log('上一张')
					index --
				}else {
					// 往左滑动 下一张
					// console.log('下一张')
					index ++
				}
				// 设置位移
				addTransition()
				setTranslateX(-index * width)
			}
		}
	
		// 最好做一次参数的重置
		distanceX = 0
		startX = 0
		isMove = false
		// 加上定时器  加之前做好再清除一遍
		clearInterval(timer)
		timer = setInterval(function () {
		// 这句我当时忘了 结果 index 一直都是 1
		index ++
		// 加过渡
		addTransition()
		// 做位移
		setTranslateX(-index * width)
		
		// console.log(index)	
		}, 1000)
		// console.log(index)
	})
}

// 3. 倒计时
var downTime = function () {
	// 倒计时的时间
	var time = 2 * 60 * 60

	// 显示时间的 span (时间盒子)
	var spans = document.querySelector('.time').querySelectorAll('span')

	// 每一秒去  更新显示的时间
	var timer = setInterval(function () {
		time --
			// 时间 格式 时 分 秒
		var h = Math.floor(time / 3600)
		var m = Math.floor(time % 3600 / 60)
		var s = Math.floor(time % 60)

		spans[0].innerHTML = Math.floor(h / 10)
		spans[1].innerHTML = h % 10

		spans[3].innerHTML = Math.floor(m / 10)
		spans[4].innerHTML = m % 10

		spans[6].innerHTML = Math.floor(s / 10)
		spans[7].innerHTML = s % 10

		if (time <= 0) {
			clearInterval(timer)
		}

	}, 1000)
	
}

