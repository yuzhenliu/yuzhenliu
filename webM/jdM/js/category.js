window.onload = function () {
	// 区域滚动效果
	// 条件: 一个容器装着一个容器 html 结构
	// 找到大容器
	// 子容器大于父容器
	new IScroll(document.querySelector('.jd_cateLeft'), {
		scrollX: false,
		scrollY: true
	})
	new IScroll(document.querySelector('.jd_cateRight'), {
		scrollX: false,
		scrollY: true
	})
}