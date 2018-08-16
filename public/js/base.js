(function() {
  window.module = window.module || {};

}).call(this);

(function() {
  var flip_disk;

  flip_disk = class flip_disk {
    constructor() {
      console.log('build flip disk');
      this.duree_flip = .6;
      this.demi_flip = this.duree_flip / 2;
      this.buildTween();
      this.bindEvents();
    }

    buildTween(timeStamp) {
      console.log(timeStamp);
      this.flip_tween = new TimelineMax({
        paused: true
      });
      this.flip_tween.staggerTo($('#list_artists li'), .3, {
        alpha: 0
      }, this.duree_flip / 28).to($('#block_video_disk'), .3, {
        scale: 1.1
      }, 0).to($('#block_video_disk'), .3, {
        rotationY: 90
      }).from($('#faceb'), .3, {
        rotationY: 90,
        scale: 1.3
      }).to($('#smallmap'), .3, {
        ease: Power1.easeOut,
        alpha: 0
      }).to('#txt_help_disk', .5, {
        rotationX: 90
      }, '-=.5').from('#txt_help_map', .5, {
        rotationX: 90
      });
      this.flip_tween.eventCallback('onReverseComplete', function() {
        $('#mode_switcher').trigger('switch_to_face_artist');
        $('#smallmap').removeClass('opacity_0');
        $('#mouse_over_bg').addClass('hide');
      });
      return this.flip_tween.eventCallback('onComplete', function() {
        $('#mouse_over_bg').removeClass('hide');
      });
    }

    bindEvents() {
      var GoInFullscreen, GoOutFullscreen, IsFullScreenCurrently, that;
      that = this;
      
      //------------------- RESIZE --------------------------#
      // $(window).resize ->
      // 	console.log 'resize'
      // 	timeStamp = that.flip_tween.time()
      // 	that.flip_tween.kill()
      // 	$('#face_artistes, #face_pays').css('transform', '')
      // 	that.buildTween(timeStamp)
      // 	return
      //------------------- SOUND ---------------------------#
      $('#sound').on('click', function() {
        var event_name;
        event_name = 'sound_on';
        if ($('#sound').hasClass('actif')) {
          event_name = 'sound_off';
        }
        $(this).trigger(event_name);
        console.log(event_name);
        return $('#sound').toggleClass('actif');
      });
      //------------------- SWITCH FACE ---------------------------#				
      $('#mode_switcher li a').on({
        'click': function(e) {
          e.preventDefault();
          $('.footer .selected').removeClass('selected');
          $(this).addClass('selected');
          if ($(this).data('face') === 'face_pays') {
            $('#mode_switcher').trigger('switch_to_face_pays');
            $('#smallmap').addClass('opacity_0');
            return that.flip_tween.play();
          } else {
            $('.block_contry').removeClass('opacity_1');
            return that.flip_tween.reverse();
          }
        }
      });
      //------------------- FULL SCREEN ---------------------------#				
      GoInFullscreen = function(element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      };
      GoOutFullscreen = function() {
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
      $('#fullscreen').on({
        'click': function(e) {
          if (!IsFullScreenCurrently()) {
            return GoInFullscreen($('body').get(0));
          } else {
            return GoOutFullscreen();
          }
        }
      });
    }

  };

  module.flip_disk = flip_disk;

}).call(this);

(function() {
  var player_youtube, tag;

  player_youtube = class player_youtube {
    constructor() {
      this.bindEvents();
    }

    bindEvents() {
      var YouTubeGetID, done, firstScriptTag, player;
      YouTubeGetID = function(url) {
        var ID;
        ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== void 0) {
          ID = url[2].split(/[^0-9a-z_\-]/i);
          return ID = ID[0];
        } else {
          ID = url;
          return ID;
        }
      };
      window.playYoutubeVideo = function(idVideo) {
        if (!window.playerYT) {
          console.log('playerYT not yet created ');
          return window.playerYT = new YT.Player('player_youtube', {
            height: '390',
            width: '640',
            videoId: idVideo,
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
        } else {
          return window.playerYT.loadVideoById(idVideo);
        }
      };
      window.onYouTubeIframeAPIReady = function() {
        console.log('onYouTubeIframeAPIReady');
        $('body').addClass('onYouTubeIframeAPIReady');
        if ($('body').hasClass('waiting-for-youtube')) {
          window.playYoutubeVideo($('#idIntroYoutube').data('introid'));
          $('body').removeClass('waiting-for-youtube');
        }
        // $('#mask_shield').addClass 'hide'
        $('#zone_youtube .shield').on('click', function() {
          $('#zone_youtube').removeClass('play');
          $('.lds-dual-ring').addClass('done');
          window.playerYT.stopVideo();
        });
        return $('#list_artists li a, #play-video-btn, #startvideo, a.watch').on('click', function() {
          var idyoutube;
          event.preventDefault();
          idyoutube = YouTubeGetID($(this).attr('href'));
          if (!$('#artist_info').hasClass('hide')) {
            $('#artist_info').addClass('hide');
          }
          $('.lds-dual-ring').removeClass('done');
          window.playYoutubeVideo(idyoutube);
        });
      };
      window.onPlayerReady = function(event) {
        console.log('onPlayerReady');
        event.target.playVideo();
      };
      window.onPlayerStateChange = function(event) {
        if (event.data === YT.PlayerState.PLAYING && !done) {
          $('#zone_youtube').addClass('play');
          $('#popin').removeClass('hide').trigger('classChange');
          $('.lds-dual-ring').addClass('done');
          $('#popin .video-container').removeClass('hide');
          // $('#mask_shield').addClass 'hide'
          if (window.pauseSound) {
            window.pauseSound();
          }
        } else if (event.data === YT.PlayerState.ENDED) {
          window.closePopin();
          console.log('youtube is done');
        }
      };
      window.stopVideo = function() {
        console.log('stop video');
        window.playerYT.stopVideo();
        $('#popin .video-container').addClass('hide');
      };
      tag.src = 'https://www.youtube.com/iframe_api';
      firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      player = void 0;
      return done = false;
    }

  };

  module.player_youtube = player_youtube;

  tag = document.createElement('script');

}).call(this);

(function() {
  var block_pays;

  block_pays = (function() {
    class block_pays {
      constructor() {
        this.soundInitiated = false;
        this.loadMap();
        this.allSound = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
        this.playlistUrls = this.allSound;
        this.ordre_pays = $('#artists_info_map').data('ordre_pays');
        this.bindEvents();
        console.log('block_pays constructor');
      }

      // @buildContrySound()
      loadMap() {
        var that;
        console.log('---> load big map');
        that = this;
        return $.get('https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/map.svg', function(data) {
          var div;
          console.log('---> big map loaded');
          div = document.createElement('div');
          div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement);
          $("#big_map").append(div.innerHTML);
        });
      }

      bindEvents() {
        var that;
        that = this;
        //------------------- FOOTER LISTNER -------------------#
        $('#mode_switcher').on('switch_to_face_pays', function() {
          return that.buildContrySound();
        });
        $('#mode_switcher').on('switch_to_face_artist', function() {
          console.log('switch_to_face_artist');
          if (window.pauseSound) {
            window.pauseSound();
          }
          $('.pastille').removeClass('big');
          $('#artists_info_map .block_contry').removeClass('opacity_1');
          return console.log('switch_to_face_artist');
        });
        //------------------- SOUND - CONTROL ------------------#
        $('#sound').on('sound_off', function() {
          console.log('window.pCount =' + window.pCount);
          console.log('window.howlerBank.length =' + window.pCount);
          if (that.soundInitiated) {
            return window.howlerBank[window.pCount].volume(0);
          }
        });
        $('#sound').on('sound_on', function() {
          if (that.soundInitiated) {
            return window.howlerBank[window.pCount].volume(1);
          }
        });
        //------------------- pastille -------------------------#
        $('#mouse_over_bg').on({
          'mouseover': function(e) {
            if (that.playlistUrls.length < 27) {
              return that.buildContrySound();
            }
          }
        });
        $('.pastille').on({
          'mouseover': function(e) {
            if ($(this).hasClass('big')) {
              return;
            }
            return that.buildContrySound($(this), true);
          }
        });
        return $('.pastille').on({
          'click': function(e) {
            if ($(this).hasClass('big')) {
              return that.buildContrySound();
            } else {
              return that.buildContrySound($(this));
            }
          }
        });
      }

      //------------------- SOUND - PLAYER -----------------------#
      buildContrySound(pastille, ismouseover) {
        var defaultPlaylist, onEnd, onPlay, that;
        that = this;
        if (pastille) {
          that.playlistUrls = pastille.data('sound');
          defaultPlaylist = false;
        } else {
          console.log('no pastille');
          that.playlistUrls = that.allSound;
          defaultPlaylist = true;
        }
        window.pauseSound();
        window.pCount = 0;
        window.howlerBank = [];
        onPlay = function(e) {
          var nicename;
          TweenMax.to('#artists_info li .warper', 0.5, {
            alpha: 0,
            y: -30
          });
          TweenMax.to('#artists_info li:eq(' + (that.playlistUrls[window.pCount] - 1) + ') .warper', 0.5, {
            alpha: 1,
            y: 0
          }, 0.5);
          if (pastille) {
            nicename = $(pastille).data('nicename');
          } else {
            nicename = that.ordre_pays[window.pCount];
          }
          that.openContryBox($('.pastille[data-nicename="' + nicename + '"]'), ismouseover);
        };
        onEnd = function(e) {
          window.pCount = window.pCount + 1 !== window.howlerBank.length ? window.pCount + 1 : 0;
          if (!$('#sound').hasClass('actif')) {
            window.howlerBank[window.pCount].volume(0);
          }
          window.howlerBank[window.pCount].play();
        };
        // build up howlerBank:     
        that.playlistUrls.forEach(function(current, i) {
          window.howlerBank.push(new Howl({
            src: ['https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/' + that.playlistUrls[i] + '.mp3'],
            onend: onEnd,
            onplay: onPlay,
            buffer: true
          }));
        });
        if (!$('#sound').hasClass('actif')) {
          window.howlerBank[0].volume(0);
        }
        window.howlerBank[0].play();
        that.soundInitiated = true;
      }

      closeContryBox() {
        $('.pastille').removeClass('big');
        $('#artists_info_map .block_contry').removeClass('opacity_1');
        return $('.big').off('mouseleave');
      }

      // window.pauseSound()
      openContryBox(pastille, ismouseover) {
        var place;
        $('.pastille').removeClass('big');
        $('#artists_info_map .block_contry').removeClass('opacity_1');
        place = '.' + pastille.data('nicename');
        $('#artists_info_map ' + place).addClass('opacity_1');
        if (this.playlistUrls.length < 27 && !ismouseover) {
          return pastille.addClass('big');
        }
      }

    };

    window.pauseSound = function() {
      if (window.howlerBank) {
        console.log('fade');
        return window.howlerBank[window.pCount].stop();
      }
    };

    return block_pays;

  }).call(this);

  
  // @buildContrySound(pastille)
  module.block_pays = block_pays;

}).call(this);

(function() {
  var popin;

  popin = (function() {
    class popin {
      constructor() {
        this.bindEvents();
      }

      bindEvents() {
        var showPopin;
        showPopin = function($target) {
          if ($('#popin').hasClass('hide')) {
            $('#popin').removeClass('hide').trigger('classChange');
          }
          if ($($target).hasClass('hide')) {
            return $($target).removeClass('hide');
          } else {
            $($target).addClass('hide');
            return $('#popin').addClass('hide').trigger('classChange');
          }
        };
        $('#about-btn, .block_contry .bio').on({
          'click': function(e) {
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
        $('#share').on('click', function() {
          return showPopin('#shareinfo');
        });
        return $('#close, #back').on('click', function() {
          return window.closePopin();
        });
      }

    };

    window.closePopin = function() {
      if (!$('#popin').hasClass('hide')) {
        console.log('remove');
        $('#popin').addClass('hide').trigger('classChange');
      }
      if (!$('#shareinfo').hasClass('hide')) {
        $('#shareinfo').addClass('hide');
      }
      if (!$('#artist_info').hasClass('hide')) {
        $('#artist_info').addClass('hide');
      }
      return $('#popin').trigger('closePopin');
    };

    return popin;

  }).call(this);

  module.popin = popin;

}).call(this);

(function() {
  var player_video;

  player_video = class player_video {
    constructor($container) {
      this.$container = $container;
      console.log('metadata video loaded ---------------------- start player_video ');
      
      // @bindEvents() # bind event is now after video is loaded
      this.duration = 0;
      this.timelineKnob = new TimelineMax({
        paused: true
      });
      this.timelineInfo = new TimelineMax({
        paused: true
      });
      this.timelinePlatine = new TimelineMax({
        paused: true
      });
      this.timelineDisk = new TimelineMax({
        paused: true
      });
      this.timelineDisk.from('#disk_hole', .6, {
        scale: 0,
        ease: Power3.easeOut
      }, 0.5).from('#mask_video', 3, {
        scale: 0,
        ease: Power3.easeOut
      }, 1).staggerFromTo('#disk_lign svg path', 1, {
        drawSVG: "50% 50%"
      }, {
        drawSVG: "100%"
      }, -0.1, 1.2).from('#bg_disk', 2, {
        opacity: 0,
        scale: 0,
        ease: Power1.easeOut
      }, 1).from('#platine', 1, {
        opacity: 0
      }, 1).staggerFrom('#list_artists li', .3, {
        opacity: 0
      }, 0.05, 1.5).from('#main_footer', .3, {
        y: 40
      }, 2).add(this.showFooter, 2).from('#smallmap', .3, {
        opacity: 0
      }, 2).from('#ico', .6, {
        opacity: 0
      }, 2).from('#txt_help_disk', .8, {
        opacity: 0,
        left: '-100%',
        ease: Power3.easeOut
      }, 2.1).from('#play-video-btn', .6, {
        opacity: 0
      }, 2).from('#about-btn', .6, {
        opacity: 0
      }, 2.1);
      this.player = $('#player')[0];
      this.duration = this.player.duration;
      $('#player').addClass('ready');
      this.loadMap();
      this.createTween();
      this.bindEvents();
    }

    showFooter() {
      return $('body').removeClass('hidefooter');
    }

    loadMap() {
      var that;
      console.log('---> load small map');
      that = this;
      return $.get('https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/smallmap-' + $('#langage_short').val() + '.svg', function(data) {
        var div;
        console.log('---> small map loaded');
        div = document.createElement('div');
        div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement);
        $("#smallmap").append(div.innerHTML);
      });
    }

    logoWhite() {
      var drawLogo;
      $('#logowhite').removeClass('hide');
      drawLogo = new TimelineMax({});
      return drawLogo.from("#logowhite #mask1_2_", 1, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }).from("#logowhite #mask2", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.1).from("#logowhite #mask3", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.2).from("#logowhite #mask4", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.3).from("#logowhite #mask5", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.4).from("#logowhite #mask6", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.5).from("#logowhite #mask7", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.6).from("#logowhite #mask8", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.7).from("#logowhite #mask9", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.8).from("#logowhite #mask10", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 0.9).from("#logowhite #mask11", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 1).from("#logowhite #mask12", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 1.1).from("#logowhite #mask13", 1.3, {
        drawSVG: 0,
        ease: Power1.easeInOut
      }, 1.2);
    }

    bildIntroYoutube() {
      var random, randomid, that;
      that = this;
      random = Math.floor(Math.random() * 4);
      randomid = $('#idIntroYoutube input:eq(' + random + ')').val();
      console.log('bildIntroYoutube = ' + randomid);
      if ($('body').hasClass('onYouTubeIframeAPIReady')) {
        window.playYoutubeVideo(randomid);
      } else {
        $('body').addClass('waiting-for-youtube');
        $('#idIntroYoutube').data('introid', randomid);
      }
      $('#popin').on('closePopin', function() {
        console.log('close popin');
        return that.skipIntro();
      });
      return $('.skip_intro').on('click', function() {
        return window.closePopin();
      });
    }

    skipIntro() {
      this.player.play();
      this.timelineDisk.play();
      return $('#popin').off('closePopin');
    }

    changeCurrentTime($deg, $myplayer) {
      var percentage, player_new_CT;
      this.$deg = $deg;
      this.$myplayer = $myplayer;
      if (this.$deg < 0) {
        this.$deg = 360 + this.$deg;
      }
      percentage = this.$deg / 3.6;
      player_new_CT = this.$myplayer.duration * (percentage / 100);
      return this.$myplayer.currentTime = player_new_CT;
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
          PBR += 1;
        } else {
          PBR = 1.0;
          player.off('timeupdate', checkEndTime);
        }
        return player.playbackRate(PBR);
      };
      return this.$player.on('timeupdate', checkEndTime);
    }

    //------------------- TWEEN ---------------------------#
    createTween() {
      var duration_sequence, sequence, updateInfo;
      console.log('createTween');
      updateInfo = function(id) {
        var svgcontry;
        $('#play-video-btn, #startvideo').attr('href', $('#list_artists li:eq(' + id + ') a').attr('href'));
        $('#list_artists li a.selected').removeClass('selected');
        $('#list_artists li:eq(' + id + ') a').addClass('selected');
        $('#artist_info .info').addClass('hide');
        $('#artist_info .info:eq(' + id + ')').removeClass('hide');
        svgcontry = '#smallmap svg #' + $('#artists_info li:eq(' + id + ') .contry').data('contrynicename');
        TweenMax.to(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], 0.5, {
          alpha: 0
        });
        return TweenMax.to(svgcontry, 0.5, {
          alpha: 1
        }, '+=.5');
      };
      duration_sequence = this.duration / 28;
      sequence = '+=' + (duration_sequence - 1);
      this.timelineKnob = TweenMax.to('#knob, #player', this.duration, {
        ease: Linear.easeNone,
        rotation: 360,
        repeat: -1,
        paused: true
      });
      this.timelinePlatine = TweenMax.to('#platine', this.duration, {
        ease: Linear.easeNone,
        rotation: 360 * 100,
        repeat: -1,
        paused: true
      });
      return this.timelineInfo.add(function() {
        return updateInfo(0);
      }).fromTo('#artists_info li:eq(0) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(0) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(1);
      }).fromTo('#artists_info li:eq(1) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(1) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(2);
      }).fromTo('#artists_info li:eq(2) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(2) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(3);
      }).fromTo('#artists_info li:eq(3) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(3) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(4);
      }).fromTo('#artists_info li:eq(4) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(4) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(5);
      }).fromTo('#artists_info li:eq(5) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(5) .warper', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(6);
      }).fromTo('#artists_info li:eq(6) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(6) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(7);
      }).fromTo('#artists_info li:eq(7) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(7) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(8);
      }).fromTo('#artists_info li:eq(8) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(8) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(9);
      }).fromTo('#artists_info li:eq(9) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(9) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(10);
      }).fromTo('#artists_info li:eq(10) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(10) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(11);
      }).fromTo('#artists_info li:eq(11) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(11) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(12);
      }).fromTo('#artists_info li:eq(12) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(12) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(13);
      }).fromTo('#artists_info li:eq(13) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(13) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(14);
      }).fromTo('#artists_info li:eq(14) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(14) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(15);
      }).fromTo('#artists_info li:eq(15) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(15) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(16);
      }).fromTo('#artists_info li:eq(16) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(16) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(17);
      }).fromTo('#artists_info li:eq(17) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(17) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(18);
      }).fromTo('#artists_info li:eq(18) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(18) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(19);
      }).fromTo('#artists_info li:eq(19) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(19) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(20);
      }).fromTo('#artists_info li:eq(20) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(20) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(21);
      }).fromTo('#artists_info li:eq(21) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(21) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(22);
      }).fromTo('#artists_info li:eq(22) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(22) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(23);
      }).fromTo('#artists_info li:eq(23) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(23) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(24);
      }).fromTo('#artists_info li:eq(24) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(24) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(25);
      }).fromTo('#artists_info li:eq(25) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(25) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(26);
      }).fromTo('#artists_info li:eq(26) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(26) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(27);
      }).fromTo('#artists_info li:eq(27) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(27) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(28);
      }).fromTo('#artists_info li:eq(28) .warper', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(28) .warper', 0.5, {
        alpha: 0,
        y: -30
      }, sequence);
    }

    startSite(that) {
      that.logoWhite();
      return that.bildIntroYoutube();
    }

    bindEvents() {
      var rotationSnap, that, windowBlurred, windowFocused;
      that = this;
      if (!$('body').hasClass('doc-ready')) {
        $('body').on('doc-ready', function() {
          console.log('doc-ready');
          return that.startSite(that);
        });
      } else {
        console.log('doc already ready');
        that.startSite(that);
      }
      
      //------------------- FOOTER LISTNER -------------------#
      $('#mode_switcher').on('switch_to_face_pays', function() {
        if (that.player) {
          return that.player.pause();
        }
      });
      $('#mode_switcher').on('switch_to_face_artist', function() {
        if (that.player) {
          return that.player.play();
        }
      });
      //------------------- POPIN LISTNER -------------------#
      $('#popin').on('classChange', function() {
        console.log('popin change ' + ($(this).hasClass('hide')));
        if ($(this).hasClass('hide')) {
          if (window.playerYT) {
            window.playerYT.stopVideo();
            $('#popin .video-container').addClass('hide');
          }
          console.log('contrys : ' + ($("#mode_switcher [data-face='face_pays']").hasClass('selected')));
          if ($("#mode_switcher [data-face='face_pays']").hasClass('selected')) {
            return;
          }
          if (that.player) {
            that.player.play();
          }
        } else {
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
      };
      windowFocused = function() {
        console.log('focus');
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
          that.player.play();
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
      
      //------------------- PLAYER JS ---------------------------#		
      $('#player').on('play', function(e) {
        console.log('play video disk');
        $('body').removeClass('video-disk-waiting');
        if ($("#mode_switcher [data-face='face_pays']").hasClass('selected')) {
          that.player.pause();
          return;
        }
        that.timelineInfo.play();
        that.timelineKnob.play();
        that.timelinePlatine.play();
        return $('.lds-dual-ring').addClass('done');
      });
      $('#player').on('pause', function() {
        console.log('pause' + that.timelineKnob);
        that.timelineInfo.pause();
        that.timelineKnob.pause();
        return that.timelinePlatine.pause();
      });
      $('#player').on('seeked', function() {
        return that.timelineInfo.time(that.player.currentTime);
      });
      rotationSnap = 360 / 28;
      Draggable.create('#knob', {
        type: 'rotation',
        throwProps: true,
        onDragStart: function() {
          $('#knob').addClass('drag');
          return that.timelineKnob.kill();
        },
        onDrag: function() {
          return that.changeCurrentTime(this.rotation % 360, that.player);
        },
        onThrowUpdate: function() {
          return that.changeCurrentTime(this.rotation % 360, that.player);
        },
        onThrowComplete: function() {
          that.timelineKnob = TweenMax.fromTo('#knob, #player', that.duration, {
            rotation: this.rotation % 360
          }, {
            ease: Linear.easeNone,
            rotation: (this.rotation % 360) + 360,
            repeat: -1
          });
          that.player.play();
          return $('#knob').removeClass('drag');
        },
        snap: function(endValue) {
          return Math.round(endValue / rotationSnap) * rotationSnap;
        }
      });
    }

  };

  module.player_video = player_video;

}).call(this);

(function() {
  var init;

  window.isMobile = function() {
    return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
  };

  init = function() {
    var block_pays, flip_disk, player_youtube, popin;
    console.log('window load -> init');
    player_youtube = new module.player_youtube();
    flip_disk = new module.flip_disk();
    popin = new module.popin();
    block_pays = new module.block_pays();
    $('body').addClass('doc-ready');
    return $('body').trigger('doc-ready');
  };

  console.log('start js');

  $(window).load(init);

}).call(this);
