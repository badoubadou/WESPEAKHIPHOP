class player_video_youtube

	constructor: (@$container) ->
		@playerYT = null
		@drawLogo = null
		@bildIntroYoutube()
		@bindEvents()

	playYTisReady : ->
		$('.lds-dual-ring').addClass 'done'
		$('.intro_page .hidden').removeClass 'hidden'

	bildIntroYoutube : ->
		that = @
		random = Math.floor(Math.random() * 4)
		randomid = $('#idIntroYoutube input:eq('+random+')').val()
		$('#playerYT').attr('data-plyr-embed-id',randomid)

	logoWhite : ->
		that = @
		TweenLite.set 'svg', visibility: 'visible'
		MorphSVGPlugin.convertToPath 'line'
		that.drawLogo = new TimelineMax({});
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
		$('#enter_site').on 'click', ->
			$('.intro_page').addClass 'hidden'
			$('.video-container').removeClass 'hidden'
			that.playerYT.play()
			that.drawLogo.reverse()
			return
		
		#------------------- PLAYER YOUTUBE -------------------#
		@playerYT = new Plyr('#playerYT')
		console.log 'yo : ------'+@playerYT
		@playerYT.on 'ready', (event) ->
			console.log 'playYTisReady'
			that.playYTisReady()
			# $(this).addClass 'plyr--init-hide-controls'
			return

		#------------------- INTRO FINISHED -------------------#
		$('.skip_intro').on 'click', ->
			$('#popin').addClass('hide').trigger 'endIntro'
			
		@playerYT.on 'ended', (event) ->
			$('#popin').addClass('hide').trigger 'endIntro'
			console.log 'ended'
			return
	
module.player_video_youtube = player_video_youtube
