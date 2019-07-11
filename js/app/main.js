var host = window.location.href + "/api/";
var listview_data = '';
var comment_data = '';
$('#loader').hide();

$(document).ready(() => {
	$.ajax({
		url: host+'api_tavel.php',
		async: false,
		type: 'GET',
		beforeSend: () => {
			$('#loader').show();
		},
		success: (result) => {
			var json = $.parseJSON(result);
			listview_data = [];
			$.each(json, (index, val) => {
				listview_data.push({id: val.id, name: val.name, detail: val.detail});
			});
			return result;
		},
		statusCode: {
			403: () => {
				alert('Contact you admin to open this route');
			},
			404: () => {
				alert('ERR: File not found');
			},
			405: () => {
				alert('ERR: You don\'t have access to this route');
			}
		},
		complete: () => {$('#loader').hide();}

	});
});

// The recommandation image slider
function F_RECOMMANDED(){
    $.ajax({					
		url 	: host+"api_tavel.php",
		async	: false,
		success : function(result){
		    var myjson = $.parseJSON(result);
            listview_data = "";
            $.each(myjson, function(index , val){							
				listview_data += "<a href='#content' data-transition='slidefade' onclick='F_TRAVELDETAIL("+val.id+"); F_COMMENT("+val.id+");'>"+
                "<img src='images/"+val.image+"' width='100%' data-plugin-slide-caption='<p>"+
                val.name+"</p>'></a>";
			});
		}					
	});				
	$('#slideshow').html("<div id='slider'>" + listview_data + "</div>");
	$(function () {
		$("#slider").excoloSlider();
	});	
}

// First section of application
function F_TRAVEL(){
	$.ajax({					
		url 	: host+"api_tavel.php",
		async	: false,
		success : function(result){
			var myjson = $.parseJSON(result);
			listview_data = "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>";
			$.each(myjson, function(index , val){							
				listview_data += "<li class='ui-li-has-thumb'><a href='#content' data-transition='slidefade' class="+
				"'ui-btn ui-btn-icon-right ui-icon-carat-r' data-transition='slidefade' onclick='F_TRAVELDETAIL("+
				val.id+"); F_COMMENT("+val.id+");'><img src='images/"+val.image+"' width='100%'>"+
				"<h2>"+val.name+"</h2><p id='btn-des'>"+val.detail+"</p></a></li>";
			});
			listview_data += "</ul>";
		}					
	});				
	$('#showpage').html(listview_data);
}				

// Search function
function F_TRAVELSEARCH(){
	$.ajax({
		data 	: $('#form').serialize(),
		type 	: "POST",
		url 	: host+"api_tavel_search.php",
		async	: false,
		success : function(result){
			var myjson = $.parseJSON(result);
			listview_data = "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>";
			$.each(myjson, function(index , val){							
				listview_data += "<li class='ui-li-has-thumb'><a href='#content' data-transition='slidefade' class="+
				"'ui-btn ui-btn-icon-right ui-icon-carat-r' data-transition='slidefade' onclick='F_TRAVELDETAIL("+
				val.id+"); F_COMMENT("+val.id+");'><img src='images/"+val.image+"' width='100%'>"+
				"<h2>"+val.name+"</h2><p id='btn-des'>"+val.detail+"</p></a></li>";
			});
			listview_data += "</ul>";						
		}					
	});				
	$('#showresult').html(listview_data);
}

function F_TRAVELDETAIL(p1){
	localStorage.setItem("dkey", p1);
	var tvObj 	= {"dkey":p1}
	var tvJSON = JSON.stringify(tvObj);
	var names	= '';
	$.ajax({
		type	: 'POST',
		data	: "data="+tvJSON,					
		url 	: host+"api_tavel_detail.php",
		async	: false,
		success : function(result){
			var myjson = $.parseJSON(result);						
			names = myjson.name;
			listview_data_detail = "";
			listview_data_detail +=	"<img src='images/"+myjson.image+"' width='100%'>"+
			"<div class='ui-body ui-body-a ui-corner-all'>"+
			"<h4>ข้อมูลเพิ่มเติม</h4>"+
			"<p>"+myjson.detail+"</p></div>"+
			"<div class='ui-grid-a'><div class='ui-block-a'>"+
			"<a href='' class='ui-shadow ui-btn ui-corner-all' onclick='F_GOMAPS(\""+myjson.latitude+"\", \""+myjson.longitude+"\", \""+myjson.name+"\");'>แผนที่</a></div>"+
			"<div class='ui-block-b'><a href='#comment' class='ui-shadow ui-btn ui-corner-all'>เขียนความคิดเห็น</a></div></div>";
		}					
	});
	$('#showcontent').html(listview_data_detail);
	$('#topic_form').hide();
	$('#location').html(names);
}

function F_COMMENT(p1) {
	var tvObj 	= {"dkey":p1}
	var tvJSON = JSON.stringify(tvObj);
	$.ajax({
		type	: 'POST',
		data	: "data="+tvJSON,					
		url 	: host+"api_comment_display.php",
		async	: false,
		success : function(result){
			var myjson = $.parseJSON(result);
			listview_data = "";
			$.each(myjson, function(index , val){
				listview_data += "<div class='ui-body ui-body-a ui-corner-all'>"+
				"<h4>"+val.name+"</h4><p>"+val.comment+"</p></div><br>";
			});
		}
	});
	$('#showcomment').html(listview_data);
}

function F_TRAVELCOMMENT() {
	var p1 = localStorage.getItem("dkey");
	var name = document.getElementById("name").value;
	var comment = document.getElementById("comment").value;
	var comObj = {"dkey":p1, "name":name, "comment":comment}
	var comJSON = JSON.stringify(comObj);
	$.ajax({
		data	: "data="+comJSON,
		type	: 'POST',
		url		: host+"api_comment.php",
		async	: false,
		success	: function (result) {
			var myjson = $.parseJSON(result);
		}
	});
}

function F_GORELOAD() {
	location.reload(); 
}

function F_GOMAPS(p1, p2, p3) {				
	localStorage.setItem("l_latitude", p1);
	localStorage.setItem("l_longitude", p2);
	localStorage.setItem("s_name", p3)
	window.location = "maps.html"; 
}