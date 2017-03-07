$(document).ready(initPage);
function initPage(){
	initGallery();
	initSlideBox();
	clearInput();
	initCategories();
	$('.slide-block').slideBlock();
	tooltipAddToCart();
}
function initSlideBox() 
{
	var _parentSlide = '.main-slide-holder';
	var _linkSlide = 'a.opener';
	var _slideBlock = 'div.slide';
	var _openClassS = 'active';
	var _durationSlide = 500;
	$(_parentSlide).each(function(){
		if (!$(this).is('.'+_openClassS)) {
			$(this).find(_slideBlock).css('display','none');
		}
	});
	$(_linkSlide,_parentSlide).click(function(){
		if ($(this).parents(_parentSlide).is('.'+_openClassS)) {
			$(this).parents(_parentSlide).removeClass(_openClassS);
			$(this).parents(_parentSlide).find(_slideBlock).slideUp(_durationSlide);
		} else {
			$(this).parents(_parentSlide).addClass(_openClassS);
			$(this).parents(_parentSlide).find(_slideBlock).slideDown(_durationSlide);
		}
		return false;
	});
}
function loadGallery(url) {
	if (url) {
		$.ajax({
			url: url,
			success: function(data){
				$('#image-gallery').append($('figure', data));
				initProductGallery();
			}}
		);
	}
}
function initGallery(c) {
	var ctx = (typeof(c) == 'undefined') ? document : c;
	
	$('.image-gallery', jQuery(ctx)).each(function(i, el){
		var $this = $(this);
		var autoscroll = ($this.hasClass('auto-slide') ? 4000 : false);
		var counter = 'counter1'+i;
		var tcontrol = 'tcontrol1'+i;
		$this.touchSlider({
			item: '.item',
			holder: 'div.wrapp',
			box: 'div.frame',
			mode: 'index',
			center: true,
			single: true,
			prevLink: 'a.prev',
			nextLink: 'a.next',
			lockScroll: true,
			onChange: function(prev, curr) {
				$('#'+tcontrol+' a').removeClass('active');
				$('#'+tcontrol+' a').filter(function(i){return i == curr}).addClass('active');
			},
			onStart: function() {
				$('#'+tcontrol, $this).remove();
				$('div.control', $this).append('<div  class="switcher" id="'+tcontrol+'"></div>');
				for (var i = 0; i < $this.get(0).getCount(); i++) {
					var el = $('<a href="#">'+(i+1)+'</a>');
					el.attr('index', i);
					$('#'+tcontrol).append(el);
					el.bind('click', function(){
						$this.get(0).moveTo($(this).attr('index'));
						return false;
					});
				}
				$('#'+tcontrol+' a').first().addClass('active');
			},
			autoscroll: autoscroll,
			loop: (autoscroll ? 'cyclic' : false)
		});
	});
	$('.product-gallery', jQuery(ctx)).each(function(i, el){
		var $this = $(this);
		var counter = 'counter2'+i;
		var tcontrol = 'tcontrol2'+i;
		$this.touchSlider({
			item: '.item-hold',
			holder: 'div.wrapp',
			box: 'div.frame',
			mode: 'index',
			center: true,
			single: true,
			prevLink: 'a.prev',
			nextLink: 'a.next',
			onChange: function(prev, curr) {
				$('#'+tcontrol+' a').removeClass('active');
				$('#'+tcontrol+' a').filter(function(i){return i == curr}).addClass('active');
			},
			onStart: function() {
				$('#'+tcontrol, $this).remove();

				$('div.control', $this).append('<div  class="switcher" id="'+tcontrol+'"></div>');
				for (var i = 0; i < $this.get(0).getCount(); i++) {
					var el = $('<a href="#">'+(i+1)+'</a>');
					el.attr('index', i);
					$('#'+tcontrol).append(el);
					el.bind('click', function(){
						$this.get(0).moveTo($(this).attr('index'));
						return false;
					});
				}
				$('#'+tcontrol+' a').first().addClass('active');
			},
			onCheckItems: function() {
				$('#'+tcontrol, $this).remove();
				$('div.control', $this).append('<div  class="switcher" id="'+tcontrol+'"></div>');
				for (var i = 0; i < $this.get(0).getCount(); i++) {
					var el = $('<a href="#">'+(i+1)+'</a>');
					el.attr('index', i);
					$('#'+tcontrol).append(el);
					el.bind('click', function(){
						$this.get(0).moveTo($(this).attr('index'));
						return false;
					});
				}
				$('#'+tcontrol+' a').first().addClass('active');
			}
		});
	});
	$('.character-gallery', jQuery(ctx)).each(function(i, el){
		var $this = $(this);
		var counter = 'counter2'+i;
		var tcontrol = 'tcontrol2'+i;
		$this.touchSlider({
			item: '.item',
			holder: 'div.wrapp',
			box: 'div.frame',
			mode: 'auto',
			center: true,
			prevLink: 'a.prev',
			nextLink: 'a.next',
			onChange: function(prev, curr) {
				$('#'+tcontrol+' a').removeClass('active');
				$('#'+tcontrol+' a').filter(function(i){return i == curr}).addClass('active');
			},
			onStart: function() {
				$('#'+tcontrol, $this).remove();

				$('div.control', $this).append('<div  class="switcher" id="'+tcontrol+'"></div>');
				for (var i = 0; i < $this.get(0).getCount(); i++) {
					var el = $('<a href="#">'+(i+1)+'</a>');
					el.attr('index', i);
					$('#'+tcontrol).append(el);
					el.bind('click', function(){
						$this.get(0).moveTo($(this).attr('index'));
						return false;
					});
				}
				$('#'+tcontrol+' a').first().addClass('active');
			},
			onCheckItems: function() {
				$('#'+tcontrol, $this).remove();
				$('div.control', $this).append('<div  class="switcher" id="'+tcontrol+'"></div>');
				for (var i = 0; i < $this.get(0).getCount(); i++) {
					var el = $('<a href="#">'+(i+1)+'</a>');
					el.attr('index', i);
					$('#'+tcontrol).append(el);
					el.bind('click', function(){
						$this.get(0).moveTo($(this).attr('index'));
						return false;
					});
				}
				$('#'+tcontrol+' a').first().addClass('active');
			}
		});
	});
	$('.content-gallery', jQuery(ctx)).each(function(i, el){
		var $this = $(this);
		var counter = 'counter3'+i;
		var tcontrol = 'tcontrol3'+i;
		$this.touchSlider({
			item: '.item',
			holder: 'div.wrapp',
			box: 'div.frame',
			mode: 'auto',
			center: true,
			prevLink: 'a.prev',
			nextLink: 'a.next'
		});
	});
	//initProductGallery();
}

