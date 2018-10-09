class player_video_youtube
	constructor: (@$container) ->
		@playerYT = null
		@drawLogo = null
		@intro_is_done = false
		@bildIntroYoutube()
		@bindEvents()

	playYTisReady : ->
		$('.lds-dual-ring').trigger 'hidespiner'
		console.log 'trigger hide player YT ready '
		TweenMax.set(['.txt_intro', '.btn_intro'],{autoAlpha:0,display:"none"});
		TweenMax.staggerFromTo(['.txt_intro', '.btn_intro'],.8, {autoAlpha:0, display:"block", y:-10},{autoAlpha:1, y:0, ease:Power1.easeOut}, 0.5);

		@playerYT.play()

	bildIntroYoutube : ->
		that = @
		random = Math.floor(Math.random() * 4)
		randomid = $('#idIntroYoutube input:eq('+random+')').val()
		$('#playerYT').attr('data-plyr-embed-id',randomid)

	startSite: (that)->
		console.log 'startSite'
		$('#logowhite').trigger 'showLogo'

	YouTubeGetID: (url) ->
		ID = ''
		url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
		if url[2] != undefined
			ID = url[2].split(/[^0-9a-z_\-]/i)
			ID = ID[0]
		else
			ID = url
			ID

	bindEvents: ->
		that = @
		#------------------- DOC READY ------------------------#
		if !$('body').hasClass 'doc-ready'
			$('body').on 'doc-ready', ->
				console.log 'doc-ready'
				that.startSite(that)
		else
			console.log 'doc already ready'
			that.startSite(that)

		#------------------- ENTER SITE -------------------#
		$('#enter_site').on 'click', (e)->
			e.preventDefault()
			that.intro_is_done = true
			console.log 'enter site --------------------------------'
			$('.intro_page').addClass 'hidden'
			$('.video-container').removeClass 'hidden hide'
			# GoInFullscreen($('body').get(0))
			that.playerYT.play()
			return
		#------------------- SOUND ---------------------------#
		$('#sound').on 'click', ->
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

		$('.myfullscreen').on 'click': ->
			console.log 'click '
			if !IsFullScreenCurrently()
				GoInFullscreen($('body').get(0))
			else
				GoOutFullscreen()

		#------------------- PLAYER YOUTUBE -------------------#
		controls = '<div class="plyr__controls">
		    <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
		        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
		        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
		        <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
		        <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
		    </button>
		    <div class="plyr__progress">
		        <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
		        <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
		        <span role="tooltip" class="plyr__tooltip">00:00</span>
		    </div>
		</div>'

		@playerYT = new Plyr('#playerYT', { controls })
		
		#------------------- PLAYER YOUTUBE IS READY -------------------#
		@playerYT.on 'ready', (event) ->
			console.log 'playYTisReady'
			that.playYTisReady()
			# $('.video-container').addClass 'hidden hide'
			return

		@playerYT.on 'statechange', (event) ->
			console.log 'on statechange YOUTUBE  event code : '+event.detail.code
			if event.detail.code == 1 #-------------------------  PLAY 
				$('.video-container').removeClass 'trans'
				$('.video-container .myfullscreen').removeClass 'hide'
				$('.hider_logo').addClass 'hide_hider'
				if ($('#logowhite').data('animstatus') == 'done')
					return
				
				if ($('#logowhite').data('animstatus') == 'waiting')
					console.log 'trigger hide'
					$('#logowhite').trigger 'hideLogo'
				
				if ($('#logowhite').data('animstatus') == 'paused')
					$('#logowhite').trigger 'resumehideLogo'
			
			if event.detail.code == 2 #-------------------------  PAUSE
				$('.hider_logo').removeClass 'hide_hider'
				if ($('#logowhite').data('animstatus') == 'playing')
					$('#logowhite').trigger 'pausehideLogo'
			
			if event.detail.code == 3 #-------------------------  BUFFER
				$('.hider_logo').removeClass 'hide_hider'
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
			$('.video-container').addClass 'trans'
			that.playerYT.stop()

		#------------------- INTRO FINISHED -------------------#
		vid_intro_finished = ->
			console.log 'vid_intro_finished ----- trigger end Intro trigger close  Popin'
			$('#popin').addClass('hide').trigger('endIntro').trigger('closePopin').trigger('classChange')
			$('.skip_intro').remove()
			$('#close').removeClass('hide')
			$('.video-container').removeClass 'with_btn_skip'
			$('#logowhite').trigger 'destroyLogo'
			return

		$('.skip_intro').on 'click', ->
			vid_intro_finished()
			return
			
		@playerYT.on 'ended', (event) ->
			vid_intro_finished()
			return

		#------------------- CLICK LIST ARTIST -------------------#
		$('#list_artists li a, #play-video-btn, #play-video-btn-mobile, #startvideo, a.watch').on 'click', (event) ->
			event.preventDefault()
			idyoutube = that.YouTubeGetID($(this).attr('href'))
			if !$('#artist_info').hasClass 'hide'
				$('#artist_info').addClass 'hide'
			# $('.lds-dual-ring').removeClass 'done'
			console.log 'trigger show on click'
			$('.lds-dual-ring').trigger 'showspiner'
			console.log 'trigger show'
			window.currentArtist = $('#artist_info .info:not(.hide)').index()
			that.playerYT.source = {
				type: 'video',
				sources: [
					{
						src: idyoutube,
						provider: 'youtube',
					},
				],
			};
			$('#popin').removeClass('hide').trigger 'classChange'
			return
	
module.player_video_youtube = player_video_youtube
