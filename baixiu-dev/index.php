<?php
 
 //设置编码
 header("content-type:text/html;charset:utf-8");
 // 有define定义的常量 只能用require_once 否则后面会报错
 require_once 'config.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h1>前台页面</h1>

	<p><?php echo DB_USER ?></p>
</body>
</html>

