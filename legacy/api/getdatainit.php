<?php 	
	header('Access-Control-Allow-Origin:*');
	include_once("connectdb.php");	
	$key	= @$_GET['dkey'];
	$pg		= @$_GET['page'];	
	
	$per_page = '5';	
	$page  	= (isset ($pg))  ? (int) $pg : 1 ;	
	$start 	= ($page - 1) *  $per_page; 
	
	$index 	= 0;	
	$data 	= array();
	$sql	= "SELECT * FROM travel_place WHERE tv_pl_name LIKE '%$key%' LIMIT $start , $per_page";	
	$query 	= $db->query($sql);
	while($row = $query->fetch()){
		$data[$index]['id'] 	= "$row[tv_pl_id]";
		$data[$index]['name'] 	= "$row[tv_pl_name]";
		$data[$index]['detail'] = "$row[tv_pl_detail]";
		$index++;		
	}	
	echo json_encode($data);	
	
	$db = null;
?>