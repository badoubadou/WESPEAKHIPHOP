class player_video_youtube
	'use strict'
	constructor: (@$container) ->
		@playerYT = null
		@drawLogo = null
		@intro_is_done = false
		@blankVideo = 'https://cdn.plyr.io/static/blank.mp4'
		@bildIntroYoutube()
		@bindEvents()
		@needStartSite = true

	playYTisReady : ->
		console.log  '----------------------- playYTisReady -------------------------------------------'
		if(!$('.video-container').hasClass('customised'))
			@customizePlayerYT()
		$('.lds-dual-ring').trigger 'hidespiner'
		if @needStartSite 
			@startSite()
			@needStartSite = false
		else
			@playerYT.play()

	customizePlayerYT : ->
		console.log 'customizePlayerYT'
		custom_btn = $('#warp_custom_btn').detach()
		$('.video-container .plyr').append custom_btn
		$('.video-container').addClass 'customised'
			
	bildIntroYoutube : ->
		that = @
		random = Math.floor(Math.random() * 4)
		randomid = $('#idIntroYoutube input:eq('+random+')').val()
		$('#playerYT').attr('data-plyr-embed-id',randomid)

	startSite: ()->
		console.log 'startSite then loadMap'
		$('.lds-dual-ring').on 'loaderhidden', ->
			$('#logowhite').trigger 'showLogo'
		$('#logowhite').on 'finishedShowLogo', ->
			TweenMax.set(['.btn_intro a'],{autoAlpha:0,visibility:"hidden"});
			TweenMax.staggerFromTo('.btn_intro a',.8, {autoAlpha:0, visibility:"visible", y:-10},{autoAlpha:1, y:0, ease:Power1.easeOut}, 0.5);
		@loadMap()

	YouTubeGetID: (url) ->
		ID = ''
		url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
		if url[2] != undefined
			ID = url[2].split(/[^0-9a-z_\-]/i)
			ID = ID[0]
		else
			ID = url
			ID
	


	loadMap : ->
		console.log '---> load small map'
		that = @
		$.get 'https://d2e3lhf7z9v1b2.cloudfront.net/smallmap-'+$('#langage_short').val()+'.svg', (data) ->
			console.log '---> small map loaded'
			div = document.createElement('div')
			div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement)
			$( "#smallmap" ).append( div.innerHTML )
			TweenLite.set(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], {alpha:0});
			TweenMax.to(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], 0.5, {scale: 3, transformOrigin:'50% 50%', repeat:-1, yoyo:true})
			return

	bindEvents: ->
		that = @
		#------------------- DOC READY ------------------------#
		if !$('body').hasClass 'doc-ready'
			$('body').on 'doc-ready', ->
				console.log 'doc-ready'
				# that.startSite(that)
				$('body').off()
		else
			console.log 'doc already ready'
			# that.startSite(that)

		#------------------- ENTER SITE -------------------#
		$('#enter_site').on 'click touchstart', (e)->
			e.preventDefault()
			that.intro_is_done = true
			console.log 'enter site -------------------------------- dafucked ?  '
			$('.intro_page').addClass 'hidden'
			$('.video-container').removeClass 'hidden hide'
			GoInFullscreen($('body').get(0))
			that.playerYT.play()
			$('#enter_site').off()
			setTimeout (->
				console.log 'show skip_intro damed it'
				TweenMax.fromTo('.skip_intro', .6, {autoAlpha:0, visibility:'visible'}, {autoAlpha:1 })
				return
			), 3000

			return
		#------------------- SOUND ---------------------------#
		$('#sound').on 'click touchstart', ->
			console.log 'click sound'
			event_name = 'sound_on'
			if ($('#sound').hasClass('actif'))
				event_name = 'sound_off'
			$(this).trigger event_name
			console.log event_name
			$('#sound').toggleClass 'actif'

		#------------------- FULL SCREEN ---------------------------#				
		GoInFullscreen = (element) ->
			$('.myfullscreen').addClass 'actiffullscreen'
			if element.requestFullscreen
				element.requestFullscreen()
			else if element.mozRequestFullScreen
				element.mozRequestFullScreen()
			else if element.webkitRequestFullscreen
				element.webkitRequestFullscreen()
			else if element.msRequestFullscreen
				element.msRequestFullscreen()

			if IsFullScreenCurrently()
				$('.myfullscreen').addClass 'actiffullscreen'
			return

		GoOutFullscreen = ->
			$('.myfullscreen').removeClass 'actiffullscreen'
			if document.exitFullscreen
				document.exitFullscreen()
			else if document.mozCancelFullScreen
				document.mozCancelFullScreen()
			else if document.webkitExitFullscreen
				document.webkitExitFullscreen()
			else if document.msExitFullscreen
				document.msExitFullscreen()
			return

		IsFullScreenCurrently = ->
			full_screen_element = document.fullscreenElement or document.webkitFullscreenElement or document.mozFullScreenElement or document.msFullscreenElement or null
			# If no element is in full-screen
			if full_screen_element == null
				false
			else
				true

		$('.myfullscreen').on 'click touchstart': ->
			console.log 'click '
			if !IsFullScreenCurrently()
				GoInFullscreen($('body').get(0))
			else
				GoOutFullscreen()

		@playerYT = new Plyr('#playerYT', { autoplay: true,playsinline: true, clickToPlay: false, controls:['play-large', 'play', 'progress', 'captions'] })
		
		#------------------- PLAYER YOUTUBE IS READY -------------------#
		@playerYT.on 'ready', (event) ->
			that.playYTisReady()
			return

		@playerYT.on 'statechange', (event) ->
			console.log 'on statechange YOUTUBE  event code : '+event.detail.code
			if event.detail.code == 1 #-------------------------  PLAY 
				$('.video-container').removeClass 'trans'
				$('.video-container .myfullscreen').removeClass 'hide'
				$('.hider_logo').addClass 'hide_hider'
				$('.hider_top').addClass 'hide_hider'
				$('.btn_video_ipad').addClass('hide')
				if ($('#logowhite').data('animstatus') == 'done')
					return
				
				if ($('#logowhite').data('animstatus') == 'waiting')
					console.log 'trigger hide'
					$('#logowhite').trigger 'hideLogo'
				
				if ($('#logowhite').data('animstatus') == 'paused')
					$('#logowhite').trigger 'resumehideLogo'
			
			if event.detail.code == 2 #-------------------------  PAUSE
				$('.hider_logo').removeClass 'hide_hider'
				$('.hider_top').removeClass 'hide_hider'
				if ($('#logowhite').data('animstatus') == 'playing')
					$('#logowhite').trigger 'pausehideLogo'
			
			if event.detail.code == 3 #-------------------------  BUFFER
				$('.hider_logo').removeClass 'hide_hider'
				$('.hider_top').removeClass 'hide_hider'
				if ($('#logowhite').data('animstatus') == 'playing')
					$('#logowhite').trigger 'pausehideLogo'
			return
			
		#------------------- FOCUS -------------------#
		$(window).on 'pageshow focus', ->
			console.log 'on focus : '+that.playerYT.paused
			if that.playerYT.paused
				that.playerYT.play()

		$(window).on 'pagehide blur', ->
			console.log 'on blur : '+that.playerYT.playing
			if that.playerYT.playing
				that.playerYT.pause()

		#------------------- STOP PLAYER WHEN CLOSE POPIN -------------------#
		
		$('#popin').on 'closePopin', ->
			console.log '------------ > closePopin stop player YOUTUBE'
			$('.video-container').addClass 'trans blankVideo'
			that.playerYT.source = {
				type: 'video',
				sources: [
					{
						src: that.blankVideo,
						type: 'video/mp4',
					},
				],
			};
			# that.playerYT.stop()

		#------------------- INTRO FINISHED -------------------#
		finished_popin_transition = ->
			console.log 'done'
			$('#popin').addClass('hide').trigger('endIntro').trigger('closePopin').trigger('classChange').attr('style','')
		vid_intro_finished = ->
			player_video = new module.player_video()
			console.log 'vid_intro_finished ----- trigger end Intro trigger close  Popin'
			# $('#popin').addClass('hide').trigger('endIntro').trigger('closePopin').trigger('classChange')
			$('#close').removeClass('hide')
			$('.video-container').removeClass 'with_btn_skip'
			$('#logowhite').trigger 'destroyLogo'
			$('.skip_intro').off().remove()
			$('.intro_page').remove()
			that.playerYT.pause()
			TweenMax.to('#popin', .8,{opacity:0,onComplete:finished_popin_transition})
			return

		$('.skip_intro').on 'click touchstart', ->
			vid_intro_finished()
			if(window.isMobile())
				$('#player')[0].play()
			return
			
		@playerYT.on 'ended', (event) ->
			if ($('.video-container').hasClass('blankVideo'))
				return
			vid_intro_finished()
			return

		# $('.video-container').on 'touchstart', ->
		# 	console.log 'touch video player '
		# 	if that.playerYT
		# 		if !that.playerYT.playing
		# 			that.playerYT.play()
				

		#------------------- CLICK LIST ARTIST -------------------#
		checkratio =(ratiovideo) ->
			console.log 'ratiovideo : '+ratiovideo
			if(ratiovideo==4)
				$('.video-container').addClass 'quatre_tier'
			else
				$('.video-container').removeClass 'quatre_tier'

		checkClassAndTrigger =()->
			$('#abouttxt, #credittxt, #artist_info, #shareinfo, #logowhite').addClass 'hide'
			$('.video-container').removeClass 'hide'
			$('.video-container').removeClass 'blankVideo'
			$('.video-container').removeClass 'trans'
			$('.lds-dual-ring').trigger 'showspiner'
			
		startPlyr =(idyoutube)->
			that.playerYT.source = {
				type: 'video',
				sources: [
					{
						src: idyoutube,
						provider: 'youtube',
					},
				],
			};
			that.playerYT.play()
			if(window.isMobile())
				$('.btn_video_ipad').removeClass('hide')
			
		$('.btn_video_ipad').on 'click touchstart', (event) ->
			that.playerYT.play()
			$('.btn_video_ipad').addClass('hide')	
			return false

		$('#startvideofrompopin').on 'click touchstart', (event) ->
			idyoutube = that.YouTubeGetID($(this).attr('href'))
			checkratio($(this).data('ratiovideo'))
			checkClassAndTrigger()
			startPlyr(idyoutube)
			return false

		$('#list_artists li a, #play-video-btn, #play-video-btn-mobile, a.watch').on 'click touchstart', (event) ->
			console.log 'click start video'
			idyoutube = that.YouTubeGetID($(this).attr('href'))
			checkratio($(this).data('ratiovideo'))
			checkClassAndTrigger()
			startPlyr(idyoutube)
			$('#popin').trigger 'classChange'
			$('#popin').trigger 'showVideo'
			return false
	
module.player_video_youtube = player_video_youtube
