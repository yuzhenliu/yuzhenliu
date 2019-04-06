<?php
header("content-type:text/html;charset=utf-8"); //设置编码
/**
*根据用户邮箱获取用户的头像 
*email =>头像地址
*/
require_once '../../config.php';
// 1.接收传递过来的邮箱
if(empty($_GET['email'])){
	exit('缺少必要参数');
}
$email = $_GET['email'];
// 2.找到对应邮箱的头像地址
$conn = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
if(!$conn){
	exit('连接数据库失败');
}
$query = mysqli_query($conn,"select avatar from users where email = '{$email}' limit 1;");
if(!$query){
	exit('查询失败');
}
$row = mysqli_fetch_assoc($query);

// 3.echo
echo $row['avatar'];

