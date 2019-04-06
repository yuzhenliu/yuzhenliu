<?php

require_once 'config.php';
/**
*封装大家公用的函数
*获取当前用户信息 如果没有获取到则跳转到登录页面
*/

// 校验数据当前访问用户的 箱子（session）有没有登录的登录标识
session_start();


 // js里面是否定义：  typeof fn === 'function';
 // php 里面是否定义： function_exist('baixiu_get_current_user');
// 定义函数时一定要注意函数名与内置的1000多个函数冲突的问题 可以加前后缀
function baixiu_get_current_user() {
  if (empty($_SESSION['current_login_user'])) {
  // 没有当前登录用户信息，意味着没有登录
  header('Location: /admin/login.php');
  exit();//没有必要执行后面的
}
  return $_SESSION['current_login_user'];
}


//通过数据库查询获取数据  多条 索引数组套关联数组
function baixiu_fetch_all($sql){
  $conn = mysqli_connect(BAIXIU_DB_HOST,BAIXIU_DB_USER,BAIXIU_DB_PASSWORD,BAIXIU_DB_NAME);
  if(!$conn){
  	exit('连接失败');
  }
  $query = mysqli_query($conn,$sql);
  if(!$query){
  	//查询失败
	return false;
  }

  //查询成功
  while($row = mysqli_fetch_assoc($query)){
  	$result[] = $row;
  }
  

  mysqli_free_result($query);
  mysqli_close($conn);

  return $result;
 
}

//通过数据库查询获取数据  获取单条数据 直接就是关联数组
function baixiu_fetch_one($sql){
	$res = baixiu_fetch_all($sql);
	//先判断一下是否存在索引为0的值 三元表达式
	return isset($res[0]) ? $res[0] : null;
}
