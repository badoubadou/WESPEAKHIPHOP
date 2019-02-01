(function() {
  window.module = window.module || {};

}).call(this);

(function() {
  var player_video_vimeo;

  player_video_vimeo = (function() {
    'use strict';
    class player_video_vimeo {
      constructor(isMobile1) {
        this.isMobile = isMobile1;
        this.Lang = $('#langage_short').val();
        this.el_spiner = $('.lds-dual-ring');
        this.el_logowhite = $('#logowhite');
        this.smallmapContry = '.smallmap-' + this.Lang + '-st1';
        this.el_enter_site = $('#enter_site');
        this.el_video_container = $('.video-container');
        this.el_body = $('body');
        this.el_other_lang = $('#other_lang');
        this.el_sound = $('#sound');
        this.el_myfullscreen = $('.myfullscreen');
        this.el_popin = $('#popin');
        this.el_skip_intro = $('.skip_intro');
        this.el_to_hide_when_video = $('#abouttxt, #credittxt, #artist_info, #shareinfo, #logowhite');
        this.playerYT = null;
        this.playerIntroVimeo = null;
        this.drawLogo = null;
        this.bindEvents();
        this.needStartSite = true;
      }

      playYTisReady() {
        console.log('----------------------- playYTisReady -------------------------------------------');
        return this.el_spiner.trigger('hidespiner');
      }

      playIntroisReady() {
        console.log('----------------------- playIntroisReady -------------------------------------------');
        this.el_spiner.trigger('hidespiner');
        return this.startSite();
      }

      getIntroVimeo() {
        var random, randomid;
        random = Math.floor(Math.random() * 4);
        randomid = $('#idIntroYoutube input:eq(' + random + ')').val();
        return randomid;
      }

      startSite() {
        var btnIntroVisible, el_logowhite, isMobile, loadSpriteDisk;
        btnIntroVisible = function() {
          var isMobile, player_video;
          isMobile = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
          console.log('finished show btn = ' + isMobile);
          return player_video = new module.player_video(isMobile);
        };
        el_logowhite = this.el_logowhite;
        loadSpriteDisk = this.loadSpriteDisk;
        isMobile = this.isMobile;
        this.el_spiner.on('loaderhidden', function() {
          return el_logowhite.trigger('showLogo');
        });
        this.el_logowhite.on('finishedShowLogo', function() {
          console.log('finishedShowLogo');
          loadSpriteDisk();
          TweenMax.set('.btn_intro a', {
            autoAlpha: 0,
            visibility: "visible"
          });
          return TweenMax.staggerFromTo('.btn_intro a', .8, {
            autoAlpha: 0,
            y: -10
          }, {
            autoAlpha: 1,
            y: 0,
            ease: Power1.easeOut
          }, 0.5, btnIntroVisible);
        });
        return this.loadMap();
      }

      YouTubeGetID(url) {
        var r;
        r = /(videos|video|channels|\.com)\/([\d]+)/;
        return url.match(r)[2];
      }

      loadMap() {
        var that;
        that = this;
        return $.get('https://d2p8kxfsucab5j.cloudfront.net/smallmap-' + that.Lang + '.svg', function(data) {
          var div;
          console.log('---> small map loaded');
          div = document.createElement('div');
          div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement);
          $("#smallmap").append(div.innerHTML);
          TweenLite.set(that.smallmapContry, {
            alpha: 0
          });
          TweenMax.to(that.smallmapContry, 0.5, {
            scale: 3,
            transformOrigin: '50% 50%',
            repeat: -1,
            yoyo: true
          });
        });
      }

      loadSpriteDisk() {
        console.log('loadSpriteDisk');
        return $.get('https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/sprite_disk.svg', function(data) {
          var div;
          div = document.createElement('div');
          div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement);
          $("#sprite_svg_disk").append(div.innerHTML);
        });
      }

      bindEvents() {
        var GoInFullscreen, GoOutFullscreen, IsFullScreenCurrently, checkClassAndTrigger, checkratio, finished_popin_transition, options, startVimeo, that, vid_intro_finished;
        that = this;
        //------------------- ENTER SITE -------------------#
        that.el_enter_site.on('click touchstart', function(event) {
          var btnIntroInVisible, delaytween;
          console.log('enter site -------------------------------- ');
          btnIntroInVisible = function() {
            that.el_video_container.removeClass('hidden hide');
            $('.btn_intro a').on('click', function(event) {
              event.stopPropagation();
              event.preventDefault();
              return false;
            });
            if (!that.isMobile) {
              return that.playerIntroVimeo.play();
            }
          };
          that.el_enter_site.off();
          that.el_enter_site = null;
          that.el_other_lang.off();
          that.el_other_lang = null;
          delaytween = 0;
          if (!that.el_body.hasClass('device-ios')) {
            // GoInFullscreen(that.el_body.get(0), that.el_myfullscreen)
            delaytween = 0.8;
          }
          console.log('delaytween = ' + delaytween);
          TweenMax.staggerTo('.btn_intro a', .3, {
            opacity: 0,
            y: -10,
            delay: delaytween,
            ease: Power1.easeOut
          }, 0.2, btnIntroInVisible);
          if (that.isMobile) {
            that.playerIntroVimeo.play();
          }
          setTimeout((function() {
            TweenMax.fromTo('.skip_intro', .6, {
              autoAlpha: 0,
              visibility: 'visible'
            }, {
              autoAlpha: 1
            });
          }), 3000);
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        that.el_other_lang.on('click touchstart', function(event) {
          window.location.href = $(this).attr('href');
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        
        //------------------- SOUND ---------------------------#
        that.el_sound.on('click touchstart', function(event) {
          var event_name;
          console.log('click sound');
          event_name = 'sound_on';
          if (that.el_sound.hasClass('actif')) {
            event_name = 'sound_off';
          }
          $(this).trigger(event_name);
          console.log(event_name);
          that.el_sound.toggleClass('actif');
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        
        //------------------- FULL SCREEN ---------------------------#				
        GoInFullscreen = function(el_body, btn) {
          btn.addClass('actiffullscreen');
          if (el_body.requestFullscreen) {
            el_body.requestFullscreen();
          } else if (el_body.mozRequestFullScreen) {
            el_body.mozRequestFullScreen();
          } else if (el_body.webkitRequestFullscreen) {
            el_body.webkitRequestFullscreen();
          } else if (el_body.msRequestFullscreen) {
            el_body.msRequestFullscreen();
          }
          if (IsFullScreenCurrently()) {
            btn.addClass('actiffullscreen');
          }
        };
        GoOutFullscreen = function() {
          $('.myfullscreen').removeClass('actiffullscreen');
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        };
        IsFullScreenCurrently = function() {
          var full_screen_element;
          full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
          // If no element is in full-screen
          if (full_screen_element === null) {
            return false;
          } else {
            return true;
          }
        };
        that.el_myfullscreen.on('click', function(event) {
          console.log('click ');
          if (!IsFullScreenCurrently()) {
            GoInFullscreen($('body').get(0), $(this));
          } else {
            GoOutFullscreen();
          }
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        // options = {id: 296883720, width: 640,loop: false, autoplay:true, email:false}
        options = {
          id: this.getIntroVimeo(),
          width: 640,
          loop: false,
          autoplay: false,
          email: false
        };
        this.playerIntroVimeo = new Vimeo.Player('playerIntroVimeo', options);
        
        //------------------- PLAYER YOUTUBE IS READY -------------------#
        // @playerYT.ready().then ->
        // 	console.log 'player ready'
        // 	that.playYTisReady()
        // 	return
        this.playerIntroVimeo.ready().then(function() {
          console.log('player ready');
          that.playIntroisReady();
        });
        this.playerIntroVimeo.on('play', function(event) {
          that.el_video_container.removeClass('trans');
          if (that.el_logowhite.data('animstatus') === 'paused') {
            return that.el_logowhite.trigger('resumehideLogo');
          } else {
            return that.el_logowhite.trigger('hideLogo');
          }
        });
        this.playerIntroVimeo.on('pause', function(event) {
          if (that.el_logowhite.data('animstatus') === 'playing') {
            return that.el_logowhite.trigger('pausehideLogo');
          }
        });
        
        //------------------- FOCUS -------------------#
        // $(window).on 'pageshow focus', ->
        // 	console.log 'on focus : '+that.playerYT.paused
        // 	if that.playerYT.paused
        // 		that.playerYT.play()

        // $(window).on 'pagehide blur', ->
        // 	console.log 'on blur : '+that.playerYT.playing
        // 	if that.playerYT.playing
        // 		that.playerYT.pause()

        //------------------- STOP PLAYER WHEN CLOSE POPIN -------------------#
        this.el_popin.on('closePopin', function() {
          that.el_video_container.addClass('trans');
          if (that.playerYT) {
            that.playerYT.pause().then(function() {});
            // The video is paused
            return that.playerYT.destroy().then(function() {
              // The video is paused
              that.playerYT = null;
            });
          }
        });
        //------------------- INTRO FINISHED -------------------#
        finished_popin_transition = function() {
          if (!that.isMobile) {
            $('#player')[0].play();
            console.log('play disk');
          }
          return that.el_popin.addClass('hide').trigger('endIntro').trigger('closePopin').attr('style', '');
        };
        vid_intro_finished = function() {
          if (that.el_body.hasClass('vid_intro_finished')) {
            return;
          }
          that.playerIntroVimeo.pause();
          $('#close').removeClass('hide');
          that.el_video_container.removeClass('with_btn_skip');
          that.el_logowhite.trigger('destroyLogo');
          that.el_skip_intro.off();
          that.el_skip_intro.remove();
          that.el_skip_intro = null;
          that.playerIntroVimeo.off('ended');
          that.playerIntroVimeo = null;
          $('.intro_page').hide();
          if (that.isMobile) {
            $('#player')[0].play();
            finished_popin_transition();
          } else {
            TweenMax.to('#popin', .8, {
              opacity: 0,
              onComplete: finished_popin_transition
            });
          }
          that.el_body.addClass('vid_intro_finished');
        };
        this.el_skip_intro.on('click touchstart', function(event) {
          vid_intro_finished();
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        this.playerIntroVimeo.on('ended', function(event) {
          vid_intro_finished();
        });
        //------------------- CLICK LIST ARTIST -------------------#
        checkratio = function(ratiovideo) {
          console.log('ratiovideo : ' + ratiovideo);
          if (ratiovideo === 4) {
            return that.el_video_container.addClass('quatre_tier');
          } else {
            return that.el_video_container.removeClass('quatre_tier');
          }
        };
        checkClassAndTrigger = function() {
          that.el_to_hide_when_video.addClass('hide');
          that.el_video_container.removeClass('hide');
          return that.el_video_container.removeClass('trans');
        };
        // $('.lds-dual-ring').trigger 'showspiner'
        startVimeo = function(idVimeo) {
          that.el_spiner.trigger('showspiner');
          that.el_popin.trigger('showVideo');
          if (!that.playerYT) {
            options = {
              id: idVimeo,
              width: 640,
              loop: false,
              autoplay: true,
              email: false
            };
            that.playerYT = new Vimeo.Player('playerYT', options);
            that.playerYT.enableTextTrack(that.Lang).then(function(track) {}).catch(function(error) {
              console.log('###', error);
            });
            return that.playerYT.ready().then(function() {
              console.log('player ready');
              that.playYTisReady();
            });
          }
        };
        
        // $('.startvideofrompopin').on 'click touchstart', (event) ->
        // 	idVimeo = that.YouTubeGetID($(this).attr('href'))
        // 	console.log 'id vimeo : '+idVimeo
        // 	event.stopPropagation()
        // 	event.preventDefault()
        // 	return false
        return $('.startvideofrompopin, #list_artists li a, #play-video-btn, a.watch').on('click touchstart', function(event) {
          var idVimeo;
          idVimeo = that.YouTubeGetID($(this).attr('href'));
          checkratio($(this).data('ratiovideo'));
          checkClassAndTrigger();
          startVimeo(idVimeo);
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
      }

    };

    return player_video_vimeo;

  }).call(this);

  module.player_video_vimeo = player_video_vimeo;

}).call(this);

(function() {
  var player_video_youtube, tag;

  player_video_youtube = (function() {
    'use strict';
    class player_video_youtube {
      constructor(isMobile1) {
        var firstScriptTag;
        this.isMobile = isMobile1;
        this.Lang = $('#langage_short').val();
        this.el_spiner = $('.lds-dual-ring');
        this.el_logowhite = $('#logowhite');
        this.smallmapContry = '.smallmap-' + this.Lang + '-st1';
        this.el_enter_site = $('#enter_site');
        this.el_video_container = $('.video-container');
        this.el_body = $('body');
        this.el_other_lang = $('#other_lang');
        this.el_sound = $('#sound');
        this.el_myfullscreen = $('.myfullscreen');
        this.el_popin = $('#popin');
        this.el_skip_intro = $('.skip_intro');
        this.el_to_hide_when_video = $('#abouttxt, #credittxt, #artist_info, #shareinfo, #logowhite');
        this.playerYT = null;
        this.playerIntroVimeo = null;
        this.drawLogo = null;
        this.bindEvents();
        this.needStartSite = true;
        tag.src = 'https://www.youtube.com/iframe_api';
        firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      playYTisReady() {
        console.log('----------------------- playYTisReady -------------------------------------------');
        return this.el_spiner.trigger('hidespiner');
      }

      playIntroisReady() {
        console.log('----------------------- playIntroisReady -------------------------------------------');
        this.el_spiner.trigger('hidespiner');
        return this.startSite();
      }

      getIntroVimeo() {
        var random, randomid;
        random = Math.floor(Math.random() * 4);
        randomid = $('#idIntroYoutube input:eq(' + random + ')').val();
        return randomid;
      }

      startSite() {
        var btnIntroVisible, el_logowhite, isMobile, loadSpriteDisk;
        btnIntroVisible = function() {
          var isMobile, player_video;
          isMobile = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
          console.log('finished show btn = ' + isMobile);
          return player_video = new module.player_video(isMobile);
        };
        el_logowhite = this.el_logowhite;
        loadSpriteDisk = this.loadSpriteDisk;
        isMobile = this.isMobile;
        this.el_spiner.on('loaderhidden', function() {
          return el_logowhite.trigger('showLogo');
        });
        this.el_logowhite.on('finishedShowLogo', function() {
          console.log('finishedShowLogo');
          loadSpriteDisk();
          TweenMax.set('.btn_intro a', {
            autoAlpha: 0,
            visibility: "visible"
          });
          return TweenMax.staggerFromTo('.btn_intro a', .8, {
            autoAlpha: 0,
            y: -10
          }, {
            autoAlpha: 1,
            y: 0,
            ease: Power1.easeOut
          }, 0.5, btnIntroVisible);
        });
        return this.loadMap();
      }

      YouTubeGetID(url) {
        var r;
        r = /(videos|video|channels|\.com)\/([\d]+)/;
        return url.match(r)[2];
      }

      loadMap() {
        var that;
        that = this;
        return $.get('https://d2p8kxfsucab5j.cloudfront.net/smallmap-' + that.Lang + '.svg', function(data) {
          var div;
          console.log('---> small map loaded');
          div = document.createElement('div');
          div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement);
          $("#smallmap").append(div.innerHTML);
          TweenLite.set(that.smallmapContry, {
            alpha: 0
          });
          TweenMax.to(that.smallmapContry, 0.5, {
            scale: 3,
            transformOrigin: '50% 50%',
            repeat: -1,
            yoyo: true
          });
        });
      }

      loadSpriteDisk() {
        console.log('loadSpriteDisk');
        return $.get('https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/sprite_disk.svg', function(data) {
          var div;
          div = document.createElement('div');
          div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement);
          $("#sprite_svg_disk").append(div.innerHTML);
        });
      }

      bindEvents() {
        var GoInFullscreen, GoOutFullscreen, IsFullScreenCurrently, checkClassAndTrigger, checkratio, finished_popin_transition, startVimeo, that, vid_intro_finished;
        that = this;
        //------------------- ENTER SITE -------------------#
        that.el_enter_site.on('click touchstart', function(event) {
          var btnIntroInVisible, delaytween;
          console.log('enter site -------------------------------- ');
          btnIntroInVisible = function() {
            that.el_video_container.removeClass('hidden hide');
            $('.btn_intro a').on('click', function(event) {
              event.stopPropagation();
              event.preventDefault();
              return false;
            });
            if (!that.isMobile) {
              return that.playerIntroVimeo.play();
            }
          };
          that.el_enter_site.off();
          that.el_enter_site = null;
          that.el_other_lang.off();
          that.el_other_lang = null;
          delaytween = 0;
          if (!that.el_body.hasClass('device-ios')) {
            delaytween = 0.8;
          }
          console.log('delaytween = ' + delaytween);
          TweenMax.staggerTo('.btn_intro a', .3, {
            opacity: 0,
            y: -10,
            delay: delaytween,
            ease: Power1.easeOut
          }, 0.2, btnIntroInVisible);
          if (that.isMobile) {
            that.playerIntroVimeo.play();
          }
          setTimeout((function() {
            TweenMax.fromTo('.skip_intro', .6, {
              autoAlpha: 0,
              visibility: 'visible'
            }, {
              autoAlpha: 1
            });
          }), 3000);
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        that.el_other_lang.on('click touchstart', function(event) {
          window.location.href = $(this).attr('href');
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        
        //------------------- SOUND ---------------------------#
        that.el_sound.on('click touchstart', function(event) {
          var event_name;
          console.log('click sound');
          event_name = 'sound_on';
          if (that.el_sound.hasClass('actif')) {
            event_name = 'sound_off';
          }
          $(this).trigger(event_name);
          console.log(event_name);
          that.el_sound.toggleClass('actif');
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        
        //------------------- FULL SCREEN ---------------------------#				
        GoInFullscreen = function(el_body, btn) {
          btn.addClass('actiffullscreen');
          if (el_body.requestFullscreen) {
            el_body.requestFullscreen();
          } else if (el_body.mozRequestFullScreen) {
            el_body.mozRequestFullScreen();
          } else if (el_body.webkitRequestFullscreen) {
            el_body.webkitRequestFullscreen();
          } else if (el_body.msRequestFullscreen) {
            el_body.msRequestFullscreen();
          }
          if (IsFullScreenCurrently()) {
            btn.addClass('actiffullscreen');
          }
        };
        GoOutFullscreen = function() {
          $('.myfullscreen').removeClass('actiffullscreen');
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        };
        IsFullScreenCurrently = function() {
          var full_screen_element;
          full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
          // If no element is in full-screen
          if (full_screen_element === null) {
            return false;
          } else {
            return true;
          }
        };
        that.el_myfullscreen.on('click', function(event) {
          console.log('click ');
          if (!IsFullScreenCurrently()) {
            GoInFullscreen($('body').get(0), $(this));
          } else {
            GoOutFullscreen();
          }
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        // options = {id: @getIntroVimeo(), width: 640,loop: false, autoplay:false, email:false}
        // @playerIntroVimeo = new (Vimeo.Player)('playerIntroVimeo', options)
        window.onYouTubeIframeAPIReady = function() {
          return this.playerIntroVimeo = new YT.Player('playerYT', {
            height: '390',
            width: '640',
            videoId: 'CPfrRJf46sQ',
            fs: 0,
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              autohide: 1,
              disablekb: 1,
              enablejsapi: 1,
              fs: 1,
              rel: 0,
              hl: $('#langage_short').val(),
              cc_lang_pref: $('#langage_short').val(),
              cc_load_policy: 1
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        };
        window.onPlayerReady = function(event) {
          console.log('onPlayerReady');
          event.target.playVideo();
        };
        window.onPlayerStateChange = function(event) {
          if (event.data === YT.PlayerState.PLAYING && !done) { // --------- video start playing
            $('#zone_youtube').addClass('play');
            $('#popin').removeClass('hide').trigger('classChange');
            $('.lds-dual-ring').addClass('done');
            $('#popin .video-container').removeClass('hide');
            if (window.pauseSound) {
              window.pauseSound();
            }
            if (window.isMobile()) {
              window.updateTxtInfoMobile($('#artist_info info:not(.hide)').index());
            }
          } else if (event.data === YT.PlayerState.ENDED) { // --------- video start playing
            window.closePopin();
            console.log('youtube is done');
          }
        };
        
        //------------------- PLAYER YOUTUBE IS READY -------------------#
        // @playerIntroVimeo.ready().then ->
        // 	console.log 'player ready'
        // 	that.playIntroisReady()
        // 	return

        // @playerIntroVimeo.on 'play', (event) ->
        // 	that.el_video_container.removeClass 'trans'
        // 	if (that.el_logowhite.data('animstatus')=='paused')
        // 		that.el_logowhite.trigger 'resumehideLogo'
        // 	else
        // 		that.el_logowhite.trigger 'hideLogo'

        // @playerIntroVimeo.on 'pause', (event) ->
        // 	if (that.el_logowhite.data('animstatus') == 'playing')
        // 		that.el_logowhite.trigger 'pausehideLogo'

        //------------------- STOP PLAYER WHEN CLOSE POPIN -------------------#
        this.el_popin.on('closePopin', function() {
          that.el_video_container.addClass('trans');
          if (that.playerYT) {
            that.playerYT.pause().then(function() {});
            // The video is paused
            return that.playerYT.destroy().then(function() {
              // The video is paused
              that.playerYT = null;
            });
          }
        });
        //------------------- INTRO FINISHED -------------------#
        finished_popin_transition = function() {
          if (!that.isMobile) {
            $('#player')[0].play();
            console.log('play disk');
          }
          return that.el_popin.addClass('hide').trigger('endIntro').trigger('closePopin').attr('style', '');
        };
        vid_intro_finished = function() {
          if (that.el_body.hasClass('vid_intro_finished')) {
            return;
          }
          that.playerIntroVimeo.pause();
          $('#close').removeClass('hide');
          that.el_video_container.removeClass('with_btn_skip');
          that.el_logowhite.trigger('destroyLogo');
          that.el_skip_intro.off();
          that.el_skip_intro.remove();
          that.el_skip_intro = null;
          that.playerIntroVimeo.off('ended');
          that.playerIntroVimeo = null;
          $('.intro_page').hide();
          if (that.isMobile) {
            $('#player')[0].play();
            finished_popin_transition();
          } else {
            TweenMax.to('#popin', .8, {
              opacity: 0,
              onComplete: finished_popin_transition
            });
          }
          that.el_body.addClass('vid_intro_finished');
        };
        this.el_skip_intro.on('click touchstart', function(event) {
          vid_intro_finished();
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        
        // @playerIntroVimeo.on 'ended', (event) ->
        // 	vid_intro_finished()
        // 	return

        //------------------- CLICK LIST ARTIST -------------------#
        checkratio = function(ratiovideo) {
          console.log('ratiovideo : ' + ratiovideo);
          if (ratiovideo === 4) {
            return that.el_video_container.addClass('quatre_tier');
          } else {
            return that.el_video_container.removeClass('quatre_tier');
          }
        };
        checkClassAndTrigger = function() {
          that.el_to_hide_when_video.addClass('hide');
          that.el_video_container.removeClass('hide');
          return that.el_video_container.removeClass('trans');
        };
        // $('.lds-dual-ring').trigger 'showspiner'
        startVimeo = function(idVimeo) {
          var options;
          that.el_spiner.trigger('showspiner');
          that.el_popin.trigger('showVideo');
          if (!that.playerYT) {
            options = {
              id: idVimeo,
              width: 640,
              loop: false,
              autoplay: true,
              email: false
            };
            that.playerYT = new Vimeo.Player('playerYT', options);
            that.playerYT.enableTextTrack(that.Lang).then(function(track) {}).catch(function(error) {
              console.log('###', error);
            });
            return that.playerYT.ready().then(function() {
              console.log('player ready');
              that.playYTisReady();
            });
          }
        };
        return $('.startvideofrompopin, #list_artists li a, #play-video-btn, a.watch').on('click touchstart', function(event) {
          var idVimeo;
          idVimeo = that.YouTubeGetID($(this).attr('href'));
          checkratio($(this).data('ratiovideo'));
          checkClassAndTrigger();
          startVimeo(idVimeo);
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
      }

    };

    return player_video_youtube;

  }).call(this);

  module.player_video_youtube = player_video_youtube;

  tag = document.createElement('script');

}).call(this);

(function() {
  var popin;

  popin = (function() {
    'use strict';
    class popin {
      constructor() {
        this.timelinePopin = null;
        this.el_popin = $('#popin');
        this.popin_content = $('.video-container, #abouttxt, #credittxt, #contacttxt, #artist_info, #shareinfo, #logowhite');
        this.bindEvents();
      }

      afterclose(el_popin, popin_content) {
        console.log('afterclose');
        el_popin.addClass('hide').trigger('closePopin');
        el_popin.removeAttr('style');
        el_popin.find('*').removeAttr('style');
        return popin_content.addClass('hide');
      }

      closePopin() {
        console.log('closePopin @timelinePopin : ' + this.timelinePopin);
        if (this.timelinePopin) {
          return this.timelinePopin.reverse();
        } else {
          this.el_popin.addClass('hide');
          return this.el_popin.trigger('closePopin');
        }
      }

      bindEvents() {
        var loadPopinAssets, showPopin, that;
        that = this;
        loadPopinAssets = function() {
          return $.get('https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/sprite-popin.svg', function(data) {
            var div;
            div = document.createElement('div');
            div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement);
            $("#sprite_svg").append(div.innerHTML).addClass('done');
          });
        };
        showPopin = function($target) {
          that.el_popin.trigger('showPopin');
          that.popin_content.addClass('hide');
          if (that.el_popin.hasClass('hide')) {
            that.el_popin.removeClass('hide');
          }
          that.el_popin.removeClass('greybg');
          if (($target === '#abouttxt') || ($target === '#credittxt') || ($target === '#contacttxt')) {
            that.el_popin.addClass('greybg');
          }
          $($target).removeClass('hide');
          if ($target === '.video-container') {
            $('.video-container').addClass('trans');
          }
          that.timelinePopin = new TimelineMax({
            onReverseComplete: that.afterclose,
            onReverseCompleteParams: [that.el_popin, that.popin_content]
          });
          return that.timelinePopin.from('#popin', .6, {
            opacity: 0,
            ease: Power3.easeOut
          }).fromTo($target, 0.5, {
            alpha: 0,
            marginTop: 30,
            ease: Power1.easeInOut
          }, {
            alpha: 1,
            marginTop: 0
          });
        };
        
        //------------------- ABOUT SHARE CREDIT MAIL --------------------------#
        $('.btnfooterpopin').on('click touchstart', function(e) {
          loadPopinAssets();
          showPopin($(this).attr('href'));
          e.stopPropagation();
          e.preventDefault();
          return false;
        });
        
        //------------------- BIO  --------------------------#
        $('.about-btn').on('click touchstart', function(e) {
          showPopin('#artist_info');
          e.stopPropagation();
          e.preventDefault();
          return false;
        });
        $('#close, #back').on('click touchstart', function(e) {
          that.closePopin();
          e.stopPropagation();
          e.preventDefault();
          return false;
        });
        return this.el_popin.on('showVideo', function() {
          console.log('belors ?? - showVideo');
          return showPopin('.video-container');
        });
      }

    };

    return popin;

  }).call(this);

  module.popin = popin;

}).call(this);

(function() {
  var spiner;

  spiner = (function() {
    'use strict';
    class spiner {
      constructor(myspiner1) {
        this.myspiner = myspiner1;
        this.subring = ['.ring_1', '.ring_2', '.ring_3'];
        console.log('----------------- > constructor spinner');
        TweenLite.set(this.subring, {
          xPercent: -50,
          yPercent: -50
        });
        this.timelineSpiner = new TimelineMax({
          paused: true,
          onReverseComplete: this.maskSpiner,
          onReverseCompleteParams: [this.myspiner],
          onStart: this.unmaskSpiner,
          onStartParams: [this.myspiner]
        }).staggerFromTo(this.subring, 2, {
          opacity: 0
        }, {
          scale: 1,
          opacity: 1,
          ease: Power3.easeOut
        }, 0.5);
        this.bindEvents();
        this.showSpiner();
      }

      maskSpiner(myspiner) {
        myspiner.trigger('loaderhidden');
        return myspiner.addClass('no_spinner').hide();
      }

      unmaskSpiner(myspiner) {
        console.log('unmaskSpiner -> ');
        return myspiner.removeClass('no_spinner').show();
      }

      showSpiner() {
        var that;
        that = this;
        return that.timelineSpiner.play();
      }

      hideSpiner() {
        var that;
        that = this;
        return that.timelineSpiner.reverse();
      }

      bindEvents() {
        var that;
        that = this;
        that.myspiner.on('hidespiner', function() {
          return that.hideSpiner(that.myspiner);
        });
        return that.myspiner.on('showspiner', function() {
          console.log('catch showspiner');
          return that.showSpiner(that.myspiner);
        });
      }

    };

    return spiner;

  }).call(this);

  module.spiner = spiner;

}).call(this);

(function() {
  'use strict';
  var player_video;

  player_video = (function() {
    'use strict';
    class player_video {
      constructor(isMobile) {
        this.isMobile = isMobile;
        //------------------- SET VAR ---------------------------#
        this.disk_speep = 0.39;
        this.scale_disk = 2;
        this.duration = 168.182;
        
        //------------------- SET ELEMENT ---------------------------#
        this.el_popin = $('#popin');
        this.el_sound = $('#sound');
        this.el_player = $('#player');
        this.player = $('#player')[0];
        this.el_pause_btn = $('#pause-video-btn');
        this.el_spiner = $('.lds-dual-ring');
        this.el_body = $('body');
        this.el_disk = $('#disk');
        this.el_btn_play_video = $('#play-video-btn, .startvideofrompopin');
        this.el_artists_info_li = $('#artists_info li');
        this.el_popin_artist_info_info = $('#popin #artist_info .info');
        this.el_artists_info_li = $('#artists_info li');
        this.el_list_artists_li = $('#list_artists li');
        this.el_tuto = $('.tuto');
        this.el_window = $(window);
        this.smallmapContry = '.smallmap-' + $('#langage_short').val() + '-st1';
        this.svgcontry = null;
        //------------------- SET TWEEN ---------------------------#
        this.timelineKnob = new TimelineMax({
          paused: true
        });
        this.timelineInfo = new TimelineMax({
          paused: true,
          repeat: -1
        });
        this.timelineIntro = null;
        console.log('&&&&&&&&&&&&&&@isMobile = ' + this.isMobile);
        if (this.isMobile) {
          $('#player').attr('src', 'https://d2p8kxfsucab5j.cloudfront.net/25f500kfaststartmobile.mp4');
          this.scale_disk = 1;
        }
        if (this.player.duration && this.player.duration > 1) {
          this.duration = this.player.duration;
        }
        
        //------------------- SET SOUND ---------------------------#
        this.sounddirection = 0;
        this.scratchBank = [];
        this.scratchBank.push(new Howl({
          src: ['https://d2p8kxfsucab5j.cloudfront.net/video.mp3'],
          buffer: true
        }));
        this.scratchBank.push(new Howl({
          src: ['https://d2p8kxfsucab5j.cloudfront.net/video_reverse.mp3'],
          buffer: true
        }));
        
        //------------------- SET FUNCTION ---------------------------#
        this.setTimeLineIntro();
        this.el_player.addClass('ready');
        this.createTweenInfo();
        this.setTimeLineKnob();
        this.setScratcher();
        this.bindEvents();
      }

      //------------------- TWEEN ---------------------------#
      createTweenInfo(curentTime) {
        var duration_sequence, sequence, that, updateInfo;
        that = this;
        updateInfo = function(id) {
          that.svgcontry = '#' + that.el_artists_info_li.eq(id).find('.contry').data('contrynicename');
          that.el_btn_play_video.attr('href', that.el_list_artists_li.eq(id).find('a').attr('href'));
          that.el_btn_play_video.data('ratiovideo', that.el_list_artists_li.eq(id).find('a').data('ratiovideo'));
          that.el_list_artists_li.find('a.selected').removeClass('selected');
          that.el_list_artists_li.eq(id).find('a').addClass('selected');
          TweenMax.to(that.smallmapContry, 0.5, {
            alpha: 0
          });
          TweenMax.to(that.svgcontry, 0.5, {
            alpha: 1
          });
          that.el_artists_info_li.removeClass('ontop');
          that.el_artists_info_li.eq(id).addClass('ontop');
          that.el_popin_artist_info_info.addClass('hide');
          return that.el_popin_artist_info_info.eq(id).removeClass('hide');
        };
        duration_sequence = this.duration / 28;
        sequence = '+=' + (duration_sequence - 1);
        return this.timelineInfo.add(function() {
          return updateInfo(0);
        }).fromTo('#artists_info li:eq(0) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(0) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(1);
        }).fromTo('#artists_info li:eq(1) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(1) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(2);
        }).fromTo('#artists_info li:eq(2) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(2) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(3);
        }).fromTo('#artists_info li:eq(3) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(3) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(4);
        }).fromTo('#artists_info li:eq(4) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(4) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(5);
        }).fromTo('#artists_info li:eq(5) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(5) .warper', 0.5, {
          alpha: 0
        }, sequence).add(function() {
          return updateInfo(6);
        }).fromTo('#artists_info li:eq(6) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(6) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(7);
        }).fromTo('#artists_info li:eq(7) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(7) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(8);
        }).fromTo('#artists_info li:eq(8) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(8) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(9);
        }).fromTo('#artists_info li:eq(9) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(9) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(10);
        }).fromTo('#artists_info li:eq(10) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(10) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(11);
        }).fromTo('#artists_info li:eq(11) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(11) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(12);
        }).fromTo('#artists_info li:eq(12) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(12) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(13);
        }).fromTo('#artists_info li:eq(13) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(13) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(14);
        }).fromTo('#artists_info li:eq(14) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(14) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(15);
        }).fromTo('#artists_info li:eq(15) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(15) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(16);
        }).fromTo('#artists_info li:eq(16) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(16) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(17);
        }).fromTo('#artists_info li:eq(17) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(17) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(18);
        }).fromTo('#artists_info li:eq(18) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(18) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(19);
        }).fromTo('#artists_info li:eq(19) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(19) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(20);
        }).fromTo('#artists_info li:eq(20) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(20) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(21);
        }).fromTo('#artists_info li:eq(21) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(21) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(22);
        }).fromTo('#artists_info li:eq(22) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(22) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(23);
        }).fromTo('#artists_info li:eq(23) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(23) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(24);
        }).fromTo('#artists_info li:eq(24) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(24) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(25);
        }).fromTo('#artists_info li:eq(25) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(25) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(26);
        }).fromTo('#artists_info li:eq(26) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(26) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence).add(function() {
          return updateInfo(27);
        }).fromTo('#artists_info li:eq(27) .warper', 0.5, {
          alpha: 0,
          marginTop: 30,
          ease: Power1.easeInOut
        }, {
          alpha: 1,
          marginTop: 0
        }).to('#artists_info li:eq(27) .warper', 0.5, {
          alpha: 0,
          marginTop: -30
        }, sequence);
      }

      setTimeLineIntro(curentTime) {
        var that;
        that = this;
        that.timelineIntro = new TimelineMax({
          paused: true
        });
        TweenLite.set(['#block_video_disk', '#disk', '#platine'], {
          xPercent: -50,
          yPercent: -50
        });
        TweenLite.set(['#smallmap'], {
          xPercent: -50
        });
        return that.timelineIntro.from('#block_video_disk', 1.5, {
          rotation: 270,
          opacity: 0,
          scale: that.scale_disk,
          ease: Power1.easeOut
        }).add(this.play_video_disk).from('#platine', 1, {
          opacity: 0,
          scale: .8
        }, '-=.5').staggerFrom('#list_artists li', .3, {
          opacity: 0
        }, 0.04).from(['#play-video-btn', '#pause-video-btn'], .6, {
          opacity: 0
        }).from('#main_footer', .8, {
          y: 40,
          ease: Power3.easeOut
        }).from('#left_col', .8, {
          x: '-100%',
          ease: Power3.easeOut
        }, '-=.8').add(this.show_logo).from('.tuto', .6, {
          opacity: 0,
          ease: Power3.easeOut
        }).from('#smallmap', 1, {
          opacity: 0,
          y: 50,
          ease: Power3.easeOut
        }).from('#artists_info', .5, {
          opacity: 0,
          ease: Power3.easeOut
        }).from('#txt_help_disk', .8, {
          opacity: 0,
          left: '-100%',
          ease: Power3.easeOut
        });
      }

      setTimeLineKnob(rot_from = 0, rot_to = 360) {
        console.log('setTimeLineKnob');
        return this.timelineKnob.fromTo('#disk', this.duration, {
          rotation: rot_from
        }, {
          rotation: rot_to,
          ease: Linear.easeNone,
          repeat: -1
        });
      }

      show_logo() {
        return $('.logoWSH').trigger('showLogo');
      }

      play_video_disk() {
        if (!this.isMobile) {
          $('#player')[0].play();
          $('body').removeClass('disk_on_hold');
        }
      }

      skipIntro() {
        console.log('skipIntro : player play ------------------------------ ??????? @isMobile = ' + this.isMobile);
        this.timelineIntro.play();
        this.el_popin.off('endIntro');
        if (this.isMobile) {
          console.log('play vidoeo on skip');
          return this.play_video_disk();
        }
      }

      changeCurrentTime($deg, $myplayer, dir, speed) {
        var PBR, opositeDirection, percentage, player_new_CT, roundedPBR, sound_new_CT;
        this.$deg = $deg;
        this.$myplayer = $myplayer;
        if (this.$deg < 0) {
          this.$deg = 360 + this.$deg;
        }
        percentage = this.$deg / 3.6;
        player_new_CT = this.$myplayer.duration * (percentage / 100);
        this.$myplayer.currentTime = player_new_CT;
        this.sounddirection = dir === 'clockwise' ? 0 : 1;
        opositeDirection = dir === 'clockwise' ? 1 : 0;
        PBR = speed / this.disk_speep;
        PBR = Math.min(Math.max(speed / this.disk_speep, 0.9), 1.2);
        roundedPBR = Number(PBR.toFixed(4));
        this.scratchBank[this.sounddirection].rate(roundedPBR);
        sound_new_CT = dir === 'clockwise' ? player_new_CT : this.$myplayer.duration - player_new_CT;
        if (this.scratchBank[opositeDirection].playing()) {
          this.scratchBank[opositeDirection].stop();
        }
        if (!this.scratchBank[this.sounddirection].playing()) {
          this.scratchBank[this.sounddirection].seek(sound_new_CT);
          return this.scratchBank[this.sounddirection].play();
        }
      }

      skipTo($player, $id) {
        var PBR, checkEndTime, nbVideo, percentageID, player, timeToStop;
        this.$player = $player;
        this.$id = $id;
        nbVideo = 28;
        player = this.$player;
        PBR = 1;
        percentageID = this.$id / nbVideo;
        timeToStop = player.duration() * percentageID;
        checkEndTime = function() {
          if (player.currentTime() < timeToStop && (PBR < 16)) {
            return PBR += 1;
          } else {
            PBR = 1.0;
            return player.off('timeupdate', checkEndTime);
          }
        };
        return this.$player.on('timeupdate', checkEndTime);
      }

      setScratcher() {
        var previousRotation, resumePlayDisk, rotationSnap, that;
        that = this;
        resumePlayDisk = function(rotation) {
          that.timelineInfo.time(that.player.currentTime);
          that.timelineInfo.play();
          that.setTimeLineKnob(rotation % 360, (rotation % 360) + 360);
          return that.timelineKnob.play();
        };
        rotationSnap = 360 / 28;
        previousRotation = 0;
        Draggable.create('#disk', {
          type: 'rotation',
          throwProps: true,
          onRelease: function() {
            if (!that.el_disk.hasClass('drag')) {
              resumePlayDisk(this.rotation);
              return that.el_disk.removeClass('drag');
            }
          },
          onDragStart: function() {
            that.el_disk.addClass('drag');
            return that.timelineInfo.pause();
          },
          onDrag: function() {
            var dir, roundedSpeed, speed, yourDraggable;
            yourDraggable = Draggable.get('#disk');
            dir = yourDraggable.rotation - previousRotation > 0 ? 'clockwise' : 'counter-clockwise';
            speed = Number(Math.abs(yourDraggable.rotation - previousRotation));
            roundedSpeed = Number(speed.toFixed(4));
            previousRotation = yourDraggable.rotation;
            return that.changeCurrentTime(this.rotation % 360, that.player, dir, roundedSpeed);
          },
          onThrowUpdate: function() {
            return that.changeCurrentTime(this.rotation % 360, that.player, 'clockwise', that.disk_speep);
          },
          onThrowComplete: function() {
            resumePlayDisk(this.rotation);
            that.player.play();
            that.scratchBank[0].stop();
            that.scratchBank[1].stop();
            return that.el_disk.removeClass('drag');
          },
          snap: function(endValue) {
            return Math.round(endValue / rotationSnap) * rotationSnap;
          }
        });
      }

      bindEvents() {
        var that, windowBlurred, windowFocused;
        that = this;
        //------------------- END TUTO -------------------#
        that.el_tuto.on('click touchstart', function(event) {
          $(this).off();
          $(this).remove();
          that.el_tuto = null;
          that.el_window.on('pagehide blur', windowBlurred);
          that.el_window.on('pageshow focus', windowFocused);
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        //------------------- ENDINTRO -------------------#
        that.el_popin.on('endIntro', function() {
          return that.skipIntro();
        });
        //------------------- POPIN LISTNER -------------------#
        that.el_popin.on({
          'showPopin': function() {
            if (that.player) {
              that.player.pause();
            }
          },
          'closePopin': function() {
            if (that.player) {
              that.player.play();
            }
          }
        });
        //------------------- FOCUS ---------------------------#
        windowBlurred = function() {
          console.log('blur');
          if (that.player) {
            that.player.pause();
          }
          that.el_body.trigger('blur');
        };
        windowFocused = function() {
          console.log('focus');
          that.el_body.trigger('focus');
          if (that.el_body.hasClass('video-disk-waiting')) {
            console.log('hasClass video-disk-waiting');
            return;
          }
          if (!that.el_popin.hasClass('hide')) {
            console.log('popin hasNotClass hide');
            return;
          }
          if (that.player) {
            console.log('play video');
            if (that.player.paused) {
              that.player.play();
            }
          }
        };
        //------------------- SOUND ---------------------------#
        that.el_sound.on({
          'sound_off': function() {
            that.player.muted = true;
          },
          'sound_on': function() {
            that.player.muted = false;
          }
        });
        //------------------- SOUND ---------------------------#
        that.el_pause_btn.on('click touchstart', function(event) {
          if ($(this).hasClass('paused')) {
            that.player.play();
          } else {
            that.player.pause();
          }
          event.stopPropagation();
          event.preventDefault();
          return false;
        });
        //------------------- PLAYER VIDEO DISK ---------------------------#		
        return that.el_player.on({
          'play': function() {
            that.el_body.removeClass('video-disk-waiting');
            that.timelineKnob.play();
            that.timelineInfo.play();
            that.el_spiner.trigger('hidespiner');
            that.el_pause_btn.removeClass('paused');
          },
          'pause': function() {
            that.timelineInfo.pause();
            that.timelineKnob.pause();
            that.el_pause_btn.addClass('paused');
          }
        });
      }

    };

    return player_video;

  }).call(this);

  module.player_video = player_video;

}).call(this);