function initProductGallery() {
	$('.detail-gallery').each(function(i, el){
		var $this = $(this);
		var counter = 'counter4'+i;
		var tcontrol = 'tcontrol4'+i;
		$this.touchSlider({
			item: '.item',
			holder: 'div.wrapp',
			box: 'div.frame',
			mode: 'index',
			center: true,
			single: true,
			prevLink: 'a.prev',
			nextLink: 'a.next',
			onChange: function(prev, curr) {
				$('#'+tcontrol+' a').removeClass('active');
				$('#'+tcontrol+' a').filter(function(i){return i == curr}).addClass('active');
			},
			onStart: function() {
				$('#'+tcontrol, $this).remove();
				$('div.control', $this).append('<div  class="switcher" id="'+tcontrol+'"></div>');
				for (var i = 0; i < $this.get(0).getCount(); i++) {
					var el = $('<a href="#">'+(i+1)+'</a>');
					el.attr('index', i);
					$('#'+tcontrol).append(el);
					el.bind('click', function(){
						$this.get(0).moveTo($(this).attr('index'));
						return false;
					});
				}
				$('#'+tcontrol+' a').first().addClass('active');
			}
		});
	});
}
function clearInput() {
	$('input.text').each(function(){
		var defaultText = $(this).val();
		$(this).focus(function() {
			if ($(this).val() == defaultText){
				$(this).val("");
			}
		}).blur(function(){
			if ($(this).val() == "") {
				$(this).val(defaultText);
			}
		});
	});
	$('textarea').each(function(){
		var defaultText = $(this).val();
		$(this).focus(function() {
			if ($(this).val() == defaultText){
				$(this).val("");
			}
		}).blur(function(){
			if ($(this).val() == "") {
				$(this).val(defaultText);
			}
		});
	});
}
function initCategories() {
	var _categories = '.categories';
	var _maxheight = 0;
	var _rownum = 3;
	$(_categories).each(function(){
		if (this.className != 'categories') {
			if ($(this).hasClass('two-colums')) {
				_rownum = 2;
			}
			var _items = $(this).find('span');
			var length = $(_items).length;
			$(this).find('ul').eq(0).css('width', '300px');
			for (var i = 0; i < length/_rownum; i++) {
				_maxheight = 0;
				for (var j = 0; j < _rownum; j++) {
					 var h = $(this).find('span').eq(i*_rownum+j).height();
					_maxheight = h > _maxheight ? h : _maxheight;
				}
				for (var j = 0; j < _rownum; j++) {
					$(this).find('span').eq(i*_rownum+j).css('height', _maxheight + 'px');
				}
			}
			$(this).find('ul').eq(0).css('width', 'auto');
		}
		for (var i = 0; i < $(this).find('li').length; i++) {
			$(this).find('li').eq(i).css('z-index', $(this).find('li').length-i);
		}
	});
}
function tooltipAddToCart(){
	$('ul.search-list > li a.btn-add-to-cart').each(function(){
		$(this).parent().append('<div class="has-entered"><div class="wrap">商品がカートに <br>入りました</div></div>');
		$(this).click(function(){
			var that =$(this);
				$('div.has-entered', $(this).parent()).show().css({opacity: 0, marginBottom: '10px'}).animate({
					opacity:	1,
					marginBottom: '20px'
				}, {queue: false, duration: 200});
				setTimeout(function(){
					$('div.has-entered', that.parent()).animate({
						opacity:	0,
						marginBottom: '30px'
					}, {duration: 200, complete: function(){
						$(this).hide();
					}});
				}, 4000)
				return false;
			});
		});
}
(function($) {
	$.fn.reverse = [].reverse;
	$.fn.slideBlock = function(options){
		var options = $.extend({
			linkSlide: 'a.slide-link',
			slideBlock: 'div.slide-box',
			openClass: 'slide-active',
			textOpen: 'Open block',
			textClose: 'Close block',
			durationSlide: 500,
			openComplete: false,
			closeComplete: false,
		}, options);
		
		this.each(function() {
			var $this = jQuery(this);

			var link = $(options.linkSlide, this).eq(0);
			var slideBlock = $(options.slideBlock, this).eq(0);
			var openClass = options.openClass;
			var durationSlide = options.durationSlide;
			
			if (!$this.is('.'+openClass)) {
				$this.find(slideBlock).css('display','none');
			}
			link.click(function(){
				if ($this.is('.'+ openClass)) {
					$this.removeClass(openClass);
					$this.find(slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});
				} else {
					$this.addClass(openClass);
					$this.find(slideBlock).slideDown(durationSlide, function(){if(typeof( options.openComplete) == 'function') options.openComplete(this)});
				}
				return false;
			});
		});

		return this;
	};
	
})(jQuery);