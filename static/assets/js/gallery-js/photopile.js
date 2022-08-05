var photopile=(function(){var numLayers=5;var thumbOverlap=50;var thumbRotation=45;var thumbBorderWidth=2;var thumbBorderColor='white';var thumbBorderHover='#EAEAEA';var draggable=true;var fadeDuration=200;var pickupDuration=500;var photoZIndex=100;var photoBorder=10;var photoBorderColor='white';var showInfo=true;var autoplayGallery=false;var autoplaySpeed=5000;var loading='images/loading.gif';function init(){$('.js div.photopile-wrapper').css({'background-repeat':'no-repeat','background-position':'50%, 50%','background-image':'url('+loading+')'});$('ul.photopile').children().each(function(){thumb.init($(this));});photo.init();$(window).load(function(){$('.js div.photopile-wrapper').css({'padding':thumbOverlap+'px','background-image':'none'}).children().css({'opacity':'0','display':'inline-block'}).fadeTo(fadeDuration,1);navigator.init();if(autoplayGallery){autoplay();}});}
function autoplay(){var nextThumb=$('ul.photopile').children().first();window.setInterval(function(){nextThumb.children().first().click();if(nextThumb.hasClass('last')){nextThumb=$('ul.photopile').children().first();}else{nextThumb=nextThumb.next();}},autoplaySpeed);}
var thumb={active:'photopile-active-thumbnail',init:function(thumb){self=this;thumb.children().css('padding',thumbBorderWidth+'px');self.bindUIActions(thumb);self.setRotation(thumb);self.setOverlap(thumb);self.setRandomZ(thumb);if(draggable){var x=0;var velocity=0;thumb.draggable({start:function(event,ui){thumb.addClass('preventClick');thumb.css('z-index',numLayers+2);$('ul.photopile').children().each(function(){thumb.unbind("mouseover",self.bringToTop);thumb.unbind("mouseout",self.moveDownOne);});},drag:function(event,ui){velocity=(ui.offset.left-x)*1.2;ratio=parseInt(velocity*100/360);thumb.css('transform','rotateZ('+(ratio)+'deg)');x=ui.offset.left;},stop:function(event,ui){thumb.css('z-index',numLayers+1);$('ul.photopile').children().each(function(){thumb.bind("mouseover",self.bringToTop);thumb.bind("mouseout",self.moveDownOne);});}});}
thumb.css('background',thumbBorderColor);},bindUIActions:function(thumb){var self=this;thumb.bind("mouseover",self.bringToTop);thumb.bind("mouseout",self.moveDownOne);thumb.click(function(e){e.preventDefault();if($(this).hasClass('preventClick')){$(this).removeClass('preventClick');}else{if($(this).hasClass(self.active))return;photo.pickup($(this));}});thumb.mousedown(function(e){$(this).removeClass('preventClick');});},bringToTop:function(){$(this).css({'z-index':numLayers+1,'background':thumbBorderHover});},moveDownOne:function(){$(this).css({'z-index':numLayers,'background':thumbBorderColor});},setOverlap:function(thumb){thumb.css('margin',((thumbOverlap*-1)/2)+'px');},setZ:function(thumb,layer){thumb.css('z-index',layer);},setRandomZ:function(thumb){thumb.css({'z-index':Math.floor((Math.random()*numLayers)+1)});},setRotation:function(thumb){var min=-1*thumbRotation;var max=thumbRotation;var randomRotation=Math.floor(Math.random()*(max-min+1))+min;thumb.css({'transform':'rotate('+randomRotation+'deg)'});},setActive:function(thumb){thumb.addClass(this.active);},getActiveOffset:function(){return $('li.'+this.active).offset();},getActiveHeight:function(){return $('li.'+this.active).height();},getActiveWidth:function(){return $('li.'+this.active).width();},getActiveImgSrc:function(){return $('li.'+this.active).children().first().attr('href');},getActiveRotation:function(){var transform=$('li.'+this.active).css("transform");var values=transform.split('(')[1].split(')')[0].split(',');var angle=Math.round(Math.asin(values[1])*(180/Math.PI));return angle;},getActive:function(){return($('li.'+this.active)[0])?$('li.'+this.active).first():false;},getActiveShift:function(){return(this.getActiveRotation()<0)?-(this.getActiveRotation(thumb)*0.40):(this.getActiveRotation(thumb)*0.40);},clearActiveClass:function(){$('li.'+this.active).fadeTo(fadeDuration,1).removeClass(this.active);}}
var photo={container:$('<div id="photopile-active-image-container"/>'),image:$('<img id="photopile-active-image" />'),info:$('<div id="photopile-active-image-info"/>'),isPickedUp:false,fullSizeWidth:null,fullSizeHeight:null,windowPadding:100,init:function(){$('body').append(this.container);this.container.css({'display':'none','position':'absolute','padding':thumbBorderWidth,'z-index':photoZIndex,'background':photoBorderColor,'background-image':'url('+loading+')','background-repeat':'no-repeat','background-position':'50%, 50%'});this.container.append(this.image);this.image.css('display','block');if(showInfo){this.container.append(this.info);this.info.append('<p></p>');this.info.css('opacity','0');};},pickup:function(thumbnail){var self=this;if(self.isPickedUp){self.putDown(function(){self.pickup(thumbnail);});}else{self.isPickedUp=true;thumb.clearActiveClass();thumb.setActive(thumbnail);self.loadImage(thumb.getActiveImgSrc(),function(){self.image.fadeTo(fadeDuration,'1');self.enlarge();$('body').bind('click',function(){self.putDown();});});}},putDown:function(callback){self=this;$('body').unbind();self.hideInfo();navigator.hideControls();thumb.setZ(thumb.getActive(),numLayers);self.container.stop().animate({'top':thumb.getActiveOffset().top+thumb.getActiveShift(),'left':thumb.getActiveOffset().left+thumb.getActiveShift(),'width':thumb.getActiveWidth()+'px','height':thumb.getActiveHeight()+'px','padding':thumbBorderWidth+'px'},pickupDuration,function(){self.isPickedUp=false;thumb.clearActiveClass();self.container.fadeOut(fadeDuration,function(){if(callback)callback();});});},loadImage:function(src,callback){var self=this;self.image.css('opacity','0');self.startPosition();var img=new Image;img.src=src;img.onload=function(){self.fullSizeWidth=this.width;self.fullSizeHeight=this.height;self.setImageSource(src);if(callback)callback();};},startPosition:function(){this.container.css({'top':thumb.getActiveOffset().top+thumb.getActiveShift(),'left':thumb.getActiveOffset().left+thumb.getActiveShift(),'transform':'rotate('+thumb.getActiveRotation()+'deg)','width':thumb.getActiveWidth()+'px','height':thumb.getActiveHeight()+'px','padding':thumbBorderWidth}).fadeTo(fadeDuration,'1');thumb.getActive().fadeTo(fadeDuration,'0');},enlarge:function(){var windowHeight=window.innerHeight?window.innerHeight:$(window).height();var availableWidth=$(window).width()-(2*this.windowPadding);var availableHeight=windowHeight-(2*this.windowPadding);if((availableWidth<this.fullSizeWidth)&&(availableHeight<this.fullSizeHeight)){if((availableWidth*(this.fullSizeHeight/this.fullSizeWidth))>availableHeight){this.enlargeToWindowHeight(availableHeight);}else{this.enlargeToWindowWidth(availableWidth);}}else if(availableWidth<this.fullSizeWidth){this.enlargeToWindowWidth(availableWidth);}else if(availableHeight<this.fullSizeHeight){this.enlargeToWindowHeight(availableHeight);}else{this.enlargeToFullSize();}},showInfo:function(){if(showInfo){this.info.children().text(thumb.getActive().children('a').children('img').attr('alt'));this.info.css({'margin-top':-(this.info.height())+'px'}).fadeTo(fadeDuration,1);}},hideInfo:function(){if(showInfo){this.info.fadeTo(fadeDuration,0);};},enlargeToFullSize:function(){self=this;self.container.css('transform','rotate(0deg)').animate({'top':($(window).scrollTop())+($(window).height()/2)-(self.fullSizeHeight/2),'left':($(window).scrollLeft())+($(window).width()/2)-(self.fullSizeWidth/2),'width':(self.fullSizeWidth-(2*photoBorder))+'px','height':(self.fullSizeHeight-(2*photoBorder))+'px','padding':photoBorder+'px',},function(){self.showInfo();navigator.showControls();});},enlargeToWindowWidth:function(availableWidth){self=this;var adjustedHeight=availableWidth*(self.fullSizeHeight/self.fullSizeWidth);self.container.css('transform','rotate(0deg)').animate({'top':$(window).scrollTop()+($(window).height()/2)-(adjustedHeight/2),'left':$(window).scrollLeft()+($(window).width()/2)-(availableWidth/2),'width':availableWidth+'px','height':adjustedHeight+'px','padding':photoBorder+'px'},function(){self.showInfo();navigator.showControls();});},enlargeToWindowHeight:function(availableHeight){self=this;var adjustedWidth=availableHeight*(self.fullSizeWidth/self.fullSizeHeight);self.container.css('transform','rotate(0deg)').animate({'top':$(window).scrollTop()+($(window).height()/2)-(availableHeight/2),'left':$(window).scrollLeft()+($(window).width()/2)-(adjustedWidth/2),'width':adjustedWidth+'px','height':availableHeight+'px','padding':photoBorder+'px'},function(){self.showInfo();navigator.showControls();});},setImageSource:function(src){this.image.attr('src',src).css({'width':'100%','height':'100%','margin-top':'0'});}}
var navigator={next:$('<div id="photopile-nav-next" />'),prev:$('<div id="photopile-nav-prev" />'),init:function(){photo.container.append(this.next);photo.container.append(this.prev);$('ul.photopile li:first').addClass('first');$('ul.photopile li:last').addClass('last');this.bindUIActions();},bindUIActions:function(){this.next.click(function(e){e.preventDefault();navigator.pickupNext();});this.prev.click(function(e){e.preventDefault();navigator.pickupPrev();});$(document.documentElement).keyup(function(e){if(e.keyCode==39){navigator.pickupNext();}
if(e.keyCode==37){navigator.pickupPrev();}});},pickupNext:function(){var activeThumb=thumb.getActive();if(!activeThumb)return;if(activeThumb.hasClass('last')){photo.pickup($('ul.photopile').children().first());}else{photo.pickup(activeThumb.next('li'));}},pickupPrev:function(){var activeThumb=thumb.getActive();if(!activeThumb)return;if(activeThumb.hasClass('first')){photo.pickup($('ul.photopile').children().last());}else{photo.pickup(activeThumb.prev('li'));}},hideControls:function(){this.next.css('opacity','0');this.prev.css('opacity','0');},showControls:function(){this.next.css('opacity','100');this.prev.css('opacity','100');}};return{scatter:init,autoplay:autoplay}})();photopile.scatter();