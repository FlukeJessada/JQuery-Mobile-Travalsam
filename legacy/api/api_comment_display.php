<?php 
	header('Access-Control-Allow-Origin:*');
	include_once("connectdb.php");	
	$obj 	= json_decode(@$_POST["data"], true);
    $key	= $obj['dkey'];

    $per_page = '5';	
	$page  	= (isset ($pg))  ? (int) $pg : 1 ;	
	$start 	= ($page - 1) *  $per_page; 
	
	$index 	= 0;	
    $data 	= array();
    $sql	= "SELECT * FROM comment WHERE place LIKE '%$key%' LIMIT $start , $per_page";	
    $query 	= $db->query($sql);
    while($row = $query->fetch()){		
		$data[$index]['id'] 		= "$row[id]";		
		$data[$index]['place'] 		= "$row[place]";		
		$data[$index]['name'] 		= "$row[name]";							
		$data[$index]['comment'] 	= "$row[comment]";							
		$index++;		
	}	
    echo json_encode($data);	
	
    include_once("disconnectdb.php");
?>