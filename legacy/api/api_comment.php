<?php 	
	header('Access-Control-Allow-Origin:*');
    include_once("connectdb.php");
    $obj 	= json_decode(@$_POST["data"], true);
    $key	= $obj['dkey'];
    $name	= $obj['name'];
    $comment	= $obj['comment'];

    $data 	= array();
    $sql	= "INSERT INTO 'comment' ('place', 'name', 'comment') VALUES ('$key', '$name', '$comment')";	
    $db->exec($sql);

    include_once("disconnectdb.php");
?>