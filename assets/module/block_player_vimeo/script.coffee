class player_video_vimeo
	'use strict'
	constructor: (@$container) ->
		@playerYT = null
		@drawLogo = null
		@intro_is_done = false
		@bindEvents()
		@needStartSite = true

	playYTisReady : ->
		console.log  '----------------------- playYTisReady -------------------------------------------'
		$('.lds-dual-ring').trigger 'hidespiner'
		
		if @needStartSite 
			@startSite()
			@needStartSite = false
		else
			@playerYT.play()
			# @playerYT.enableTextTrack('fr').then((track) ->
			# 	).catch (error) ->
			# 	console.log '###---------', error
			# 	return
			# @playerYT.getTextTracks().then((tracks) ->
			# 	console.log 'tracks  = '+tracks
			# 	).catch (error) ->
			# 	console.log '###---------', error
			# 	return
			
			if(window.isMobile())
				$('.btn_video_ipad').removeClass('hide')
	
			
	getIntroVimeo : ->
		that = @
		random = Math.floor(Math.random() * 4)
		randomid = $('#idIntroYoutube input:eq('+random+')').val()
		return randomid

	startSite: ()->
		btnIntroVisible = ->
			console.log 'finished show btn'
			player_video = new module.player_video()
		console.log 'startSite then loadMap'
		$('.lds-dual-ring').on 'loaderhidden', ->
			$('#logowhite').trigger 'showLogo'
		$('#logowhite').on 'finishedShowLogo', ->
			TweenMax.set(['.btn_intro a'],{autoAlpha:0,visibility:"hidden"});
			TweenMax.staggerFromTo('.btn_intro a',.8, {autoAlpha:0, visibility:"visible", y:-10},{autoAlpha:1, y:0, ease:Power1.easeOut}, 0.5, btnIntroVisible);
		@loadMap()

	YouTubeGetID: (url) ->
		r = /(videos|video|channels|\.com)\/([\d]+)/
		return url.match(r)[2]
	
	loadMap : ->
		console.log '---> load small map'
		that = @
		$.get 'https://d2ph0hjd2fuiu5.cloudfront.net/smallmap-'+$('#langage_short').val()+'.svg', (data) ->
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
			$('#logowhite').trigger 'hideLogo'
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

		# options = {id: 296883720, width: 640,loop: false, autoplay:true, email:false}
		options = {id: @getIntroVimeo(), width: 640,loop: false, autoplay:true, email:false}
		@playerYT = new (Vimeo.Player)('playerYT', options)
		@playerYT.enableTextTrack('fr').then((track) ->
		).catch (error) ->
			console.log '###', error
			return
		
		@playerYT.getTextTracks().then((tracks) ->
			tracksLength = tracks.length
			trackOptions = ''
			i = 0
			console.log 'getTextTracks : ' + tracksLength
			while i < tracksLength
				console.log tracks[i].language
				i++
			return
		).catch (error) ->

		#------------------- PLAYER YOUTUBE IS READY -------------------#
		@playerYT.ready().then ->
			console.log 'player ready'
			that.playYTisReady()
			return

		@playerYT.on 'play', (event) ->
			console.log $('#logowhite').data('animstatus')
			$('.video-container').removeClass 'trans'
			$('.video-container .myfullscreen').removeClass 'hide'
			$('.hider_logo').addClass 'hide_hider'
			$('.hider_top').addClass 'hide_hider'
			if(window.isMobile())
				$('.btn_video_ipad').addClass('hide')
						
			if (!$('#logowhite'))
				return
			if ($('#logowhite').data('animstatus') == 'done')
				return
			if ($('#logowhite').data('animstatus') == 'waiting-init')
				$('#logowhite').data('animstatus', 'waiting')
				return

			if ($('#logowhite').data('animstatus') == 'paused')
				$('#logowhite').trigger 'resumehideLogo'

		@playerYT.on 'pause', (event) ->
			if ($('#logowhite').data('animstatus') == 'playing')
				$('#logowhite').trigger 'pausehideLogo'
			
			
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
			$('.hider_logo').removeClass 'hide_hider'
			$('.hider_top').removeClass 'hide_hider'
			$('.video-container').addClass 'trans'
			that.playerYT.pause().then(->
				# The video is paused
				return
			)
		#------------------- INTRO FINISHED -------------------#
		finished_popin_transition = ->
			console.log 'done'
			$('#popin').addClass('hide').trigger('endIntro').trigger('closePopin').trigger('classChange').attr('style','')
		
		vid_intro_finished = ->
			console.log 'vid_intro_finished ----- trigger end Intro trigger close  Popin serieux ie ? '
			$('#close').removeClass('hide')
			$('.video-container').removeClass 'with_btn_skip'
			$('#logowhite').trigger 'destroyLogo'
			$('.intro_page').remove()
			that.playerYT.pause()
			$('.skip_intro').off()
			$('.skip_intro').remove()
			if(window.isMobile())
				$('#player')[0].play()
				finished_popin_transition()
			else
				TweenMax.to('#popin', .8,{opacity:0,onComplete:finished_popin_transition})
			return

		$('.skip_intro').on 'click touchstart', ->
			vid_intro_finished()
			return
			
		@playerYT.on 'ended', (event) ->
			vid_intro_finished()
			return

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
			$('.video-container').removeClass 'trans'
			# $('.lds-dual-ring').trigger 'showspiner'
			
		startVimeo =(idVimeo)->
			that.playerYT.getVideoId().then (id) ->
				console.log 'current id -------------'+id
				if(id != idVimeo)
					$('.video-container').addClass 'trans'
					# options = {id: idVimeo, width: 640,loop: false, autoplay:true, email:false}
					# that.playerYT = new (Vimeo.Player)('playerYT', options)
		
					that.playerYT.loadVideo(idVimeo).then (id) ->
						console.log 'loaded '
						that.playYTisReady()
						return
					that.playerYT.enableTextTrack('fr').then((track) ->
						).catch (error) ->
						console.log '###', error
						return
					that.playerYT.getTextTracks().then((tracks) ->
						tracksLength = tracks.length
						trackOptions = ''
						i = 0
						console.log 'getTextTracks : ' + tracksLength
						while i < tracksLength
							console.log tracks[i].language
							i++
						return
					).catch (error) ->

				return
			
		$('.btn_video_ipad').on 'click touchstart', (event) ->
			that.playerYT.play()
			$('.btn_video_ipad').addClass('hide')	
			return false

		$('#startvideofrompopin').on 'click touchstart', (event) ->
			idVimeo = that.YouTubeGetID($(this).attr('href'))
			checkratio($(this).data('ratiovideo'))
			checkClassAndTrigger()
			startVimeo(idVimeo)
			return false

		$('#list_artists li a, #play-video-btn, #play-video-btn-mobile, a.watch').on 'click touchstart', (event) ->
			idVimeo = that.YouTubeGetID($(this).attr('href'))
			console.log 'id vimeo : '+idVimeo
			checkratio($(this).data('ratiovideo'))
			checkClassAndTrigger()
			startVimeo(idVimeo)
			# $('#popin').trigger 'classChange'
			$('#popin').trigger 'showVideo'
			return false
	
module.player_video_vimeo = player_video_vimeo