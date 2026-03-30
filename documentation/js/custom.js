(function ($) {
 "use strict";
$(document).ready(function(){
	  
		/*
		Mean Menu Responsive
		============================*/		
        jQuery('nav#main-menu').meanmenu();				
		/*
		scrollUp
		============================*/	
		$.scrollUp({
			scrollText: '^',
			easingType: 'linear',
			scrollSpeed: 900,
			animation: 'fade'
		});	

		
	});	

})(jQuery);

