class player_video_youtube
	'use strict'
	constructor: (@isMobile) ->
		@Lang = $('#langage_short').val()
		@el_spiner = $('.lds-dual-ring')
		@el_logowhite = $('#logowhite')
		@smallmapContry = '.smallmap-'+@Lang+'-st1'
		@el_enter_site = $('#enter_site')
		@el_video_container = $('.video-container')
		@el_body = $('body')
		@el_other_lang = $('#other_lang')
		@el_sound = $('#sound')
		@el_myfullscreen = $('.myfullscreen')
		@el_popin = $('#popin')
		@el_skip_intro = $('.skip_intro')
		@el_to_hide_when_video = $('#abouttxt, #credittxt, #artist_info, #shareinfo, #logowhite')

		@playerYT = null
		@playerIntroVimeo = null
		@drawLogo = null
		@bindEvents()
		@needStartSite = true

		tag.src = 'https://www.youtube.com/iframe_api'
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore tag, firstScriptTag


	playYTisReady : ->
		console.log  '----------------------- playYTisReady -------------------------------------------'
		@el_spiner.trigger 'hidespiner'
	
	playIntroisReady : ->
		console.log  '----------------------- playIntroisReady -------------------------------------------'
		@el_spiner.trigger 'hidespiner'
		@startSite()
			
	getIntroVimeo : ->
		random = Math.floor(Math.random() * 4)
		randomid = $('#idIntroYoutube input:eq('+random+')').val()
		return randomid

	startSite: ()->
		btnIntroVisible = ->
			isMobile = typeof window.orientation != 'undefined' or navigator.userAgent.indexOf('IEMobile') != -1
			console.log 'finished show btn = '+isMobile
			player_video = new module.player_video(isMobile)

		el_logowhite = @el_logowhite
		loadSpriteDisk = @loadSpriteDisk
		isMobile = @isMobile
		@el_spiner.on 'loaderhidden', ->
			el_logowhite.trigger 'showLogo'
		@el_logowhite.on 'finishedShowLogo', ->
			console.log 'finishedShowLogo'
			loadSpriteDisk()
			TweenMax.set('.btn_intro a',{autoAlpha:0,visibility:"visible"});
			TweenMax.staggerFromTo('.btn_intro a',.8, {autoAlpha:0, y:-10},{autoAlpha:1, y:0, ease:Power1.easeOut}, 0.5, btnIntroVisible);
		@loadMap()

	YouTubeGetID: (url) ->
		r = /(videos|video|channels|\.com)\/([\d]+)/
		return url.match(r)[2]
	
	loadMap : ->
		that = @
		$.get 'https://d2p8kxfsucab5j.cloudfront.net/smallmap-'+that.Lang+'.svg', (data) ->
			console.log '---> small map loaded'
			div = document.createElement('div')
			div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement)
			$( "#smallmap" ).append( div.innerHTML )
			TweenLite.set(that.smallmapContry, {alpha:0});
			TweenMax.to(that.smallmapContry, 0.5, {scale: 3, transformOrigin:'50% 50%', repeat:-1, yoyo:true})
			return

	loadSpriteDisk : ->
		console.log 'loadSpriteDisk'
		$.get 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/sprite_disk.svg', (data) ->
			div = document.createElement('div')
			div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement)
			$( "#sprite_svg_disk" ).append( div.innerHTML )
			return

	bindEvents: ->
		that = @
		#------------------- ENTER SITE -------------------#
		that.el_enter_site.on 'click touchstart', (event)->
			console.log 'enter site -------------------------------- '
			btnIntroInVisible = ->
				that.el_video_container.removeClass 'hidden hide'
				
				$('.btn_intro a').on 'click', (event)->
					event.stopPropagation()
					event.preventDefault()
					return false

				if(!that.isMobile)
					that.playerIntroVimeo.play()
			
			that.el_enter_site.off()
			that.el_enter_site = null
			that.el_other_lang.off()
			that.el_other_lang = null

			delaytween = 0
		
			if(!that.el_body.hasClass 'device-ios')
				delaytween = 0.8
			
			console.log 'delaytween = '+delaytween
			TweenMax.staggerTo('.btn_intro a',.3, {opacity:0, y:-10, delay:delaytween, ease:Power1.easeOut}, 0.2, btnIntroInVisible);
			
			if(that.isMobile)
				that.playerIntroVimeo.play()

			setTimeout (->
				TweenMax.fromTo('.skip_intro', .6, {autoAlpha:0, visibility:'visible'}, {autoAlpha:1 })
				return
			), 3000
			
			event.stopPropagation()
			event.preventDefault()
			return false

		that.el_other_lang.on 'click touchstart', (event)->
			window.location.href = $(this).attr('href')
			event.stopPropagation()
			event.preventDefault()
			return false
						
		#------------------- SOUND ---------------------------#
		that.el_sound.on 'click touchstart', (event)->
			console.log 'click sound'
			event_name = 'sound_on'
			if (that.el_sound.hasClass('actif'))
				event_name = 'sound_off'
			$(this).trigger event_name
			console.log event_name
			that.el_sound.toggleClass 'actif'
			event.stopPropagation()
			event.preventDefault()
			return false			

		#------------------- FULL SCREEN ---------------------------#				
		GoInFullscreen = (el_body, btn) ->
			btn.addClass 'actiffullscreen'
			if el_body.requestFullscreen
				el_body.requestFullscreen()
			else if el_body.mozRequestFullScreen
				el_body.mozRequestFullScreen()
			else if el_body.webkitRequestFullscreen
				el_body.webkitRequestFullscreen()
			else if el_body.msRequestFullscreen
				el_body.msRequestFullscreen()

			if IsFullScreenCurrently()
				btn.addClass 'actiffullscreen'
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

		that.el_myfullscreen.on 'click', (event) ->
			console.log 'click '
			if !IsFullScreenCurrently()
				GoInFullscreen($('body').get(0), $(this))
			else
				GoOutFullscreen()
			event.stopPropagation()
			event.preventDefault()
			return false

		# options = {id: @getIntroVimeo(), width: 640,loop: false, autoplay:false, email:false}
		# @playerIntroVimeo = new (Vimeo.Player)('playerIntroVimeo', options)
		window.onYouTubeIframeAPIReady = ->
			@playerIntroVimeo = new (YT.Player)('playerYT',
					height: '390'
					width: '640'
					videoId: 'CPfrRJf46sQ'
					fs: 0
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
						cc_load_policy: 1, 
					}
					events:
						'onReady': onPlayerReady
						'onStateChange': onPlayerStateChange)

		window.onPlayerReady = (event) ->
			console.log 'onPlayerReady'
			event.target.playVideo()
			return

		window.onPlayerStateChange = (event) ->
			if event.data == YT.PlayerState.PLAYING and !done # --------- video start playing
				$('#zone_youtube').addClass 'play'
				$('#popin').removeClass('hide').trigger 'classChange'
				$('.lds-dual-ring').addClass 'done'
				$('#popin .video-container').removeClass 'hide'

				if window.pauseSound
					window.pauseSound()

				if window.isMobile()
					window.updateTxtInfoMobile($('#artist_info info:not(.hide)').index())
			
			else if event.data == YT.PlayerState.ENDED # --------- video start playing
				window.closePopin()
				console.log 'youtube is done'

			return
		
		#------------------- PLAYER YOUTUBE IS READY -------------------#
		# @playerIntroVimeo.ready().then ->
		# 	console.log 'player ready'
		# 	that.playIntroisReady()
		# 	return

		# @playerIntroVimeo.on 'play', (event) ->
		# 	that.el_video_container.removeClass 'trans'
		# 	if (that.el_logowhite.data('animstatus')=='paused')
		# 		that.el_logowhite.trigger 'resumehideLogo'
		# 	else
		# 		that.el_logowhite.trigger 'hideLogo'
			
		
			
		# @playerIntroVimeo.on 'pause', (event) ->
		# 	if (that.el_logowhite.data('animstatus') == 'playing')
		# 		that.el_logowhite.trigger 'pausehideLogo'
			

		#------------------- STOP PLAYER WHEN CLOSE POPIN -------------------#
		@el_popin.on 'closePopin', ->
			that.el_video_container.addClass 'trans'
			if(that.playerYT)
				that.playerYT.pause().then(->
					# The video is paused
					return
				)
				that.playerYT.destroy().then(->
					# The video is paused
					that.playerYT = null
					return
				)
		#------------------- INTRO FINISHED -------------------#
		finished_popin_transition = ->
			if(!that.isMobile)
				$('#player')[0].play()
				console.log 'play disk'
			that.el_popin.addClass('hide').trigger('endIntro').trigger('closePopin').attr('style','')
		
		vid_intro_finished = ->
			if(that.el_body.hasClass('vid_intro_finished'))
				return
			that.playerIntroVimeo.pause()
			$('#close').removeClass('hide')
			
			that.el_video_container.removeClass 'with_btn_skip'
			that.el_logowhite.trigger 'destroyLogo'
			
			that.el_skip_intro.off()
			that.el_skip_intro.remove()
			that.el_skip_intro = null
			that.playerIntroVimeo.off('ended')
			that.playerIntroVimeo = null
			$('.intro_page').hide()

			if(that.isMobile)
				$('#player')[0].play()
				finished_popin_transition()
			else
				TweenMax.to('#popin', .8,{opacity:0,onComplete:finished_popin_transition})

			that.el_body.addClass 'vid_intro_finished'
			return

		@el_skip_intro.on 'click touchstart',(event) ->
			vid_intro_finished()
			event.stopPropagation()
			event.preventDefault()
			return false
			
		# @playerIntroVimeo.on 'ended', (event) ->
		# 	vid_intro_finished()
		# 	return

		#------------------- CLICK LIST ARTIST -------------------#
		checkratio =(ratiovideo) ->
			console.log 'ratiovideo : '+ratiovideo
			if(ratiovideo==4)
				that.el_video_container.addClass 'quatre_tier'
			else
				that.el_video_container.removeClass 'quatre_tier'

		checkClassAndTrigger =()->
			that.el_to_hide_when_video.addClass 'hide'
			that.el_video_container.removeClass 'hide'
			that.el_video_container.removeClass 'trans'
			# $('.lds-dual-ring').trigger 'showspiner'
			
		startVimeo =(idVimeo)->
			that.el_spiner.trigger 'showspiner'
			that.el_popin.trigger 'showVideo'
			
			if (!that.playerYT)
				options = {id: idVimeo, width: 640,loop: false, autoplay:true, email:false}
				that.playerYT = new (Vimeo.Player)('playerYT', options)
				that.playerYT.enableTextTrack(that.Lang).then((track) ->
						).catch (error) ->
						console.log '###', error
						return

				that.playerYT.ready().then ->
					console.log 'player ready'
					that.playYTisReady()
					return


		$('.startvideofrompopin, #list_artists li a, #play-video-btn, a.watch').on 'click touchstart', (event) ->
			idVimeo = that.YouTubeGetID($(this).attr('href'))
			checkratio($(this).data('ratiovideo'))
			checkClassAndTrigger()
			startVimeo(idVimeo)
			event.stopPropagation()
			event.preventDefault()
			return false

		
	
module.player_video_youtube = player_video_youtube


tag = document.createElement('script')
