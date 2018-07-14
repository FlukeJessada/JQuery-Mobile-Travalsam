var host = "http://127.0.0.1/travel/api/";	
var collap_h = 	"<div data-role='collapsible' data-mini='true' class='ui-collapsible"+
" ui-collapsible-inset ui-corner-all ui-collapsible-themed-content ui-collapsible-collapsed'"+
" data-mini='true'>";
var listview_data = '';

// The recommandation image slider
function F_RECOMMANDED(){
    $.ajax({					
		url 	: host+"api_tavel.php",
		async	: false,
		success : function(result){
		    var myjson = $.parseJSON(result);
            listview_data = "";
            $.each(myjson, function(index , val){							
				listview_data += "<a href='#content' data-transition='slidefade' onclick='F_TRAVELDETAIL("+val.id+")'>"+
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
				val.id+")'><img src='images/"+val.image+"' width='100%'>"+
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
				val.id+")'><img src='images/"+val.image+"' width='100%'>"+
				"<h2>"+val.name+"</h2></a></li>";
			});
			listview_data += "</ul>";						
		}					
	});				
	$('#showpage').html(listview_data);
}

function F_TRAVELDETAIL(p1){				
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
			"<div class='ui-grid-solo'><div class='ui-block-a'><div>"+
			"<h4>ข้อมูลเพิ่มเติม</h4>"+
			"<p>"+myjson.detail+"</p></div></div>"+
			"<div class='ui-grid-a'><div class='ui-block-a'>"+
			"<a href='#map' class='ui-shadow ui-btn ui-corner-all' onclick='F_GOMAPS(\""+myjson.latitude+"\", \""+myjson.longitude+"\");'>Streetview</a></div>"+
			"<div class='ui-block-b'><a class='ui-shadow ui-btn ui-corner-all'>นำทาง</a></div></div></div>";
		}					
	});

	$('#showcontent').html(listview_data_detail);
	$('#topic_form').hide();
	$('#form').hide();
	$('#location').html(names);
}
			
function F_GORELOAD() {						
	location.reload(); 
}

function F_GOMAPS(l1, l2) {
	var latitude = l1;
	var longitude = l2;
	var mapOptions = {
		scaleControl: true,
		center		: new google.maps.LatLng(latitude, longitude),
		zoom		: 18
	};

	var map 	= new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var marker 	= new google.maps.Marker(
		{
			map		: map,
			position: map.getCenter()
		}
	);
	var infowindow = new google.maps.InfoWindow();
	infowindow.setContent('<b>ประเทศไทย</b>');
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
}