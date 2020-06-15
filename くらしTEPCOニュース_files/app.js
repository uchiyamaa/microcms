var debug = false;
var IceWallPrefix = "";
var AjaxToken = "";

(function($, win){

  'use strict';

  var App = App || {}, PageEvents = {}, Store = {};

  Store = {
    state: {
      windowWidth: $(win).width(),
      windowHeight: $(win).height()
    },
    formState:{
      display: {}
    },
    jsonData: {},
    fetchFixedNavPosition: function(){

    },
    dividedFormState: function(name, elm){
      if(!elm){ return false; }

      this.formState.display[name] = elm;
    }
  };

  App = {
    init: function(){

      this.addEventListener();

      //$('select').each(function(){
      //    new CstmSelect($(this));
      //});
      $('select').each(function(){
        $(this).customSelect();
      });
    },
    addEventListener: function(){

      $('#header__gmenu-btn').on('click', function(){
        PageEvents.toggleGlobalMenu($(this));
      });

      if($('.header__nav').length > 0){
        $('.header__nav').each(function(){
          $(this).closest('.ls-area-body').css('overflow', 'visible');
          $(this).closest('.ls-area').css('overflow', 'visible');
        });
      }

      $('.c-accordion__switch').each(function(){
        new Accordion($(this));
      });


      $('.js-toggle-box').each(function(){
        PageEvents.toggleBox($(this));
      });

      $('.js-toggle-item').each(function(){
        PageEvents.toggleItem($(this));
      });

      $('.js-rangeslider').each(function(){
        new RangeSlider($(this));
      });

      $('.alert-list').each(function(){
        var box = $(this);
        box.find('.btn-close').on('click', function(){
          PageEvents.alertBox(box, $(this));
          return false;
        });
      });

      $('.js-accordion').each(function(){
        var box = $(this),
            btn =$(this).find('.js-accordion-button'),
            cnts =$(this).find('.js-accordion-contents'),
            cntsHeight = cnts.outerHeight();

        cnts.css({
          display: "none"
        });

        btn.on('click', function(){
          PageEvents.accordionCnts(box, btn, cnts, cntsHeight);
          return false;
        });
      });

      $('[name=archive-category]').change(function() {
        var val = $('[name=archive-category]').val();
        $('.archive-detail').each(function(){
          if (val != '0') {
            if ( $(this).attr("class").indexOf(val) != -1) {
              $(this).css('display','block');
            } else {
              $(this).css('display','none');
            }
          } else {
            $(this).css('display','block');
          }
        });
      });

      $('.js-box__simulator').each(function(){
        var box = $(this);
        costSimulator(box);
      });

      $('.box-alert__container').each(function(){
        var box = $(this);
        box.find('.btn-close').on('click', function(){
          PageEvents.alertBox(box, $(this));
          return false;
        });
      });

      $('a[href^=#]').on("click", function(){
        if( $(this).attr('href') !== '#'){
          PageEvents.smoothScroll($(this));
          return false;
        }
      });

      $('.js-drawer__opener').on('click', function(){
        PageEvents.drawerNav();
      });

      //$('#header__lazyitems').each(function(){
      //  var headerItemsLength = $(this).find('.place__items').length,
      //      initMaxDisplay = 4;
      //
      //  if(initMaxDisplay <= headerItemsLength){
      //    $.getJSON(APIS.FETCH_HEADER_ITEMS, function(data) {
      //      Store.jsonData.HEADER_ITEMS = data.items;
      //      var scrollElm = 'lazyitems__body';
      //      new LazyloadItems(scrollElm, 'HEADER_ITEMS', 5);
      //    });
      //  }
      //});



      // header - 契約メニュー ダイアログ出し分けチェック
      $('.header__place .place__link').each(function(){
        var _url = location.href, elm = $(this);
        if(debug && _url.match(/\/mypage\//)){
          _url = '/mypage/home/index.page';
        }

        //console.log(_url);
        if(! _url.match(/\/mypage\/home\/index\.page/)){
          new DialogOpener(elm);
        }
      });





      $('.js-box__simulator').each(function(){
        var box = $(this);
        costSimulator(box);
      });

      $('.js-divided-form').each(function(){
        new DividedForms($(this));
      });

      $('.js-select-to-input').each(function(){
        new SelectToInput($(this));
      });

      $('.c-dialog').each(function(){
        $(this).appendTo($('body'));
      });

      $('.js-open-dialog').each(function(){
        new DialogOpener($(this));
      });

      $('.js-onetime-dialog').each(function(){
        new OnetimeDialog($(this));
      });

      $('.js-carousel-banner').each(function(){
        new CarouselBanner($(this));
      });

      $('.p-mypage-carousel').each(function(){
        $(this).find('.p-mypage-box').heightAdjust();
      });

      $('.js-allchecked').each(function(){
        new InputAllChecked($(this));
      });

      $('.js-disable-input').each(function(){
        new DisableInput($(this));
      });

      $('.js-adding-select').each(function(){
        new AddingSelect($(this));
      });

      $('.js-input-address').each(function(i){
        new AddressAutoCompletion($(this), i+1);
      });

      $('.js-account-set').each(function(){
        new AccountSet($(this));
      });


      //KadenSort
      if( $('#js-item-sort').length === 1 ){
        var kadenSort = new KadenSort();
      }


      // 文字が0のときのline-heightを空白を挿入して調整
      $('.c-form__confirm-input').each(function(){
        var txt = $(this).text(),
            tl = txt.replace(/\s+/g, "");
        if(tl.length <= 0){
          $(this).append('<span>&nbsp;</span>');
        }
      });

      //form validation
      $('form').each(function(){
        var thisId = $(this).attr('id') || '',
            isCostsNote = thisId.match(/is-costs-note/) ? true : false;
        $(this).validationEngine('attach', {
          promptPosition: "inline",
          isCostsNote: isCostsNote,
          clickCount: 0,
          onValidationComplete: function(form, status){
            if (status && this.clickCount === 0) {
              this.clickCount = this.clickCount + 1;
              return true;
            }
          }
        });
      });



      // 年月日プルダウン
      $('.js-ymd-select').each(function(){
        var _id = $(this).attr('data-year-select');
        var monthElm = $('[data-month-select="' + _id + '"]');
        var dayElm = $('[data-day-select="' + _id + '"]');
        if(monthElm.length>0 && dayElm.length>0){
          var _unit = $(this).hasClass('not-unit') ? false : true;
          new ChangeDay(_id, _unit);
        }
      });

      $('a.js-oneclick').click(function(){
        $(this).click(function(){
          return false;
        });
      });



      $('.js-passage-contract').on('click', function(){
        $.ajax({
          url: APIS.PASSAGE_CONTRACT,
          type : "POST"
        })
            .done(function(data){})
            .fail(function(){ console.log('error'); });
      });

      $('.js-release-reform').on('click', function(){
        $.ajax({
          url: APIS.ACCOUNT_SET + '&_ajax_request_data=release_reform',
          type : "POST"
        })
            .done(function(data){
              $('.p-set__reform-box').hide();
              $('.p-set__reform-box--release').addClass('is-show');
              $('.js-release-reform').prev('.js-close-dialog').trigger('click');
            })
            .fail(function(){
              //console.log('error');
              //$('.p-set__reform-box').hide();
              //$('.p-set__reform-box--release').addClass('is-show');
              //$('.js-release-reform').prev('.js-close-dialog').trigger('click');
            });
      });

    }

  };


  PageEvents = {
    toggleGlobalMenu: function(elm){
      var btn = elm,
          tgt = $('#header__nav'),
          ol = $('#content-overlay');

      btn.toggleClass('is-close');
      tgt.toggleClass('is-opened');
      ol.toggleClass('is-show');
    },
    accordion: function(elm){
      var switcher = elm.parent('.c-accordion__title'),
          tgt = switcher.siblings('.c-accordion__body'),
          tgtHeight = tgt.children().outerHeight();

      if(tgt.children().length !== 0){
        if(!elm.hasClass('place__items')){
          //console.log(elm.attr('class'));
          elm.toggleClass('icon-a1_btm').toggleClass('icon-a1_top');
        }
        switcher.toggleClass('is-active');
        if(switcher.hasClass('is-active')){
          tgt.css({'height': tgtHeight + 'px'});
        }else{
          tgt.css({'height': '0'});
        }
      }
      Store.fetchFixedNavPosition();
    },
    rollOver: function(elm, hover){
      if(hover){
        elm.attr('src', elm.attr('src').replace(/(\.[^\.]+$)/, '_o$1'));
      }else{
        elm.attr('src', elm.attr('src').replace(/_o/, ''));
      }
    },
    alertBox: function(box, btn){
      box.css({
        height: box.height(),
        overflow: 'hidden'
      });

      box.animate({
        opacity: 0
      }, 300, function(){
        setTimeout(function(){
          box.animate({
            height: 0
          }, 200, function(){
            box.css({display: 'none'});
          });
        },100);
      });
    },
    smoothScroll: function(tgt){
      var speed = 500;
      var href = tgt.attr("href");
      var target = $(href === "#" || href === "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
    },
    toggleBox: function(elm){
      var switcher = elm.find('.js-toggle-box__button'),
          canceler =  elm.find('.js-toggle-box__cancel'),
          target = elm.find('.js-toggle-box__body .toggle-box__item'),
          buttons = elm.find('.js-toggle-box__buttons');


      switcher.on('click', function(){
        switcher.parents('.toggle-box__item').toggleClass('is-hidden');
        canceler.parents('.toggle-box__item').toggleClass('is-hidden');
        target.toggleClass('is-hidden');
      });
      canceler.on('click', function(){
        switcher.parents('.toggle-box__item').toggleClass('is-hidden');
        canceler.parents('.toggle-box__item').toggleClass('is-hidden');
        target.toggleClass('is-hidden');
      });

    },
    toggleItem: function(elm){
      var switcher = elm.find('.js-toggle-box__button'),
          submit = elm.find('.js-toggle-box__submit'),
          complete = elm.find('.toggle-box__complete'),
          target = elm.find('.toggle-box__item'),
          buttons = elm.find('.js-toggle-box__buttons'),
          targetButton = 0;

      if( switcher.length === 2 ) {
        switcher.on('click', function(){
          target.toggleClass('is-hidden');
          switcher.eq(targetButton).toggleClass('is-hidden');

          if( targetButton === 1){
            submit.toggleClass('is-hidden');
          }

          return false;
        });

        submit.on('click', function(){
          target.toggleClass('is-hidden');
          submit.toggleClass('is-hidden');

          if( targetButton === 1){
            switcher.eq(targetButton).toggleClass('is-hidden');
          }else{
            complete.toggleClass('is-hidden');
            targetButton = 1;
          }

          return false;
        });
      }

      if( switcher.length === 1 ) {
        switcher.on('click', function(){
          target.toggleClass('is-hidden');
          switcher.toggleClass('is-hidden');

          return false;
        });

        submit.on('click', function(){

          target.toggleClass('is-hidden');

          if( complete.find('.js-toggle-box__button').length === 1 ){
            switcher.toggleClass('is-hidden');
          }else{
            complete.toggleClass('is-hidden');
          }

          return false;
        });
      }
    },
    accordionCnts: function(elm, btn, cnts, height ){
      var tgtHeight = cnts.outerHeight();

      cnts.stop();

      if( !btn.hasClass('is-active') ){
        cnts.css({
          display: 'block',
          height: 0
        });

        cnts.animate({
          height: height
        }, 200, function(){
          btn.toggleClass('is-active');
        });
      }else{

        cnts.animate({
          height: 0
        }, 200, function(){
          btn.toggleClass('is-active');
          cnts.css({
            display: 'none'
          });
        });
      }
    },
    drawerNav: function(){
      var tgt = $('.js-drawer'),
          tgtBody = $('.config-nav__wrap'),
          closer = $('.js-drawer__btn-closed'),
          ol = $('.overlay');

      tgtBody.css({'top': ($(win).scrollTop() + 20) + 'px'});
      tgt.toggleClass('is-opened');
      ol.toggleClass('is-show');

      closer.on('click', function(){
        tgt.removeClass('is-opened');
        ol.removeClass('is-show');
      });
    }
  };


  function Accordion(elm){
    this.btn = elm;
    this.switcher = elm.parent('.c-accordion__title');
    this.tgt = this.switcher.siblings('.c-accordion__body');

    this.openLabel = elm.text();
    this.closedLabel = elm.attr('data-close-label') || '';
    this.state = 'close';


    if(this.tgt.children().length !== 0){
      this.tgt.children().hide();
      this.addEvent();
    }
  }

  /*
  Accordion.prototype.addEvent = function(){
    var _this = this;
    _this.btn.on('click', function(){
      _this.tgtHeight = _this.tgt.children().outerHeight();
      console.log(_this.tgtHeight);
      if(!$(this).hasClass('place__items')){
        $(this).toggleClass('icon-a1_btm').toggleClass('icon-a1_top');
      }
      _this.switcher.toggleClass('is-active');

      if(_this.switcher.hasClass('is-active')){
        _this.tgt.children().show();
        _this.tgt.css({'height': _this.tgtHeight + 'px'}).on('transitionend webkitTransitionEnd', function() {
          _this.tgt.children().show();
        });
        if(_this.closedLabel !== ''){
          $(this).text(_this.closedLabel);
        }
      }else{
        _this.tgt.css({'height': '0'}).on('transitionend webkitTransitionEnd', function() {
          _this.tgt.children().hide();
        });

        if(_this.closedLabel !== ''){
          $(this).text(_this.openLabel);
        }
      }
    });
  };
  */

  Accordion.prototype.addEvent = function(){
    var _this = this;
    //_this.tgt.find('select,input,textarea').prop('disabled', true);

    _this.btn.on('click', function(){
      _this.toggle();
    });

    _this.tgt.on('update', function(){
      _this.updateHight();
    });

    if(this.defaultState == 'open'){
      this.toggle();
      this.state = 'open';
    }
  };
  Accordion.prototype.toggle = function(){
    var _this = this;
    _this.tgtHeight = _this.tgt.children().outerHeight();
    _this.btn.toggleClass('icon-a1_btm').toggleClass('icon-a1_top');
    _this.switcher.toggleClass('is-active');

    if(_this.switcher.hasClass('is-active')){
      _this.tgt.children().show();

      var adjustElm = _this.tgt.find('.c-grid.p-life-panel');
      if(adjustElm.length > 0){
        _this.tgt.find('.c-grid.p-life-panel li').heightAdjust();
        _this.tgtHeight = _this.tgt.children().outerHeight();
      }

      _this.tgt.css({'height': _this.tgtHeight + 'px'}).on('transitionend webkitTransitionEnd', function() {
        //_this.tgt.children().show();
        _this.tgt.removeClass('is-hide');
        _this.state = 'open';
      });
      //_this.tgt.find('select,input,textarea').prop('disabled', false);
      if(_this.closedLabel !== ''){
        _this.btn.text(_this.closedLabel);
      }
    }else{
      _this.tgt.css({'height': '0'}).on('transitionend webkitTransitionEnd', function() {
        //_this.tgt.children().hide();
        _this.tgt.addClass('is-hide');
        _this.state = 'close';
      });
      if(_this.closedLabel !== ''){
        _this.btn.text(_this.openLabel);
      }
    }
    Store.fetchFixedNavPosition();
  };
  Accordion.prototype.updateHight = function(){
    var nowHeight = this.tgt.children().outerHeight();
    if(this.state == 'open'){
      this.tgtHeight = this.tgt.children().outerHeight();
      this.tgt.css({'height': this.tgtHeight + 'px'});
    }
  };







  function TipBox(elm){
    this.element = elm;
    this.btn = elm.find('.js-tipbox__switch');
    this.tgt = elm.find('.js-tipbox__body');
    this.text = elm.find('.js-tipbox__text');
    this.tgtWidth = this.tgt.width();
    this.tgtHeight = this.tgt.outerHeight();
    this.tgtClosedHeight = 84;

    this.openLabel = this.btn.text();
    this.closedLabel = this.btn.attr('data-close-label') || '';

    this.init();
  }
  TipBox.prototype.init = function(){
    var _this = this,
        textStr = this.text.text();
    this.text.html(this.coatingText(textStr));

    var textElm = this.text.find('span').eq(0);
    //this.tgtClosedHeight = (textElm.outerHeight() * 2) + this.getTextOffset(this.tgt, textElm);
    this.setEllipsis(textElm.width());

    this.tgt.height(this.tgtClosedHeight);
    this.btn.on('click', function(){
      _this.toggle();
    });
  };
  TipBox.prototype.toggle = function(){
    var _this = this;
    this.tgt.toggleClass('is-active');
    this.btn.toggleClass('is-open');

    if(_this.tgt.hasClass('is-active')){
      this.tgt.height(this.tgtHeight);
      this.tgt.find('.ellipsis').hide();
      if(_this.closedLabel !== ''){
        _this.btn.text(_this.closedLabel);
      }
    }else{
      this.tgt.height(this.tgtClosedHeight);
      this.tgt.find('.ellipsis').show();
      if(_this.closedLabel !== ''){
        _this.btn.text(_this.openLabel);
      }
    }
    Store.fetchFixedNavPosition();
  };
  TipBox.prototype.coatingText = function(str){
    var coatingtxt = '';
    for(var i=0,len=str.length;i<len;i++){
      coatingtxt += '<span>'+str[i]+'</span>';
    }
    return coatingtxt;
  };
  TipBox.prototype.getTextOffset = function(body,elm){
    return elm.offset().top - body.offset().top;
  };
  TipBox.prototype.setEllipsis = function(textWidth){
    var textLine =  this.tgt.find('h5').height()>34 ? 1 : 2;

    var ellipsisPos = Math.floor(this.tgtWidth/textWidth) * textLine - 1,
        ellipsisElm = $('<span class="ellipsis">…</span>');
    this.text.find('span').eq(ellipsisPos).before(ellipsisElm);
  };


  // ----------------------------------------------------
  // RangeSlider
  // ----------------------------------------------------
  function RangeSlider(elm){
    this.element = elm;
    this.gauge = $('<div class="input-slider__gauge" />').appendTo(this.element);
    this.handle = $('<div class="input-slider__handle" />').appendTo(this.gauge);
    this.centerRange = $('<div class="input-slider__label is-center" />').appendTo(this.gauge);
    this.gaugeSize = this.getOffsetSize(this.gauge);
    this.handleSize = this.getOffsetSize(this.handle);
    this.labelLeft = this.element.find('.input-slider__label.is-left');
    this.labelRight = this.element.find('.input-slider__label.is-right');
    this.input = this.element.find('input');
    this.min = 0;
    this.max = 100;
    this.$document  = $(document);
    this.draggable = false;
    this.rect = this.gauge.offset();
    this.state = Number(this.input.val()) || 0;
    this.sinc = false;


    this.handleDown = $.proxy(this.handleDown, this);
    this.handleMove = $.proxy(this.handleMove, this);
    this.handleUp  = $.proxy(this.handleUp, this);
    this.handleClick  = $.proxy(this.handleClick, this);

    this.init();
  }

  RangeSlider.prototype = {
    init: function(){
      var _this = this;
      this.labelLeft.appendTo(this.gauge);
      this.labelRight.appendTo(this.gauge);

      this.handle.on('click', function(e){
        _this.handleClick(e.pageX);
        e.stopPropagation();
      });
      this.handle.on('mousedown', this.handleDown);

      this.labelLeft.on('click', function(){
        _this.setPosition(0);
      }).css({'user-select': 'none'});

      this.labelRight.on('click', function(){
        _this.setPosition(100);
      }).css({'user-select': 'none'});

      this.gauge.on('click', function(e){
        _this.gaugeClick(e.pageX - _this.rect.left);
      });


      switch (this.state){
        case 1:
          _this.setPosition(100);
          break;
        case -1:
          _this.setPosition(0);
          break;
        default :
          _this.input.val(0);
          _this.state = 0;
          break;
      }
    },
    handleDown: function(e){
      var pointX = e.pageX;
      this.rect = this.gauge.offset();
      //console.log(pointX);

      this.downPos = pointX;
      this.draggable = true;

      this.$document.on('mousemove', this.handleMove);
      this.$document.on('mouseup', this.handleUp);
    },
    handleMove: function(e){
      if(this.draggable){
        //console.log("move");
        var posX = e.pageX - this.rect.left,
            handlePos = this.getPosition(posX);
        //console.log("handlePos: " + handlePos);
        this.update(handlePos);
      }
    },
    handleUp: function(e){
      this.draggable = false;
      this.$document.off('mousemove', this.handleMove);
      this.$document.off('mouseup mouseleave', this.handleUp);
    },
    handleClick: function(p){
      var point = p - this.handle.offset().left,
          per = point / this.handleSize.w,
          pos = per * this.max,
          dir = ~~pos < 50 ? 'prev' : 'next',
          num;
      if(this.state === 0){
        num = dir == 'prev' ? 0 : 100;
      }
      if(this.state == 1){
        num = dir == 'prev' ? 50 : 100;
      }
      if(this.state == -1){
        num = dir == 'prev' ? 0 : 50;
      }

      this.update(num);
    },
    gaugeClick: function(p){
      var pointX = this.getPosition(p);
      this.update(pointX);
    },
    update: function(pos){
      if(pos<35){
        this.setPosition(0);
        this.setValue(-1);
      }else if(65<pos){
        this.setPosition(100);
        this.setValue(1);
      }else if(25<pos<35 || 65<pos<75){
        this.setPosition(50);
        this.setValue(0);
      }else{
        this.handle.css({'left': pos + '%'});
      }

      if(!this.sinc){
        this.sincUpdate(this.state);
      }
    },
    setPosition: function(pos){
      //console.log(this.state, pos);
      this.handle.css({'left': pos + '%'});
    },
    getPosition: function(val){
      var per, pos;
      per = val / this.gaugeSize.w;
      pos = per * this.max;
      if(pos<this.min){pos=this.min;}
      if(this.max<pos){pos=this.max;}

      return ~~pos;
    },
    getOffsetSize: function(elm){
      var w,h;
      return {w: elm.outerWidth(), h: elm.outerHeight()};
    },
    setValue: function(val){
      this.input.val(val);
      this.state = val;
    },
    sincUpdate: function(){
      var elmList = Store.rangesliderList, val;
      switch (this.state){
        case 0:
          val = 50;
          break;
        case 1:
          val = 100;
          break;
        case -1:
          val = 0;
          break;
      }
      for(var i=0,len=elmList.length;i<len;i++){
        elmList[i].sinc = true;
        elmList[i].update(val);
        elmList[i].sinc = false;
      }
    }
  };






  // ----------------------------------------------------
  // Simulator
  // ----------------------------------------------------
  function costSimulator(elm){

    /*
     0 : "月々1,000円程度"
     1 : "月々3,000円程度"
     2 : "月々4,000円程度"
     3 : "月々5,000円程度"
     4 : "月々6,000円程度"
     5 : "月々7,000円程度"
     6 : "月々8,000円程度"
     7 : "月々9,000円程度"
     8 : "月々10,000円程度"
     9 : "月々11,000円程度"
     10 : "月々12,000円程度"
     11 : "月々13,000円程度"
     12 : "月々14,000円程度"
     */
    var textData = [
      "月々1,000円程度",
      "月々3,000円程度",
      "月々4,000円程度",
      "月々5,000円程度",
      "月々6,000円程度",
      "月々7,000円程度",
      "月々8,000円程度",
      "月々9,000円程度",
      "月々10,000円程度",
      "月々11,000円程度",
      "月々12,000円程度",
      "月々13,000円程度",
      "月々14,000円程度"
    ];
    var data = {
      1 : [0, 1, 3, 5, 7],
      2 : [1, 3, 5, 7, 9],
      3 : [3, 5, 7, 9, 11],
      4 : [2, 4, 6, 8, 10],
      5 : [4, 6, 8, 10, 12],
      6  : [2, 4, 6, 8, 10],
      99 : [4, 5, 6, 8, 10]
    };

    var switcher = elm.find('.p-lifesim-list_toggle a'),
        selectQ1 = elm.find('.js-list__data--select--q1'),
        selectQ2  = elm.find('.js-list__data--select--q2'),
        selectQ2Dummy = elm.find('.js-list__data--q2'),
        selectQ2Child = selectQ2.find('option'),
        customSelect1 = elm.find('.js-list__data--select--q1 .customSelectInner'),
        customSelect2 = elm.find('.js-list__data--select--q2 .customSelectInner'),
        disable = elm.find('.is-disable'),
        resultImage = elm.find('.js-image__result'),
        selectClass = 'is-select',
        selectType = 0,
        selectNum = '0';

    switcher.each(function(i){
      var btn = $(this);

      btn.on('click', function(){
        if( !btn.hasClass(selectClass) ){
          switchChange( $(this), i );
        }
        return false;
      });
    });

    selectQ1.each(function(i){
      var select = $(this);

      select.on('change', function(){
        selectNum = select.find('option:selected').val();
        //setQ2( selectNum );
        setQ2(99); // どれを選んでも固定で渡す
        imgChange();
      });
    });

    selectQ2.on('change', function(){
      imgChange();
    });

    //質問タイプ変更時のリセットまわり
    function switchChange( btn, i ){
      switcher.removeClass(selectClass);
      btn.addClass(selectClass);
      disable.removeClass(selectClass);
      disable.eq(i).addClass(selectClass);

      selectType = i;
      selectQ2.empty();
      selectQ2.append('<option value="0">選択してください</option>');

      //質問のタイプを切り替えた場合は質問1を初期化
      selectQ1.find('option').eq(0).attr('selected', 'selected');
      customSelect1.empty().append('選択してください');
      //質問のタイプを切り替えた場合は質問2を非活性化
      selectQ2Dummy.css({display:'block'});
      imgChange();
    }

    function setQ2( num ){

      //オール電化リフォーム
      if( switcher.length > 1 && num === '0' ){
        //質問2を非活性化
        selectQ2.empty();
        selectQ2.append('選択してください');
        selectQ2Dummy.css({display:'block'});
        return false;
      }else if( switcher.length > 1 && num !== '0' ){
        //質問2を活性化
        selectQ2Dummy.css({display:'none'});
      }

      //電気自動車導入
      if( switcher.length === 0 && num === '0' ){
        customSelect2.empty();
        customSelect2.append('選択してください');
        //質問2を非活性化
        selectQ2Dummy.css({display:'block'});
        return false;
      }else if( switcher.length === 0 && num !== '0' ){
        //質問2を活性化
        selectQ2Dummy.css({display:'none'});
      }

      if( switcher.length > 1 && num ){

        selectQ2.empty();
        selectQ2Child.removeAttr('selected');

        selectQ2Child.attr('value', '');
        selectQ2Child.css({ display : 'none' });

        selectQ2.append('<option value="0">選択してください</option>');

        for (var i = 0; i < data[num].length; i++) {

          if( i === 0 ) {
            selectQ2.append('<option value="'+ (i + 1) +'">' + textData[ data[num][i] ] + '</option>');
          }else{
            selectQ2.append('<option value="'+ (i + 1) +'">' + textData[ data[num][i] ] + '</option>');
          }
        }

        customSelect2.text( selectQ2Child.eq( data[num][0] ).text() );
      } else {
        selectQ2Child.removeAttr('selected');
        selectQ2Child.eq(0).attr('selected', 'selected');
        customSelect2.empty();
        customSelect2.append(selectQ2Child.eq(0).text());
      }

    }

    function imgChange(){

      //質問1、質問2のどちらかが未選択の場合は処理をしない
      if( selectQ1.eq(selectType).find('option:selected').val() === '0' || selectQ2.find('option:selected').val() === '0' ){
        return false;
      }

      var fileName = 'graph-' + selectQ1.eq(selectType).find('option:selected').val() + '-' + selectQ2.find('option:selected').val() + '.png',
          dir = resultImage.attr('src').toString().replace(/[^\/]+$/,'');

      resultImage.attr('src', dir + fileName );

      resultImage.css({opacity: 0});
      resultImage.stop();

      resultImage.animate({
        opacity: 1
      }, 500, function(){

      });
    }

    //init
    setQ2( selectNum );
    //質問1を選択していない初期状態では質問2を非活性化
    selectQ2Dummy.css({display:'block'});
  }



  // ----------------------------------------------------
  // Carousel
  // ----------------------------------------------------
  function CarouselBanner(elm){
    this.element = elm;
    this.displayNum = elm.attr('data-display');
    this.maxItem = elm.attr('data-max-length');
    this.body = elm.find('.c-carousel__content');
    this.items = elm.find('.c-carousel__item');
    this.nextBtn = $('<div class="carousel__next" />');
    this.prevBtn = $('<div class="carousel__prev" />');
    this.firstElm = elm.find('.c-carousel__item:first-child').attr('id', 'car-fst');
    this.lastElm = elm.find('.c-carousel__item:last-child').attr('id', 'car-lst');
    this.itemWidth = elm.find('.c-carousel__item:eq(0)').width();
    this.itemMargin = elm.find('.c-carousel__item:eq(0)').css('margin-right');
    this.type = elm.attr('data-carousel-type') || 'none';
    this.size = elm.attr('data-carousel-size') || '';
    this.pumpElm = $('<li class="c-carousel__item c-carousel__pump">&nbsp;</li>');
    this.state = 1;

    this.init();
  }

  CarouselBanner.prototype = {
    init: function(){
      if(this.displayNum < this.items.length){
        var _this = this;

        if(this.size == 'full'){
          this.itemWidth = this.element.width();
          this.items.css({'width': this.itemWidth});
        }
        if(this.type == 'auto'){
          this.setIndicator();
          this.autoSlide();
        }

        this.pumpElm.css({'width': this.itemWidth});
        this.nextBtn.appendTo(this.element);
        this.prevBtn.appendTo(this.element);
        this.pumpElm.prependTo(this.body);

        this.nextBtn.on('click', function(){
          _this.stopTimer();
          _this.checkState(1);
        });

        this.prevBtn.on('click', function(){
          _this.stopTimer();
          _this.checkState(-1);
        });
      }else{
        this.body.css({'margin-left': 0});
      }
    },
    checkState: function(dir){
      this.state = this.state + dir;
      if(this.state > this.items.length){
        this.state = 1;
      }
      if(this.state <= 0){ this.state = this.items.length; }

      if(0<dir){
        this.element.find('.c-carousel__item:eq(0)').appendTo(this.body);
        this.pumpElm.prependTo(this.body);
        this.updateNext();
      } else{
        this.element.find('.c-carousel__item:last-child').prependTo(this.body);
        //this.pumpElm.appendTo(this.body);
        this.updatePrev();
      }

      if(this.type == 'auto'){
        this.updateIndicator(this.state-1);
      }
    },
    updateNext: function(){
      var _this = this;

      this.pumpElm.animate({'width': 0, 'margin-right': 0}, 400, function(){
        $(this).delay(200).appendTo(_this.body);
        _this.refresh();
      });
    },
    updatePrev: function(){
      var _this = this;

      this.pumpElm.css({'width': '0px', 'margin-right': 0}).prependTo(this.body);
      this.pumpElm.animate({'width': this.itemWidth + 'px', 'margin-right': this.itemMargin}, 400, function(){
        _this.refresh();
      });
    },
    refresh: function(){
      //this.body.find('.c-carousel__item').removeAttr('style');
      this.pumpElm.css({'width': this.itemWidth});
      if(this.type == 'auto') {
        this.autoSlide();
      }
    },
    setIndicator: function(){
      this.indicatorElm = $('<div class="carousel__indicator" />');
      //this.indicatorItem = $('<div class="carousel__indicator__item" />');

      for(var i=0,len=this.items.length;i<len;i++){
        var items = $('<div class="carousel__indicator__item" />');
        items.appendTo(this.indicatorElm);
      }
      this.indicatorElm.appendTo(this.element);
      $('.carousel__indicator__item:eq(0)').addClass('is-current');
    },
    updateIndicator: function(cur){
      $('.carousel__indicator__item.is-current').removeClass('is-current');
      $('.carousel__indicator__item:eq(' + cur + ')').addClass('is-current');
    },
    autoSlide: function(){
      var _this = this;

      _this.timer = setTimeout(function(){
        _this.checkState(1);
      }, 6000);
    },
    stopTimer: function(){
      var _this = this;
      clearTimeout(_this.timer);
    }
  };


  // ----------------------------------------------------
  // Dialog
  // ----------------------------------------------------
  function DialogOpener(elm){
    this.opened = false;
    this.openBtn = elm;
    this.id = elm.attr('data-dialog-id');
    this.target = $('#' + this.id);
    this.closeBtn = this.target.find('.js-close-dialog');
    this.overlay = $('.c-dialog__overlay');

    this.addEvent();
  }

  DialogOpener.prototype = {
    addEvent: function(){
      var _this = this;

      _this.openBtn.on('click', function(){
        _this.open();
      });
      _this.closeBtn.on('click', function(){
        _this.close();
      });
      _this.overlay.on('click', function(){
        _this.close();
      });
    },
    open: function(){
      var _this = this;
      if(_this.opened){ return false; }

      var _topPos = Store.state.windowHeight / 2,
          _scroll = $(win).scrollTop();

      //console.log("_scroll: " + _scroll + _topPos);

      _this.opened = true;
      _this.target.css({'top': (_topPos + _scroll) + 'px'});
      _this.target.addClass('is-opened');
      _this.overlay.addClass('is-opened');
    },
    close: function(){
      var _this = this;
      if(!_this.opened){ return false; }

      _this.opened = false;
      _this.target.removeClass('is-opened');
      _this.overlay.removeClass('is-opened');
    }
  };



  function OnetimeDialog(elm){
    this.opened = false;
    this.id = elm.attr('data-dialog-id');
    this.target = elm;
    this.closeBtn = this.target.find('.js-close-dialog');
    this.overlay = $('.c-dialog__overlay');

    this.init();
  }
  OnetimeDialog.prototype = {
    init: function(){


      if(!this.opened){
        this.addEvent();
        this.open();
      }
    },
    open: function(){
      var _this = this;

      var _topPos = Store.state.windowHeight / 2,
          _scroll = $(win).scrollTop();

      _this.opened = true;
      _this.target.css({'top': (_topPos + _scroll) + 'px'});
      _this.target.addClass('is-opened');
      _this.overlay.addClass('is-opened');
    },
    addEvent: function(){
      var _this = this;

      _this.closeBtn.on('click', function(){
        _this.close();
      });
      _this.overlay.on('click', function(){
        _this.close();
      });
    },
    close: function(){
      this.opened = false;
      this.target.removeClass('is-opened');
      this.overlay.removeClass('is-opened');
    }
  };


  // ----------------------------------------------------
  // Form Events
  // ----------------------------------------------------
  function DividedForms(elm){
    var _this = this;
    this.switcher = elm;
    this.elmType = elm.prop("tagName");


    if(this.elmType == 'SELECT'){
      this.name = elm.attr('id');
      $(elm).change(function(){
        var tgt = elm.find('option:selected').attr('class');
        //if(!tgt){ tgt = "none"; }

        _this.update(tgt);
      });
    }else{
      this.name = elm.find('input:eq(0)').attr('name');
      $('input[name='+ this.name +']').change(function(){
        var tgt = elm.find('input:checked').attr('class');
        _this.update(tgt);
      });
    }

    this.init();
  }

  DividedForms.prototype = {
    init: function(){
      $('.js-df-items').hide();
      //$('.js-df-items').find('input, select, textarea').prop('disabled', true);
      var cur;

      if(this.elmType == 'SELECT'){
        cur = this.switcher.find('option:selected').attr('class');
      }else{
        cur = this.switcher.find('input:checked').attr('class');
      }
      Store.dividedFormState(this.name, cur);

      for(var i in Store.formState.display){
        $('.' + Store.formState.display[i] + '__target').show().addClass('is-show');
        //$('.' + Store.formState.display[i] + '__target').find('input, select, textarea').prop('disabled', false);
      }
    },
    update: function(tgt){
      var targetClass = $('.' + tgt + '__target'),
          tgtName = tgt===undefined ? 'none' : tgt;
      //console.log("tgtName: " + tgtName);
      //console.log(Store.formState.display);

      Store.dividedFormState(this.name, tgtName);
      targetClass.fadeIn().addClass('is-show');
      var displayItems = $('.js-df-items.is-show');
      //displayItems.find('input, select, textarea').prop('disabled', false);

      for(var i=0,l=displayItems.length; i<l; i++){
        var hasClass = displayItems[i].className,
            isMacth = 0;
        for(var j in Store.formState.display){
          if(hasClass.match(new RegExp( Store.formState.display[j])) ){
            isMacth++;
          }
        }
        if(isMacth === 0){
          $(displayItems[i]).find('select option:eq(0)').prop('selected', true);
          $(displayItems[i]).hide().removeClass('is-show');
          //$(displayItems[i]).find('input, select, textarea').prop('disabled', false);
        }
      }
    }
  };




  function SelectToInput(elm){
    var _this = this;
    this.id = elm.attr('id');
    this.selectElm = $('.js-' + this.id + '__target.is-select');
    this.inputElm = $('.js-' + this.id + '__target.is-input');
    //this.name = elm.find('input:eq(0)').attr('name');

    //console.log(this.inputElm.attr('class'));


    $(elm).change(function(){
      var tgt = elm.find('option:selected').attr('id');
      //console.log(tgt);

      if(tgt === this.id + '__other'){
        _this.update('input');
      }else{
        _this.update('select');
      }

    });

    this.init();
  }


  SelectToInput.prototype = {
    init: function () {
      this.inputElm.hide();
    },
    update: function(tgt){
      if(tgt === 'input'){
        this.inputElm.fadeIn();
        this.selectElm.fadeOut();
      }else{
        this.inputElm.fadeOut();
        this.selectElm.fadeIn();
      }
    }
  };



  function InputAllChecked(elm){
    this.id = elm.attr('id');
    this.name = elm.find('input:eq(0)').attr('name');
    var _this = this;

    $('input[name='+ this.name +']').change(function(){
      var tgt = elm.find('input:checked').attr('id');
      $('.' + _this.id + '_on__target').prop('checked',false);
      $('.' + _this.id + '_off__target').prop('checked',false);
      $('.' + tgt + '__target').prop('checked', true);
    });
  }



  function DisableInput(elm) {
    var _this = this;
    this.switcher = elm;
    this.target = $('.' + elm.attr('id') + '__target');
    this.opener = elm.attr('id') + '__opener';
    this.elmType = elm.prop("tagName");


    if (this.elmType == 'SELECT'){
      this.name = elm.attr('id');
      $(elm).change(function () {
        var tgt = elm.find('option:selected').attr('class');
        _this.update(tgt);
      });
    }else if(this.elmType == 'TEXTAREA'){
      $(elm).keyup(function(){
        if(0 < $(this).val().length){
          var tgt = elm.attr('id') + '__opener';
          //console.log(tgt);
          _this.update(tgt);
        }
      });
    }else{
      this.name = elm.find('input:eq(0)').attr('name');
      $('input[name='+ this.name +']').change(function(){
        var tgt = elm.find('input:checked').attr('class');
        _this.update(tgt);
      });
    }

    this.init();
  }
  DisableInput.prototype = {
    init: function(){
      var cur,
          _this = this,
          coverElm = $('<div class="is-disable" />');

      coverElm.appendTo(this.target);

      if(this.elmType == 'SELECT'){
        cur = this.switcher.find('option:selected').attr('class');
      }else{
        cur = this.switcher.find('input:checked').attr('class');
      }

      if(cur == this.opener){
        this.target.find('.is-disable').addClass('is-select');
      }
    },
    update: function(tgt){
      if(tgt == this.opener){
        this.target.find('.is-disable').addClass('is-select');
      }else{
        this.target.find('.is-disable').removeClass('is-select');
      }
    }
  };


  function AddingSelect(elm){
    this.selectElm = elm;
    this.targetId = elm.attr('data-adding');
    this.targetClass = '.as-' + this.targetId;
    this.targetItemLen = $(this.targetClass).length;

    this.init();
  }
  AddingSelect.prototype.init = function(){
    $(this.targetClass + ':not(:eq(0))').hide();
    this.isChange();

    var _this = this;
    $(this.selectElm).on('change', function(){
      _this.isChange();
    });
  };
  AddingSelect.prototype.isChange = function(){
    var tgt = $(this.selectElm).find('option:selected').attr('class');
    this.update(tgt);
  };
  AddingSelect.prototype.update = function(n){
    var addNum = 0;
    if(n){
      if(n.match(/add-/)){
        addNum = Number(n.split('add-')[1])-1;
      }
    }

    $(this.targetClass).hide().prop('disabled', true);

    for(var i=0,len=addNum;i<=len;i++){
      $(this.targetClass + ':eq(' + i + ')').prop('disabled', false).fadeIn();
    }
  };


  function AddressAutoCompletion(elm, id){
    this.inputElm = elm;
    this.elmId = id;
    this.groupId = elm.attr('id').split('addr-')[1].split(' ')[0];
    this.prefSelect = $('[id *= addr-' + this.groupId + '__pref]');
    this.citySelect = $('[id *= addr-' + this.groupId + '__city]');
    this.codePrefElm = $('<input type="hidden" name="codepref' + this.elmId + '" />');
    this.codeAddressElm = $('<input type="hidden" name="codeaddress' + this.elmId + '" />');
    this.pMessage = $('<div class="js-ajax__message is-zip" />');
    this.apis = APIS.FETCH_ADDRESS;
    this.jsondata = null;

    this.init();
  }
  AddressAutoCompletion.prototype.init = function(){
    var _this = this,
        defaultPrefVal = 0,
        defaultCityVal = 0;

    if(typeof this.inputElm.attr('data-ziperror-target') !== 'undefined' && $('#'+this.inputElm.attr('data-ziperror-target')).length > 0){
      $('#'+this.inputElm.attr('data-ziperror-target')).append(this.pMessage);
    }else if(this.inputElm.next("a").length > 0){
      this.inputElm.next("a").after(this.pMessage);
    }else{
      this.inputElm.after(this.pMessage);
    }
    this.pMessage.hide();
    this.prefSelect.before(this.codePrefElm);
    this.coatingSelectElm(this.prefSelect);
    this.citySelect.before(this.codeAddressElm);
    this.coatingSelectElm(this.citySelect);



    this.inputElm.blur(function(){
      if($(this).val().length >= 7){
        var pattern = new RegExp(/^[0-9\ ]+$/);
        if(pattern.test($(this).val())){
          _this.getJsonData();
        }else{
          //console.log("validation error");
        }
      }
    });

    this.prefSelect.on('change',function(){
      var v = $(this).find('option:selected').text();
      _this.setHiddenValue(_this.codePrefElm, 'pref', v);
    });
    this.citySelect.on('change',function(){
      var v = $(this).find('option:selected').text();
      _this.setHiddenValue(_this.codeAddressElm, 'address', v);
    });
  };
  AddressAutoCompletion.prototype.getJsonData = function(){
    var _this = this,
        num = _this.inputElm.val();

    this.pMessage.text('').hide();
    $.ajax({
      url: _this.apis,
      type: 'GET',
      dataType: 'json',
      data:{
        zipcode: num
      }
    })
        .done(function(data){
          _this.jsondata = data;
          if(data.StatusCode=='0'){
            _this.update();
          }else{
            var msg = data.ErrorMessage || '';
            _this.pMessage.text(msg).fadeIn();
            _this.prefSelect.empty();
            _this.prefSelect.append('<option value="">選択してください。</option>');
            _this.prefSelect.parent().find('.is-disable').removeClass('is-select');
            _this.citySelect.empty();
            _this.citySelect.append('<option value="">選択してください。</option>');
            _this.citySelect.parent().find('.is-disable').removeClass('is-select');
            _this.prefSelect.trigger('render');
            _this.citySelect.trigger('render');
          }
        })
        .fail(function(){
          _this.pMessage.text('通信エラーです。再度ご入力ください。').fadeIn();
        });
  };
  AddressAutoCompletion.prototype.update = function(){
    //console.log(this.jsondata);
    this.pMessage.text('').hide();
    this.prefSelect.empty();
    this.prefSelect.parent().find('.is-disable').addClass('is-select');
    this.citySelect.empty();
    this.citySelect.parent().find('.is-disable').addClass('is-select');

    if(1<this.jsondata.pref.length){
      this.prefSelect.append('<option value="">選択してください。</option>');
    }
    for(var i=0,l=this.jsondata.pref.length; i<l; i++){
      this.prefSelect.append('<option value="'+ this.jsondata.pref[i] +'">' + this.jsondata.pref[i] + '</option>');
    }
    if(1<this.jsondata.address.length){
      this.citySelect.append('<option value="">選択してください。</option>');
    }
    for(var j=0,len=this.jsondata.address.length; j<len; j++){
      this.citySelect.append('<option value="'+ this.jsondata.address[j] +'">' + this.jsondata.address[j] + '</option>');
    }

    this.setHiddenValue(this.codePrefElm, 'pref', this.jsondata.pref[0]);
    this.setHiddenValue(this.codeAddressElm, 'address', this.jsondata.address[0]);
    this.prefSelect.trigger('change');
    this.citySelect.trigger('change');
  };
  AddressAutoCompletion.prototype.setHiddenValue = function(elm, key, value){
    if(this.jsondata){
      var v = this.jsondata[key].indexOf(value);
      elm.val(this.jsondata['code' + key][v]);
    }
  };
  AddressAutoCompletion.prototype.coatingSelectElm = function(elm){
    var defVal = 0;
    elm.find('option').each(function(){
      var v=$(this).val();
      if(v.length>=1 && $(this).val()!==undefined) ++defVal;
    });
    var isDisable = defVal===0 ? 'is-disable' : 'is-disable is-select';

    elm.before($('<div class="c-disable-input"><div class="' + isDisable + '" /></div>'));
    elm.next('.customSelect').prependTo(elm.prev('.c-disable-input'));
    elm.prependTo(elm.prev('.c-disable-input'));

    //console.log(elm.find('option').length);
    if(elm.find('option').length<=0) {
      elm.append($('<option value="">選択してください。</option>'));
      elm.trigger('change');
    }
  };





  function AccountSet(elm){
    this.body = elm;
    this.inputItems = elm.find('.js-account-set__item');
    this.submitElm = elm.find('.js-account-set__submit');
    this.resetElm = elm.find('.js-account-set__reset');
    this.pMessage = $('<div class="js-ajax__message is-set" />');
    this.accountData = {};
    this.apis = APIS.ACCOUNT_SET + '&_ajax_request_data=user_data';
    this.isAddrChange = false;

    this.fetchInputValue();
    this.addEvent();
  }
  AccountSet.prototype.fetchInputValue = function(){
    var _this = this;
    for(var i=0, len=_this.inputItems.length;i<len;i++){
      var tgt = $(_this.inputItems[i]),
          tag = tgt.prop("tagName"),
          id = tgt.attr('id') || 'nottgt',
          key = null;

      if(id.match(/act-/)){
        key = tgt.attr('id').split('act-')[1].split(' ')[0];

        this.accountData[key] =
            (tag == 'SELECT') ? tgt.find('option:selected').text() :
                (key=='sex') ? tgt.prop('checked') ? 'male' : 'female' :
                    (key=='mailm') ? tgt.prop('checked') ? true : false : tgt.val();

        //if(_this.isAddrChange && tag == 'SELECT'){
        //  console.log(tgt.attr('id'));
        //}
      }
    }

  };
  AccountSet.prototype.addEvent = function(){
    var _this = this;
    this.inputItems.closest('.toggle-box__item.is-input').append(this.pMessage);
    this.pMessage.hide();

    this.inputItems.on('change', function(){
      _this.pMessage.hide();

      if($(this).attr('id').match(/act-address1/)){
        _this.isAddrChange = true;
      }
    });
    this.submitElm.on('click', function(e){
      e.preventDefault();
      _this.pMessage.text('').hide();
      _this.fetchInputValue();
      _this.submit();
    });
    this.resetElm.on('click', function(){
      _this.pMessage.text('').hide();
    });
  };
  AccountSet.prototype.update = function(){
    Object.keys(this.accountData).forEach(function(key) {
      var tgt, value = this.accountData[key];

      switch(key) {
        case 'address1':
          tgt = this.body.find('#act-' + key + '__result1');
          var tgt2 = this.body.find('#act-' + key + '__result2');
          tgt.text(value.slice(0,3));
          tgt2.text(value.slice(3,7));
          break;
        case 'sex':
          tgt = this.body.find('#act-' + key + '__result');
          tgt.text(value=='male'?'男性':'女性');
          break;
        case 'mailm':
          tgt = this.body.find('#act-' + key + '__result');
          tgt.text(value?'する':'しない');
          break;
        default :
          tgt = this.body.find('#act-' + key + '__result');
          tgt.text(value);
          break;
      }
    }, this);

    this.submitElm.trigger('ajaxcomplete');
  };
  AccountSet.prototype.submit = function(){
    var _this = this,
        accountData = _this.accountData,
        validateError = false;

    this.inputItems.each(function(){
      if($(this).hasClass('is-validate--error')){
        _this.pMessage.text('※入力に誤りがあります').fadeIn();
        validateError = true;
      }
    });
    //console.log(accountData);


    if(!validateError){
      $.ajax({
        url: _this.apis,
        type: 'GET',
        data: accountData
      })
          .done(function(data){
            if(data.StatusCode=='0'){
              _this.update();
              _this.pMessage.text('').hide();
            }else{
              var msg = data.Message || '';
              _this.pMessage.text(msg).fadeIn();
            }
          })
          .fail(function(){
            _this.pMessage.text('通信エラーです。再度ご入力ください。').fadeIn();
          });
    }
  };



  //function CstmSelect(elm){
  //  this.selectElm = elm;
  //  this.hasClass = elm.attr('class') || 'is-liquid';
  //  this.selectedOption = $("option:selected",elm).text();
  //  this.wrapper = $('<div class="c-select ' + this.hasClass + '"><div class="c-select__liar">' + this.selectedOption + '</div>');
  //  this.outerLabel = this.selectElm.next().attr('class') || '';
  //  this.wrapper.removeClass(function(i,c){return (c.match(/\bvalidate\[\S+/g)||[]).join(' ')});
  //
  //  this.init();
  //}
  //CstmSelect.prototype.init = function(){
  //  this.selectElm.after(this.wrapper);
  //  this.selectElm.appendTo(this.wrapper);
  //
  //  if(this.outerLabel.match(/c-input__labelText/)){
  //    this.wrapper.css({'min-width': 'inherit'});
  //  }
  //
  //  this.addEvent();
  //};
  //CstmSelect.prototype.addEvent = function(){
  //  var _this = this;
  //  this.selectElm.change(function(){
  //    _this.selectedOption = $("option:selected",this).text();
  //    _this.wrapper.find('.c-select__liar').text(_this.selectedOption);
  //  }).trigger("change");
  //};










  // ----------------------------------------------------
  // date picker
  // ----------------------------------------------------
  function DatePickManager(year, month, day){
    this.curDate = new Date();
    this.dateList = this.getDateList(this.curDate.getFullYear(), this.curDate.getMonth()+1);
    //console.log(this.curDate);
    //console.log(this.dateList);
  }
  DatePickManager.prototype.getDateList = function(year, month){
    var firstDay = this.getMonthFirstDay(year, month),
        lastDay = this.getMonthLastDay(year, month),
        firstDayOfWeek = this.getMondayStart(year, month, firstDay),
        dateList = [];

    for(var i=0, len=7*6, d=1; i<len; i++){
      if(d<=lastDay){
        var n = firstDayOfWeek <= i  ? d : null;
        if(n){d++;}
        dateList.push(n);
      }
    }
    this.dateList = dateList;

    return dateList;
  };
  //DatePickManager.prototype.updateDateList = function(year, month){
  //};
  DatePickManager.prototype.getMonthFirstDay = function(year, month){
    var fd = new Date(year, month-1, 1);
    return fd.getDate();
  };
  DatePickManager.prototype.getMonthLastDay = function(year, month){
    var ld = new Date(year, month, 0);
    return ld.getDate();
  };
  DatePickManager.prototype.getDayOfWeek = function(year, month, day){
    var d = new Date(year, month-1, day),
        w = ['日', '月', '火', '水', '木', '金', '土'];
    return w[d.getDay()];
  };
  DatePickManager.prototype.getMondayStart = function(year, month, day){
    var d = new Date(year, month-1, day),
        w = d.getDay()===0 ? 6 : d.getDay()-1;
    return w;
  };
  window.DatePickManager = DatePickManager;






  function DatePickerInput(elm){
    this.switcher = elm;
    this.inputElm = elm.next('input');
    this.pickerType = elm.attr('data-picker-type') || 'start';
    // ご利用開始日: start
    // ご利用最終日: end
    // 立ち会い日: witness
    // 工事希望日: construction
    this.apis = APIS.FETCH_DATEPICK_TERM + '&type=' + this.pickerType;
    this.container = $('<div class="c-datepicker-fixer" />');
    this.body = $('<div class="c-dpicker is-day" />');
    this.jsondata = null;
    this.state = {};

    this.createDatePickerItems  = $.proxy(this.createDatePickerItems, this);
    this.createBaseElement();
  }
  DatePickerInput.prototype.createBaseElement = function(){

    /*jshint multistr: true */
    var module = '\
      <div class="c-dpicker__arrowset-month">\
        <div class="c-dpicker__arrow is-lft"></div>\
        <div class="c-dpicker__arrow is-rht"></div>\
      </div>\
      <ul class="c-dpicker__section-year is-no-arrow"></ul>\
      <ul class="c-dpicker__section-month"></ul>\
      <div class="c-dpicker__section-day">\
        <ul class="c-dpicker__item-wkrow">\
          <li class="c-dpicker-wkrow__item">月</li>\
          <li class="c-dpicker-wkrow__item">火</li>\
          <li class="c-dpicker-wkrow__item">水</li>\
          <li class="c-dpicker-wkrow__item">木</li>\
          <li class="c-dpicker-wkrow__item">金</li>\
          <li class="c-dpicker-wkrow__item">土</li>\
          <li class="c-dpicker-wkrow__item">日</li>\
        </ul>\
        <ul class="c-dpicker__item-dtable"></ul>\
      </div>\
    ';

    this.container.css({'width': this.switcher.outerWidth()});
    this.container.append(this.body);
    this.body.append(module);
    this.switcher.after(this.container);

    this.body = this.container.find('.c-dpicker');
    this.yearHandler = this.container.find('.c-dpicker__arrowset-year');
    this.monthHandler = this.container.find('.c-dpicker__arrowset-month');
    this.yearElement = this.container.find('.c-dpicker__section-year');
    this.monthElement = this.container.find('.c-dpicker__section-month');
    this.dayTable = this.container.find('.c-dpicker__item-dtable');

    this.init();
  };
  DatePickerInput.prototype.init = function(){
    var _this = this;
    this.manager = new DatePickManager();
    this.getJsonData();

    this.switcher.on('click', function(){
      _this.clickSwitcher();
    });
  };
  DatePickerInput.prototype.getJsonData = function(){
    var _this = this;

    $.ajax({
      url: _this.apis,
      dataType: 'json'
    })
        .done(function(data){
          _this.jsondata = data;
          _this.setStatus();
        })
        .fail(function(){
          _this.displayAlert('ajaxerror');
        });
  };
  DatePickerInput.prototype.setStatus = function(){
    this.startDay =  new Date(this.jsondata.startday[0],this.jsondata.startday[1]-1,this.jsondata.startday[2],0,0,0);
    this.startDayTime = this.startDay.getTime();
    this.endDay =  new Date(this.jsondata.endday[0],this.jsondata.endday[1]-1,this.jsondata.endday[2],0,0,0);
    this.endDayTime = this.endDay.getTime();

    this.holidays = this.jsondata.holidays;
    this.state.year = this.startDay.getFullYear();
    this.state.month = this.startDay.getMonth()+1;
    this.state.day = this.startDay.getDate();
    this.state.dayList = this.manager.getDateList(this.state.year, this.state.month);
    this.inputElm.prop('name', this.jsondata.inputname);

    //console.log(this.state);
    this.setYearElement();
    this.setMonthElement();
    this.setDayElement();

    if(this.inputElm.val()){
      this.switcher.text(this.inputElm.val());
    }else{
      this.setValue();
    }
  };
  DatePickerInput.prototype.createDatePickerItems = function(type, label){
    var item,
        _this = this;
    switch(type) {
      case 'year':
        item = $('<li class="c-dpicker__item"><a href="javascript:void(0);"><span class="year-label">'+label+'年</span></a></li>');
        break;
      case 'month':
        item = $('<li class="c-dpicker__item"><a href="javascript:void(0);"><span class="month-label">'+label+'月</span></a></li>');
        break;
      case 'day':
        var d = label || '',
            _isObsolete = !label ? 'obsolete' : 'dd-' + d;

        _isObsolete = this.checkTerm(d) ? _isObsolete : _isObsolete + ' obsolete';

        item = $('<li class="c-dpicker-dtable__item '+_isObsolete+'"><a href="javascript:void(0);">'+d+'</a></li>');
        if(!_isObsolete.match(/obsolete/)){
          item.on('click', function(){
            _this.update('day', $(this));
          });
        }
        break;
    }

    return item;
  };
  DatePickerInput.prototype.setYearElement = function(){
    var _this = this;
    this.yearElement.append(new this.createDatePickerItems('year', this.state.year));
    this.yearLabel = this.yearElement.find('.year-label');
    //this.yearHandler.find('.c-dpicker__arrow').on('click', function(){
    //  var dir = $(this).attr('class').split('is-')[1];
    //  _this.update('year', $(this), dir);
    //});
  };
  DatePickerInput.prototype.setMonthElement = function(){
    var _this = this;
    this.monthElement.append(new this.createDatePickerItems('month', this.state.month));
    this.monthLabel = this.monthElement.find('.month-label');
    this.monthHandler.find('.c-dpicker__arrow').on('click', function(){
      var dir = $(this).attr('class').split('is-')[1];
      _this.update('month', $(this), dir);
    });
  };
  DatePickerInput.prototype.setDayElement = function(){
    this.dayTable.empty();
    for(var i= 0, len=this.state.dayList.length; i<len; i++){
      this.dayTable.append(new this.createDatePickerItems('day', this.state.dayList[i]));
    }
    this.checkHoliday();
  };
  DatePickerInput.prototype.update = function(type, elm, dir){
    switch(type) {
      case 'year':
        this.state.year = dir === 'rht' ? ++this.state.year : --this.state.year;
        this.state.dayList = this.manager.getDateList(this.state.year, this.state.month);
        //console.log(this.state);
        this.yearLabel.text(this.state.year + '年');
        this.setDayElement();
        break;
      case 'month':
        var curMonth = this.state.month,
            curYear = this.state.year,
            m = dir === 'rht' ?
                curMonth==12 ? 1 : ++curMonth :
                curMonth==1 ? 12 : --curMonth,
            y = (curMonth == 12 && m == 1) ? ++curYear :
                (curMonth == 1 && m == 12) ? --curYear : curYear,
            range = this.checkRange(y,m);
        //console.log(range);
        if(range){
          this.state.month = m;
          this.state.year = y;
          this.state.dayList = this.manager.getDateList(this.state.year, this.state.month);
          //console.log(this.state);
          this.monthLabel.text(this.state.month + '月');
          this.yearLabel.text(this.state.year + '年');
          this.setDayElement();
        }
        break;
      case 'day':
        this.clickedDayItem(elm);
        break;
    }
    this.setValue();
  };

  DatePickerInput.prototype.checkHoliday = function(){
    for(var i=0, len=this.holidays.length;i<len;i++){
      if(this.state.year == this.holidays[i][0] && this.state.month == this.holidays[i][1]){
        $('.dd-'+this.holidays[i][2]).addClass('holiday obsolete').off('click');
      }
    }
  };
  DatePickerInput.prototype.checkTerm = function(dd){
    var aDay = new Date(this.state.year,this.state.month-1,dd,0,0,0).getTime();
    var bol = this.startDayTime <= aDay && this.endDayTime >= aDay ? true : false;
    return bol;
  };
  DatePickerInput.prototype.checkRange = function(y,m){
    var aMonth = new Date(y,m-1,1,0,0,0).getTime(),
        start =  new Date(this.jsondata.startday[0],this.jsondata.startday[1]-1,1,0,0,0).getTime(),
        end =  new Date(this.jsondata.endday[0],this.jsondata.endday[1]-1,1,0,0,0).getTime();
    //console.log(y,m);
    //console.log(start, aMonth, end);
    return start <= aMonth && end >= aMonth ? true : false;
  };

  DatePickerInput.prototype.clickSwitcher = function(){
    this.body.toggleClass('is-visible');
  };
  DatePickerInput.prototype.clickedDayItem = function(elm){
    if(!elm.hasClass('obsolete')){
      this.state.day = Number(elm.text());
      //console.log(this.state.day);
    }
  };
  DatePickerInput.prototype.setValue = function(){
    var val = this.state.year + '年' + this.state.month + '月' + this.state.day + '日';
    this.inputElm.val(val);
    this.switcher.text(val);
  };
  DatePickerInput.prototype.displayAlert = function(){
    //console.log('ERROR');
  };








  // ----------------------------------------------------
  // headerLazyload
  // ----------------------------------------------------
  function LazyloadItems(elm, jsonname, deflength){
    this.scrollElm = $('#' + elm);
    this.scrollElmId = elm;
    this.wrapper = this.scrollElm.closest('#header__lazyitems');
    this.moreElm = this.scrollElm.next('.place__btn--more');
    this.moreBtn = this.moreElm.find('.lazyitems__btn');
    this.resetBtn = $('.header__gmenu-btn');
    this.data = Store.jsonData[jsonname];
    this.initLength = deflength || 5;
    this.allDisplay = false;
    this.loading = false;
    this.rest = 0;

    this.init();
  }

  LazyloadItems.prototype.init =  function (){
    if(this.initLength < this.data.length){
      this.createItems();
      this.createLoadingElement();
      this.rest = this.scrollElm.find('.place__items.is-hide').length;

      var _this = this;
      this.moreBtn.on('click', function(e){
        e.preventDefault();
        $('.header-loading').show();
        $(this).hide();
        _this.addItem();
      });
      this.resetBtn.on('click', function(){
        if($(this).hasClass('is-close')){
          _this.reset($(this));
        }
      });
    }else{
      this.moreElm.hide();
    }
  };
  LazyloadItems.prototype.createItems =  function (){
    for(var i=this.initLength, len=this.data.length; i<len; i++){
      var item = '';
      /*jshint multistr: true */
      item = '\
                <li class="place__items is-hide">\
                  <a href="' + this.data[i].url + '" class="place__link">\
                    <span class="header__place-name">\
                      <span>' + this.data[i].name + '</span>\
                      <small class="header__place-detail">' + this.data[i].address + '</small>\
                      <small class="header__plan">' + this.data[i].plan + '</small>\
                    </span>\
                  </a>\
                  <a href="#" class="place__link--contract">契約詳細</a>\
                </li>\
            ';
      this.scrollElm.append(item);
    }
    try {
      FONTPLUS.reload();
    }
    catch (e) {
      console.log('FONTPLUS NOT RELOAD');
    }
  };
  LazyloadItems.prototype.createLoadingElement =  function (){
    this.loadingElm = $('<div class="header-loading"></div>');
    this.moreElm.append(this.loadingElm);
  };
  LazyloadItems.prototype.checkList =  function (tgt){
    if(this.allDisplay){
      //console.log("allcomp");
      return false;
    }
  };
  LazyloadItems.prototype.addItem = function (){
    //this.loading = true;
    var _this = this;
    for(var i= 0, len=_this.initLength; i<len; i++){
      this.rest--;
      if(this.rest >= 0) {
        var targetItems = _this.scrollElm.find('.place__items.is-hide:eq(' + i + ')');
        _this.showItem(targetItems);
      }
    }
    //console.log(this.scrollElm.find('.place-list__item.is-hide').length);

    if(this.rest <= 0){
      this.allDisplay = true;
      this.moreElm.delay(1000).fadeOut();
    }
    //this.loading = false;
  };
  LazyloadItems.prototype.showItem = function (elm){
    var targetItems = elm,
        _this = this;
    targetItems.delay(1000).queue(function(){
      $(this).fadeIn(500).removeClass('is-hide');
      $('.header-loading').hide();
      _this.moreBtn.fadeIn();
      _this.fixedWrapperHeight();
      $(this).dequeue();
    });
  };
  LazyloadItems.prototype.fixedWrapperHeight = function(){
    var h = this.allDisplay ? this.scrollElm.outerHeight() : this.scrollElm.outerHeight() + this.moreElm.outerHeight();
    this.wrapper.css({'height': h});
  };
  LazyloadItems.prototype.reset = function(){
    $('#header').find('.c-accordion__title').removeClass('is-active');
    this.wrapper.css({'height': 0});
    $('.place__items:nth-child(n+' + this.initLength + ')').addClass('is-hide');
    this.rest = this.scrollElm.find('.place__items.is-hide').length;
    this.allDisplay = false;
    this.moreElm.show();
  };


  // ----------------------------------------------------
  // Kaden Item Sort
  // ----------------------------------------------------


  function KadenSort(){
    this.select = $('#js-item-sort');
    this.itemList = $('#js-list-sorted');
    this.container = $('#js-sort-container');
    this.api = APIS.KADEN_SORT;
    this.order = "desc";
    this.load = false;
    this.data = {};

    this.init();

  }

  KadenSort.prototype = {
    init : function(){

      var _this = this;

      //_this.select.css({visibility : 'hidden'});

      $.getJSON( _this.api, function(json){

        _this.load = true;
        _this.data = json;
        //_this.select.css({visibility : 'visible'});
        _this.setEvent();

      });

    },
    setEvent : function(){

      var _this = this;

      _this.select.on('change', function(){

        if( this.order !== _this.select.find('option:selected').val() ) {

          _this.order = _this.select.find('option:selected').val();

          if(_this.load){
            _this.update( _this.select.find('option:selected').val() );
          }

        }

      });
    },
    update : function( type ){

      var _this = this;

      _this.itemList.find('li').remove();
      _this.appendElm( _this.data[type] );

    },
    appendElm : function( elm ){
      var _this = this,
          html = "",
          timer;

      for (var i = 0; i < elm.length; i++){

        var flags = "";

        if( elm[i].flag1 !== ''){
          flags = flags + '<p><span class="icon-alert u-text--alert-level1">' + elm[i].flag1 + '</span></p>';
        }

        if( elm[i].flag2 !== ''){
          flags = flags + '<p><span class="icon-alert u-text--alert-level2">' + elm[i].flag2 + '</span></p>';
        }

        if( elm[i].flag3 !== ''){
          flags = flags + '<p><span class="icon-alert u-text--alert-level2">' + elm[i].flag3 + '</span></p>';
        }

        if( elm[i].flag4 !== ''){
          flags = flags + '<p><span class="icon-alert u-text--alert-level2">' + elm[i].flag4 + '</span></p>';
        }

        if( elm[i].flag1 !== ''){
          flags = '<div class="pt15">' + flags + '</div>';
        }

        html = html +
          '<li class="p-life-panel__item">'+
            '<h4 class="panel__title">' + elm[i].name  + '</h4>'+
            '<p class="panel__text mb15">' + elm[i].place  + '</p>'+
            '<p class="panel__text">' + elm[i].date + '</p>'+
            flags +
            '<div class="pt20 u-ta--c"><a href="' + elm[i].link + '" class="c-btn c-btn--primary is-medium">詳細を見る</a></div>'+
          '</li>';
      }

      _this.itemList.append( html );
      _this.container.css({ height : 'auto' });
      _this.container.css({ height : _this.container.find('section').outerHeight() });

      _this.itemList.css({opacity:0});

       _this.itemList.animate({
        opacity: 1
      }, 500);

    }

  };


  (function($) {

    $.fn.heightAdjust = function(options) {
      //設定と変数
      var settings = $.extend({
            eachLine: true
          }, options),
          that = this,
          counter = 0,
          itemLength = $(that).length;

      if(!$(this)[0]){
        return false;
      }

      $(that).css('height','auto');

      //行ごとに処理する場合はcalcOffset()でオフセット計算する処理を挟む。
      //行ごとでない場合はそのままadjust()関数へ。
      if (settings.eachLine) {
        calcOffset();
      } else {
        counter = itemLength;
        adjust(that);
      }

      //行ごとにoffsetTopを取得する関数
      function calcOffset() {
        var offsetTop, itemArr = [];
        do {
          offsetTop = $(that).eq(counter).offset().top; //1個目の要素のoffsetTopを取得
          itemArr.push($(that).eq(counter)[0]); //1個目の要素を配列に格納
          counter++;
          if (counter === itemLength) { //全体の要素数と、今取得した要素の番号が同じならbreak
            break;
          }
        } while (offsetTop === $(that).eq(counter).offset().top); //次の要素のoffsetTopと、先ほど取得した要素のoffsetTopが同じなら次のループへ

        adjust(itemArr); //配列に格納された要素を対象に、高さ揃えの処理を実行
      }

      //高さ揃え関数
      function adjust(items) {
        var thisHeight, maxHeight = 0,
            i;

        if(items.length === 1){
          return false;
        }

        //引数で与えられた要素の中でもっともheightの高い要素のheight値を取得
        for (i = 0; i < items.length; i++) {
          thisHeight = $(items[i]).height();

          if (maxHeight < thisHeight) {
            maxHeight = thisHeight;
          }
        }

        if(maxHeight === 0){
          return false;
        }

        //maxHeightを全要素に反映
        $(items).each(function() {
          $(this).height(maxHeight);
        });

        //処理する要素がまだあれば次の要素のoffset計算へ移行
        if (itemLength > counter) {
          calcOffset();
        }
      }

      //jQueryのメソッドチェーンを使うために自身をreturn
      return $(that);
    };
  }(jQuery));






  // -------------------------
  // jancode > select
  // -------------------------

  function createHandler(selectorName, dataName, innerHandler){
    return function(e){
      var jquery_obj = $(selectorName).empty()
          .append(
          $("select[data-" + dataName + "='" + $(e.target).val() + "']")
              .children()
              .map(function(_, elem){
                return $(elem).clone();
              }).get()
      ).prop("disabled", false);

      if(innerHandler){
        jquery_obj.on("change", innerHandler);
      }
    };
  }

  function concatString(str, tailStr){
    return str.concat(tailStr === null ? "" : tailStr);
  }

  function getAjaxUrl(elemName, params){
    var param_str = $(elemName).data("actionUrl");
    var first = true;
    for(var key in params){
      if(first){
        first = false;
      }else{
        param_str += "&";
      }
      param_str += key + "=" + params[key];
    }

    return param_str;
  }

  function c1084(){
    $("#categorySelector").on("change", createHandler(
        "#kadenTypesSelector", "kaden-category", createHandler(
            "#makerSelector", "kaden-type", createHandler(
                "#modelNumberYearSelector", "maker-code", createHandler(
                    "#modelNumberSelector", "released-year", function(e){
                      $.ajax({
                        url : $("#kadenForm").data("actionUrl") + "mode=ajax&methodName=FindHESpec",
                        type : "get",
                        dataType : "json",
                        data : $("#kadenForm").serialize(),
                        options : {
                          withCredentials : true
                        }
                      }).done(function(data, status){
                        if(status == "success" && data !== null && data.HESpec !== null){
                          if(data.HESpec !== null){
                            var spec = data.HESpec;
                            $("#sizeTextbox").val(spec.Size).prop("disabled", true);
                            $("#weightTextbox").val(spec.Weight).prop("disabled", true);
                            var spec_str = concatString(concatString(concatString(concatString("", spec.PrimarySpec1), spec.PrimarySpec2), spec.PrimarySpec3), spec.PrimarySpec4);
                            $("#specTextbox").val(spec_str).prop("disabled", true);
                          }

                          if(data.HETypeInfo !== null){
                            var long_term_check_flag = data.HETypeInfo.LongTermCheckFlag;
                            if(long_term_check_flag == "0"){
                              $(".longTermCheckFlagRegion").css("display", "none");
                            }

                            var long_term_display_flag = data.HETypeInfo.LongTermDisplayFlag;
                            if(long_term_display_flag == "0"){
                              $(".longTermDisplayFlagRegion").css("display", "none");
                            }
                          }
                        }
                      }).fail(function(e){
                        console.log(e);
                      });
                    }
                )
            )
        )
    ));

    $("#withJanCodeForm").on("submit", function(e){
      e.preventDefault();

      $.ajax({
        url : $("#withJanCodeForm").data("actionUrl") + "mode=ajax&methodName=FindByJanCode",
        type : "GET",
        dataType : "json",
        data : $("#withJanCodeForm").serialize(),
        options : {
          withCredentials : true
        }
      }).done(function(data, status){
        if(status == "success" && data !== null && data.HESpec !== null){
          if(data.HESpec !== null){
            var spec = data.HESpec;
            $("#categorySelector").append("<option value=\"" + spec.CategoryCode + "\" selected>" + spec.CategoryName + "</option>");
            $("#kadenTypesSelector").append("<option value=\"" + spec.HEType + "\" selected>" + spec.HETypeName + "</option>");
            $("#makerSelector").append("<option value=\"" + spec.MakerCode + "\" selected>" + spec.MakerName + "</option>");
            $("#modelNumberYearSelector").append("<option value=\"" + spec.LaunchYear + "\" selected>" + spec.LaunchYear + "</option>");
            $("#modelNumberSelector").append("<option value=\"" + spec.ModelNo + "\" selected>" + spec.ModelNo + "</option>");

            $("#sizeTextbox").val(spec.Size).prop("disabled", true);
            $("#weightTextbox").val(spec.Weight).prop("disabled", true);
            var spec_str = concatString(concatString(concatString(concatString("", spec.PrimarySpec1), spec.PrimarySpec2), spec.PrimarySpec3), spec.PrimarySpec4);
            $("#specTextbox").val(spec_str).prop("disabled", true);
          }

          if(data.HETypeInfo !== null){
            var long_term_check_flag = data.HETypeInfo.LongTermCheckFlag;
            if(long_term_check_flag == "0"){
              $(".longTermCheckFlagRegion").css("display", "none");
            }

            var long_term_display_flag = data.HETypeInfo.LongTermDisplayFlag;
            if(long_term_display_flag == "0"){
              $(".longTermDisplayFlagRegion").css("display", "none");
            }
          }
        }
      }).fail(function(e){
        console.log(e);
      });
    });

    /*$("#kadenForm").on("submit", function(e){
     window.href = $(this).data("formActionUrl");
     });*/
  }


  //年月日のプルダウン制御
  function ChangeDay(id, unit){
    this.yearElm = document.querySelectorAll('[data-year-select="' + id + '"]')[0];
    this.monthElm = document.querySelectorAll('[data-month-select="' + id + '"]')[0];
    this.dayElm = document.querySelectorAll('[data-day-select="' + id + '"]')[0];

    //this.addUnit = unit;
    this.valueUnit = this.yearElm.options[1].value.match(/年/) ? true : false;
    this.textUnit = this.yearElm.options[1].textContent.match(/年/) ? true : false;
    this.monthValueUnit = unit && this.valueUnit ? '月' : '';
    this.monthTextUnit = unit && this.textUnit ? '月' : '';
    this.dayValueUnit = unit && this.valueUnit ? '日' : '';
    this.dayTextUnit = unit && this.textUnit ? '日' : '';

    this.realDate = new Date();
    this.realYear = this.realDate.getFullYear();
    this.realMonth = this.realDate.getMonth() + 1;
    this.realdate = this.realDate.getDate();
    this.selectPrevious = false;

    var yearOption = $(this.yearElm).find('option');
    var withUnit = this.valueUnit ? 1 : 0;
    for(var i= 0,l=yearOption.length;i<l;i++){
      var _v = Number(yearOption[i].value.substr(0,(yearOption[i].value.length - withUnit)));
      if(_v>this.realYear){
        this.selectPrevious = true;
        break;
      }
    }

    var _this = this;
    _this.update();
    $(this.yearElm).change(function(){ _this.update();});
    $(this.monthElm).change(function(){ _this.update();});
  }
  ChangeDay.prototype = {
    update: function(){
      var yearObj = this.yearElm;
      var monthObj = this.monthElm;
      var dayObj = this.dayElm;
      var yearData = yearObj.options[yearObj.selectedIndex];
      var selectYear, selectMonth, selectDay;
      var selectYearCut, selectMonthCut, selectDayCut;
      var withUnit = this.valueUnit ? 1 : 0;
      var dateObj, maxDays;



      if (yearData) {
        selectYear = yearData.value;
      }
      var monthData = monthObj.options[monthObj.selectedIndex];
      if (monthData) {
        selectMonth = monthData.value;
      }
      var dayData = dayObj.options[dayObj.selectedIndex];
      if (dayData) {
        selectDay = dayData.value;
      }
      if (selectYear) {
        selectYearCut = Number(selectYear.substr(0,(selectYear.length - withUnit)));
        if (selectMonth) {
          selectMonthCut = Number(selectMonth.substr(0,(selectMonth.length - withUnit)));
        } else {
          selectMonthCut = 0;
        }
        if (selectDay) {
          selectDayCut = Number(selectDay.substr(0,(selectDay.length - withUnit)));
        } else {
          selectDayCut = 0;
        }

        monthObj.length = 0;
        if (this.realYear == selectYearCut && !this.selectPrevious) {
          for (var m = 1; m <= this.realMonth; m++) {
            monthObj.options[m] = new Option(m + this.monthTextUnit, m + this.monthValueUnit);
          }
          monthObj.options[0] = new Option("--", "");
          if (selectMonthCut > monthObj.length -1) {
            monthObj.options[0].selected = true;
            dayObj.options[0].selected = true;
            $(monthObj).next().children(".customSelectInner").text("--");
            $(dayObj).next().children(".customSelectInner").text("--");
          } else {
            monthObj.options[selectMonthCut].selected = true;
            if(selectMonthCut === 0){
              $(monthObj).next().children(".customSelectInner").text("--");
            }else{
              $(dayObj).next().children(".customSelectInner").text(selectMonthCut + this.monthTextUnit);
            }


            dayObj.length = 0;
            dateObj = new Date(selectYearCut, selectMonthCut, 0);
            maxDays = dateObj.getDate();
            if(selectMonthCut == monthObj.length -1 ){
              for (var i = 1; i <= this.realdate; i++) {
                dayObj.options[i] = new Option(i + this.dayTextUnit, i + this.dayValueUnit);
              }
            }else{
              for(var j = 1; j<=maxDays; j++){
                dayObj.options[j] = new Option(j + this.dayTextUnit, j + this.dayValueUnit);
              }
            }

            dayObj.options[0] = new Option("--", "");
            if (selectDayCut > dayObj.length -1) {
              dayObj.options[0].selected = true;
              $(dayObj).next().children(".customSelectInner").text("--");
            } else if (selectDayCut === 0 || selectDayCut === '0') {
              dayObj.options[selectDayCut].selected = true;
              $(dayObj).next().children(".customSelectInner").text("--");
            } else {
              dayObj.options[selectDayCut].selected = true;
              $(dayObj).next().children(".customSelectInner").text(selectDayCut + this.dayTextUnit);
            }
          }
        } else {
          for (var k = 1; k <= 12; k++) {
            monthObj.options[k] = new Option(k + this.monthTextUnit, k + this.monthValueUnit);
          }
          monthObj.options[0] = new Option("--", "");
          if (selectMonthCut > monthObj.length -1) {
            monthObj.options[0].selected = true;
          } else if(monthObj.options[selectMonthCut]){
            monthObj.options[selectMonthCut].selected = true;
          }else{
            $(monthObj).trigger('render');
          }

          if (selectYear && selectMonth) {
            dateObj = new Date(selectYearCut, selectMonthCut, 0);
            maxDays = dateObj.getDate();

            dayObj.length = 0;
            for (var n = 1; n <= maxDays; n++) {
              dayObj.options[n] = new Option(n + this.dayTextUnit, n + this.dayValueUnit);
            }
            dayObj.options[0] = new Option("--", "");
            if (selectDayCut > dayObj.length -1) {
              dayObj.options[0].selected = true;
              $(dayObj).next().children(".customSelectInner").text("--");
            } else if (selectDayCut === 0 || selectDayCut === '0') {
              dayObj.options[selectDayCut].selected = true;
              $(dayObj).next().children(".customSelectInner").text("--");
            } else if(dayObj.options[selectDayCut]){
              dayObj.options[selectDayCut].selected = true;
              $(dayObj).next().children(".customSelectInner").text(selectDayCut + this.dayTextUnit);
            }else{
              $(dayObj).trigger('render');
            }
          }
        }
      }
    }
  };









  $(function(){
    if(/Android/.test(window.navigator.userAgent)){
      $('body').addClass('is-android');
    }

    $("#withJanCodeForm").each(function(){
      c1084();
    });

    App.init();
  });

}(jQuery, window));









/*!
 * jquery.customSelect() - v0.5.1
 * http://adam.co/lab/jquery/customselect/
 * 2014-04-19
 *
 * Copyright 2013 Adam Coulombe
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License
 */
(function(a){
  /*jshint bitwise: false */
  /*jshint eqeqeq: false */
  /*jshint sub: true */
  /*jshint funcscope: true */
  /*jshint eqnull: true */
  /*jshint shadow: true */
  /*jshint lastsemic: true */
  a.fn.extend({customSelect:function(c){if(typeof document.body.style.maxHeight==="undefined"){return this}var e={customClass:"customSelect",mapClass:true,mapStyle:true},c=a.extend(e,c),d=c.customClass,f=function(h,k){var g=h.find(":selected"),j=k.children(":first"),i=g.html()||"&nbsp;";j.html(i);if(g.attr("disabled")){k.addClass(b("DisabledOption"))}else{k.removeClass(b("DisabledOption"))}setTimeout(function(){k.removeClass(b("Open"));a(document).off("mouseup.customSelect")},60)},b=function(g){return d+g};return this.each(function(){var g=a(this),i=a("<span />").addClass(b("Inner")),h=a("<span />");g.after(h.append(i));h.addClass(d);if(c.mapClass){h.addClass(g.attr("class")).removeClass(function(i,c){return (c.match(/\bvalidate\[\S+/g)||[]).join(' ');})}if(c.mapStyle){h.attr("style",g.attr("style"))}g.addClass("hasCustomSelect").on("render.customSelect",function(){f(g,h);g.css("width","");var k=parseInt(g.outerWidth(),10)-(parseInt(h.outerWidth(),10)-parseInt(h.width(),10));h.css({display:"inline-block"});var j=h.outerHeight();if(g.attr("disabled")){h.addClass(b("Disabled"))}else{h.removeClass(b("Disabled"))}i.css({width:k,display:"inline-block"});g.css({"-webkit-appearance":"menulist-button",width:h.outerWidth(),position:"absolute",opacity:0,height:j,fontSize:h.css("font-size")})}).on("change.customSelect",function(){h.addClass(b("Changed"));f(g,h)}).on("keyup.customSelect",function(j){if(!h.hasClass(b("Open"))){g.trigger("blur.customSelect");g.trigger("focus.customSelect")}else{if(j.which==13||j.which==27){f(g,h)}}}).on("mousedown.customSelect",function(){h.removeClass(b("Changed"))}).on("mouseup.customSelect",function(j){if(!h.hasClass(b("Open"))){if(a("."+b("Open")).not(h).length>0&&typeof InstallTrigger!=="undefined"){g.trigger("focus.customSelect")}else{h.addClass(b("Open"));j.stopPropagation();a(document).one("mouseup.customSelect",function(k){if(k.target!=g.get(0)&&a.inArray(k.target,g.find("*").get())<0){g.trigger("blur.customSelect")}else{f(g,h)}})}}}).on("focus.customSelect",function(){h.removeClass(b("Changed")).addClass(b("Focus"))}).on("blur.customSelect",function(){h.removeClass(b("Focus")+" "+b("Open"))}).on("mouseenter.customSelect",function(){h.addClass(b("Hover"))}).on("mouseleave.customSelect",function(){h.removeClass(b("Hover"))}).trigger("render.customSelect")})}})})(jQuery);







/*
 * Inline Form Validation Engine 2.6.2, jQuery plugin
 *
 * Copyright(c) 2010, Cedric Dugas
 * http://www.position-absolute.com
 *
 * 2.0 Rewrite by Olivier Refalo
 * http://www.crionics.com
 *
 * Form validation engine allowing custom regex rules to be added.
 * Licensed under the MIT License
 */
(function($) {

  /*jshint bitwise: false */
  /*jshint eqeqeq: false */
  /*jshint sub: true */
  /*jshint funcscope: true */
  /*jshint eqnull: true */
  /*jshint shadow: true */
  /*jshint lastsemic: true */

  "use strict";

  var methods = {

    /**
     * Kind of the constructor, called before any action
     * @param {Map} user options
     */
    init: function(options) {
      var form = this;
      if (!form.data('jqv') || form.data('jqv') === null ) {
        options = methods._saveOptions(form, options);
        //bind all formError elements to close on click
        //$(document).on("click", ".formError", function() {
        // $(this).fadeOut(150, function() {
        //   // remove prompt once invisible
        //   $(this).closest('.formError').remove();
        // });
        //$(this).addClass('is-hide-err');
        //});
      }
      return this;
    },
    /**
     * Attachs jQuery.validationEngine to form.submit and field.blur events
     * Takes an optional params: a list of options
     * ie. jQuery("#formID1").validationEngine('attach', {promptPosition : "centerRight"});
     */
    attach: function(userOptions) {

      var form = this;
      var options;

      if(userOptions)
        options = methods._saveOptions(form, userOptions);
      else
        options = form.data('jqv');

      options.validateAttribute = (form.find("[data-validation-engine*=validate]").length) ? "data-validation-engine" : "class";
      if (options.binded) {

        // delegate fields
        form.on(options.validationEventTrigger, "["+options.validateAttribute+"*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", methods._onFieldEvent);
        form.on("click", "["+options.validateAttribute+"*=validate][type=checkbox],["+options.validateAttribute+"*=validate][type=radio]", methods._onFieldEvent);
        form.on(options.validationEventTrigger,"["+options.validateAttribute+"*=validate][class*=datepicker]", {"delay": 300}, methods._onFieldEvent);
      }
      if (options.autoPositionUpdate) {
        $(window).bind("resize", {
          "noAnimation": true,
          "formElem": form
        }, methods.updatePromptsPosition);
      }
      form.on("click","a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", methods._submitButtonClick);
      form.removeData('jqv_submitButton');

      // bind form.submit
      form.on("submit", methods._onSubmitEvent);
      return this;
    },
    /**
     * Unregisters any bindings that may point to jQuery.validaitonEngine
     */
    detach: function() {

      var form = this;
      var options = form.data('jqv');

      // unbind fields
      form.off(options.validationEventTrigger, "["+options.validateAttribute+"*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", methods._onFieldEvent);
      form.off("click", "["+options.validateAttribute+"*=validate][type=checkbox],["+options.validateAttribute+"*=validate][type=radio]", methods._onFieldEvent);
      form.off(options.validationEventTrigger,"["+options.validateAttribute+"*=validate][class*=datepicker]", methods._onFieldEvent);

      // unbind form.submit
      form.off("submit", methods._onSubmitEvent);
      form.removeData('jqv');

      form.off("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", methods._submitButtonClick);
      form.removeData('jqv_submitButton');

      if (options.autoPositionUpdate)
        $(window).off("resize", methods.updatePromptsPosition);

      return this;
    },
    /**
     * Validates either a form or a list of fields, shows prompts accordingly.
     * Note: There is no ajax form validation with this method, only field ajax validation are evaluated
     *
     * @return true if the form validates, false if it fails
     */
    validate: function(userOptions) {
      var element = $(this);
      var valid = null;
      var options;

      if (element.is("form") || element.hasClass("validationEngineContainer")) {
        if (element.hasClass('validating')) {
          // form is already validating.
          // Should abort old validation and start new one. I don't know how to implement it.
          return false;
        } else {
          element.addClass('validating');
          if(userOptions)
            options = methods._saveOptions(element, userOptions);
          else
            options = element.data('jqv');
          valid = methods._validateFields(this);

          // If the form doesn't validate, clear the 'validating' class before the user has a chance to submit again
          setTimeout(function(){
            element.removeClass('validating');
          }, 100);
          if (valid && options.onSuccess) {
            options.onSuccess();
          } else if (!valid && options.onFailure) {
            options.onFailure();
          }
        }
      } else if (element.is('form') || element.hasClass('validationEngineContainer')) {
        element.removeClass('validating');
      } else {
        // field validation
        var form = element.closest('form, .validationEngineContainer');
        options = (form.data('jqv')) ? form.data('jqv') : $.validationEngine.defaults;
        valid = methods._validateField(element, options);

        if (valid && options.onFieldSuccess)
          options.onFieldSuccess();
        else if (options.onFieldFailure && options.InvalidFields.length > 0) {
          options.onFieldFailure();
        }

        return !valid;
      }
      if(options.onValidationComplete) {
        // !! ensures that an undefined return is interpreted as return false but allows a onValidationComplete() to possibly return true and have form continue processing
        return !!options.onValidationComplete(form, valid);
      }
      return valid;
    },
    /**
     *  Redraw prompts position, useful when you change the DOM state when validating
     */
    updatePromptsPosition: function(event) {

      if (event && this == window) {
        var form = event.data.formElem;
        var noAnimation = event.data.noAnimation;
      }
      else
        var form = $(this.closest('form, .validationEngineContainer'));

      var options = form.data('jqv');
      // No option, take default one
      if (!options)
        options = methods._saveOptions(form, options);

      form.find('['+options.validateAttribute+'*=validate]').not(":disabled").each(function(){
        var field = $(this);
        if (options.prettySelect && field.is(":hidden"))
          field = form.find("#" + options.usePrefix + field.attr('id') + options.useSuffix);
        var prompt = methods._getPrompt(field);
        var promptText = $(prompt).find(".formErrorContent").html();

        if(prompt)
          methods._updatePrompt(field, $(prompt), promptText, undefined, false, options, noAnimation);
      });
      return this;
    },
    /**
     * Displays a prompt on a element.
     * Note that the element needs an id!
     *
     * @param {String} promptText html text to display type
     * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
     * @param {String} possible values topLeft, topRight, bottomLeft, centerRight, bottomRight
     */
    showPrompt: function(promptText, type, promptPosition, showArrow) {
      var form = this.closest('form, .validationEngineContainer');
      var options = form.data('jqv');
      // No option, take default one
      if(!options)
        options = methods._saveOptions(this, options);
      if(promptPosition)
        options.promptPosition=promptPosition;
      options.showArrow = showArrow===true;

      methods._showPrompt(this, promptText, type, false, options);
      return this;
    },
    /**
     * Closes form error prompts, CAN be invidual
     */
    hide: function() {
      var form = $(this).closest('form, .validationEngineContainer');
      var options = form.data('jqv');
      // No option, take default one
      if (!options)
        options = methods._saveOptions(form, options);
      var fadeDuration = (options && options.fadeDuration) ? options.fadeDuration : 0.3;
      var closingtag;

      if(form.is("form") || form.hasClass("validationEngineContainer")) {
        closingtag = "parentForm"+methods._getClassName($(form).attr("id"));
      } else {
        closingtag = methods._getClassName($(form).attr("id")) +"formError";
      }
      $('.'+closingtag).fadeTo(fadeDuration, 0, function() {
        $(this).closest('.formError').remove();
      });
      return this;
    },
    /**
     * Closes all error prompts on the page
     */
    hideAll: function() {
      var form = this;
      var options = form.data('jqv');
      var duration = options ? options.fadeDuration:300;
      $('.formError').fadeTo(duration, 0, function() {
        $(this).closest('.formError').remove();
      });
      return this;
    },
    /**
     * Typically called when user exists a field using tab or a mouse click, triggers a field
     * validation
     */
    _onFieldEvent: function(event) {
      var field = $(this);
      var form = field.closest('form, .validationEngineContainer');
      var options = form.data('jqv');
      // No option, take default one
      if (!options)
        options = methods._saveOptions(form, options);
      options.eventTrigger = "field";

      if (options.notEmpty === true){

        if(field.val().length > 0){
          // validate the current field
          window.setTimeout(function() {
            methods._validateField(field, options);
          }, (event.data) ? event.data.delay : 0);

        }

      }else{

        // validate the current field
        window.setTimeout(function() {
          methods._validateField(field, options);
        }, (event.data) ? event.data.delay : 0);

      }




    },
    /**
     * Called when the form is submited, shows prompts accordingly
     *
     * @param {jqObject}
     *            form
     * @return false if form submission needs to be cancelled
     */
    _onSubmitEvent: function() {
      var form = $(this);
      var options = form.data('jqv');

      //$('.formError').removeClass('is-hide-err');

      //check if it is trigger from skipped button
      if (form.data("jqv_submitButton")){
        var submitButton = $("#" + form.data("jqv_submitButton"));
        if (submitButton){
          if (submitButton.length > 0){
            if (submitButton.hasClass("validate-skip") || submitButton.attr("data-validation-engine-skip") == "true")
              return true;
          }
        }
      }

      options.eventTrigger = "submit";

      // validate each field
      // (- skip field ajax validation, not necessary IF we will perform an ajax form validation)
      var r=methods._validateFields(form);

      if (r && options.ajaxFormValidation) {
        methods._validateFormWithAjax(form, options);
        // cancel form auto-submission - process with async call onAjaxFormComplete
        return false;
      }

      if(options.onValidationComplete) {
        // !! ensures that an undefined return is interpreted as return false but allows a onValidationComplete() to possibly return true and have form continue processing
        return !!options.onValidationComplete(form, r, options);
      }
      return r;
    },
    /**
     * Return true if the ajax field validations passed so far
     * @param {Object} options
     * @return true, is all ajax validation passed so far (remember ajax is async)
     */
    _checkAjaxStatus: function(options) {
      var status = true;
      $.each(options.ajaxValidCache, function(key, value) {
        if (!value) {
          status = false;
          // break the each
          return false;
        }
      });
      return status;
    },

    /**
     * Return true if the ajax field is validated
     * @param {String} fieldid
     * @param {Object} options
     * @return true, if validation passed, false if false or doesn't exist
     */
    _checkAjaxFieldStatus: function(fieldid, options) {
      return options.ajaxValidCache[fieldid] === true;
    },
    /**
     * Validates form fields, shows prompts accordingly
     *
     * @param {jqObject}
     *            form
     * @param {skipAjaxFieldValidation}
     *            boolean - when set to true, ajax field validation is skipped, typically used when the submit button is clicked
     *
     * @return true if form is valid, false if not, undefined if ajax form validation is done
     */
    _validateFields: function(form) {
      var options = form.data('jqv');

      // this variable is set to true if an error is found
      var errorFound = false;

      // Trigger hook, start validation
      form.trigger("jqv.form.validating");
      // first, evaluate status of non ajax fields
      var first_err=null;
      form.find('['+options.validateAttribute+'*=validate]').not(":disabled").each( function() {
        var field = $(this);
        var names = [];
        if ($.inArray(field.attr('name'), names) < 0) {
          errorFound |= methods._validateField(field, options);
          if (errorFound && first_err===null)
            if (field.is(":hidden") && options.prettySelect)
              first_err = field = form.find("#" + options.usePrefix + methods._jqSelector(field.attr('id')) + options.useSuffix);
            else {

              //Check if we need to adjust what element to show the prompt on
              //and and such scroll to instead
              if(field.data('jqv-prompt-at') instanceof jQuery ){
                field = field.data('jqv-prompt-at');
              } else if(field.data('jqv-prompt-at')) {
                field = $(field.data('jqv-prompt-at'));
              }
              first_err=field;
            }
          if (options.doNotShowAllErrosOnSubmit)
            return false;
          names.push(field.attr('name'));

          //if option set, stop checking validation rules after one error is found
          if(options.showOneMessage === true && errorFound){
            return false;
          }
        }
      });

      // second, check to see if all ajax calls completed ok
      // errorFound |= !methods._checkAjaxStatus(options);

      // third, check status and scroll the container accordingly
      form.trigger("jqv.form.result", [errorFound]);

      if (errorFound) {
        if (options.scroll) {
          var destination=first_err.offset().top;
          var fixleft = first_err.offset().left;

          //prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
          var positionType=options.promptPosition;
          if (typeof(positionType)=='string' && positionType.indexOf(":")!=-1)
            positionType=positionType.substring(0,positionType.indexOf(":"));

          if (positionType!="bottomRight" && positionType!="bottomLeft") {
            var prompt_err= methods._getPrompt(first_err);
            if (prompt_err) {
              destination=prompt_err.offset().top;
            }
          }

          // Offset the amount the page scrolls by an amount in px to accomodate fixed elements at top of page
          if (options.scrollOffset) {
            destination -= options.scrollOffset;
          }

          // get the position of the first error, there should be at least one, no need to check this
          //var destination = form.find(".formError:not('.greenPopup'):first").offset().top;

          //console.log(options.isOverflown);
          if (options.isOverflown) {
            var overflowDIV = $(options.overflownDIV);
            if(!overflowDIV.length) return false;
            var scrollContainerScroll = overflowDIV.scrollTop();
            var scrollContainerPos = -parseInt(overflowDIV.offset().top);

            destination += scrollContainerScroll + scrollContainerPos - 5;
            var scrollContainer = $(options.overflownDIV).filter(":not(:animated)");

            scrollContainer.animate({ scrollTop: destination }, 1100, function(){
              if(options.focusFirstField) first_err.focus();
            });

          } else {
            //$("html, body").animate({
            //  //scrollTop: destination
            //  scrollTop: 10
            //}, 1100, function(){
            //  //if(options.focusFirstField) first_err.focus();
            //});
            //$("html, body").animate({scrollLeft: fixleft},1100);

            $('body,html').animate({
              //scrollTop: destination ? destination - 80 : 10
              scrollTop: 0
            }, 1000, 'swing');
            $(".validation-error-box").show();
          }

        } else if(options.focusFirstField)
          first_err.focus();
        return false;
      }
      return true;
    },
    /**
     * This method is called to perform an ajax form validation.
     * During this process all the (field, value) pairs are sent to the server which returns a list of invalid fields or true
     *
     * @param {jqObject} form
     * @param {Map} options
     */
    _validateFormWithAjax: function(form, options) {

      var data = form.serialize();
      var type = (options.ajaxFormValidationMethod) ? options.ajaxFormValidationMethod : "GET";
      var url = (options.ajaxFormValidationURL) ? options.ajaxFormValidationURL : form.attr("action");
      var dataType = (options.dataType) ? options.dataType : "json";
      $.ajax({
        type: type,
        url: url,
        cache: false,
        dataType: dataType,
        data: data,
        form: form,
        methods: methods,
        options: options,
        beforeSend: function() {
          return options.onBeforeAjaxFormValidation(form, options);
        },
        error: function(data, transport) {
          if (options.onFailure) {
            options.onFailure(data, transport);
          } else {
            methods._ajaxError(data, transport);
          }
        },
        success: function(json) {
          if ((dataType == "json") && (json !== true)) {
            // getting to this case doesn't necessary means that the form is invalid
            // the server may return green or closing prompt actions
            // this flag helps figuring it out
            var errorInForm=false;
            for (var i = 0; i < json.length; i++) {
              var value = json[i];

              var errorFieldId = value[0];
              var errorField = $($("#" + errorFieldId)[0]);

              // make sure we found the element
              if (errorField.length == 1) {

                // promptText or selector
                var msg = value[2];
                // if the field is valid
                if (value[1] === true) {

                  if (msg === ""  || !msg){
                    // if for some reason, status==true and error="", just close the prompt
                    methods._closePrompt(errorField);
                  } else {
                    // the field is valid, but we are displaying a green prompt
                    if (options.allrules[msg]) {
                      var txt = options.allrules[msg].alertTextOk;
                      if (txt)
                        msg = txt;
                    }
                    if (options.showPrompts) methods._showPrompt(errorField, msg, "pass", false, options, true);
                  }
                } else {
                  // the field is invalid, show the red error prompt
                  errorInForm|=true;
                  if (options.allrules[msg]) {
                    var txt = options.allrules[msg].alertText;
                    if (txt)
                      msg = txt;
                  }
                  if(options.showPrompts) methods._showPrompt(errorField, msg, "", false, options, true);
                }
              }
            }
            options.onAjaxFormComplete(!errorInForm, form, json, options);
          } else
            options.onAjaxFormComplete(true, form, json, options);

        }
      });

    },
    /**
     * Validates field, shows prompts accordingly
     *
     * @param {jqObject}
     *            field
     * @param {Array[String]}
     *            field's validation rules
     * @param {Map}
     *            user options
     * @return false if field is valid (It is inversed for *fields*, it return false on validate and true on errors.)
     */
    _validateField: function(field, options, skipAjaxValidation) {
      if (!field.attr("id")) {
        field.attr("id", "form-validation-field-" + $.validationEngine.fieldIdCounter);
        ++$.validationEngine.fieldIdCounter;
      }

      if(field.hasClass(options.ignoreFieldsWithClass))
        return false;

      if (!options.validateNonVisibleFields && (field.is(":hidden") && !options.prettySelect || field.parent().is(":hidden")))
        return false;

      var rulesParsing = field.attr(options.validateAttribute);
      var getRules = /validate\[(.*)\]/.exec(rulesParsing);


      if (!getRules)
        return false;
      var str = getRules[1];
      var rules = str.split(/\[|,|\]/);


      // true if we ran the ajax validation, tells the logic to stop messing with prompts
      var isAjaxValidator = false;
      var fieldName = field.attr("name");
      var promptText = "";
      var promptType = "";
      var required = false;
      var limitErrors = false;
      options.isError = false;
      options.showArrow = true;

      // If the programmer wants to limit the amount of error messages per field,
      if (options.maxErrorsPerField > 0) {
        limitErrors = true;
      }

      var form = $(field.closest("form, .validationEngineContainer"));
      // Fix for adding spaces in the rules
      for (var i = 0; i < rules.length; i++) {
        rules[i] = rules[i].toString().replace(" ", "");//.toString to worked on IE8
        // Remove any parsing errors
        if (rules[i] === '') {
          delete rules[i];
        }
      }

      for (var i = 0, field_errors = 0; i < rules.length; i++) {

        // If we are limiting errors, and have hit the max, break
        if (limitErrors && field_errors >= options.maxErrorsPerField) {
          // If we haven't hit a required yet, check to see if there is one in the validation rules for this
          // field and that it's index is greater or equal to our current index
          if (!required) {
            var have_required = $.inArray('required', rules);
            required = (have_required != -1 &&  have_required >= i);
          }
          break;
        }


        var errorMsg = undefined;

        switch (rules[i]) {

          case "required":
            required = true;
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._required);
            break;
          case "custom":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._custom);
            break;
          case "groupRequired":
            // Check is its the first of group, if not, reload validation with first field
            // AND continue normal validation on present field
            var classGroup = "["+options.validateAttribute+"*=" +rules[i + 1] +"]";
            var firstOfGroup = form.find(classGroup).eq(0);
            if(firstOfGroup[0] != field[0]){

              methods._validateField(firstOfGroup, options, skipAjaxValidation);
              options.showArrow = true;

            }
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._groupRequired);
            if(errorMsg)  required = true;
            options.showArrow = false;
            break;
          case "ajax":
            // AJAX defaults to returning it's loading message
            errorMsg = methods._ajax(field, rules, i, options);
            if (errorMsg) {
              promptType = "load";
            }
            break;
          case "minSize":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._minSize);
            break;
          case "maxSize":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._maxSize);
            break;
          case "charCount":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._charCount);
            break;
          case "zipSize":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._zipSize);
            break;
          case "min":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._min);
            break;
          case "max":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._max);
            break;
          case "past":
            errorMsg = methods._getErrorMessage(form, field,rules[i], rules, i, options, methods._past);
            break;
          case "future":
            errorMsg = methods._getErrorMessage(form, field,rules[i], rules, i, options, methods._future);
            break;
          case "dateRange":
            var classGroup = "["+options.validateAttribute+"*=" + rules[i + 1] + "]";
            options.firstOfGroup = form.find(classGroup).eq(0);
            options.secondOfGroup = form.find(classGroup).eq(1);

            //if one entry out of the pair has value then proceed to run through validation
            if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
              errorMsg = methods._getErrorMessage(form, field,rules[i], rules, i, options, methods._dateRange);
            }
            if (errorMsg) required = true;
            options.showArrow = false;
            break;

          case "dateTimeRange":
            var classGroup = "["+options.validateAttribute+"*=" + rules[i + 1] + "]";
            options.firstOfGroup = form.find(classGroup).eq(0);
            options.secondOfGroup = form.find(classGroup).eq(1);

            //if one entry out of the pair has value then proceed to run through validation
            if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
              errorMsg = methods._getErrorMessage(form, field,rules[i], rules, i, options, methods._dateTimeRange);
            }
            if (errorMsg) required = true;
            options.showArrow = false;
            break;
          case "maxCheckbox":
            field = $(form.find("input[name='" + fieldName + "']"));
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._maxCheckbox);
            break;
          case "minCheckbox":
            field = $(form.find("input[name='" + fieldName + "']"));
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._minCheckbox);
            break;
          case "equals":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._equals);
            break;
          case "funcCall":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._funcCall);
            break;
          case "creditCard":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._creditCard);
            break;
          case "condRequired":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._condRequired);
            if (errorMsg !== undefined) {
              required = true;
            }
            break;
          case "funcCallRequired":
            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._funcCallRequired);
            if (errorMsg !== undefined) {
              required = true;
            }
            break;

          default:
        }

        var end_validation = false;

        // If we were passed back an message object, check what the status was to determine what to do
        if (typeof errorMsg == "object") {
          switch (errorMsg.status) {
            case "_break":
              end_validation = true;
              break;
            // If we have an error message, set errorMsg to the error message
            case "_error":
              errorMsg = errorMsg.message;
              break;
            // If we want to throw an error, but not show a prompt, return early with true
            case "_error_no_prompt":
              return true;
            //break;
            // Anything else we continue on
            default:
              break;
          }
        }

        //funcCallRequired, first in rules, and has error, skip anything else
        if( i===0 && str.indexOf('funcCallRequired')===0 && errorMsg !== undefined ){
          if(promptText !== '') {
            promptText += "<br/>";
          }
          promptText += errorMsg;
          options.isError=true;
          field_errors++;
          end_validation=true;
        }

        // If it has been specified that validation should end now, break
        if (end_validation) {
          break;
        }

        // If we have a string, that means that we have an error, so add it to the error message.
        if (typeof errorMsg == 'string') {
          if(promptText !== '') {
            promptText += "<br/>";
          }
          promptText += errorMsg;
          options.isError = true;
          field_errors++;
        }
      }
      // If the rules required is not added, an empty field is not validated
      //the 3rd condition is added so that even empty password fields should be equal
      //otherwise if one is filled and another left empty, the "equal" condition would fail
      //which does not make any sense
      if(!required && !(field.val()) && field.val().length < 1 && $.inArray('equals', rules) < 0) options.isError = false;

      // Hack for radio/checkbox group button, the validation go into the
      // first radio/checkbox of the group
      var fieldType = field.prop("type");
      var positionType=field.data("promptPosition") || options.promptPosition;

      if ((fieldType == "radio" || fieldType == "checkbox") && form.find("input[name='" + fieldName + "']").size() > 1) {
        if(positionType === 'inline') {
          field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:last"));
        } else {
          field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:first"));
        }
        options.showArrow = options.showArrowOnRadioAndCheckbox;
      }

      if(field.is(":hidden") && options.prettySelect) {
        field = form.find("#" + options.usePrefix + methods._jqSelector(field.attr('id')) + options.useSuffix);
      }

      if (options.isError && options.showPrompts){
        methods._showPrompt(field, promptText, promptType, false, options);
      }else{
        if (!isAjaxValidator) methods._closePrompt(field);
        field.removeClass('is-validate--error');
        if(field.parent('.c-input--combined-label').length > 0){
          field.parent('.c-input--combined-label').removeClass('is-validate--error');
        }
        if(field.attr("type") == 'password'){
          field.prev('input').removeClass('is-validate--error');
        }
        //アコーディオン内の高さ調整
        $('.c-accordion__body').trigger('update');
      }

      if (!isAjaxValidator) {
        field.trigger("jqv.field.result", [field, options.isError, promptText]);
      }

      /* Record error */
      var errindex = $.inArray(field[0], options.InvalidFields);
      if (errindex == -1) {
        if (options.isError)
          options.InvalidFields.push(field[0]);
      } else if (!options.isError) {
        options.InvalidFields.splice(errindex, 1);
      }

      methods._handleStatusCssClasses(field, options);

      /* run callback function for each field */
      if (options.isError && options.onFieldFailure)
        options.onFieldFailure(field);

      if (!options.isError && options.onFieldSuccess)
        options.onFieldSuccess(field);

      return options.isError;
    },
    /**
     * Handling css classes of fields indicating result of validation
     *
     * @param {jqObject}
     *            field
     * @param {Array[String]}
     *            field's validation rules
     * @private
     */
    _handleStatusCssClasses: function(field, options) {
      /* remove all classes */
      if(options.addSuccessCssClassToField)
        field.removeClass(options.addSuccessCssClassToField);

      if(options.addFailureCssClassToField)
        field.removeClass(options.addFailureCssClassToField);

      /* Add classes */
      if (options.addSuccessCssClassToField && !options.isError)
        field.addClass(options.addSuccessCssClassToField);

      if (options.addFailureCssClassToField && options.isError)
        field.addClass(options.addFailureCssClassToField);
    },

    /********************
     * _getErrorMessage
     *
     * @param form
     * @param field
     * @param rule
     * @param rules
     * @param i
     * @param options
     * @param originalValidationMethod
     * @return {*}
     * @private
     */
    _getErrorMessage:function (form, field, rule, rules, i, options, originalValidationMethod) {
      // If we are using the custon validation type, build the index for the rule.
      // Otherwise if we are doing a function call, make the call and return the object
      // that is passed back.
      var rule_index = jQuery.inArray(rule, rules);
      if (rule === "custom" || rule === "funcCall" || rule === "funcCallRequired") {
        var custom_validation_type = rules[rule_index + 1];
        rule = rule + "[" + custom_validation_type + "]";
        // Delete the rule from the rules array so that it doesn't try to call the
        // same rule over again
        delete(rules[rule_index]);
      }
      // Change the rule to the composite rule, if it was different from the original
      var alteredRule = rule;


      var element_classes = (field.attr("data-validation-engine")) ? field.attr("data-validation-engine") : field.attr("class");
      var element_classes_array = element_classes.split(" ");

      // Call the original validation method. If we are dealing with dates or checkboxes, also pass the form
      var errorMsg;
      if (rule == "future" || rule == "past"  || rule == "maxCheckbox" || rule == "minCheckbox") {
        errorMsg = originalValidationMethod(form, field, rules, i, options);
      } else {
        errorMsg = originalValidationMethod(field, rules, i, options);
      }

      // If the original validation method returned an error and we have a custom error message,
      // return the custom message instead. Otherwise return the original error message.
      if (errorMsg !== undefined) {
        var custom_message = methods._getCustomErrorMessage($(field), element_classes_array, alteredRule, options);
        if (custom_message) errorMsg = custom_message;
      }
      return errorMsg;

    },
    _getCustomErrorMessage:function (field, classes, rule, options) {
      var custom_message = false;
      var validityProp = /^custom\[.*\]$/.test(rule) ? methods._validityProp["custom"] : methods._validityProp[rule];
      if(/symbol/.test(rule)){ return custom_message; }
      // If there is a validityProp for this rule, check to see if the field has an attribute for it
      if (validityProp !== undefined) {
        custom_message = field.attr("data-errormessage-"+validityProp);
        // If there was an error message for it, return the message
        if (custom_message !== undefined)
          return custom_message;
      }
      custom_message = field.attr("data-errormessage");
      // If there is an inline custom error message, return it
      if (custom_message !== undefined)
        return custom_message;
      var id = '#' + field.attr("id");
      // If we have custom messages for the element's id, get the message for the rule from the id.
      // Otherwise, if we have custom messages for the element's classes, use the first class message we find instead.
      if (typeof options.custom_error_messages[id] != "undefined" &&
        typeof options.custom_error_messages[id][rule] != "undefined" ) {
        custom_message = options.custom_error_messages[id][rule]['message'];
      } else if (classes.length > 0) {
        for (var i = 0; i < classes.length && classes.length > 0; i++) {
          var element_class = "." + classes[i];
          if (typeof options.custom_error_messages[element_class] != "undefined" &&
            typeof options.custom_error_messages[element_class][rule] != "undefined") {
            custom_message = options.custom_error_messages[element_class][rule]['message'];
            break;
          }
        }
      }
      if (!custom_message &&
        typeof options.custom_error_messages[rule] != "undefined" &&
        typeof options.custom_error_messages[rule]['message'] != "undefined"){
        custom_message = options.custom_error_messages[rule]['message'];
      }
      return custom_message;
    },
    _validityProp: {
      "required": "value-missing",
      "custom": "custom-error",
      "groupRequired": "value-missing",
      "ajax": "custom-error",
      "minSize": "range-underflow",
      "maxSize": "range-overflow",
      "min": "range-underflow",
      "max": "range-overflow",
      "past": "type-mismatch",
      "future": "type-mismatch",
      "dateRange": "type-mismatch",
      "dateTimeRange": "type-mismatch",
      "maxCheckbox": "range-overflow",
      "minCheckbox": "range-underflow",
      "equals": "pattern-mismatch",
      "funcCall": "custom-error",
      "funcCallRequired": "custom-error",
      "creditCard": "pattern-mismatch",
      "condRequired": "value-missing"
    },
    /**
     * Required validation
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @param {bool} condRequired flag when method is used for internal purpose in condRequired check
     * @return an error string if validation failed
     */
    _required: function(field, rules, i, options, condRequired) {
      switch (field.prop("type")) {
        case "radio":
        case "checkbox":
          // new validation style to only check dependent field
          if (condRequired) {
            if (!field.prop('checked')) {
              return options.allrules[rules[i]].alertTextCheckboxMultiple;
            }
            break;
          }
          // old validation style
          var form = field.closest("form, .validationEngineContainer");
          var name = field.attr("name");
          if (form.find("input[name='" + name + "']:checked").size() === 0) {
            if (form.find("input[name='" + name + "']:visible").size() == 1)
              return options.allrules[rules[i]].alertTextCheckboxe;
            else
              return options.allrules[rules[i]].alertTextCheckboxMultiple;
          }
          break;
        //case "text":
        //case "password":
        //case "textarea":
        //case "file":
        //case "select-one":
        //case "select-multiple":
        default:
          var field_val      = $.trim( field.val()                               );
          var dv_placeholder = $.trim( field.attr("data-validation-placeholder") );
          var placeholder    = $.trim( field.attr("placeholder")                 );
          if (
            ( !field_val ) || ( dv_placeholder && field_val == dv_placeholder )
          //|| ( placeholder    && field_val == placeholder    )
          ) {
            return options.allrules[rules[i]].alertText;
          }
          break;
      }
    },
    /**
     * Validate that 1 from the group field is required
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _groupRequired: function(field, rules, i, options) {
      var classGroup = "["+options.validateAttribute+"*=" +rules[i + 1] +"]";
      var isValid = false;
      // Check all fields from the group
      field.closest("form, .validationEngineContainer").find(classGroup).each(function(){
        if(!methods._required($(this), rules, i, options)){
          isValid = true;
          return false;
        }
      });

      if(!isValid) {
        return options.allrules[rules[i]].alertText;
      }
    },
    /**
     * Validate rules
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _custom: function(field, rules, i, options) {
      var customRule = rules[i + 1];
      var rule = options.allrules[customRule];
      var fn;
      if(!rule) {
        //console.log("jqv:custom rule not found - "+customRule);
        return;
      }


      if(rule["regex"]) {
        var ex=rule.regex;
        if(!ex) {
          //console.log("jqv:custom regex not found - "+customRule);
          return;
        }
        var pattern = new RegExp(ex);


        if(customRule=='email'){
          //メールアドレス　エラーメッセージ分岐
          var mes = "", chkr = 0;
          if(field.val().match(/^[０-９－ａ-ｚＡ-Ｚぁ-んァ-ー一-龠　]+$/)){
            chkr++;
            mes += "半角で入力してください<br/>";
          }
          if(field.val().length<6){
            chkr++;
            mes += "半角英数字6文字以上で入力してください<br/>";
          }
          if(field.val().match(/[^A-Za-z0-9\_\$\&\-\.\@]/)){
            chkr++;
            mes += "記号は ｢$｣ ｢&｣ ｢@｣ ｢_｣ ｢-｣ ｢.｣のみ使用できます<br/>";
          }
          if(field.val().charAt(0).match(/[^A-Za-z0-9]/)){
            chkr++;
            mes += "メールアドレスの先頭文字は半角英数字しか使用できません<br/>";
          }
          if(field.val().match(/(\.+\@)/)){
            chkr++;
            mes += "「@」の直前に「.」は使用できません<br/>";
          }
          if(!field.val().match(/\@/)){
            chkr++;
            mes += "「@」が使用されていません<br/>";
          }
          if(field.val().match(/\@{2,}|\@.+\@/)){
            chkr++;
            mes += "「@」は2つ以上使用できません<br/>";
          }
          if(field.val().split('@')[1]){
            if(!field.val().split('@')[1].match(/\./)){
              chkr++;
              mes += "「@」以降、「.」を必ず使用してください<br/>";
            }
            if(field.val().split('@')[1].match(/\.{2,}/)){
              chkr++;
              mes += "「@」以降、「.」を連続して使用できません<br/>";
            }
          }
          if(field.val().match(/[^A-Za-z]$/)){
            chkr++;
            mes += "メールアドレスの最後は半角英字を使用してください<br/>";
          }
          if(chkr>=1){
            mes = mes.replace(/<br\s*[\/]?>$/g, '');
            return mes;
          }
        } else if(customRule=='symbol'){
          //console.log('symbol');
          if(pattern.test(field.val())){
            //console.log(options.allrules[customRule].alertText);
            return options.allrules[customRule].alertText;
          }
        } else if(!pattern.test(field.val())){
          return options.allrules[customRule].alertText;
        }


      } else if(rule["func"]) {
        fn = rule["func"];

        if (typeof(fn) !== "function") {
          alert("jqv:custom parameter 'function' is no function - "+customRule);
          return;
        }

        if (!fn(field, rules, i, options))
          return options.allrules[customRule].alertText;
      } else {
        alert("jqv:custom type not allowed "+customRule);
        return;
      }
    },
    /**
     * Validate custom function outside of the engine scope
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _funcCall: function(field, rules, i, options) {
      var functionName = rules[i + 1];
      var fn;
      if(functionName.indexOf('.') >-1)
      {
        var namespaces = functionName.split('.');
        var scope = window;
        while(namespaces.length)
        {
          scope = scope[namespaces.shift()];
        }
        fn = scope;
      }
      else
        fn = window[functionName] || options.customFunctions[functionName];
      if (typeof(fn) == 'function')
        return fn(field, rules, i, options);

    },
    _funcCallRequired: function(field, rules, i, options) {
      return methods._funcCall(field,rules,i,options);
    },
    /**
     * Field match
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _equals: function(field, rules, i, options) {
      var equalsField = rules[i + 1];

      if (field.val() != $("#" + equalsField).val())
        return options.allrules.equals.alertText;
    },
    /**
     * Check the maximum size (in characters)
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _maxSize: function(field, rules, i, options) {
      var max = rules[i + 1];
      var len = field.val().length;

      if (len > max) {
        var rule = options.allrules.maxSize;
        return rule.alertText + max + rule.alertText2;
      }
    },
    /**
     * Check the minimum size (in characters)
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _minSize: function(field, rules, i, options) {
      var min = rules[i + 1];
      var len = field.val().length;

      if (len < min) {
        var rule = options.allrules.minSize;
        return rule.alertText + min + rule.alertText2;
      }
    },

    /**
     * 全角と半角をチェック
     */
    _charCount: function(field, rules, i, options) {
      var max = rules[i + 1];
      var val = field.val();

      function charcount(str) {
        len = 0;
        str = escape(str);
        for (i=0;i<str.length;i++,len++) {
          if (str.charAt(i) == "%") {
            if (str.charAt(++i) == "u") {
              i += 3;
              len++;
            }
            i++;
          }
        }
        return Math.ceil(len.toString() / 2);
      }

      var len = charcount(val);

      if (len > max) {
        return '全半角' + max + '文字以内で入力してください';
      }
    },

    /**
     * Check the zipcode
     */
    _zipSize: function(field, rules, i, options) {
      var min = rules[i + 1];
      var len = field.val().length;

      var pattern = new RegExp(/^[0-9\ ]+$/);

      if (len != min || !pattern.test(field.val())) {
        var rule = options.allrules.zipSize;
        return rule.alertText + min + rule.alertText2;
      }
    },

    /**
     * Check number minimum value
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _min: function(field, rules, i, options) {
      var min = parseFloat(rules[i + 1]);
      var len = parseFloat(field.val());

      if (len < min || field.val()[0] == '0' ) {
        var rule = options.allrules.min;
        if (rule.alertText2) return rule.alertText + min + rule.alertText2;
        return rule.alertText + min;
      }
    },
    /**
     * Check number maximum value
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _max: function(field, rules, i, options) {
      var max = parseFloat(rules[i + 1]);
      var len = parseFloat(field.val());

      if (len >max ) {
        var rule = options.allrules.max;
        if (rule.alertText2) return rule.alertText + max + rule.alertText2;
        //orefalo: to review, also do the translations
        return rule.alertText + max;
      }
    },
    /**
     * Checks date is in the past
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _past: function(form, field, rules, i, options) {

      var p=rules[i + 1];
      var fieldAlt = $(form.find("*[name='" + p.replace(/^#+/, '') + "']"));
      var pdate;

      if (p.toLowerCase() == "now") {
        pdate = new Date();
      } else if (undefined !== fieldAlt.val()) {
        if (fieldAlt.is(":disabled"))
          return;
        pdate = methods._parseDate(fieldAlt.val());
      } else {
        pdate = methods._parseDate(p);
      }
      var vdate = methods._parseDate(field.val());

      if (vdate > pdate ) {
        var rule = options.allrules.past;
        if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
        return rule.alertText + methods._dateToString(pdate);
      }
    },
    /**
     * Checks date is in the future
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _future: function(form, field, rules, i, options) {

      var p=rules[i + 1];
      var fieldAlt = $(form.find("*[name='" + p.replace(/^#+/, '') + "']"));
      var pdate;

      if (p.toLowerCase() == "now") {
        pdate = new Date();
      } else if (undefined !== fieldAlt.val()) {
        if (fieldAlt.is(":disabled"))
          return;
        pdate = methods._parseDate(fieldAlt.val());
      } else {
        pdate = methods._parseDate(p);
      }
      var vdate = methods._parseDate(field.val());

      if (vdate < pdate ) {
        var rule = options.allrules.future;
        if (rule.alertText2)
          return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
        return rule.alertText + methods._dateToString(pdate);
      }
    },
    /**
     * Checks if valid date
     *
     * @param {string} date string
     * @return a bool based on determination of valid date
     */
    _isDate: function (value) {
      var dateRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
      return dateRegEx.test(value);
    },
    /**
     * Checks if valid date time
     *
     * @param {string} date string
     * @return a bool based on determination of valid date time
     */
    _isDateTime: function (value){
      var dateTimeRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
      return dateTimeRegEx.test(value);
    },
    //Checks if the start date is before the end date
    //returns true if end is later than start
    _dateCompare: function (start, end) {
      return (new Date(start.toString()) < new Date(end.toString()));
    },
    /**
     * Checks date range
     *
     * @param {jqObject} first field name
     * @param {jqObject} second field name
     * @return an error string if validation failed
     */
    _dateRange: function (field, rules, i, options) {
      //are not both populated
      if ((!options.firstOfGroup[0].value && options.secondOfGroup[0].value) || (options.firstOfGroup[0].value && !options.secondOfGroup[0].value)) {
        return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
      }

      //are not both dates
      if (!methods._isDate(options.firstOfGroup[0].value) || !methods._isDate(options.secondOfGroup[0].value)) {
        return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
      }

      //are both dates but range is off
      if (!methods._dateCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
        return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
      }
    },
    /**
     * Checks date time range
     *
     * @param {jqObject} first field name
     * @param {jqObject} second field name
     * @return an error string if validation failed
     */
    _dateTimeRange: function (field, rules, i, options) {
      //are not both populated
      if ((!options.firstOfGroup[0].value && options.secondOfGroup[0].value) || (options.firstOfGroup[0].value && !options.secondOfGroup[0].value)) {
        return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
      }
      //are not both dates
      if (!methods._isDateTime(options.firstOfGroup[0].value) || !methods._isDateTime(options.secondOfGroup[0].value)) {
        return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
      }
      //are both dates but range is off
      if (!methods._dateCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
        return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
      }
    },
    /**
     * Max number of checkbox selected
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _maxCheckbox: function(form, field, rules, i, options) {

      var nbCheck = rules[i + 1];
      var groupname = field.attr("name");
      var groupSize = form.find("input[name='" + groupname + "']:checked").size();
      if (groupSize > nbCheck) {
        options.showArrow = false;
        if (options.allrules.maxCheckbox.alertText2)
          return options.allrules.maxCheckbox.alertText + " " + nbCheck + " " + options.allrules.maxCheckbox.alertText2;
        return options.allrules.maxCheckbox.alertText;
      }
    },
    /**
     * Min number of checkbox selected
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _minCheckbox: function(form, field, rules, i, options) {

      var nbCheck = rules[i + 1];
      var groupname = field.attr("name");
      var groupSize = form.find("input[name='" + groupname + "']:checked").size();
      if (groupSize < nbCheck) {
        options.showArrow = false;
        return options.allrules.minCheckbox.alertText + " " + nbCheck + " " + options.allrules.minCheckbox.alertText2;
      }
    },
    /**
     * Checks that it is a valid credit card number according to the
     * Luhn checksum algorithm.
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return an error string if validation failed
     */
    _creditCard: function(field, rules, i, options) {
      //spaces and dashes may be valid characters, but must be stripped to calculate the checksum.
      var valid = false, cardNumber = field.val().replace(/ +/g, '').replace(/-+/g, '');

      var numDigits = cardNumber.length;
      if (numDigits >= 14 && numDigits <= 16 && parseInt(cardNumber) > 0) {

        //var sum = 0, i = numDigits - 1, pos = 1, digit, luhn = new String();
        var sum = 0, i = numDigits - 1, pos = 1, digit, luhn = '';
        do {
          digit = parseInt(cardNumber.charAt(i));
          luhn += (pos++ % 2 === 0) ? digit * 2 : digit;
        } while (--i >= 0);

        for (i = 0; i < luhn.length; i++) {
          sum += parseInt(luhn.charAt(i));
        }
        valid = sum % 10 === 0;
      }
      if (!valid) return options.allrules.creditCard.alertText;
    },
    /**
     * Ajax field validation
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     *            user options
     * @return nothing! the ajax validator handles the prompts itself
     */
    _ajax: function(field, rules, i, options) {

      var errorSelector = rules[i + 1];
      var rule = options.allrules[errorSelector];
      var extraData = rule.extraData;
      var extraDataDynamic = rule.extraDataDynamic;
      var data = {
        "fieldId" : field.attr("id"),
        "fieldValue" : field.val()
      };

      if (typeof extraData === "object") {
        $.extend(data, extraData);
      } else if (typeof extraData === "string") {
        var tempData = extraData.split("&");
        for(var i = 0; i < tempData.length; i++) {
          var values = tempData[i].split("=");
          if (values[0] && values[0]) {
            data[values[0]] = values[1];
          }
        }
      }

      if (extraDataDynamic) {
        var tmpData = [];
        var domIds = String(extraDataDynamic).split(",");
        for (var i = 0; i < domIds.length; i++) {
          var id = domIds[i];
          if ($(id).length) {
            var inputValue = field.closest("form, .validationEngineContainer").find(id).val();
            var keyValue = id.replace('#', '') + '=' + escape(inputValue);
            data[id.replace('#', '')] = inputValue;
          }
        }
      }

      // If a field change event triggered this we want to clear the cache for this ID
      if (options.eventTrigger == "field") {
        delete(options.ajaxValidCache[field.attr("id")]);
      }

      // If there is an error or if the the field is already validated, do not re-execute AJAX
      if (!options.isError && !methods._checkAjaxFieldStatus(field.attr("id"), options)) {
        $.ajax({
          type: options.ajaxFormValidationMethod,
          url: rule.url,
          cache: false,
          dataType: "json",
          data: data,
          field: field,
          rule: rule,
          methods: methods,
          options: options,
          beforeSend: function() {},
          error: function(data, transport) {
            if (options.onFailure) {
              options.onFailure(data, transport);
            } else {
              methods._ajaxError(data, transport);
            }
          },
          success: function(json) {

            // asynchronously called on success, data is the json answer from the server
            var errorFieldId = json[0];
            //var errorField = $($("#" + errorFieldId)[0]);
            var errorField = $("#"+ errorFieldId).eq(0);

            // make sure we found the element
            if (errorField.length == 1) {
              var status = json[1];
              // read the optional msg from the server
              var msg = json[2];
              if (!status) {
                // Houston we got a problem - display an red prompt
                options.ajaxValidCache[errorFieldId] = false;
                options.isError = true;

                // resolve the msg prompt
                if(msg) {
                  if (options.allrules[msg]) {
                    var txt = options.allrules[msg].alertText;
                    if (txt) {
                      msg = txt;
                    }
                  }
                }
                else
                  msg = rule.alertText;

                if (options.showPrompts) methods._showPrompt(errorField, msg, "", true, options);
              } else {
                options.ajaxValidCache[errorFieldId] = true;

                // resolves the msg prompt
                if(msg) {
                  if (options.allrules[msg]) {
                    var txt = options.allrules[msg].alertTextOk;
                    if (txt) {
                      msg = txt;
                    }
                  }
                }
                else
                  msg = rule.alertTextOk;

                if (options.showPrompts) {
                  // see if we should display a green prompt
                  if (msg)
                    methods._showPrompt(errorField, msg, "pass", true, options);
                  else
                    methods._closePrompt(errorField);
                }

                // If a submit form triggered this, we want to re-submit the form
                if (options.eventTrigger == "submit")
                  field.closest("form").submit();
              }
            }
            errorField.trigger("jqv.field.result", [errorField, options.isError, msg]);
          }
        });

        return rule.alertTextLoad;
      }
    },
    /**
     * Common method to handle ajax errors
     *
     * @param {Object} data
     * @param {Object} transport
     */
    _ajaxError: function(data, transport) {
      if(data.status === 0 && transport == null)
        alert("The page is not served from a server! ajax call failed");
      else if(typeof console != "undefined")
        console.log("Ajax error: " + data.status + " " + transport);
    },
    /**
     * date -> string
     *
     * @param {Object} date
     */
    _dateToString: function(date) {
      return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    },
    /**
     * Parses an ISO date
     * @param {String} d
     */
    _parseDate: function(d) {

      var dateParts = d.split("-");
      if(dateParts==d)
        dateParts = d.split("/");
      if(dateParts==d) {
        dateParts = d.split(".");
        return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
      }
      return new Date(dateParts[0], (dateParts[1] - 1) ,dateParts[2]);
    },
    /**
     * Builds or updates a prompt with the given information
     *
     * @param {jqObject} field
     * @param {String} promptText html text to display type
     * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
     * @param {boolean} ajaxed - use to mark fields than being validated with ajax
     * @param {Map} options user options
     */
    _showPrompt: function(field, promptText, type, ajaxed, options, ajaxform) {
      //Check if we need to adjust what element to show the prompt on
      if(field.data('jqv-prompt-at') instanceof jQuery ){
        field = field.data('jqv-prompt-at');
      } else if(field.data('jqv-prompt-at')) {
        field = $(field.data('jqv-prompt-at'));
      }

      var prompt = methods._getPrompt(field);
      // The ajax submit errors are not see has an error in the form,
      // When the form errors are returned, the engine see 2 bubbles, but those are ebing closed by the engine at the same time
      // Because no error was found befor submitting
      if(ajaxform) prompt = false;
      // Check that there is indded text
      if($.trim(promptText)){
        if (prompt)
          methods._updatePrompt(field, prompt, promptText, type, ajaxed, options);
        else
          methods._buildPrompt(field, promptText, type, ajaxed, options);
      }
    },
    /**
     * Builds and shades a prompt for the given field.
     *
     * @param {jqObject} field
     * @param {String} promptText html text to display type
     * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
     * @param {boolean} ajaxed - use to mark fields than being validated with ajax
     * @param {Map} options user options
     */
    _buildPrompt: function(field, promptText, type, ajaxed, options) {

      // create the prompt
      var prompt = $('<div>');
      prompt.addClass(methods._getClassName(field.attr("id")) + "formError");
      // add a class name to identify the parent form of the prompt
      prompt.addClass("parentForm"+methods._getClassName(field.closest('form, .validationEngineContainer').attr("id")));
      prompt.addClass("formError");

      switch (type) {
        case "pass":
          prompt.addClass("greenPopup");
          break;
        case "load":
          prompt.addClass("blackPopup");
          break;
        default:
        /* it has error  */
        //alert("unknown popup type:"+type);
      }
      if (ajaxed)
        prompt.addClass("ajaxed");

      // create the prompt content
      var promptContent = $('<div>').addClass("formErrorContent").html(promptText).appendTo(prompt);

      // determine position type
      var positionType=field.data("promptPosition") || options.promptPosition;

      // create the css arrow pointing at the field
      // note that there is no triangle on max-checkbox and radio
      if (options.showArrow) {
        var arrow = $('<div>').addClass("formErrorArrow");

        //prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
        if (typeof(positionType)=='string')
        {
          var pos=positionType.indexOf(":");
          if(pos!=-1)
            positionType=positionType.substring(0,pos);
        }

        switch (positionType) {
          case "bottomLeft":
          case "bottomRight":
            prompt.find(".formErrorContent").before(arrow);
            arrow.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
            break;
          case "topLeft":
          case "topRight":
            arrow.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
            prompt.append(arrow);
            break;
        }
      }
      // Add custom prompt class
      if (options.addPromptClass)
        prompt.addClass(options.addPromptClass);

      // Add custom prompt class defined in element
      var requiredOverride = field.attr('data-required-class');
      if(requiredOverride !== undefined) {
        prompt.addClass(requiredOverride);
      } else {
        if(options.prettySelect) {
          if($('#' + field.attr('id')).next().is('select')) {
            var prettyOverrideClass = $('#' + field.attr('id').substr(options.usePrefix.length).substring(options.useSuffix.length)).attr('data-required-class');
            if(prettyOverrideClass !== undefined) {
              prompt.addClass(prettyOverrideClass);
            }
          }
        }
      }

      prompt.css({
        "opacity": 0
      });

      //console.log(options);

      if(positionType === 'inline') {
        prompt.addClass("inline");

        if(typeof field.attr('data-prompt-target') !== 'undefined' && $('#'+field.attr('data-prompt-target')).length > 0) {
          prompt.appendTo($('#'+field.attr('data-prompt-target')));

          if(field.parent('.c-input--combined-label').length > 0){
            field.parent('.c-input--combined-label').addClass('is-validate--error');
          }
        } else {
          if(field.prop("tagName") == 'SELECT'){
            field.nextAll('.customSelect').after(prompt);
          }else if(field.attr("type") == 'checkbox' || field.attr("type") == 'radio'){
            field.next('label').after(prompt);
          }else if(field.parent('.is-tell-number').length > 0){
            field.parent('.is-tell-number').after(prompt);
          }else if(field.parent('.c-input--combined-label').length > 0){
            field.parent('.c-input--combined-label').addClass('is-validate--error');
            field.parent('.c-input--combined-label').after(prompt);
          }else if(field.next("a").length > 0){
            field.next("a").after(prompt);
          }else{
            field.after(prompt);
          }
        }
      } else {
        field.before(prompt);
      }
      field.addClass('is-validate--error');
      if(field.attr("type") == 'password'){
        field.prev('input').addClass('is-validate--error');
      }

      //アコーディオン内の高さ調整
      $('.c-accordion__body').trigger('update');

      if(options.isCostsNote){
        $('body,html').animate({scrollTop:$('#validate-error').offset().top - 68}, 800, 'swing');
      }


      var pos = methods._calculatePosition(field, prompt, options);
      // Support RTL layouts by @yasser_lotfy ( Yasser Lotfy )
      if ($('body').hasClass('rtl')) {
        prompt.css({
          'position': positionType === 'inline' ? 'relative' : 'absolute',
          "top": pos.callerTopPosition,
          "left": "initial",
          "right": pos.callerleftPosition,
          "marginTop": pos.marginTopSize,
          "opacity": 0
        }).data("callerField", field);
      } else {
        prompt.css({
          'position': positionType === 'inline' ? 'relative' : 'absolute',
          "top": pos.callerTopPosition,
          "left": pos.callerleftPosition,
          "right": "initial",
          "marginTop": pos.marginTopSize,
          "opacity": 0
        }).data("callerField", field);
      }


      if (options.autoHidePrompt) {
        setTimeout(function(){
          prompt.animate({
            "opacity": 0
          },function(){
            prompt.closest('.formError').remove();
          });
        }, options.autoHideDelay);
      }
      return prompt.animate({
        "opacity": 1
      });
    },
    /**
     * Updates the prompt text field - the field for which the prompt
     * @param {jqObject} field
     * @param {String} promptText html text to display type
     * @param {String} type the type of bubble: 'pass' (green), 'load' (black) anything else (red)
     * @param {boolean} ajaxed - use to mark fields than being validated with ajax
     * @param {Map} options user options
     */
    _updatePrompt: function(field, prompt, promptText, type, ajaxed, options, noAnimation) {

      if (prompt) {
        if (typeof type !== "undefined") {
          if (type == "pass")
            prompt.addClass("greenPopup");
          else
            prompt.removeClass("greenPopup");

          if (type == "load")
            prompt.addClass("blackPopup");
          else
            prompt.removeClass("blackPopup");
        }
        if (ajaxed)
          prompt.addClass("ajaxed");
        else
          prompt.removeClass("ajaxed");

        prompt.find(".formErrorContent").html(promptText);

        var pos = methods._calculatePosition(field, prompt, options);
        // Support RTL layouts by @yasser_lotfy ( Yasser Lotfy )
        if ($('body').hasClass('rtl')) {
          var css = {"top": pos.callerTopPosition,
            "left": "initial",
            "right": pos.callerleftPosition,
            "marginTop": pos.marginTopSize,
            "opacity": 1};
        } else {
          var css = {"top": pos.callerTopPosition,
            "left": pos.callerleftPosition,
            "right": "initial",
            "marginTop": pos.marginTopSize,
            "opacity": 1};
        }

        prompt.css({
          "opacity": 0,
          "display": "block"
        });

        if (noAnimation)
          prompt.css(css);
        else
          prompt.animate(css);
      }
    },
    /**
     * Closes the prompt associated with the given field
     *
     * @param {jqObject}
     *            field
     */
    _closePrompt: function(field) {
      var prompt = methods._getPrompt(field);
      if (prompt)
        prompt.fadeTo("fast", 0, function() {
          prompt.closest('.formError').remove();
        });
    },
    closePrompt: function(field) {
      return methods._closePrompt(field);
    },
    /**
     * Returns the error prompt matching the field if any
     *
     * @param {jqObject}
     *            field
     * @return undefined or the error prompt (jqObject)
     */
    _getPrompt: function(field) {
      var formId = $(field).closest('form, .validationEngineContainer').attr('id');
      var className = methods._getClassName(field.attr("id")) + "formError";
      var match = $("." + methods._escapeExpression(className) + '.parentForm' + methods._getClassName(formId))[0];
      if (match)
        return $(match);
    },
    /**
     * Returns the escapade classname
     *
     * @param {selector}
     *            className
     */
    _escapeExpression: function (selector) {
      return selector.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
    },
    /**
     * returns true if we are in a RTLed document
     *
     * @param {jqObject} field
     */
    isRTL: function(field)
    {
      var $document = $(document);
      var $body = $('body');
      var rtl =
        (field && field.hasClass('rtl')) ||
        (field && (field.attr('dir') || '').toLowerCase()==='rtl') ||
        $document.hasClass('rtl') ||
        ($document.attr('dir') || '').toLowerCase()==='rtl' ||
        $body.hasClass('rtl') ||
        ($body.attr('dir') || '').toLowerCase()==='rtl';
      return Boolean(rtl);
    },
    /**
     * Calculates prompt position
     *
     * @param {jqObject}
     *            field
     * @param {jqObject}
     *            the prompt
     * @param {Map}
     *            options
     * @return positions
     */
    _calculatePosition: function (field, promptElmt, options) {

      var promptTopPosition, promptleftPosition, marginTopSize;
      var fieldWidth 	= field.width();
      var fieldLeft 	= field.position().left;
      var fieldTop 	=  field.position().top;
      var fieldHeight 	=  field.height();
      var promptHeight = promptElmt.height();


      // is the form contained in an overflown container?
      promptTopPosition = promptleftPosition = 0;
      // compensation for the arrow
      marginTopSize = -promptHeight;


      //prompt positioning adjustment support
      //now you can adjust prompt position
      //usage: positionType:Xshift,Yshift
      //for example:
      //   bottomLeft:+20 means bottomLeft position shifted by 20 pixels right horizontally
      //   topRight:20, -15 means topRight position shifted by 20 pixels to right and 15 pixels to top
      //You can use +pixels, - pixels. If no sign is provided than + is default.
      var positionType=field.data("promptPosition") || options.promptPosition;
      var shift1="";
      var shift2="";
      var shiftX=0;
      var shiftY=0;
      if (typeof(positionType)=='string') {
        //do we have any position adjustments ?
        if (positionType.indexOf(":")!=-1) {
          shift1=positionType.substring(positionType.indexOf(":")+1);
          positionType=positionType.substring(0,positionType.indexOf(":"));

          //if any advanced positioning will be needed (percents or something else) - parser should be added here
          //for now we use simple parseInt()

          //do we have second parameter?
          if (shift1.indexOf(",") !=-1) {
            shift2=shift1.substring(shift1.indexOf(",") +1);
            shift1=shift1.substring(0,shift1.indexOf(","));
            shiftY=parseInt(shift2);
            if (isNaN(shiftY)) shiftY=0;
          }

          shiftX=parseInt(shift1);
          if (isNaN(shift1)) shift1=0;

        }
      }


      switch (positionType) {
        default:
        case "topRight":
          promptleftPosition +=  fieldLeft + fieldWidth - 27;
          promptTopPosition +=  fieldTop;
          break;

        case "topLeft":
          promptTopPosition +=  fieldTop;
          promptleftPosition += fieldLeft;
          break;

        case "centerRight":
          promptTopPosition = fieldTop+4;
          marginTopSize = 0;
          promptleftPosition= fieldLeft + field.outerWidth(true)+5;
          break;
        case "centerLeft":
          promptleftPosition = fieldLeft - (promptElmt.width() + 2);
          promptTopPosition = fieldTop+4;
          marginTopSize = 0;

          break;

        case "bottomLeft":
          promptTopPosition = fieldTop + field.height() + 5;
          marginTopSize = 0;
          promptleftPosition = fieldLeft;
          break;
        case "bottomRight":
          promptleftPosition = fieldLeft + fieldWidth - 27;
          promptTopPosition =  fieldTop +  field.height() + 5;
          marginTopSize = 0;
          break;
        case "inline":
          promptleftPosition = 0;
          promptTopPosition = 0;
          marginTopSize = 0;
      }



      //apply adjusments if any
      promptleftPosition += shiftX;
      promptTopPosition  += shiftY;

      return {
        "callerTopPosition": promptTopPosition + "px",
        "callerleftPosition": promptleftPosition + "px",
        "marginTopSize": marginTopSize + "px"
      };
    },
    /**
     * Saves the user options and variables in the form.data
     *
     * @param {jqObject}
     *            form - the form where the user option should be saved
     * @param {Map}
     *            options - the user options
     * @return the user options (extended from the defaults)
     */
    _saveOptions: function(form, options) {

      // is there a language localisation ?
      if ($.validationEngineLanguage)
        var allRules = $.validationEngineLanguage.allRules;
      else
        $.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
      // --- Internals DO NOT TOUCH or OVERLOAD ---
      // validation rules and i18
      $.validationEngine.defaults.allrules = allRules;

      var userOptions = $.extend(true,{},$.validationEngine.defaults,options);

      form.data('jqv', userOptions);
      return userOptions;
    },

    /**
     * Removes forbidden characters from class name
     * @param {String} className
     */
    _getClassName: function(className) {
      if(className)
        return className.replace(/:/g, "_").replace(/\./g, "_").replace(/ /g, "_");
    },
    /**
     * Escape special character for jQuery selector
     * http://totaldev.com/content/escaping-characters-get-valid-jquery-id
     * @param {String} selector
     */
    _jqSelector: function(str){
      return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
    },
    /**
     * Conditionally required field
     *
     * @param {jqObject} field
     * @param {Array[String]} rules
     * @param {int} i rules index
     * @param {Map}
     * user options
     * @return an error string if validation failed
     */
    _condRequired: function(field, rules, i, options) {
      var idx, dependingField;

      for(idx = (i + 1); idx < rules.length; idx++) {
        dependingField = jQuery("#" + rules[idx]).first();

        /* Use _required for determining wether dependingField has a value.
         * There is logic there for handling all field types, and default value; so we won't replicate that here
         * Indicate this special use by setting the last parameter to true so we only validate the dependingField on chackboxes and radio buttons (#462)
         */
        if (dependingField.length && methods._required(dependingField, ["required"], 0, options, true) === undefined) {
          /* We now know any of the depending fields has a value,
           * so we can validate this field as per normal required code
           */
          return methods._required(field, ["required"], 0, options);
        }
      }
    },

    _submitButtonClick: function(event) {
      var button = $(this);
      var form = button.closest('form, .validationEngineContainer');
      form.data("jqv_submitButton", button.attr("id"));
    }
  };

  /**
   * Plugin entry point.
   * You may pass an action as a parameter or a list of options.
   * if none, the init and attach methods are being called.
   * Remember: if you pass options, the attached method is NOT called automatically
   *
   * @param {String}
   *            method (optional) action
   */
  $.fn.validationEngine = function(method) {

    var form = $(this);
    if(!form[0]) return form;  // stop here if the form does not exist

    if (typeof(method) == 'string' && method.charAt(0) != '_' && methods[method]) {

      // make sure init is called once
      if(method != "showPrompt" && method != "hide" && method != "hideAll")
        methods.init.apply(form);

      return methods[method].apply(form, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method == 'object' || !method) {

      // default constructor with or without arguments
      methods.init.apply(form, arguments);
      return methods.attach.apply(form);
    } else {
      $.error('Method ' + method + ' does not exist in jQuery.validationEngine');
    }
  };



  // LEAK GLOBAL OPTIONS
  $.validationEngine= {fieldIdCounter: 0,defaults:{

    // Name of the event triggering field validation
    validationEventTrigger: "blur",
    // Automatically scroll viewport to the first error
    scroll: true,
    // Focus on the first input
    focusFirstField:true,
    // Show prompts, set to false to disable prompts
    showPrompts: true,
    // Should we attempt to validate non-visible input fields contained in the form? (Useful in cases of tabbed containers, e.g. jQuery-UI tabs)
    validateNonVisibleFields: false,
    // ignore the validation for fields with this specific class (Useful in cases of tabbed containers AND hidden fields we don't want to validate)
    ignoreFieldsWithClass: 'ignoreMe',
    // Opening box position, possible locations are: topLeft,
    // topRight, bottomLeft, centerRight, bottomRight, inline
    // inline gets inserted after the validated field or into an element specified in data-prompt-target
    promptPosition: "topRight",
    bindMethod:"bind",
    // internal, automatically set to true when it parse a _ajax rule
    inlineAjax: false,
    // if set to true, the form data is sent asynchronously via ajax to the form.action url (get)
    ajaxFormValidation: false,
    // The url to send the submit ajax validation (default to action)
    ajaxFormValidationURL: false,
    // HTTP method used for ajax validation
    ajaxFormValidationMethod: 'get',
    // Ajax form validation callback method: boolean onComplete(form, status, errors, options)
    // retuns false if the form.submit event needs to be canceled.
    onAjaxFormComplete: $.noop,
    // called right before the ajax call, may return false to cancel
    onBeforeAjaxFormValidation: $.noop,
    // Stops form from submitting and execute function assiciated with it
    onValidationComplete: false,

    // Used when you have a form fields too close and the errors messages are on top of other disturbing viewing messages
    doNotShowAllErrosOnSubmit: false,
    // Object where you store custom messages to override the default error messages
    custom_error_messages:{},
    // true if you want to validate the input fields on blur event
    binded: true,
    // set to true if you want to validate the input fields on blur only if the field it's not empty
    notEmpty: false,
    // set to true, when the prompt arrow needs to be displayed
    showArrow: true,
    // set to false, determines if the prompt arrow should be displayed when validating
    // checkboxes and radio buttons
    showArrowOnRadioAndCheckbox: false,
    // did one of the validation fail ? kept global to stop further ajax validations
    isError: false,
    // Limit how many displayed errors a field can have
    maxErrorsPerField: false,

    // Caches field validation status, typically only bad status are created.
    // the array is used during ajax form validation to detect issues early and prevent an expensive submit
    ajaxValidCache: {},
    // Auto update prompt position after window resize
    autoPositionUpdate: false,

    InvalidFields: [],
    onFieldSuccess: false,
    onFieldFailure: false,
    onSuccess: false,
    onFailure: false,
    validateAttribute: "class",
    addSuccessCssClassToField: "",
    addFailureCssClassToField: "",

    // Auto-hide prompt
    autoHidePrompt: false,
    // Delay before auto-hide
    autoHideDelay: 10000,
    // Fade out duration while hiding the validations
    fadeDuration: 300,
    // Use Prettify select library
    prettySelect: false,
    // Add css class on prompt
    addPromptClass : "",
    // Custom ID uses prefix
    usePrefix: "",
    // Custom ID uses suffix
    useSuffix: "",
    // Only show one message per error prompt
    showOneMessage: false
  }};
  $(function(){$.validationEngine.defaults.promptPosition = methods.isRTL()?'topLeft':"topRight"});



  window.checkNameValue = function(field, rules, i, options){
    var id = field.attr('data-nc').split("_")[1] == '1' ? '2' : '1',
      pair = $('[data-nc=' + field.attr('data-nc').split("_")[0] + '_' + id + ']'),
      alertType = field.attr('data-nc').split("-")[0] == 'kana' ? 'nameKanaLength' : 'nameLength',
      border = alertType == 'nameKanaLength' ? 19 : 19;
    //console.log(field.val().length + pair.val().length > border);
    if(field.val().length + pair.val().length > border){
      return options.allrules[alertType].alertText;
    }
  };

  window.checkPasswordValue = function(field, rules, i, options){
    var v = field.val(),
      alertType = 'passwordRule',
      checker = 0;
    if(/[a-z]/.test(v)){
      ++checker;
    }
    if(/[A-Z]/.test(v)){
      ++checker;
    }
    if(/[0-9]/.test(v)){
      ++checker;
    }
    if(/[\_\-\.\@]/.test(v)){
      ++checker;
    }



    if(checker<2){
      return options.allrules[alertType].alertText;
    }
  };

  window.checkDuplication = function(field, rules, i, options){
    var val = field.val(),
      tgtElm = $('[data-duplication-target="' + field.attr('id') + '"]'),
      tgtVal = new RegExp(tgtElm.val(), "g"),
      alertType = 'duplication',
      alertMes = field.attr('data-errormessage-duplication'),
      checker = 0;
    if(tgtVal.test(val)){
      ++checker;
    }

    if(checker>=1){
      if(alertMes){
        return alertMes;
      }else{
        return options.allrules[alertType].alertText;
      }
    }
  };

  window.checkZenkaku = function(field, rules, i, options){
    var val = field.val(),
      alertMes = '全角で入力してください',
      checker = 0;
    for(var i=0,l=val.length;i<l;i++){
      var enStr = escape(val.charAt(i));
      if(/^[ｦ｡｢｣､･ﾞﾟ]+$/.test(val)){
        ++checker;
        break;
      }
      if (enStr.charAt(0) != "%" || enStr.charAt(1) != "u") {
        if(/^[´¨±°÷§¶]+$/.test(val)){
          break;
        }
        ++checker;
        break;
      }
    }
    if(checker>=1){
      return alertMes;
    }
  };
  window.checkHankaku = function(field, rules, i, options){
    var val = field.val(),
      alertMes = '半角で入力してください',
      checker = 0;
    for(var i=0,l=val.length;i<l;i++){
      var enStr = escape(val.charAt(i));
      //console.log(enStr);

      if(/^[´¨±°÷§¶]+$/.test(val)){
        ++checker;
        break;
      }
      if(/^[ｦ｡｢｣､･ﾞﾟ]+$/.test(val)){
        break;
      }
      if (enStr.charAt(0) == "%" && enStr.charAt(1) == "u") {
        ++checker;
        break;
      }
    }
    if(checker>=1){
      return alertMes;
    }
  };

})(jQuery);








