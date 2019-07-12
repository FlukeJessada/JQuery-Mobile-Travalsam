<?php 
	header('Access-Control-Allow-Origin:*');
	include_once("connectdb.php");	
	$obj 	= json_decode(@$_POST["data"], true);
	$key	= $obj['dkey'];

	$data 	= array();
	$sql	= "SELECT * FROM locationtb WHERE id = '$key' LIMIT 0, 1";	
	$query 	= $db->query($sql);
	$row 	= $query->fetch();	
	$data['id'] 		= "$row[id]";		
	$data['name'] 		= "$row[name]";		
	$data['image'] 		= "$row[image]";							
	$data['detail'] 	= "$row[detail]";							
	$data['latitude'] 	= "$row[latitude]";							
	$data['longitude'] 	= "$row[longitude]";
		
	echo json_encode($data);	
	
	include_once("disconnectdb.php");
?>