class player_video_youtube
	constructor: (@$container) ->
		@playerYT = null
		@drawLogo = null
		@intro_is_done = false
		@bildIntroYoutube()
		@bindEvents()

	playYTisReady : ->
		# $('.lds-dual-ring').addClass 'done'
		$('.lds-dual-ring').trigger 'hidespiner'
		console.log 'trigger hide player YT ready '
		$('.intro_page .hidden').removeClass 'hidden'
		@playerYT.play()

	bildIntroYoutube : ->
		that = @
		random = Math.floor(Math.random() * 4)
		randomid = $('#idIntroYoutube input:eq('+random+')').val()
		$('#playerYT').attr('data-plyr-embed-id',randomid)

	logoWhite : ->
		that = @
		TweenLite.set 'svg', visibility: 'visible'
		MorphSVGPlugin.convertToPath 'line'
		that.drawLogo = new TimelineMax({delay:1});
		that.drawLogo.from("#logowhite #mask1_2_", 1, {drawSVG:0, ease:Power1.easeInOut} )
			.from("#logowhite #mask2", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.1 )
			.from("#logowhite #mask3", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.2 )
			.from("#logowhite #mask4", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.3 )
			.from("#logowhite #mask5", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.4 )
			.from("#logowhite #mask6", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.5 )
			.from("#logowhite #mask7", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.6 )
			.from("#logowhite #mask8", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.7 )
			.from("#logowhite #mask9", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.8 )
			.from("#logowhite #mask10", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.9 )
			.from("#logowhite #mask11", 1.3, {drawSVG:0, ease:Power1.easeInOut},1 )
			.from("#logowhite #mask12", 1.3, {drawSVG:0, ease:Power1.easeInOut},1.1 )
			.from("#logowhite #mask13", 1.3, {drawSVG:0, ease:Power1.easeInOut},1.2 )

	startSite: (that)->
		console.log 'startSite'
		that.logoWhite()

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
			TweenMax.delayedCall 4, ->
				that.drawLogo.reverse()
				return
			that.playerYT.play()
			return
		
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
		    <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
		        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
		        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
		        <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
		        <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
		    </button>
		</div>'

		@playerYT = new Plyr('#playerYT', { controls })
		console.log 'yo : ------'+@playerYT
		
		#------------------- PLAYER YOUTUBE IS READY -------------------#
		@playerYT.on 'ready', (event) ->
			console.log 'playYTisReady'
			that.playYTisReady()
			return

		@playerYT.on 'play', (event) ->
			console.log '######################    play YOUTUBE @intro_is_done = '+that.intro_is_done
			if that.intro_is_done
				$('.video-container').removeClass 'hidden hide'
			return

		@playerYT.on 'pause', (event) ->
			console.log 'pause YOUTUBE'
			that.drawLogo.pause()
			return
			

		#------------------- STOP PLAYER WHEN CLOSE POPIN -------------------#
		$('#popin').on 'closePopin', ->
			console.log '------------ > closePopin'
			that.playerYT.stop()

		#------------------- INTRO FINISHED -------------------#

		vid_intro_finished = ->
			console.log 'vid_intro_finished ----- trigger end Intro trigger close  Popin'
			$('#popin').addClass('hide').trigger('endIntro').trigger('closePopin')
			$('.lds-dual-ring').removeClass('not_center')
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
