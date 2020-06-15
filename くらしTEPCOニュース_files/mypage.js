// cookie処理
function setCookie(sinetxt){
  if (sinetxt != "マイページ") {
    $.cookie("sine", "2", { expires: 7 });//インフォメーションを登録
  }else{
    $.cookie("sine", "1", { expires: 7 });//マイページを登録
  }
}

$(function(){
  if($.cookie("sine")){
    if($.cookie("sine") == '2'){//[2]インフォメーションだったら表示を変更
      $('.top-nav ul li').eq(0).removeClass('active');
      $('.top-nav ul li').eq(1).addClass('active');
      $('.mypage').css('display','none');
      $('.information').css('display','block');
    }
  }else{
    $.cookie("sine", "1", { expires: 7 });
  }
});

// コンテンツ開閉
// 重要なお知らせ
$(function() {
  $(".required-area h2").click(function() {
    $(".required-area .box").slideToggle();
    $(".required-area h2").toggleClass("required-area-closearrow");
  });
});

// 契約概要
$(function() {
  $('.js-ac-buttom-00').on('click', function () {
    $('.js-ac-00').slideToggle('fast');
    $('.js-ac-arrow-00').toggleClass('open');
  });
});

// 料金プラン説明
$(function() {
  $(".plan-payment-area h3").click(function() {
    $(".plan-payment-area .box-list").slideToggle();
    $(this).toggleClass("plan-payment-area-closearrow");
  });
});

// slick.js
$(function() {
  // キャンペーン
  var sliderAdvertisement = $('.advertisement-area .slider').slick({
    autoplay:true,
    autoplaySpeed:5000,
    dots:true,
    swipe:true
  });

  // ご利用明細
  var sliderMeisai = $('.meisai-area .slider').slick({
    rtl:true,
    autoplay:false,
    dots:false,
    infinite:false,
    swipe:true
  });

  $('#mypage-tab').click(function(){
    sliderAdvertisement.animate({'z-index':1},10,function(){
      sliderAdvertisement.slick('setPosition');
    });
    sliderMeisai.animate({'z-index':1},10,function(){
      sliderMeisai.slick('setPosition');
    });
  });
});

// もっと読む メンテナンス
$(function(){
  var division = 3;
  var divlength = $('.news-box .list').length;
  dlsizePerResult = divlength / division;
  for(i=1;i<=dlsizePerResult;i++){
    $('.news-box .list').eq(division*i).after('<p class="btn-more-mnt link'+i+'">もっと読む</p>');
  }
  $('.news-box .list,.btn-more-mnt').hide();
  for(j=0;j<division;j++){
    $('.news-box .list').eq(j).show();
  }
  $('.btn-more-mnt.link1').show();
  $('.news-box .btn-more-mnt').click(function(){
    index = $(this).index('.btn-more-mnt');
    for(k=0;k<(index+2)*division;k++){
      $('.news-box .list').eq(k).fadeIn();
    }
    $('.news-box .btn-more-mnt').hide();
    $('.news-box .btn-more-mnt').eq(index+1).show();
  });
});

// もっと読む コンテンツ
$(function(){
  var division = 3;
  var divlength = $('.infocontent-box .list').length;
  dlsizePerResult = divlength / division;
  for(i=1;i<=dlsizePerResult;i++){
    $('.infocontent-box .list').eq(division*i).after('<p class="btn-more-cnt link'+i+'">もっと読む</p>');
  }
  $('.infocontent-box .list,.btn-more-cnt').hide();
  for(j=0;j<division;j++){
    $('.infocontent-box .list').eq(j).show();
  }
  $('.btn-more-cnt.link1').show();
  $('.infocontent-box .btn-more-cnt').click(function(){
    index = $(this).index('.btn-more-cnt');
    for(k=0;k<(index+2)*division;k++){
      $('.infocontent-box .list').eq(k).fadeIn();
    }
    $('.infocontent-box .btn-more-cnt').hide();
    $('.infocontent-box .btn-more-cnt').eq(index+1).show();
  });
});

// マイページ・インフォメーション切替タブ
$(function(){
  $('.top-nav ul li').click(function(){
    if($(this).text() == "マイページ"){
      if(!$(this).hasClass('active')){
        $(this).addClass('active');
        $(this).next('li').removeClass('active');
        $('.mypage').css('display','block');
        $('.information').css('display','none');
      }
    }else{
      if(!$(this).hasClass('active')){
        $(this).addClass('active');
        $(this).prev('li').removeClass('active');
        $('.mypage').css('display','none');
        $('.information').css('display','block');
      }
    }
    setCookie($(this).text());
  });
});

// モーダル 契約概要
function mordalSet(){
  var tmp1 = $('.plan-detail-modal-content').height();//モーダル内白枠高さ（padding抜き）
  var tmp2 = $('.plan-detail-modal-content .box h2').outerHeight(true);//h2高さ（マージン込）
  var tmp3 = $('.plan-detail-modal-content .box .agr-all').outerHeight(true);//agr-all高さ（マージン込）
  var tmp4 = $('.plan-detail-modal-content .box .btn-area').outerHeight(true);//btn-area高さ（マージン込）
  var tmp5 = $('.plan-detail-modal-content .box .scroll').css('margin-bottom');//.scrollのmargin-bottom
  tmp5 = Number(tmp5.slice(0,-2));
  var scrollh = tmp1 - (tmp2 + tmp3 + tmp4 + tmp5 );
  $('.plan-detail-modal-content .box .scroll').css('height',scrollh);
}

//モーダル 契約一覧
$(function(){
  $(".plan-detail-modal-open, .plan-detail-modal-close").click(function(){
    $('#plan-detail-modal').slideToggle(0,function(){
      mordalSet();
      $('body').toggleClass('fixed');
    });
    return false;
  });
});

//モーダル 新しい料金プランを申し込む
$(function(){
  $(".new-plan-modal-open, .new-plan-modal-close").click(function(){
    $('#new-plan-modal').slideToggle(0,function(){
      $('body').toggleClass('fixed');
    });
    return false;
  });
});