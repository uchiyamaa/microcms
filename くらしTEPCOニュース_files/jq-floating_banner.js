$(function () {
  if (sessionStorage.getItem('showTepconBanner') == null){
    $('#floating_banner').show();
    $("div.copyright").css('padding-bottom','140px');
    $("#floating_banner").css({ bottom:'-30%', opacity: 0 });
    setTimeout(function(){
      $("#floating_banner").stop().animate({ bottom:'2%', opacity: 1 },400).animate({ bottom:'0' },300);
    },1000);
    $('#banner_close').on('click', function(){
      sessionStorage.setItem('showTepconBanner', 'off');
      $("#floating_banner").stop().animate({ bottom:'-30%',opacity: 0 },400);
      setTimeout(function(){
        $('#floating_banner').hide();
      },400);
      $("div.copyright").css('padding-bottom','20px');
    });
  }else if(sessionStorage.getItem('showTepconBanner') == 'off'){
    $('#floating_banner').hide();
  }
});
