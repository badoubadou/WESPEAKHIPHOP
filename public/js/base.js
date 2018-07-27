(function() {
  window.module = window.module || {};

}).call(this);

(function() {
  var flip_disk;

  flip_disk = class flip_disk {
    constructor() {
      console.log('flip disk');
      this.flip_tween = new TimelineLite({
        paused: true
      });
      this.flip_tween.to($('#face_artistes'), 1, {
        rotationY: 90
      });
      this.flip_tween.from($('#face_pays'), 1, {
        rotationY: 90
      });
      this.bindEvents();
    }

    bindEvents() {
      var that;
      that = this;
      $('#mode_switcher li a').on({
        'click': function(e) {
          e.preventDefault();
          console.log('data : ' + $(this).data('face'));
          if ($(this).data('face') === 'face_pays') {
            console.log('play' + that.flip_tween);
            return that.flip_tween.play();
          } else {
            console.log('back');
            return that.flip_tween.reverse();
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
      var done, firstScriptTag, player;
      window.onYouTubeIframeAPIReady = function() {
        $('#zone_youtube .shield').on('click', function() {
          $('#zone_youtube').removeClass('play');
          $('.lds-dual-ring').addClass('done');
          window.playerYT.stopVideo();
        });
        return $('#list_artists li a').on('click', function() {
          var idyoutube;
          event.preventDefault();
          idyoutube = $(this).data('idyoutube');
          $('.lds-dual-ring').removeClass('done');
          if (!window.playerYT) {
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
                fs: 0,
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
            $('#zone_youtube').addClass('play');
          }
        });
      };
      window.onPlayerReady = function(event) {
        $('#zone_youtube').addClass('play');
        $('.lds-dual-ring').addClass('done');
        event.target.playVideo();
      };
      window.onPlayerStateChange = function(event) {};
      // if event.data == YT.PlayerState.PLAYING and !done
      // 	setTimeout stopVideo, 6000
      // 	done = true
      window.stopVideo = function() {
        window.playerYT.stopVideo();
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
  var player_video;

  player_video = class player_video {
    constructor($container) {
      this.$container = $container;
      // @bindEvents() # bind event is now after video is loaded
      this.player = null;
      this.loadVideo();
    }

    loadVideo() {
      var req, that, videoUrl;
      videoUrl = 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/5secondes.mp4';
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '') {
        videoUrl = 'http://milkyweb.eu/video/5secondes.mp4';
      }
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

    bindEvents() {
      var duration, options, rotationSnap, sequence, that;
      that = this;
      //------------------- SOUND ---------------------------#
      $('#sound').on('click', function() {
        that.player.muted(!that.player.muted());
        return $('#sound').toggleClass('actif');
      });
      //------------------- TWEEN ---------------------------#
      this.timelineInfo = new TimelineMax({
        paused: true
      });
      duration = 160.49;
      // sequence = '+='+((duration / 28)-1)
      sequence = '+=4.5';
      console.log(sequence);
      this.timelineInfo.fromTo('#artists_info li:eq(0)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(0)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(1)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(1)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(2)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(2)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(3)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(3)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(4)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(4)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(5)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(5)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(6)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(6)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(7)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(7)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(8)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(8)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(9)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(9)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(10)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(10)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(11)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(11)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(12)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(12)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(13)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(13)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(14)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(14)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(15)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(15)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(16)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(16)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(17)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(17)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(18)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(18)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(19)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(19)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(20)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(20)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(21)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(21)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(22)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(22)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(23)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(23)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(24)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(24)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(25)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(25)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(26)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(26)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(27)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(27)', 0.5, {
        alpha: 0
      }, sequence).fromTo('#artists_info li:eq(28)', 0.5, {
        alpha: 0
      }, {
        alpha: 1
      }).to('#artists_info li:eq(28)', 0.5, {
        alpha: 0
      }, sequence);
      //------------------- PLAYER JS ---------------------------#
      options = {
        autoplay: true,
        muted: true
      };
      this.player = videojs('player', options, function() {
        var myPlayer;
        myPlayer = this;
        myPlayer.on('play', function() {
          return that.timelineInfo.play();
        });
        myPlayer.on('pause', function() {
          return that.timelineInfo.pause();
        });
        myPlayer.on('seeked', function() {
          return that.timelineInfo.time(myPlayer.currentTime());
        });
        myPlayer.on('timeupdate', function() {
          var deg, percentage, whereYouAt;
          that.timelineInfo.time(myPlayer.currentTime());
          if ($('#knob').hasClass('drag')) {
            return;
          }
          percentage = (myPlayer.currentTime() / myPlayer.duration()) * 100;
          whereYouAt = myPlayer.currentTime();
          deg = Math.round(360 * (percentage / 100));
          if (deg) {
            TweenMax.to(['#knob'], .5, {
              rotation: deg
            });
          } else {
            console.log('yo');
            TweenMax.to(['#knob'], 0, {
              rotation: deg
            });
          }
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
  var flip_disk, hasTouch, init, player_video, player_youtube;

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

}).call(this);
