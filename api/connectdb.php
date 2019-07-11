<?php
	$p		= "host=localhost:3366;dbname=travelsam-app";
	$dbtype	= "mysql:".$p;

	try {
		$db	= new PDO($dbtype, "root", "") or die("Can not connect");
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
		echo "Connect to database failed due to: "+$e.getMessage();
		echo "Please contact your System Admin for more info";
	}
	
?>