/*****************************************************************
 * Japanese language file for jquery.validationEngine.js (ver2.0)
 *
 * Transrator: tomotomo ( Tomoyuki SUGITA )
 * http://tomotomoSnippet.blogspot.com/
 * Licenced under the MIT Licence
 *******************************************************************/
(function($){
  $.fn.validationEngineLanguage = function(){
  };
  $.validationEngineLanguage = {
    newLang: function(){
      $.validationEngineLanguage.allRules = {
        "required": { // Add your regex rules here, you can take telephone as an example
          "regex": "none",
          "alertText": "必須項目です",
          "alertTextCheckboxMultiple": "選択してください",
          "alertTextCheckboxe": "チェックボックスをチェックしてください"
        },
        "requiredInFunction": {
          "func": function(field, rules, i, options){
            return (field.val() == "test") ? true : false;
          },
          "alertText": "Field must equal test"
        },
        "minSize": {
          "regex": "none",
          "alertText": "",
          "alertText2": "文字以上にしてください"
        },
        "groupRequired": {
          "regex": "none",
          "alertText": "いずれか必ず1つ以上ご入力ください"
        },
        "maxSize": {
          "regex": "none",
          "alertText": "",
          "alertText2": "文字以下にしてください"
        },
        "min": {
          "regex": "none",
          "alertText": "",
          "alertText2": " 以上の数値にしてください"
        },
        "max": {
          "regex": "none",
          "alertText": "",
          "alertText2": " 以下の数値にしてください"
        },
        "past": {
          "regex": "none",
          "alertText": "",
          "alertText2": " より過去の日付にしてください"
        },
        "future": {
          "regex": "none",
          "alertText": "",
          "alertText2": " より最近の日付にしてください"
        },
        "maxCheckbox": {
          "regex": "none",
          "alertText": "チェックしすぎです"
        },
        "minCheckbox": {
          "regex": "none",
          "alertText": "",
          "alertText2": "つ以上チェックしてください"
        },
        "equals": {
          "regex": "none",
          "alertText": "入力された値が一致しません"
        },
        "creditCard": {
          "regex": "none",
          "alertText": "無効なクレジットカード番号"
        },
        "phone": {
          // credit: jquery.h5validate.js / orefalo
          "regex": /^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,
          "alertText": "電話番号が正しくありません"
        },
        "email": {
          // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
          "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
          "alertText": "メールアドレスが正しくありません"
        },
        "integer": {
          "regex": /^[\-\+]?\d+$/,
          "alertText": "整数を半角で入力してください"
        },
        "number": {
          // Number, including positive, negative, and floating decimal. credit: orefalo
          "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
          "alertText": "数値を半角で入力してください"
        },
        "date": {
          "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
          "alertText": "日付は半角で YYYY-MM-DD の形式で入力してください"
        },
        "ipv4": {
          "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
          "alertText": "IPアドレスが正しくありません"
        },
        "url": {
          "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
          "alertText": "URLが正しくありません"
        },
        "onlyNumberSp": {
          "regex": /^[0-9]+$/,
          "alertText": "半角数字で入力してください"
        },
        "onlyLetterSp": {
          "regex": /^[a-zA-Z\ \']+$/,
          "alertText": "半角アルファベットで入力してください"
        },
        "onlyLetterNumber": {
          "regex": /^[0-9a-zA-Z]+$/,
          "alertText": "半角英数字で入力してください"
        },
        // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
        "ajaxUserCall": {
          "url": "ajaxValidateFieldUser",
          // you may want to pass extra data on the ajax call
          "extraData": "name=eric",
          "alertText": "This user is already taken",
          "alertTextLoad": "Validating, please wait"
        },
        "ajaxNameCall": {
          // remote json service location
          "url": "ajaxValidateFieldName",
          // error
          "alertText": "This name is already taken",
          // if you provide an "alertTextOk", it will show as a green prompt when the field validates
          "alertTextOk": "This name is available",
          // speaks by itself
          "alertTextLoad": "Validating, please wait"
        },
        "validate2fields": {
          "alertText": ""
        },
        "kana": {
          "regex": /^[ァ-ンー　ヴヵヶヽヾ]+$/,
          "alertText": "全角カタカナで入力してください"
        },
        "shimei": {
          //"regex": /^[０-９－ａ-ｚＡ-Ｚぁ-んァ-ー一-龥々　]+$/,
          "regex": /^[^ -~｡-ﾟ]+$/,
          "alertText": "全角で入力してください"
        },
        "zenkaku": {
          // "regex": /^[０-９－ａ-ｚＡ-Ｚぁ-んァ-ー一-龥々　]+$/,
          "regex": /^[^ -~｡-ﾟ(?!ヷヸヹヺ)]+$/,
          "alertText": "全角で入力してください"
        },
        "hankaku": {
          "regex": /^[0-9a-zA-Zｧ-ﾝｦﾞﾟ !"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~”’＜＞＆｀−]+$/,
          "alertText": "半角で入力してください"
        },
        "hankakusu": {
          "regex": /^[0-9 !"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~”’＜＞＆｀−]+$/,
          "alertText": "半角で入力してください"
        },
        "hankakusukana": {
          "regex": /^[0-9ｧ-ﾝｦﾞﾟ !"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~”’＜＞＆｀−]+$/,
          "alertText": "半角数字カナで入力してください"
        },
        "hankakueisukana": {
          "regex": /^[0-9a-zA-Zｧ-ﾝｦﾞﾟ｡｢｣､･ \s]+$/,
          "alertText": "半角英数カナで入力してください"
        },
        "touheya": {
          "regex": /^[0-9a-zA-Zｧ-ﾝｦﾞﾟ]+$/,
          "alertText": "半角英数カナで入力してください"
        },
        "zenkakueisukana": {
          "regex": /^[０-９－ａ-ｚＡ-Ｚァ-ン　]+$/,
          "alertText": "全角英数カナで入力してください"
        },
        "symbol": {
          "regex": /["#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~”’＜＞＆｀−]/g,
          "alertText": "｢“｣ ｢‘｣ ｢<｣ ｢>｣ ｢&｣ ｢ｰ｣は使用できません"
        },
        "excSymbol": {
          "regex": /^[A-Za-z0-9!_$%&@\-\.]+$/,
          "alertText": "記号は ｢!｣ ｢%｣ ｢$｣ ｢&｣ ｢@｣ ｢_｣ ｢-｣ ｢.｣のみ使用できます"
        },
        "passwordSymbol": {
          "regex": /^[A-Za-z0-9_@\-\.]+$/,
          "alertText": "記号は ｢@｣ ｢_｣ ｢-｣ ｢.｣のみ使用できます"
        },
        "nameLength": {
          "regex": 'none',
          "alertText": "姓名合わせて全角1文字以上19文字以内で入力してください"
        },
        "nameKanaLength": {
          "regex": 'none',
          "alertText": "セイメイ合わせて全角カナ1文字以上19文字以内で入力してください"
        },
        "passwordRule": {
          "regex": 'none',
          "alertText": "英小文字、英大文字、数字、記号のうち、2つ以上の文字を使用してください"
        },
        "zipSize": {
          "regex": "none",
          "alertText": "半角数字",
          "alertText2": "桁で入力してください"
        },
        "duplication": {
          "regex": 'none',
          "alertText": "IDと同じパスワードは設定できません"
        }
      };

    }
  };
  $.validationEngineLanguage.newLang();
})(jQuery);

<!-- SN1024 2.2.7 1.4.29-->