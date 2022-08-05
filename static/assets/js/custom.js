"use strict";var $html=$('html');var $body=$('body');var $header=$('#header'),$navBar=$('#nav-bar'),headerHeight=$header.height(),stickyBarrier=$(window).height()-$navBar.height()-2,outBarrier=$header.height()*2,scrolled=0;window.setHeader=function(){scrolled=$(window).scrollTop();if(scrolled>headerHeight&&!$header.hasClass('fixed')){$header.addClass('fixed');if(!$header.hasClass('absolute')){$body.css('padding-top',headerHeight+'px');}}else if(scrolled<=headerHeight&&$header.hasClass('fixed')){$header.removeClass('fixed');if(!$header.hasClass('absolute')){$body.css('padding-top',0);}}
if(scrolled>outBarrier&&!$header.hasClass('out')){$header.addClass('out');}else if(scrolled<=outBarrier&&$header.hasClass('out')){$header.removeClass('out');}
if(scrolled>stickyBarrier&&!$header.hasClass('sticky')){$header.addClass('sticky');$body.addClass('sticky-header');}else if(scrolled<=stickyBarrier&&$header.hasClass('sticky')){$header.removeClass('sticky');$body.removeClass('sticky-header');}}
var Footo={init:function(){this.Basic.init();},Basic:{init:function(){this.mobileDetector();this.navPrimary();this.searchBar();this.scroller();this.sidePanel();this.socialClick();},mobileDetector:function(){var isMobile={Android:function(){return navigator.userAgent.match(/Android/i);},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i);},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera:function(){return navigator.userAgent.match(/Opera Mini/i);},Windows:function(){return navigator.userAgent.match(/IEMobile/i);},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows();}};window.trueMobile=isMobile.any();},navPrimary:function(){var $nav=$('#nav-primary'),$toggleItem=$nav.find('.has-dropdown, .has-megamenu').children('a');$('[data-toggle="mobile-menu"]').on('click',function(){$body.toggleClass('mobile-nav-open');$nav.slideToggle(300);return false;});$toggleItem.on('click',function(){if($(window).width()<992){$(this).next('ul, .megamenu').slideToggle(300);}
return false;});window.setNavPrimary=function(){if($(window).width()>=992){$nav.show();$toggleItem.next('ul, .megamenu').each(function(){$(this).show();})}
if($(window).width()<992){$nav.hide();$body.removeClass('mobile-nav-open');}}},scroller:function(){var $header=$('#header');var headerHeight=$('#nav-bar').height();var $mobileNav=$('#mobile-nav');var $section=$('section','#content');var scrollOffset=0;scrollOffset=-headerHeight;var $scrollers=$('[data-target="local-scroll"]');if($body.hasClass('one-page'))$scrollers=$('#header, [data-target="local-scroll"]');$scrollers.find('a').on('click',function(){$(this).blur();});var $menuItem=$('#nav-primary li > a');var checkMenuItem=function(id){$menuItem.each(function(){var link=$(this).attr('href');if(id==link)$(this).addClass('active');else $(this).removeClass('active');});}},searchBar:function(){var $searchBar=$('#search-bar');$('[data-toggle="search-bar"]').on('click',function(){$('body').toggleClass('search-bar-open');return false;});},sidePanel:function(){$('[data-toggle="side-panel"]').on('click',function(){$body.toggleClass('side-panel-open');return false;});},socialClick:function(){var shareBlock=$('.share-block'),shareToggle=shareBlock.find('.toggle'),shareOptions=shareBlock.find('.share-options');shareToggle.on('click',function(){shareOptions.toggleClass('visile');return false;});var shareBlock2=$('.share-block2'),shareToggle2=shareBlock2.find('.toggle'),shareOptions2=shareBlock2.find('.share-options');shareToggle2.on('click',function(){shareOptions2.toggleClass('visile');return false;});var shareBlock3=$('.share-block3'),shareToggle3=shareBlock3.find('.toggle'),shareOptions3=shareBlock3.find('.share-options');shareToggle3.on('click',function(){shareOptions3.toggleClass('visile');return false;});var shareBlock4=$('.share-block4'),shareToggle4=shareBlock4.find('.toggle'),shareOptions4=shareBlock4.find('.share-options');shareToggle4.on('click',function(){shareOptions4.toggleClass('visile');return false;});},},};$(document).ready(function(){Footo.init();});$(document).keyup(function(e){if(e.keyCode==27){$body.removeClass('search-bar-open');}});$(window).scroll(function(){setHeader();if($('#filter-bar').length>0)setFilterBar();});$(window).resize(function(){setNavPrimary();if($('#filter-bar').length>0)setFilterSelector();})
jQuery(window).on("load resize",function(e){jQuery(window).scroll(function(){if(jQuery(this).scrollTop()>100){jQuery('.scrollup').fadeIn();}else{jQuery('.scrollup').fadeOut();}});jQuery('.scrollup').on('click',function(){jQuery("html, body").animate({scrollTop:0},600);return false;});var carousel=$("#clients");carousel.owlCarousel({navigation:true,navigationText:["<i class='fa fa-angle-left'><</i>","<i class='fa fa-angle-right'>></i>"],autoPlay:3000,items:1,itemsDesktop:[1199,1],itemsDesktopSmall:[979,1]});var carousel=$("#instagram");carousel.owlCarousel({navigation:true,transitionStyle:"goDown",navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],autoPlay:3000,items:1,itemsDesktop:[1199,1],itemsDesktopSmall:[979,1]});});