$(document).ready(function() {
	initPage();
});
function initPage(){
	initTopLinkButton();
	$('.menu').slideBlock();
	initSameHeight();
}

/* Link To Top */
function initTopLinkButton(){
	$('.link-to-top').click(function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop:0},'slow');
	})
}


/* Slide Block */
(function($) {
	$.fn.slideBlock = function(options){
		var options = $.extend({
			linkSlide: 'a.slide-link',
			slideBlock: 'div.slide-box',
			openClass: 'slide-active',
			durationSlide: 500,
			openComplete: false,
			closeComplete: false
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
					$('body').removeClass('nav-visible');
					$this.find(slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});
				} else {
					$this.addClass(openClass);
					$('body').addClass('nav-visible');
					$this.find(slideBlock).slideDown(durationSlide, function(){if(typeof( options.openComplete) == 'function') options.openComplete(this)});
				}
				return false;
			});
		});
		return this;
	};
})(jQuery);


// set same column height
function initSameHeight(){
	jQuery('ul.interview-list').sameHeight({
		elements: '>li>div',
		flexible: true,
		multiLine: true
	});
}

/*
 * jQuery SameHeight plugin
 */
;(function($){
	$.fn.sameHeight = function(opt) {
		var options = $.extend({
			skipClass: 'same-height-ignore',
			leftEdgeClass: 'same-height-left',
			rightEdgeClass: 'same-height-right',
			elements: '>*',
			flexible: false,
			multiLine: false,
			useMinHeight: false
		},opt);
		return this.each(function(){
			var holder = $(this);
			var elements = holder.find(options.elements).not('.' + options.skipClass);
			if(!elements.length) return;
			
			// resize handler
			function doResize() {
				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
				if(options.multiLine) {
					// resize elements row by row
					resizeElementsByRows(elements, options);
				} else {
					// resize elements by holder
					resizeElements(elements, holder, options);
				}
			}
			doResize();
			
			// handle flexible layout / font resize
			if(options.flexible) {
				$(window).bind('resize orientationchange fontresize', function(e){
					doResize();
					setTimeout(doResize, 100);
				});
			}
			// handle complete page load including images and fonts
			$(window).bind('load', function(){
				doResize();
				setTimeout(doResize, 100);
			});
		});
	}
	
	// detect css min-height support
	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';
	
	// get elements by rows
	function resizeElementsByRows(boxes, options) {
		var currentRow = $(), maxHeight, firstOffset = boxes.eq(0).offset().top;
		boxes.each(function(ind){
			var curItem = $(this);
			if(curItem.offset().top === firstOffset) {
				currentRow = currentRow.add(this);
			} else {
				maxHeight = getMaxHeight(currentRow);
				resizeElements(currentRow, maxHeight, options);
				currentRow = curItem;
				firstOffset = curItem.offset().top;
			}
		});
		if(currentRow.length) {
			maxHeight = getMaxHeight(currentRow);
			resizeElements(currentRow, maxHeight, options);
		}
	}
	
	// calculate max element height
	function getMaxHeight(boxes) {
		var maxHeight = 0;
		boxes.each(function(){
			maxHeight = Math.max(maxHeight, $(this).outerHeight());
		});
		return maxHeight;
	}
	
	// resize helper function
	function resizeElements(boxes, parent, options) {
		var parentHeight = typeof parent === 'number' ? parent : parent.height();
		boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
			var element = $(this);
			var depthDiffHeight = 0;
			
			if(typeof parent !== 'number') {
				element.parents().each(function(){
					var tmpParent = $(this);
					if(this === parent[0]) {
						return false;
					} else {
						depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
					}
				});
			}
			var calcHeight = parentHeight - depthDiffHeight - (element.outerHeight() - element.height());
			if(calcHeight > 0) {
				element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
			}
		});
		boxes.filter(':first').addClass(options.leftEdgeClass);
		boxes.filter(':last').addClass(options.rightEdgeClass);
	}
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
	$(function() {
		var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
		var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');
		
		// required styles
		resizeFrame.css({
			width: '100em',
			height: '10px',
			position: 'absolute',
			borderWidth: 0,
			top: '-9999px',
			left: '-9999px'
		}).appendTo('body');
		
		var doc = resizeFrame[0].contentWindow.document;
		doc.open();
		doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
		doc.close();
		
		jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
	});
	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(window).trigger("fontresize", [em]);
		}
	};
}(jQuery));