(function() {
  var logo;

  logo = (function() {
    'use strict';
    class logo {
      constructor(el_logowhite1) {
        this.el_logowhite = el_logowhite1;
        TweenLite.set('svg', {
          visibility: 'visible'
        });
        MorphSVGPlugin.convertToPath('line');
        this.drawLogoWhite = new TimelineMax({
          paused: true,
          onComplete: this.finishedShowLogo,
          onCompleteParams: [this.el_logowhite],
          onReverseComplete: this.finishedHideLogo,
          onReverseCompleteParams: [this.el_logowhite]
        });
        this.drawLogoWhite.from("#mask1_2_black", 1, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }).from("#mask2_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.1).from("#mask3_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.2).from("#mask4_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.3).from("#mask5_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.4).from("#mask6_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.5).from("#mask7_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.6).from("#mask8_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.7).from("#mask9_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.8).from("#mask10_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.9).from("#mask11_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 1).from("#mask12_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 1.1).from("#mask13_black", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 1.2);
        this.dLB = new TimelineMax({
          paused: true
        });
        this.reverse_delay = null;
        this.bindEvents();
      }

      finishedShowLogo(el_logowhite) {
        return el_logowhite.trigger('finishedShowLogo');
      }

      finishedHideLogo(el_logowhite) {
        return el_logowhite.trigger('finishedHideLogo');
      }

      showLogoWhite() {
        return this.drawLogoWhite.play();
      }

      hideLogoWhite() {
        var that;
        console.log('hideLogoWhite');
        that = this;
        if (this.el_logowhite) {
          this.el_logowhite.data('animstatus', 'playing');
          return this.reverse_delay = TweenMax.delayedCall(4, function() {
            if (that.drawLogoWhite) {
              return that.drawLogoWhite.reverse();
            }
          });
        }
      }

      pausehideLogo() {
        console.log('pausehideLogo');
        if (this.el_logowhite) {
          this.el_logowhite.data('animstatus', 'paused');
          return this.reverse_delay.pause();
        }
      }

      resumehideLogo() {
        console.log('resumehideLogo');
        if (this.el_logowhite) {
          this.el_logowhite.data('animstatus', 'playing');
          return this.reverse_delay.resume();
        }
      }

      destroyLogo() {
        var svglogo;
        console.log('destroyLogo -> is in fact move logo ');
        if (this.el_logowhite) {
          console.log('do move logo');
          this.el_logowhite.off();
          this.drawLogoWhite.seek(this.drawLogoWhite.duration());
          $('#txth1').remove();
          svglogo = this.el_logowhite.find('svg').detach();
          $('#blacklogo').append(svglogo);
          this.el_logowhite = null;
          this.reverse_delay = null;
          return $('.btn_intro a').off().remove();
        }
      }

      bindEvents() {
        var that;
        that = this;
        that.el_logowhite.on({
          'finishedHideLogo': function() {
            return that.destroyLogo();
          },
          'destroyLogo': function() {
            that.destroyLogo();
          },
          'showLogo': function() {
            that.showLogoWhite();
          },
          'hideLogo': function() {
            that.hideLogoWhite();
          },
          'pausehideLogo': function() {
            that.pausehideLogo();
          },
          'resumehideLogo': function() {
            that.resumehideLogo();
          }
        });
        return $('.logoWSH').on('showLogo', function() {
          $(this).off();
          return that.drawLogoWhite.play();
        });
      }

    };

    return logo;

  }).call(this);

  module.logo = logo;

}).call(this);

