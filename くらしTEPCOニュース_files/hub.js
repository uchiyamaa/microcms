
$(function() {
	

	// var Accordion
	var $accSW = $(".acc")
			,_accOpenClass = "open"
			,_accSpd = 300;
	// var Accordion
	var $accSW2 = $(".accordionSWtop2");
	
	//Accordion: .openがついてるものは隠さない
	$accSW.next().hide();


	// Accordion Func
	$accSW.click(function() {
		_this = $(this);
		if( !_this.hasClass(_accOpenClass) ){
			_this.toggleClass(_accOpenClass);
			_this.next().slideDown( _accSpd ,function(){});
		}else{
			_this.next().slideUp(_accSpd ,function(){
				_this.removeClass(_accOpenClass);
				/*$accSW.removeClass(_accOpenClass);*/
			});
		}
		return false;
	});
	
	
	//
	$("#btnClose").click(function() {
		window.open('about:blank','_self').close();						  	
	});
	
	$('.hub_site_kurashi .plan_area ul.area_tab li a').click(function(){
		if($(this).closest('li').not('on')){
			var dist='kanto';
			locationLink = $(this).attr('data-area');
			
			if(locationLink=='#chubu'){
				dist = 'chubu';
			}else if(locationLink=='#kansai'){
				dist='kansai';
			}else{
				dist='kanto';
			}
			
			$('.hub_site_kurashi .plan_area ul.area_tab li').each(function(){
				$(this).removeClass('on');														   
			});
			$(this).closest('li').addClass('on');
			
			$('.hub_site_kurashi .plan_area .plan_contents > section').hide();
			$('.hub_site_kurashi .plan_area .plan_contents #'+dist).fadeIn(300);
			/*$(this).closest('div').hide();
			$('.hub_site_kurashi .plan_area #'+dist).show();*/
			//console.log(dist);
		}
		return false;
		
	});
	
	
	var current_y = 0;
	$('a.inline').click(function(){
		cont_height=$(document).height();
		win_height=$(window).height();
		current_y = $(window).scrollTop();
		/*$(window).on('touchmove.noScroll', function(e) {
            e.preventDefault();
        });*/
		
		$('.contents').css( {
			position: 'fixed',
			width: '100%',
			top: -1 * current_y
		  } );
		$('#footer').hide();
		
		
		$('.plan_modal').css('height',cont_height);
		
		$('.plan_modal').fadeIn(250,function(){	
			$(window).scrollTop(0);	
			if($('#modalwin').height()>win_height*0.9){
				$('#modalwin').css('height',win_height*0.9);
			}
			$('.plan_modal').css('position', 'fixed');
			$('#modalwin').css('position', 'relative');
		});
		return false;
	});
	
	$(".plan_modal").click(function(){
		modalClose();
	});
	$('#modalwin').click(function(e){
		e.stopPropagation();
		return false;
	});
	
	$(".closebtn").click(function(){
		modalClose();
	});
	
	function modalClose(){
		$('.contents').attr( { style: '' } );
		$('#footer').show();
		$(window).scrollTop(current_y);
		$('.plan_modal').fadeOut(250);
		return false;
	}
	
	
});



<!-- SN1024 2.2.7 1.4.29-->