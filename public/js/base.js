(function() {
  window.module = window.module || {};

}).call(this);

(function() {
  var flip_disk;

  flip_disk = class flip_disk {
    constructor() {
      var demi_flip, duree_flip;
      console.log('flip disk');
      duree_flip = 1.5;
      demi_flip = duree_flip / 2;
      this.flip_tween = new TimelineMax({
        paused: true
      });
      this.flip_tween.to($('#face_artistes'), .3, {
        ease: Power1.easeIn,
        scale: 1.1
      }).to($('#face_artistes'), demi_flip - 0.3, {
        ease: Power1.easeIn,
        rotationY: 90
      }).staggerTo($('#list_artists li'), .3, {
        alpha: 0
      }, duree_flip / 28, 0).from($('#face_pays'), demi_flip, {
        ease: Power1.easeOut,
        rotationY: 90,
        scale: 1.3
      }, duree_flip / 2);
      this.flip_tween.eventCallback('onReverseComplete', function() {
        $('#mode_switcher').trigger('switch_to_face_artist');
        $('#smallmap, #artists_info').removeClass('opacity_0');
      });
      this.bindEvents();
    }

    bindEvents() {
      var GoInFullscreen, GoOutFullscreen, IsFullScreenCurrently, that;
      that = this;
      $('#mode_switcher li a').on({
        'click': function(e) {
          e.preventDefault();
          $('.footer .selected').removeClass('selected');
          $(this).addClass('selected');
          if ($(this).data('face') === 'face_pays') {
            $('#mode_switcher').trigger('switch_to_face_pays');
            $('#smallmap, #artists_info').addClass('opacity_0');
            return that.flip_tween.play();
          } else {
            $('.block_contry').removeClass('opacity_1');
            return that.flip_tween.reverse();
          }
        }
      });
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
      window.onYouTubeIframeAPIReady = function() {
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
          if (!window.playerYT) {
            console.log('not yet');
            window.playerYT = new YT.Player('player_youtube', {
              height: '390',
              width: '640',
              videoId: idyoutube,
              fs: 0,
              playerVars: {
                autoplay: 1,
                showinfo: 0,
                autohide: 1,
                disablekb: 1,
                enablejsapi: 1,
                fs: 1,
                modestbranding: true,
                rel: 0,
                hl: 'pt',
                cc_lang_pref: 'pt',
                cc_load_policy: 1,
                color: 'white'
              },
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });
          } else {
            window.playerYT.loadVideoById(idyoutube);
          }
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

  block_pays = class block_pays {
    constructor() {
      this.bindEvents();
    }

    bindEvents() {
      var bell, that;
      that = this;
      bell = new Wad({
        source: 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/1.mp3'
      });
      bell.play();
      // bell.stop()
      // ------------ SHOW BTN ------------------ #
      return $('.pastille').on({
        'click': function(e) {
          var place;
          if ($(this).hasClass('big')) {
            $('.pastille').removeClass('big');
            return $('#artists_info_map .block_contry').removeClass('opacity_1');
          } else {
            $('.pastille').removeClass('big');
            $('#artists_info_map .block_contry').removeClass('opacity_1');
            place = '.' + $(this).data('nicename');
            $(this).addClass('big');
            return $('#artists_info_map ' + place).addClass('opacity_1');
          }
        }
      });
    }

  };

  module.block_pays = block_pays;

}).call(this);

(function() {
  var popin;

  popin = class popin {
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
      $('#apropos_btn').on({
        'click': function(e) {
          e.preventDefault();
          return showPopin('#artist_info');
        }
      });
      $('#share').on('click', function() {
        return showPopin('#shareinfo');
      });
      return $('#close, #back').on('click', function() {
        if (!$('#popin').hasClass('hide')) {
          console.log('remove');
          $('#popin').addClass('hide').trigger('classChange');
        }
        if (!$('#shareinfo').hasClass('hide')) {
          $('#shareinfo').addClass('hide');
        }
        if (!$('#artist_info').hasClass('hide')) {
          return $('#artist_info').addClass('hide');
        }
      });
    }

  };

  module.popin = popin;

}).call(this);

(function() {
  var player_video;

  player_video = class player_video {
    constructor($container) {
      this.$container = $container;
      // @bindEvents() # bind event is now after video is loaded
      this.timelineKnob = new TimelineMax({
        paused: true
      });
      this.timelineInfo = new TimelineMax({
        paused: true
      });
      this.player = null;
      this.loadVideo();
    }

    loadVideo() {
      var req, that, videoUrl;
      videoUrl = 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/5secondes.mp4';
      that = this;
      req = new XMLHttpRequest;
      req.open('GET', videoUrl, true);
      req.responseType = 'blob';
      req.onload = function() {
        var vid, videoBlob;
        // Onload is triggered even on 404 so we need to check the status code
        if (this.status === 200) {
          videoBlob = this.response;
          vid = URL.createObjectURL(videoBlob);
          // Video is now downloaded and we can set it as source on the video element
          document.getElementById('player').src = vid;
          $('#player source').attr('src', vid);
          $('#player').addClass('ready');
          $('.lds-dual-ring').addClass('done');
          that.bindEvents();
        }
      };
      req.onerror = function() {};
      // Error
      return req.send();
    }

    changeCurrentTime($deg, $myplayer) {
      var percentage, player_new_CT;
      this.$deg = $deg;
      this.$myplayer = $myplayer;
      if (this.$deg < 0) {
        this.$deg = 360 + this.$deg;
      }
      percentage = this.$deg / 3.6;
      player_new_CT = this.$myplayer.duration() * (percentage / 100);
      return this.$myplayer.currentTime(player_new_CT);
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
        player.playbackRate(PBR);
        return console.log('secondtimeupdate ' + player.currentTime() + ' < ' + timeToStop);
      };
      return this.$player.on('timeupdate', checkEndTime);
    }

    
    //------------------- TWEEN ---------------------------#
    createTween(duration) {
      var duration_sequence, sequence, updateInfo;
      updateInfo = function(id) {
        var svgcontry;
        $('#play-video-btn, #startvideo').attr('href', $('#list_artists li:eq(' + id + ') a').attr('href'));
        $('#list_artists li a.selected').removeClass('selected');
        $('#list_artists li:eq(' + id + ') a').addClass('selected');
        $('#artist_info .info').addClass('hide');
        $('#artist_info .info:eq(' + id + ')').removeClass('hide');
        svgcontry = '#' + $('#artists_info li:eq(' + id + ') .contry').data('contrynicename');
        console.log(svgcontry);
        TweenMax.to(['#smallmap svg .smallmap-fr-st2', '#smallmap svg .smallmap-en-st2'], 0.5, {
          alpha: 0
        });
        return TweenMax.to(svgcontry, 0.5, {
          alpha: 1
        }, '+=.5');
      };
      // TweenMax.to('#knob', duration_sequence, { ease: Power0.easeNone, rotation: ((id+1)*(360/28)) })
      duration_sequence = duration / 28;
      sequence = '+=' + (duration_sequence - 1);
      console.log(duration + ' ' + sequence);
      return this.timelineInfo.add(function() {
        return updateInfo(0);
      }).fromTo('#artists_info li:eq(0)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(0)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(1);
      }).fromTo('#artists_info li:eq(1)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(1)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(2);
      }).fromTo('#artists_info li:eq(2)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(2)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(3);
      }).fromTo('#artists_info li:eq(3)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(3)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(4);
      }).fromTo('#artists_info li:eq(4)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(4)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(5);
      }).fromTo('#artists_info li:eq(5)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(5)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(6);
      }).fromTo('#artists_info li:eq(6)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(6)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(7);
      }).fromTo('#artists_info li:eq(7)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(7)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(8);
      }).fromTo('#artists_info li:eq(8)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(8)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(9);
      }).fromTo('#artists_info li:eq(9)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(9)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(10);
      }).fromTo('#artists_info li:eq(10)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(10)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(11);
      }).fromTo('#artists_info li:eq(11)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(11)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(12);
      }).fromTo('#artists_info li:eq(12)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(12)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(13);
      }).fromTo('#artists_info li:eq(13)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(13)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(14);
      }).fromTo('#artists_info li:eq(14)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(14)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(15);
      }).fromTo('#artists_info li:eq(15)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(15)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(16);
      }).fromTo('#artists_info li:eq(16)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(16)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(17);
      }).fromTo('#artists_info li:eq(17)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(17)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(18);
      }).fromTo('#artists_info li:eq(18)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(18)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(19);
      }).fromTo('#artists_info li:eq(19)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(19)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(20);
      }).fromTo('#artists_info li:eq(20)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(20)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(21);
      }).fromTo('#artists_info li:eq(21)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(21)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(22);
      }).fromTo('#artists_info li:eq(22)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(22)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(23);
      }).fromTo('#artists_info li:eq(23)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(23)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(24);
      }).fromTo('#artists_info li:eq(24)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(24)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(25);
      }).fromTo('#artists_info li:eq(25)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(25)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(26);
      }).fromTo('#artists_info li:eq(26)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(26)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(27);
      }).fromTo('#artists_info li:eq(27)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(27)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(28);
      }).fromTo('#artists_info li:eq(28)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(28)', 0.5, {
        alpha: 0
      }, sequence).to('.size_platine', duration, {
        ease: Sine.easeIn,
        rotation: -360 * 100
      }, 0).to('#knob', duration, {
        ease: Power0.easeNone,
        rotation: 360
      }, 0);
    }

    bindEvents() {
      var options, rotationSnap, that, windowBlurred, windowFocused;
      that = this;
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
          if (!$('#contrys').hasClass('selected')) {
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
        if (!$('#popin').hasClass('hide')) {
          return;
        }
        if (!$('#contrys').hasClass('selected')) {
          return;
        }
        if (that.player) {
          that.player.play();
        }
      };
      $(window).on('pagehide blur', windowBlurred);
      $(window).on('pageshow focus', windowFocused);
      //------------------- SOUND ---------------------------#
      $('#sound').on('click', function() {
        that.player.muted(!that.player.muted());
        return $('#sound').toggleClass('actif');
      });
      
      //------------------- PLAYER JS ---------------------------#
      options = {
        autoplay: true,
        muted: true
      };
      this.player = videojs('player', options, function() {
        var myPlayer;
        myPlayer = this;
        myPlayer.on('play', function() {
          console.log('play');
          return that.timelineInfo.play();
        });
        myPlayer.on('pause', function() {
          console.log('pause');
          return that.timelineInfo.pause();
        });
        myPlayer.on('seeked', function() {
          return that.timelineInfo.time(myPlayer.currentTime());
        });
        myPlayer.on('loadedmetadata', function() {
          return that.createTween(myPlayer.duration());
        });
      });
      rotationSnap = 360 / 28;
      Draggable.create('#knob', {
        type: 'rotation',
        throwProps: true,
        onDragStart: function() {
          $('#knob').addClass('drag');
          if (that.player.muted()) {
            that.player.muted(false);
            return $('#sound').addClass('actif');
          }
        },
        onDrag: function() {
          return that.changeCurrentTime(this.rotation % 360, that.player);
        },
        onThrowUpdate: function() {
          return that.changeCurrentTime(this.rotation % 360, that.player);
        },
        onThrowComplete: function() {
          return $('#knob').removeClass('drag');
        },
        onRelease: function() {
          return that.player.play();
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
  var block_pays, flip_disk, hasTouch, init, isMobile, player_video, player_youtube, popin;

  isMobile = function() {
    var connection;
    if (navigator.userAgent.match(/Mobi/)) {
      return true;
    }
    if ('screen' in window && window.screen.width < 1366) {
      return true;
    }
    connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.type === 'cellular') {
      return true;
    }
    return false;
  };

  init = function() {
    $('body').addClass('doc-ready');
    return $('.loader-bar').removeClass('show-progress');
  };

  $(window).load(init);

  hasTouch = function() {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  };

  if (!hasTouch()) {
    document.body.className += ' hasHover';
  }

  player_video = new module.player_video();

  player_youtube = new module.player_youtube();

  flip_disk = new module.flip_disk();

  popin = new module.popin();

  block_pays = new module.block_pays();

}).call(this);
