$(function() {
	var swiper = new Swiper('.swiper-container', {
		autoplay:true,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
		},
	});

	$('.in-new-left .left .in-gs').hover(function(){
		var index = $(this).index();
		$('.in-new-left .left .in-gs').removeClass('active');
		$('.in-new-left .left .in-gs').eq(index).addClass('active');
		$('.right .right-con .right-box').removeClass('active');
		$('.right .right-con .right-box').eq(index).addClass('active');
	})
		
});