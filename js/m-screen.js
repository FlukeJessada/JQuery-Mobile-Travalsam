$(document).ready(function(){
	
	$('.resolution-selecter-deploy').click(function(){
		$('.resolutions').toggleClass('show-resolutions');
	});
	
	var inch35w = 320;	//3.5 Inch Screen Width
	var inch35h = 520;	//3.5 Inch Screen Height

	var inch40w = 340;  //4.0 Inch Screen Width
	var inch40h = 568;  //4.0 Inch Screen Height
	
	var inch50w = 360;  //5.0 Inch Screen Width
	var inch50h = 580;  //5.0 Inch Screen Height

	var inch60w = 400;  //6.0 Inch Screen Width
	var inch60h = 600;  //6.0 Inch Screen Heeight
	
	var inch70w = 1024;  //7.0 Inch Screen Width
	var inch70h = 641;  //7.0 Inch Screen Heeight

	var inch80w = 768;  //8.0 Inch Screen Width
	var inch80h = 641;  //8.0 Inch Screen Heeight

	function initiate_homepage_slider(){
			$('.main-frame')  .css({ width: inch40w + 00/*20*/, 	 height: inch40h,	});
			$('.second-frame').css({ width: inch40w + 00,	 });
			$('.third-frame') .css({ width: inch40w + 40,	 });	
			$('.third-frame') .removeClass('remove-border');	
			//$('.third-frame') .animate({ opacity: 1 });
		
		$('.inch-35').click(function(){
			$('.main-frame')  .animate({ width: inch35w + 00/*20*/,	 height: inch35h,	});
			$('.second-frame').animate({ width: inch35w + 00,	 });
			$('.third-frame') .animate({ width: inch35w + 40,	 });	
			$('.third-frame') .removeClass('remove-border');
			$('.resolutions a').removeClass('active-resolution');
			$(this).addClass('active-resolution');		
		});

		$('.inch-40').click(function(){
			$('.main-frame')  .animate({ width: inch40w + 00/*20*/, 	 height: inch40h,	});
			$('.second-frame').animate({ width: inch40w + 00,	 });
			$('.third-frame') .animate({ width: inch40w + 40,	 });	
			$('.third-frame') .removeClass('remove-border');	
			$('.resolutions a').removeClass('active-resolution');
			$(this).addClass('active-resolution');		
		});
		
		$('.inch-50').click(function(){
			$('.main-frame')  .animate({ width: inch50w + 00/*20*/, 	 height: inch50h,	});
			$('.second-frame').animate({ width: inch50w + 00,	 });
			$('.third-frame') .animate({ width: inch50w + 40,	 });
			$('.third-frame') .removeClass('remove-border');	
			$('.resolutions a').removeClass('active-resolution');
			$(this).addClass('active-resolution');		
		});
		
		$('.inch-60').click(function(){
			$('.main-frame')  .animate({ width: inch60w + 00/*20*/, 	 height: inch60h,	});
			$('.second-frame').animate({ width: inch60w + 00,	 });
			$('.third-frame') .animate({ width: inch60w + 40,	 });
			$('.third-frame') .removeClass('remove-border');		
			$('.resolutions a').removeClass('active-resolution');
			$(this).addClass('active-resolution');		
		});
		
		$('.inch-70').click(function(){
			$('.main-frame')  .animate({ width: inch70w + 00/*20*/, 	 height: inch70h,	});
			$('.second-frame').animate({ width: inch70w + 00,	 });
			$('.third-frame') .animate({ width: inch70w + 40,	 });
			$('.third-frame') .removeClass('remove-border');
			$('.resolutions a').removeClass('active-resolution');
			$(this).addClass('active-resolution');			
		});

		$('.inch-80').click(function(){
			$('.main-frame')  .animate({ width: inch80w + 00/*20*/, 	 height: inch80h,	});
			$('.second-frame').animate({ width: inch80w + 00,	 });
			$('.third-frame') .animate({ width: inch80w + 40,	 });
			$('.third-frame') .removeClass('remove-border');
			$('.resolutions a').removeClass('active-resolution');
			$(this).addClass('active-resolution');			
		});
	
		$('.inch-00').click(function(){
			$('.third-frame') .addClass('remove-border');		
		});
	};
	initiate_homepage_slider();
});