(function() {
  'use strict';
  var freezeVp, spiner;

  spiner = new module.spiner($('.lds-dual-ring'));

  (function($, window, document) {
    // The $ is now locally scoped 
    // Listen for the jQuery ready event on the document
    $(function() {
      var checkMobile, isMobile, logo, player_video_vimeo, popin;
      // The DOM is ready!
      checkMobile = function() {
        return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
      };
      console.log('window.navigator.hardwareConcurrency = ' + window.navigator.hardwareConcurrency);
      isMobile = checkMobile();
      console.log('window load -> isMobile ?' + isMobile);
      player_video_vimeo = new module.player_video_youtube(isMobile);
      // player_video_vimeo = new module.player_video_vimeo(isMobile)
      popin = new module.popin();
      logo = new module.logo($('#logowhite'));
      window.scrollTo(0, 0);
      console.log('scroll top');
    });
  // The rest of the code goes here!
  })(window.jQuery, window, document);

  document.addEventListener('dblclick', function(e) {
    e.preventDefault();
    console.log('prevented dooble click');
  });

  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
    console.log('prevented gesturestart');
  });

  document.addEventListener('touchmove', (function(event) {
    event = event.originalEvent || event;
    if ((event.scale !== void 0) && (event.scale !== 1)) {
      console.log('prevented touchmove');
      event.preventDefault();
    }
  }), false);

  freezeVp = function(e) {
    if ($('#credittxt').hasClass('hide')) {
      e.preventDefault();
    }
  };

  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
    $('body').addClass('device-ios');
    document.body.addEventListener("touchmove", freezeVp, false);
  }

}).call(this);
