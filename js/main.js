var host = "http://127.0.0.1/travel/api/";	
var btn_back = 	"<a href='' class='ui-btn-left ui-btn ui-btn-b ui-btn-inline "+
				"ui-mini ui-corner-all ui-btn-icon-notext ui-icon-carat-l' onclick='F_GORELOAD()'>back</a>";
var listview_data = '';

// The recommandation image slider
$(function F_RECOMMANDED(){
    $.ajax({					
		url 	: host+"api_tavel.php",
		async	: false,
		success : function(result){
		    var myjson = $.parseJSON(result);
            listview_data = "";
            $.each(myjson, function(index , val){							
				listview_data += "<a href='' onclick='F_TRAVELDETAIL("+val.id+")'>"+
                "<img src='images/"+val.image+"' width='100%' data-plugin-slide-caption='<p>"+
                val.name+"</p>'></a>";
			});
		}					
	});				
	$('#showslide').html("<div id='slider'>" + listview_data + "</div>");
	$(function () {
		$("#slider").excoloSlider();
	});	
});

// First section of application
function F_TRAVEL(){
	$.ajax({					
		url 	: host+"api_tavel.php",
		async	: false,
		success : function(result){
			var myjson = $.parseJSON(result);
			listview_data = "";
		    $.each(myjson, function(index , val){							
				listview_data += "<div class='ui-grid-a' onclick='F_TRAVELDETAIL("+val.id+")' class='ui-btn'>"+
				    "<div class='ui-block-a'>"+
					"<div class='ui-bar' ui-bar-a style='height:100px'>"+
					"<img src='images/"+val.image+"' width='100%'>"+
					"</div></div><div class='ui-block-b'>"+
					"<div class='ui-bar' ui-bar-a style='height:100px'>"+
					"<h4 align='center'>"+val.name+"</h4>"+
					"</div></div></div>";
			});
		}					
	});				
	$('#showpage').html(listview_data);
}				
F_TRAVEL();
			
			function F_TRAVELSEARCH(){
				$.ajax({
					data 	: $('#form').serialize(),
					type 	: "POST",
					url 	: host+"api_tavel_search.php",
					async	: false,
					success : function(result){
						var myjson = $.parseJSON(result);
						listview_data = "";
						$.each(myjson, function(index , val){							
							listview_data +=								
							"<table border='1' width='100%' style='margin-bottom:14px'>"+
							"<tr>"+
								"<td>"+
									"<h4 align='center'>"+val.name+"</h4>"+
									"<img src='images/"+val.image+"' width='100%'>"+								
									"<div data-role='controlgroup'>"+
										"<a class='ui-btn'  onclick='F_TRAVELDETAIL("+val.id+")' data-role='button'>แนะนำข้อมูล</a>"+
										"<a class='ui-btn'  onclick='F_GOMAPS(\""+val.latitude+"\", \""+val.longitude+"\");' data-role='button'>แผนที่</a>"+
									"</div>"+
								"</td>"+	
							"</tr>";
							"</table>";
						});						
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
						listview_data_detail +=	
						"<div class='ui-grid-solo'><div class='ui-block-a'>"+
						"<div data-role='collapsible' data-mini='true'><h4>ข้อมูลเพิ่มเติม</h4>"+
						"<p>"+myjson.detail+"</p></div></div>"+
						"<div class='ui-grid-a'><div class='ui-block-a'>"+
						"<a class='ui-shadow ui-btn ui-corner-all' onclick='F_GOMAPS(\""+myjson.latitude+"\", \""+myjson.longitude+"\");'>Streetview</a></div>"+
						"<div class='ui-block-b'><a class='ui-shadow ui-btn ui-corner-all'>นำทาง</a></div></div></div>";
					}					
				});

				$('#showpage').html(listview_data_detail);
				$('#topic_form').hide();
				$('#form').hide();
				$('#headers').html(names);
				$('#topic').hide();
				$('#header-left').html(btn_back);
			}
			function F_GOMAPS(p1, p2) {				
				localStorage.setItem("l_latitude", p1);
				localStorage.setItem("l_longitude", p2);
				window.location = "maps.html"; 
			}
			function F_GORELOAD() {						
				location.reload(); 
			}