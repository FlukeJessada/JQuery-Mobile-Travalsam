<?php 	
	header('Access-Control-Allow-Origin:*');
	include_once("connectdb.php");	
	$key	= @$_POST['dkey'];	
	
	$per_page = '5';	
	$page  	= (isset ($pg))  ? (int) $pg : 1 ;	
	$start 	= ($page - 1) *  $per_page; 
	
	$index 	= 0;	
	$data 	= array();
	$sql	= "SELECT * FROM locationtb WHERE name LIKE '%$key%' LIMIT $start , $per_page";	
	$query 	= $db->query($sql);
	while($row = $query->fetch()){		
		$data[$index]['id'] 		= "$row[id]";		
		$data[$index]['name'] 		= "$row[name]";		
		$data[$index]['image'] 		= "$row[image]";							
		$data[$index]['detail'] 	= "$row[detail]";							
		$data[$index]['latitude'] 	= "$row[latitude]";							
		$data[$index]['longitude'] 	= "$row[longitude]";
		$index++;		
	}	
	echo json_encode($data);	
	
	include_once("disconnectdb.php");
?>