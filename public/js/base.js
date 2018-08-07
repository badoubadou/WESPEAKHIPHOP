(function() {
  window.module = window.module || {};

}).call(this);

(function() {
  var flip_disk;

  flip_disk = class flip_disk {
    constructor() {
      console.log('flip disk');
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
      }).add(function() {
        return $('#apropos_btn').addClass('hide');
      });
      
      // @flip_tween
      // 	.to($('#face_artistes'), .3, {ease: Power1.easeIn })
      // 	.to($('#face_artistes'), (@demi_flip-0.3), {ease: Power1.easeIn, rotationY:90})
      // 	.staggerTo($('#list_artists li'), .3, {alpha:0},@duree_flip / 28,0)
      // 	.from($('#face_pays'), @demi_flip, {ease: Power1.easeOut, rotationY:90 },(@duree_flip / 2))
      return this.flip_tween.eventCallback('onReverseComplete', function() {
        $('#mode_switcher').trigger('switch_to_face_artist');
        $('#smallmap, #artists_info').removeClass('opacity_0');
        $('#apropos_btn').removeClass('hide');
      });
    }

    // if(timeStamp)
    // 	@flip_tween.time(timeStamp)
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
            $('#smallmap, #artists_info').addClass('opacity_0');
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
      $('#apropos_btn, .block_contry .bio').on({
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
  var block_pays;

  block_pays = class block_pays {
    constructor() {
      this.soundInitiated = false;
      this.bindEvents();
    }

    bindEvents() {
      var that;
      that = this;
      //------------------- FOOTER LISTNER -------------------#
      $('#mode_switcher').on('switch_to_face_artist', function() {
        if (window.pauseSound) {
          window.pauseSound();
        }
        $('.pastille').removeClass('big');
        $('#artists_info_map .block_contry').removeClass('opacity_1');
        return console.log('switch_to_face_artist');
      });
      //------------------- SOUND ---------------------------#
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
      //------------------- pastille -------------------#
      return $('.pastille').on({
        'click': function(e) {
          var buildContrySound, closeContryBox, openContryBox;
          buildContrySound = function(pastille) {
            var onEnd, playlistUrls;
            window.pauseSound();
            window.pCount = 0;
            playlistUrls = pastille.data('sound');
            window.howlerBank = [];
            onEnd = function(e) {
              window.pCount = window.pCount + 1 !== window.howlerBank.length ? window.pCount + 1 : 0;
              console.log('howlerBank Play pCount = ' + window.pCount);
              if (!$('#sound').hasClass('actif')) {
                window.howlerBank[window.pCount].volume(0);
              }
              window.howlerBank[window.pCount].play();
            };
            // build up howlerBank:     
            playlistUrls.forEach(function(current, i) {
              console.log(playlistUrls[i]);
              window.howlerBank.push(new Howl({
                src: ['https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/' + playlistUrls[i] + '.mp3'],
                onend: onEnd,
                buffer: true
              }));
            });
            if (!$('#sound').hasClass('actif')) {
              window.howlerBank[0].volume(0);
            }
            window.howlerBank[0].play();
            that.soundInitiated = true;
          };
          window.pauseSound = function() {
            if (window.howlerBank) {
              console.log('fade');
              return window.howlerBank[window.pCount].stop();
            }
          };
          closeContryBox = function() {
            $('.pastille').removeClass('big');
            $('#artists_info_map .block_contry').removeClass('opacity_1');
            return window.pauseSound();
          };
          openContryBox = function(pastille) {
            var place;
            $('.pastille').removeClass('big');
            $('#artists_info_map .block_contry').removeClass('opacity_1');
            place = '.' + pastille.data('nicename');
            pastille.addClass('big');
            $('#artists_info_map ' + place).addClass('opacity_1');
            return buildContrySound(pastille);
          };
          if ($(this).hasClass('big')) {
            return closeContryBox();
          } else {
            return openContryBox($(this));
          }
        }
      });
    }

  };

  module.block_pays = block_pays;

}).call(this);

(function() {
  var player_video;

  player_video = class player_video {
    constructor($container) {
      this.$container = $container;
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
      }).from('#mask_video', 3, {
        scale: 0,
        ease: Power3.easeOut
      }, 0).staggerFromTo('#disk_lign svg path', 1, {
        drawSVG: "60% 60%"
      }, {
        drawSVG: "100%"
      }, -0.1, .5).from('#bg_disk', 2, {
        opacity: 0,
        scale: 0,
        ease: Power1.easeOut
      }, 1).from('#platine', 1, {
        opacity: 0
      }, 1).staggerFrom('#list_artists li', .3, {
        opacity: 0
      }, 0.05, 1.5).from('#main_footer', .3, {
        y: 40
      }, 2).from('#smallmap', .3, {
        opacity: 0
      }, 2);
      this.player = null;
      this.loadVideo();
    }

    loadVideo() {
      var req, that, videoUrl;
      console.log('loadVideo');
      videoUrl = 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/5secondes.mp4';
      // videoUrl = 'http://videotest:8888/5secondes.mp4'
      that = this;
      req = new XMLHttpRequest;
      req.open('GET', videoUrl, true);
      req.responseType = 'blob';
      req.onload = function() {
        var vid, videoBlob;
        console.log('onload video disk');
        // Onload is triggered even on 404 so we need to check the status code
        if (this.status === 200) {
          videoBlob = this.response;
          vid = URL.createObjectURL(videoBlob);
          // Video is now downloaded and we can set it as source on the video element
          document.getElementById('player').src = vid;
          $('#player source').attr('src', vid);
          $('#player').addClass('ready');
          that.timelineDisk.play();
          that.bindEvents();
        }
      };
      req.onerror = function() {
        console.log('error video');
      };
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
        player.playbackRate(PBR);
        return console.log('secondtimeupdate ' + player.currentTime() + ' < ' + timeToStop);
      };
      return this.$player.on('timeupdate', checkEndTime);
    }

    
    //------------------- TWEEN ---------------------------#
    createTween() {
      var duration_sequence, sequence, updateInfo;
      updateInfo = function(id) {
        var svgcontry;
        $('#play-video-btn, #startvideo').attr('href', $('#list_artists li:eq(' + id + ') a').attr('href'));
        $('#list_artists li a.selected').removeClass('selected');
        $('#list_artists li:eq(' + id + ') a').addClass('selected');
        $('#artist_info .info').addClass('hide');
        $('#artist_info .info:eq(' + id + ')').removeClass('hide');
        svgcontry = '#' + $('#artists_info li:eq(' + id + ') .contry').data('contrynicename');
        TweenMax.to(['#smallmap svg .smallmap-fr-st2', '#smallmap svg .smallmap-en-st2'], 0.5, {
          alpha: 0
        });
        return TweenMax.to(svgcontry, 0.5, {
          alpha: 1
        }, '+=.5');
      };
      duration_sequence = this.duration / 28;
      sequence = '+=' + (duration_sequence - 1);
      console.log(this.duration + ' ' + sequence);
      this.timelineKnob = TweenMax.to('#knob', this.duration, {
        ease: Linear.easeNone,
        rotation: 360,
        repeat: -1
      });
      this.timelinePlatine = TweenMax.to('#platine', this.duration, {
        ease: Linear.easeNone,
        rotation: 360 * 100,
        repeat: -1
      });
      return this.timelineInfo.add(function() {
        return updateInfo(0);
      }).fromTo('#artists_info li:eq(0)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(0)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(1);
      }).fromTo('#artists_info li:eq(1)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(1)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(2);
      }).fromTo('#artists_info li:eq(2)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(2)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(3);
      }).fromTo('#artists_info li:eq(3)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(3)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(4);
      }).fromTo('#artists_info li:eq(4)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(4)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(5);
      }).fromTo('#artists_info li:eq(5)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(5)', 0.5, {
        alpha: 0
      }, sequence).add(function() {
        return updateInfo(6);
      }).fromTo('#artists_info li:eq(6)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(6)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(7);
      }).fromTo('#artists_info li:eq(7)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(7)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(8);
      }).fromTo('#artists_info li:eq(8)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(8)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(9);
      }).fromTo('#artists_info li:eq(9)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(9)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(10);
      }).fromTo('#artists_info li:eq(10)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(10)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(11);
      }).fromTo('#artists_info li:eq(11)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(11)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(12);
      }).fromTo('#artists_info li:eq(12)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(12)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(13);
      }).fromTo('#artists_info li:eq(13)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(13)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(14);
      }).fromTo('#artists_info li:eq(14)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(14)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(15);
      }).fromTo('#artists_info li:eq(15)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(15)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(16);
      }).fromTo('#artists_info li:eq(16)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(16)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(17);
      }).fromTo('#artists_info li:eq(17)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(17)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(18);
      }).fromTo('#artists_info li:eq(18)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(18)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(19);
      }).fromTo('#artists_info li:eq(19)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(19)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(20);
      }).fromTo('#artists_info li:eq(20)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(20)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(21);
      }).fromTo('#artists_info li:eq(21)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(21)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(22);
      }).fromTo('#artists_info li:eq(22)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(22)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(23);
      }).fromTo('#artists_info li:eq(23)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(23)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(24);
      }).fromTo('#artists_info li:eq(24)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(24)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(25);
      }).fromTo('#artists_info li:eq(25)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(25)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(26);
      }).fromTo('#artists_info li:eq(26)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(26)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(27);
      }).fromTo('#artists_info li:eq(27)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(27)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence).add(function() {
        return updateInfo(28);
      }).fromTo('#artists_info li:eq(28)', 0.5, {
        alpha: 0,
        y: 30
      }, {
        alpha: 1,
        y: 0
      }).to('#artists_info li:eq(28)', 0.5, {
        alpha: 0,
        y: -30
      }, sequence);
    }

    bindEvents() {
      var rotationSnap, that, windowBlurred, windowFocused;
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
      $('#sound').on('sound_off', function() {
        return that.player.muted(true);
      });
      $('#sound').on('sound_on', function() {
        return that.player.muted(false);
      });
      
      //------------------- PLAYER JS ---------------------------#
      that.player = $('#player')[0];
      $('#player').on('loadedmetadata', function(e) {
        that.player.play();
        that.duration = that.player.duration;
        console.log(that.player.currentTime);
        that.createTween();
      });
      $('#player').on('play', function(e) {
        if ($("#mode_switcher [data-face='face_pays']").hasClass('selected')) {
          that.player.pause();
          return;
        }
        console.log('play');
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
      // options = { autoplay: true, muted: true };
      // @player = videojs('player', options, ->
      // 	myPlayer = this

      // 	myPlayer.on 'play', ->
      // 		if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
      // 			myPlayer.pause()
      // 			return
      // 		console.log 'play'
      // 		that.timelineInfo.play()
      // 		that.timelineKnob.play()
      // 		that.timelinePlatine.play()
      // 		$('.lds-dual-ring').addClass('done')

      // 	myPlayer.on 'pause', ->
      // 		console.log 'pause'+that.timelineKnob
      // 		that.timelineInfo.pause()
      // 		that.timelineKnob.pause()
      // 		that.timelinePlatine.pause()

      // 	myPlayer.on 'seeked', ->
      // 		that.timelineInfo.time myPlayer.currentTime()

      // 	myPlayer.on 'loadedmetadata', ->
      // 		that.duration = myPlayer.duration()
      // 		that.createTween()

      // 	return
      // )
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
          that.timelineKnob = TweenMax.fromTo('#knob', that.duration, {
            rotation: this.rotation % 360
          }, {
            ease: Linear.easeNone,
            rotation: (this.rotation % 360) + 360,
            repeat: -1
          });
          that.player.play();
          return $('#knob').removeClass('drag');
        },
        
        // onRelease: ->
        // 	console.log 'onRelease : '+(this.rotation % 360)+'that.duration : '+that.duration
        // 	$('#knob').removeClass 'drag'
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
    return $('#mask_shield').addClass('hide');
  };

  // $('.loader-bar').removeClass('show-progress')
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
