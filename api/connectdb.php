<?php
	$p 		= "C:/WinNMP/WWW/travel/api/db/PLACEDB.sqlite";
	$sqlite = "sqlite:".$p;
	$db 	= new PDO($sqlite) or die("Can not connect");
?>