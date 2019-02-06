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
		@playerIntro = null
		@drawLogo = null
		@bindEvents()
		@needStartSite = true

		tag.src = 'https://www.youtube.com/iframe_api'
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore tag, firstScriptTag

	playYTisReady : ->
		console.log  '----------------------- playYTisReady -------------------------------------------'
		@el_spiner.trigger 'hidespiner'
	
	getIntroId : ->
		random = Math.floor(Math.random() * 4)
		randomid = $('#idIntroYoutube input:eq('+random+')').val()
		return randomid

	startSite: ()->
		console.log 'startSite'
		that = @
		that.el_spiner.trigger 'hidespiner'
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
		ID = ''
		url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
		if url[2] != undefined
			ID = url[2].split(/[^0-9a-z_\-]/i)
			ID = ID[0]
		else
			ID = url
			ID
	
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

	hideLogo: ->
		console.log 'hideLogo'
		@el_logowhite.trigger 'hideLogo'

	playerReady: ->
		console.log 'playerReady'
		$('body').trigger 'playerReady'

	startIntroVideo: ->
		console.log 'startIntroVideo' 
		@hideLogo()

	playerIntroReady: ->
		console.log 'playerIntroReady'
		$('body').trigger 'playerIntroReady'

		
	onPlayerIntroStateChange: (event)->
		if event.data == YT.PlayerState.PLAYING and !$('body').hasClass 'startedIntroVideo' # --------- video start playing		
			$('body').addClass 'startedIntroVideo'
			$('body').trigger 'startIntroVideo'
			console.log 'startIntroVideo'

		if event.data == YT.PlayerState.PLAYING and $('body').hasClass 'startedIntroVideo' # --------- video resume	
			$('#logowhite').trigger 'resumehideLogo'

		if event.data ==  2 and $('body').hasClass 'startedIntroVideo'# --------- video pause	
			console.log 'pause'
			$('#logowhite').trigger 'pausehideLogo'

		if event.data ==  3 and $('body').hasClass 'startedIntroVideo'# --------- video pause	
			console.log 'pause'
			$('#logowhite').trigger 'pausehideLogo'
		
		else if event.data == YT.PlayerState.ENDED # --------- video END
			$('body').trigger 'endIntroVideo'
			console.log 'endvideo'
		
	bildPlayerIntro: ->
		that = @
		console.log 'bildPlayerIntro'
		that.playerIntro = new (YT.Player)('playerYTintro',
			height: '390'
			width: '640'
			videoId: that.getIntroId()
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
				'onReady': that.playerIntroReady
				'onStateChange': that.onPlayerIntroStateChange
				)

	bindEvents: ->
		that = @
		$('body').on 'YTAPIReady', ->
			console.log 'YTAPIReady'
			that.bildPlayerIntro()
			return

		$('body').on 'playerIntroReady', ->
			that.startSite()
			return

		$('body').on 'playerReady', ->
			that.el_spiner.trigger 'hidespiner'
			return

		$('body').on 'startVideo', ->
			that.el_spiner.trigger 'hidespiner'
			return
		
		$('body').on 'startIntroVideo', ->
			that.startIntroVideo()
			return

		$('body').on 'endIntroVideo', ->
			vid_intro_finished()
			return

		#------------------- ENTER SITE -------------------#
		that.el_enter_site.on 'click touchstart', (event)->
			console.log 'enter site -------------------------------- '
			btnIntroInVisible = ->
				that.el_video_container.removeClass 'hidden hide'
				
				$('.btn_intro a').on 'click', (event)->
					event.stopPropagation()
					event.preventDefault()
					return false

				# if(!that.isMobile)
				# 	that.playerIntro.play()
			
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
				that.playerIntro.playVideo()

			setTimeout (->
				TweenMax.fromTo('.skip_intro', .6, {autoAlpha:0, visibility:'visible'}, {autoAlpha:1 })
				return
			), 4500
			
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
			if !IsFullScreenCurrently()
				GoInFullscreen($('body').get(0), $(this))
			else
				GoOutFullscreen()
			event.stopPropagation()
			event.preventDefault()
			return false

		window.onYouTubeIframeAPIReady = ->
			console.log 'onYouTubeIframeAPIReady'
			$('body').trigger 'YTAPIReady'

		
		
		#------------------- STOP PLAYER WHEN CLOSE POPIN -------------------#
		@el_popin.on 'closePopin', ->
			that.el_video_container.addClass 'trans'
			if(that.playerYT)
				that.playerYT.pauseVideo()
				
		#------------------- INTRO FINISHED -------------------#
		finished_popin_transition = ->
			if(!that.isMobile)
				$('#player')[0].play()
				console.log 'play disk'
			that.el_popin.addClass('hide').trigger('endIntro').trigger('closePopin').attr('style','')
		
		vid_intro_finished = ->
			if(that.el_body.hasClass('vid_intro_finished'))
				return
			that.playerIntro.pauseVideo()
			$('#close').removeClass('hide')
			
			that.el_video_container.removeClass 'with_btn_skip'
			that.el_logowhite.trigger 'destroyLogo'
			
			that.el_skip_intro.off()
			that.el_skip_intro.remove()
			that.el_skip_intro = null
			that.playerIntro = null
			$('.intro_page').hide()

			if(that.isMobile)
				$('#player')[0].play()
				finished_popin_transition()
			else
				TweenMax.to('#popin', .8,{opacity:0,onComplete:finished_popin_transition})


			$('#playerYTintro').remove()
			that.el_body.addClass 'vid_intro_finished'
			return

		@el_skip_intro.on 'click touchstart',(event) ->
			vid_intro_finished()
			event.stopPropagation()
			event.preventDefault()
			return false

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
			
		startYoutube =(idYoutube)->
			that.el_spiner.trigger 'showspiner'
			that.el_popin.trigger 'showVideo'
			
			if (!that.playerYT)
				that.playerYT = new (YT.Player)('playerYT',
					height: '390'
					width: '640'
					videoId: idYoutube
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
						'onReady': that.playerReady
						)
			else
				that.el_spiner.trigger 'hidespiner'
				that.playerYT.loadVideoById(idYoutube)


		$('.startvideofrompopin, #list_artists li a, #play-video-btn, a.watch').on 'click touchstart', (event) ->
			idYoutube = that.YouTubeGetID($(this).attr('href'))
			checkratio($(this).data('ratiovideo'))
			checkClassAndTrigger()
			startYoutube(idYoutube)
			event.stopPropagation()
			event.preventDefault()
			return false

module.player_video_youtube = player_video_youtube


tag = document.createElement('script')
