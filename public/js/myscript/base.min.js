(function() {
  window.module = window.module || {};

}).call(this);

(function() {
  var logo;

  logo = (function() {
    'use strict';
    class logo {
      constructor(spiner) {
        this.spiner = spiner;
        TweenLite.set('svg', {
          visibility: 'visible'
        });
        MorphSVGPlugin.convertToPath('line');
        this.drawLogoWhite = new TimelineMax({
          paused: true,
          onComplete: this.finishedShowLogo,
          onReverseComplete: this.finishedHideLogo
        });
        this.drawLogoWhite.from("#logowhite #mask1_2_", 1, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }).from("#logowhite #mask2", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.1).from("#logowhite #mask3", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.2).from("#logowhite #mask4", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.3).from("#logowhite #mask5", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.4).from("#logowhite #mask6", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.5).from("#logowhite #mask7", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.6).from("#logowhite #mask8", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.7).from("#logowhite #mask9", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.8).from("#logowhite #mask10", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 0.9).from("#logowhite #mask11", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 1).from("#logowhite #mask12", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 1.1).from("#logowhite #mask13", 1.3, {
          drawSVG: 0,
          ease: Power3.easeInOut
        }, 1.2);
        this.dLB = new TimelineMax({
          paused: true,
          onComplete: this.finishedBlackLogo
        });
        this.dLB.from("#mask1_2_black", 1, {
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
        this.reverse_delay = null;
        this.bindEvents();
      }

      finishedBlackLogo() {
        return this.kill();
      }

      finishedHideLogo() {
        return $('#logowhite').remove();
      }

      showLogoBlack() {
        return this.dLB.play();
      }

      finishedShowLogo() {
        return $('#logowhite').trigger('finishedShowLogo');
      }

      showLogoWhite() {
        return this.drawLogoWhite.play();
      }

      hideLogoWhite() {
        var that;
        that = this;
        $('#logowhite').data('animstatus', 'playing');
        console.log('catch hideLogo  data = ' + $('#logowhite').data('animstatus'));
        return this.reverse_delay = TweenMax.delayedCall(4, function() {
          return that.drawLogoWhite.reverse();
        });
      }

      pausehideLogo() {
        console.log('pausehideLogo data = ' + $('#logowhite').data('animstatus'));
        $('#logowhite').data('animstatus', 'paused');
        return this.reverse_delay.pause();
      }

      resumehideLogo() {
        $('#logowhite').data('animstatus', 'playing');
        return this.reverse_delay.resume();
      }

      destroyLogo() {
        $('#logowhite').off();
        return $('#logowhite').remove();
      }

      bindEvents() {
        var that;
        that = this;
        $('#logowhite').on('destroyLogo', function() {
          return that.destroyLogo();
        });
        $('#logowhite').on('showLogo', function() {
          return that.showLogoWhite();
        });
        $('#logowhite').on('hideLogo', function() {
          console.log('catch hideLogo');
          return that.hideLogoWhite();
        });
        $('#logowhite').on('pausehideLogo', function() {
          console.log('catch pausehideLogo');
          return that.pausehideLogo();
        });
        $('#logowhite').on('resumehideLogo', function() {
          console.log('catch resumehideLogo');
          return that.resumehideLogo();
        });
        return $('.logoWSH').on('showLogo', function() {
          console.log('show logo');
          $('.logoWSH').off();
          return that.showLogoBlack();
        });
      }

    };

    return logo;

  }).call(this);

  module.logo = logo;

}).call(this);

(function() {
  var player_video_vimeo;

  player_video_vimeo = (function() {
    'use strict';
    class player_video_vimeo {
      constructor($container) {
        this.$container = $container;
        this.playerYT = null;
        this.drawLogo = null;
        this.intro_is_done = false;
        this.bindEvents();
        this.needStartSite = true;
      }

      playYTisReady() {
        console.log('----------------------- playYTisReady -------------------------------------------');
        $('.lds-dual-ring').trigger('hidespiner');
        if (this.needStartSite) {
          this.startSite();
          return this.needStartSite = false;
        } else {
          this.playerYT.play();
          // @playerYT.enableTextTrack('fr').then((track) ->
          // 	).catch (error) ->
          // 	console.log '###---------', error
          // 	return
          // @playerYT.getTextTracks().then((tracks) ->
          // 	console.log 'tracks  = '+tracks
          // 	).catch (error) ->
          // 	console.log '###---------', error
          // 	return
          if (window.isMobile()) {
            return $('.btn_video_ipad').removeClass('hide');
          }
        }
      }

      getIntroVimeo() {
        var random, randomid, that;
        that = this;
        random = Math.floor(Math.random() * 4);
        randomid = $('#idIntroYoutube input:eq(' + random + ')').val();
        return randomid;
      }

      startSite() {
        var btnIntroVisible;
        btnIntroVisible = function() {
          var player_video;
          console.log('finished show btn');
          return player_video = new module.player_video();
        };
        console.log('startSite then loadMap');
        $('.lds-dual-ring').on('loaderhidden', function() {
          return $('#logowhite').trigger('showLogo');
        });
        $('#logowhite').on('finishedShowLogo', function() {
          TweenMax.set(['.btn_intro a'], {
            autoAlpha: 0,
            visibility: "hidden"
          });
          return TweenMax.staggerFromTo('.btn_intro a', .8, {
            autoAlpha: 0,
            visibility: "visible",
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
        console.log('---> load small map');
        that = this;
        return $.get('https://d2ph0hjd2fuiu5.cloudfront.net/smallmap-' + $('#langage_short').val() + '.svg', function(data) {
          var div;
          console.log('---> small map loaded');
          div = document.createElement('div');
          div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement);
          $("#smallmap").append(div.innerHTML);
          TweenLite.set(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], {
            alpha: 0
          });
          TweenMax.to(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], 0.5, {
            scale: 3,
            transformOrigin: '50% 50%',
            repeat: -1,
            yoyo: true
          });
        });
      }

      bindEvents() {
        var GoInFullscreen, GoOutFullscreen, IsFullScreenCurrently, checkClassAndTrigger, checkratio, finished_popin_transition, options, startVimeo, that, vid_intro_finished;
        that = this;
        if (!$('body').hasClass('doc-ready')) {
          $('body').on('doc-ready', function() {
            console.log('doc-ready');
            // that.startSite(that)
            return $('body').off();
          });
        } else {
          console.log('doc already ready');
        }
        // that.startSite(that)

        //------------------- ENTER SITE -------------------#
        $('#enter_site').on('click touchstart', function(e) {
          e.preventDefault();
          that.intro_is_done = true;
          console.log('enter site -------------------------------- dafucked ?  ');
          $('.intro_page').addClass('hidden');
          $('.video-container').removeClass('hidden hide');
          GoInFullscreen($('body').get(0));
          that.playerYT.play();
          $('#logowhite').trigger('hideLogo');
          $('#enter_site').off();
          setTimeout((function() {
            console.log('show skip_intro damed it');
            TweenMax.fromTo('.skip_intro', .6, {
              autoAlpha: 0,
              visibility: 'visible'
            }, {
              autoAlpha: 1
            });
          }), 3000);
        });
        //------------------- SOUND ---------------------------#
        $('#sound').on('click touchstart', function() {
          var event_name;
          console.log('click sound');
          event_name = 'sound_on';
          if ($('#sound').hasClass('actif')) {
            event_name = 'sound_off';
          }
          $(this).trigger(event_name);
          console.log(event_name);
          return $('#sound').toggleClass('actif');
        });
        //------------------- FULL SCREEN ---------------------------#				
        GoInFullscreen = function(element) {
          $('.myfullscreen').addClass('actiffullscreen');
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
          if (IsFullScreenCurrently()) {
            $('.myfullscreen').addClass('actiffullscreen');
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
        $('.myfullscreen').on({
          'click touchstart': function() {
            console.log('click ');
            if (!IsFullScreenCurrently()) {
              return GoInFullscreen($('body').get(0));
            } else {
              return GoOutFullscreen();
            }
          }
        });
        // options = {id: 296883720, width: 640,loop: false, autoplay:true, email:false}
        options = {
          id: this.getIntroVimeo(),
          width: 640,
          loop: false,
          autoplay: true,
          email: false
        };
        this.playerYT = new Vimeo.Player('playerYT', options);
        this.playerYT.enableTextTrack('fr').then(function(track) {}).catch(function(error) {
          console.log('###', error);
        });
        this.playerYT.getTextTracks().then(function(tracks) {
          var i, trackOptions, tracksLength;
          tracksLength = tracks.length;
          trackOptions = '';
          i = 0;
          console.log('getTextTracks : ' + tracksLength);
          while (i < tracksLength) {
            console.log(tracks[i].language);
            i++;
          }
        }).catch(function(error) {});
        //------------------- PLAYER YOUTUBE IS READY -------------------#
        this.playerYT.ready().then(function() {
          console.log('player ready');
          that.playYTisReady();
        });
        this.playerYT.on('play', function(event) {
          console.log($('#logowhite').data('animstatus'));
          $('.video-container').removeClass('trans');
          $('.video-container .myfullscreen').removeClass('hide');
          $('.hider_logo').addClass('hide_hider');
          $('.hider_top').addClass('hide_hider');
          if (window.isMobile()) {
            $('.btn_video_ipad').addClass('hide');
          }
          if (!$('#logowhite')) {
            return;
          }
          if ($('#logowhite').data('animstatus') === 'done') {
            return;
          }
          if ($('#logowhite').data('animstatus') === 'waiting-init') {
            $('#logowhite').data('animstatus', 'waiting');
            return;
          }
          if ($('#logowhite').data('animstatus') === 'paused') {
            return $('#logowhite').trigger('resumehideLogo');
          }
        });
        this.playerYT.on('pause', function(event) {
          if ($('#logowhite').data('animstatus') === 'playing') {
            return $('#logowhite').trigger('pausehideLogo');
          }
        });
        
        //------------------- FOCUS -------------------#
        $(window).on('pageshow focus', function() {
          console.log('on focus : ' + that.playerYT.paused);
          if (that.playerYT.paused) {
            return that.playerYT.play();
          }
        });
        $(window).on('pagehide blur', function() {
          console.log('on blur : ' + that.playerYT.playing);
          if (that.playerYT.playing) {
            return that.playerYT.pause();
          }
        });
        //------------------- STOP PLAYER WHEN CLOSE POPIN -------------------#
        $('#popin').on('closePopin', function() {
          console.log('------------ > closePopin stop player YOUTUBE');
          $('.hider_logo').removeClass('hide_hider');
          $('.hider_top').removeClass('hide_hider');
          $('.video-container').addClass('trans');
          return that.playerYT.pause().then(function() {});
        });
        //------------------- INTRO FINISHED -------------------#
        // The video is paused
        finished_popin_transition = function() {
          console.log('done');
          return $('#popin').addClass('hide').trigger('endIntro').trigger('closePopin').trigger('classChange').attr('style', '');
        };
        vid_intro_finished = function() {
          console.log('vid_intro_finished ----- trigger end Intro trigger close  Popin serieux ie ? ');
          $('#close').removeClass('hide');
          $('.video-container').removeClass('with_btn_skip');
          $('#logowhite').trigger('destroyLogo');
          $('.intro_page').remove();
          that.playerYT.pause();
          $('.skip_intro').off();
          $('.skip_intro').remove();
          if (window.isMobile()) {
            $('#player')[0].play();
            finished_popin_transition();
          } else {
            TweenMax.to('#popin', .8, {
              opacity: 0,
              onComplete: finished_popin_transition
            });
          }
        };
        $('.skip_intro').on('click touchstart', function() {
          vid_intro_finished();
        });
        this.playerYT.on('ended', function(event) {
          vid_intro_finished();
        });
        //------------------- CLICK LIST ARTIST -------------------#
        checkratio = function(ratiovideo) {
          console.log('ratiovideo : ' + ratiovideo);
          if (ratiovideo === 4) {
            return $('.video-container').addClass('quatre_tier');
          } else {
            return $('.video-container').removeClass('quatre_tier');
          }
        };
        checkClassAndTrigger = function() {
          $('#abouttxt, #credittxt, #artist_info, #shareinfo, #logowhite').addClass('hide');
          $('.video-container').removeClass('hide');
          return $('.video-container').removeClass('trans');
        };
        // $('.lds-dual-ring').trigger 'showspiner'
        startVimeo = function(idVimeo) {
          return that.playerYT.getVideoId().then(function(id) {
            console.log('current id -------------' + id);
            if (id !== idVimeo) {
              $('.video-container').addClass('trans');
              // options = {id: idVimeo, width: 640,loop: false, autoplay:true, email:false}
              // that.playerYT = new (Vimeo.Player)('playerYT', options)
              that.playerYT.loadVideo(idVimeo).then(function(id) {
                console.log('loaded ');
                that.playYTisReady();
              });
              that.playerYT.enableTextTrack('fr').then(function(track) {}).catch(function(error) {
                console.log('###', error);
              });
              that.playerYT.getTextTracks().then(function(tracks) {
                var i, trackOptions, tracksLength;
                tracksLength = tracks.length;
                trackOptions = '';
                i = 0;
                console.log('getTextTracks : ' + tracksLength);
                while (i < tracksLength) {
                  console.log(tracks[i].language);
                  i++;
                }
              }).catch(function(error) {});
            }
          });
        };
        $('.btn_video_ipad').on('click touchstart', function(event) {
          that.playerYT.play();
          $('.btn_video_ipad').addClass('hide');
          return false;
        });
        $('#startvideofrompopin').on('click touchstart', function(event) {
          var idVimeo;
          idVimeo = that.YouTubeGetID($(this).attr('href'));
          checkratio($(this).data('ratiovideo'));
          checkClassAndTrigger();
          startVimeo(idVimeo);
          return false;
        });
        return $('#list_artists li a, #play-video-btn, #play-video-btn-mobile, a.watch').on('click touchstart', function(event) {
          var idVimeo;
          idVimeo = that.YouTubeGetID($(this).attr('href'));
          console.log('id vimeo : ' + idVimeo);
          checkratio($(this).data('ratiovideo'));
          checkClassAndTrigger();
          startVimeo(idVimeo);
          // $('#popin').trigger 'classChange'
          $('#popin').trigger('showVideo');
          return false;
        });
      }

    };

    return player_video_vimeo;

  }).call(this);

  module.player_video_vimeo = player_video_vimeo;

}).call(this);

(function() {
  var popin;

  popin = (function() {
    'use strict';
    class popin {
      constructor() {
        this.timelinePopin = null;
        this.bindEvents();
      }

      afterclose() {
        console.log('afterclose');
        $('#popin').addClass('hide').trigger('classChange');
        $('#popin').addClass('hide').trigger('closePopin');
        $('#popin').removeAttr('style');
        $('#popin').find('*').removeAttr('style');
        return $('.video-container, #abouttxt, #artist_info, #shareinfo, #logowhite').addClass('hide');
      }

      closePopin() {
        console.log('closePopin @timelinePopin : ' + this.timelinePopin);
        if (this.timelinePopin) {
          return this.timelinePopin.reverse();
        } else {
          console.log('trigger : classChange closePopin');
          $('#popin').addClass('hide');
          $('#popin').trigger('classChange');
          return $('#popin').trigger('closePopin');
        }
      }

      bindEvents() {
        var showPopin, that;
        that = this;
        showPopin = function($target) {
          $('.video-container, #abouttxt, #credittxt, #contacttxt, #artist_info, #shareinfo, #logowhite').addClass('hide');
          $('#popin').toggleClass('hide').trigger('classChange');
          $('#popin').removeClass('greybg');
          console.log('??????? fuck it : ' + ($target === '#popin #credittxt') + '. $target : ' + $target);
          if ($target === '#popin #abouttxt') {
            $('#popin').addClass('greybg');
          }
          if ($target === '#popin #credittxt') {
            $('#popin').addClass('greybg');
          }
          if ($target === '#popin #contacttxt') {
            $('#popin').addClass('greybg');
          }
          $($target).removeClass('hide');
          if ($target === '.video-container') {
            $('.video-container').addClass('trans');
          }
          that.timelinePopin = new TimelineMax({
            onReverseComplete: that.afterclose
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
        
        //------------------- ABOUT  --------------------------#
        $('#apropos_btn').on({
          'click touchstart': function(e) {
            e.preventDefault();
            return showPopin('#popin #abouttxt');
          }
        });
        //------------------- CREDIT  --------------------------#
        $('#credit_btn').on({
          'click touchstart': function(e) {
            e.preventDefault();
            return showPopin('#popin #credittxt');
          }
        });
        //------------------- CONTACT  --------------------------#
        $('#mail_btn').on({
          'click touchstart': function(e) {
            e.preventDefault();
            return showPopin('#popin #contacttxt');
          }
        });
        //------------------- CREDIT  --------------------------#
        $('#about-btn, .block_contry .bio').on({
          'click touchstart': function(e) {
            var artistid;
            e.preventDefault();
            if ($("#mode_switcher [data-face='face_pays']").hasClass('selected')) {
              artistid = $(this).data('artistid') - 1;
              console.log('artistid =' + artistid);
              $('#popin #artist_info .info').addClass('hide');
              $('#popin #artist_info .info:eq(' + artistid + ')').removeClass('hide');
              showPopin('#artist_info');
              return;
            }
            return showPopin('#artist_info');
          }
        });
        $('#share').on({
          'click touchstart': function(e) {
            e.preventDefault();
            return showPopin('#shareinfo');
          }
        });
        $('#close, #back').on('click touchstart', function() {
          return that.closePopin();
        });
        return $('#popin').on('showVideo', function() {
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
      constructor(spiner1) {
        this.spiner = spiner1;
        console.log('----------------- > constructor spinner');
        TweenLite.set(['.ring_1', '.ring_2', '.ring_3'], {
          xPercent: -50,
          yPercent: -50
        });
        this.timelineSpiner = new TimelineMax({
          paused: true,
          onReverseComplete: this.maskSpiner,
          onStart: this.unmaskSpiner
        }).staggerFromTo(['.ring_1', '.ring_2', '.ring_3'], 2, {
          scale: 0.5,
          opacity: 0
        }, {
          scale: 1,
          opacity: 1,
          ease: Power3.easeOut
        }, 0.5);
        
        // .fromTo('.lds-dual-ring', 0.5 ,{opacity: 0},{opacity: 1, ease:Power3.easeOut}, '-=2')	
        this.bindEvents();
        this.showSpiner();
      }

      maskSpiner() {
        $('.lds-dual-ring').trigger('loaderhidden');
        return $('.lds-dual-ring').addClass('no_spinner').hide();
      }

      unmaskSpiner() {
        console.log('unmaskSpiner -> ');
        return $('.lds-dual-ring').removeClass('no_spinner').show();
      }

      showSpiner() {
        var that;
        that = this;
        console.log('----------------------- > show spinner');
        return this.timelineSpiner.play();
      }

      hideSpiner() {
        var that;
        that = this;
        return that.timelineSpiner.reverse();
      }

      bindEvents() {
        var that;
        that = this;
        that.spiner.on('hidespiner', function() {
          return that.hideSpiner();
        });
        return that.spiner.on('showspiner', function() {
          console.log('catch showspiner');
          return that.showSpiner();
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
      constructor($container) {
        this.$container = $container;
        //------------------- SET VAR ---------------------------#
        this.timelineKnob = new TimelineMax({
          paused: true
        });
        this.timelineInfo = new TimelineMax({
          paused: true,
          repeat: -1
        });
        this.timelineIntro = null;
        this.player = $('#player')[0];
        this.scale_disk = 2;
        if (window.isMobile()) {
          $('#player').attr('src', 'https://d2e3lhf7z9v1b2.cloudfront.net/25f500kfaststartmobile.mp4');
          this.scale_disk = 1;
        }
        this.duration = 168.182;
        if (this.player.duration && this.player.duration > 1) {
          console.log('correct duration');
          this.duration = this.player.duration;
        }
        this.disk_speep = 0.39;
        this.sounddirection = 0;
        this.scratchBank = [];
        this.scratchBank.push(new Howl({
          src: ['https://d2e3lhf7z9v1b2.cloudfront.net/video.mp3'],
          buffer: true
        }));
        this.scratchBank.push(new Howl({
          src: ['https://d2e3lhf7z9v1b2.cloudfront.net/video_reverse.mp3'],
          buffer: true
        }));
        
        //------------------- SET FUNCTION ---------------------------#
        this.setTimeLineIntro();
        $('#player').addClass('ready');
        this.createTweenInfo();
        this.setTimeLineKnob();
        this.setScratcher();
        this.bindEvents();
      }

      //------------------- TWEEN ---------------------------#
      resetallCss() {
        return $('#block_video_disk, #platine ,#disk, #left_col, #smallmap, #artists_info, #txt_help_disk, #list_artists li, #play-video-btn, #play-video-btn-mobile, #pause-video-btn, #main_footer, #left_col,#artists_info,#smallmap, #txt_help_disk, .tuto').attr('style', '');
      }

      createTweenInfo(curentTime) {
        var duration_sequence, sequence, that, updateInfo;
        that = this;
        updateInfo = function(id) {
          var svgcontry;
          $('#play-video-btn, #play-video-btn-mobile, #startvideofrompopin').attr('href', $('#list_artists li:eq(' + id + ') a').attr('href'));
          $('#play-video-btn, #play-video-btn-mobile, #startvideofrompopin').data('ratiovideo', $('#list_artists li:eq(' + id + ') a').data('ratiovideo'));
          $('#list_artists li a.selected').removeClass('selected');
          $('#list_artists li:eq(' + id + ') a').addClass('selected');
          svgcontry = '#smallmap svg #' + $('#artists_info li:eq(' + id + ') .contry').data('contrynicename');
          console.log(' ---------- id updateInfo   : ' + svgcontry);
          TweenMax.to(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], 0.5, {
            alpha: 0
          });
          TweenMax.to(svgcontry, 0.5, {
            alpha: 1
          });
          $('#artists_info li').removeClass('ontop');
          $('#artists_info li:eq(' + id + ')').addClass('ontop');
          $('#popin #artist_info .info').addClass('hide');
          return $('#popin #artist_info .info:eq(' + id + ')').removeClass('hide');
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

      removeTLIntro() {
        $('#left_col, #smallmap, #artists_info, #txt_help_disk, #list_artists li, #play-video-btn, #play-video-btn-mobile, #pause-video-btn, #main_footer, .tuto').attr('style', '');
        return this.kill();
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
        }, 0.04).from(['#play-video-btn', '#play-video-btn-mobile', '#pause-video-btn'], .6, {
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

      setTimeLineKnob(rot_from, rot_to) {
        var that;
        that = this;
        if (!rot_from) {
          rot_from = 0;
        }
        if (!rot_to) {
          rot_to = 360;
        }
        return that.timelineKnob.fromTo('#disk', 168.182, {
          rotation: rot_from
        }, {
          rotation: rot_to,
          ease: Linear.easeNone,
          repeat: -1
        });
      }

      showFooter_header() {
        $('body').removeClass('hidefooter');
        return $('body').removeClass('hide_left_col');
      }

      show_logo() {
        return $('.logoWSH').trigger('showLogo');
      }

      play_video_disk() {
        $('#player')[0].play();
        $('body').removeClass('disk_on_hold');
      }

      skipIntro() {
        console.log('skipIntro : player play ------------------------------ ??????? ');
        this.timelineIntro.play();
        $('#popin').off('endIntro');
        console.log(' is mobile ? ' + window.isMobile());
        if (window.isMobile()) {
          console.log('so play video damned it');
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
        // console.log 'player_new_CT : '+player_new_CT
        this.$myplayer.currentTime = player_new_CT;
        this.sounddirection = dir === 'clockwise' ? 0 : 1;
        opositeDirection = dir === 'clockwise' ? 1 : 0;
        PBR = speed / this.disk_speep;
        PBR = Math.min(Math.max(speed / this.disk_speep, 0.9), 1.2);
        roundedPBR = Number(PBR.toFixed(4));
        
        // console.log dir + '  @sounddirection  : '+@sounddirection  + '  // opositeDirection  : '+opositeDirection+'. speed : '+speed + '  PBR : '+roundedPBR
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
        // player.playbackRate(PBR)
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
            if (!$('#disk').hasClass('drag')) {
              resumePlayDisk(this.rotation);
              return $('#disk').removeClass('drag');
            }
          },
          onDragStart: function() {
            $('#disk').addClass('drag');
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
            return $('#disk').removeClass('drag');
          },
          snap: function(endValue) {
            return Math.round(endValue / rotationSnap) * rotationSnap;
          }
        });
      }

      bindEvents() {
        var that, windowBlurred, windowFocused;
        that = this;
        console.log('bindEvents player_video');
        // $(window).on 'resizeEnd', ->
        // 	# Draggable.get("#disk").kill()
        // 	# TweenMax.killTweensOf﻿($('#disk'))
        // 	# TweenMax.killAll()
        // 	# that.resetallCss()
        // 	# setTimeout (->
        // 	# 	console.log 'set scrather'
        // 	# 	that.setScratcher()
        // 	# 	return
        // 	# ), 700

        // 	return

        //------------------- END TUTO -------------------#
        $('.tuto').on('click touchstart', function() {
          return $('.tuto').remove();
        });
        //------------------- ENDINTRO -------------------#
        $('#popin').on('endIntro', function() {
          return that.skipIntro();
        });
        //------------------- POPIN LISTNER -------------------#
        $('#popin').on('classChange', function() {
          console.log('->>>>>>>>>>>>>>>>>>>>>>> popin change ' + ($(this).hasClass('hide')));
          if ($('body').hasClass('disk_on_hold')) {
            console.log('disk on hold');
            return;
          }
          if ($(this).hasClass('hide')) {
            console.log('player play ');
            if (that.player) {
              that.player.play();
            }
          } else {
            console.log('player pause ');
            if (that.player) {
              that.player.pause();
            }
          }
        });
        //------------------- FOCUS ---------------------------#
        windowBlurred = function() {
          console.log('blur');
          if (that.player) {
            that.player.pause();
          }
          $('body').trigger('blur');
        };
        windowFocused = function() {
          console.log('focus');
          $('body').trigger('focus');
          if ($('body').hasClass('video-disk-waiting')) {
            console.log('hasClass video-disk-waiting');
            return;
          }
          if (!$('#popin').hasClass('hide')) {
            console.log('popin hasNotClass hide');
            return;
          }
          if ($('#contrys').hasClass('selected')) {
            console.log('contrys hasClass selected');
            return;
          }
          if (that.player) {
            console.log('play video');
            if (that.player.paused) {
              that.player.play();
            }
          }
        };
        $(window).on('pagehide blur', windowBlurred);
        $(window).on('pageshow focus', windowFocused);
        //------------------- SOUND ---------------------------#
        $('#sound').on('sound_off', function() {
          return that.player.muted = true;
        });
        $('#sound').on('sound_on', function() {
          console.log('sound_on' + that.player.muted);
          return that.player.muted = false;
        });
        //------------------- SOUND ---------------------------#
        $('#pause-video-btn').on('click touchstart', function() {
          if ($(this).hasClass('paused')) {
            return that.player.play();
          } else {
            return that.player.pause();
          }
        });
        //------------------- PLAYER JS ---------------------------#		
        // videoDiskCanPlay = ->
        // 	$('.skip_intro').show()

        // $('#player').on 'canplaythrough', videoDiskCanPlay

        // if $('#player')[0].readyState > 3
        // 	videoDiskCanPlay()
        $('#player').on('play', function(e) {
          console.log('play video disk');
          $('body').removeClass('video-disk-waiting');
          if ($("#mode_switcher [data-face='face_pays']").hasClass('selected')) {
            that.player.pause();
            return;
          }
          that.timelineKnob.play();
          that.timelineInfo.play();
          console.log('trigger hide on player Js play ');
          $('.lds-dual-ring').trigger('hidespiner');
          return $('#pause-video-btn').removeClass('paused');
        });
        return $('#player').on('pause', function() {
          console.log('pause' + that.timelineKnob);
          that.timelineInfo.pause();
          that.timelineKnob.pause();
          return $('#pause-video-btn').addClass('paused');
        });
      }

    };

    return player_video;

  }).call(this);

  // $('#player').on 'waiting', ->
  // 	console.log 'waiting'
  // 	that.timelineInfo.pause()
  // 	$('#pause-video-btn').addClass 'paused'

  // $('#player').on 'stalled', ->
  // 	console.log 'stalled'
  // 	that.timelineInfo.pause()
  // 	$('#pause-video-btn').addClass 'paused'

  // $('#player').on 'seeked', ->
  // 	that.timelineInfo.time that.player.currentTime
  module.player_video = player_video;

}).call(this);

(function() {
  'use strict';
  var init, spiner;

  window.isMobile = function() {
    return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
  };

  init = function() {
    var logo, player_video_vimeo, popin;
    console.log('window load -> init vimeo ?');
    player_video_vimeo = new module.player_video_vimeo();
    popin = new module.popin();
    logo = new module.logo();
    $('body').addClass('doc-ready');
    $('body').trigger('doc-ready');
    window.layout = window.currentLayout();
    console.log('layout : ' + layout);
    // player_video = new module.player_video()
    window.scrollTo(0, 0);
    return console.log('scroll top');
  };

  $(window).load(init);

  spiner = new module.spiner($('.lds-dual-ring'));

  window.currentLayout = function() {
    console.log('--------------- > ' + $('#checklayout .desktop').css('display'));
    if ($('#checklayout .mobile').css('display') === 'block') {
      return 'mobile';
    }
    if ($('#checklayout .ipad').css('display') === 'block') {
      return 'ipad';
    }
    if ($('#checklayout .desktop').css('display') === 'block') {
      return 'desktop';
    }
  };

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

  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
    $('body').addClass('device-ios');
  }

  
// $(window).on 'resize', ->
// 	if @resizeTO
// 		clearTimeout @resizeTO
// 	@resizeTO = setTimeout((->
// 		console.log window.layout+'!='+window.currentLayout()
// 		if (layout != currentLayout())
// 			layout = currentLayout()
// 			$(this).trigger 'resizeEnd'
// 		return
// 	), 500)
// 	return

}).call(this);
