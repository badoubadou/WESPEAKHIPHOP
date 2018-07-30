class player_video
	constructor: (@$container) ->
		# @bindEvents() # bind event is now after video is loaded
		@player = null
		@loadVideo()

	loadVideo: ->
		videoUrl = 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/5secondes.mp4'
		# if location.hostname == 'localhost' or location.hostname == '127.0.0.1' or location.hostname == ''
		# 	videoUrl = 'http://milkyweb.eu/video/5secondes.mp4'
		
		that = @
		req = new XMLHttpRequest
		req.open 'GET', videoUrl , true
		req.responseType = 'blob'
		req.onload = ->
			# Onload is triggered even on 404 so we need to check the status code
			if @status == 200
				videoBlob = @response
				vid = URL.createObjectURL(videoBlob)
				# Video is now downloaded and we can set it as source on the video element
				document.getElementById('player').src = vid
				$('#player source').attr('src',vid)
				$('#player').addClass('ready')
				$('.lds-dual-ring').addClass('done')
				that.bindEvents()
			return

		req.onerror = ->
			# Error
			return
		req.send()	

	changeCurrentTime: (@$deg, @$myplayer)->
		if(@$deg<0)
			@$deg = 360  + @$deg
		percentage = @$deg / 3.6
		player_new_CT = @$myplayer.duration() * (percentage/100)
		@$myplayer.currentTime(player_new_CT)

	skipTo: (@$player, @$id)->
		nbVideo =  28
		player = @$player
		PBR = 1
		percentageID = @$id / nbVideo 
		timeToStop = player.duration() * percentageID
		checkEndTime = ->
			if(player.currentTime() < (timeToStop) && (PBR < 16))
				PBR += 1
			else
				PBR = 1.0
				player.off 'timeupdate', checkEndTime
			player.playbackRate(PBR)
			console.log 'secondtimeupdate '+player.currentTime()+' < '+timeToStop
			
		@$player.on 'timeupdate', checkEndTime
		
	bindEvents: ->
		that = @
		#------------------- FOCUS ---------------------------#
		windowBlurred = ->
			console.log 'blur'
			if that.player
				that.player.pause()
			return

		windowFocused = ->
			console.log 'focus'
			if that.player
				that.player.play()
			return

		$(window).on 'pagehide blur', windowBlurred
		$(window).on 'pageshow focus', windowFocused

		#------------------- SOUND ---------------------------#
		$('#sound').on 'click', ->
			that.player.muted(!that.player.muted())
			$('#sound').toggleClass 'actif'

		#------------------- TWEEN ---------------------------#
		duration =  160.49
		@timelineKnob = new TimelineMax(paused: true)
		@timelineKnob.to(['#knob'], duration, {rotation:360})

		@timelineInfo = new TimelineMax(paused: true)
		# sequence = '+='+((duration / 28)-1)
		sequence = '+=4.5'
		console.log sequence
		@timelineInfo.fromTo('#artists_info li:eq(0)', 0.5, {alpha: 0},{alpha: 1})
			.to('#artists_info li:eq(0)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(1)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(1)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(2)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(2)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(3)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(3)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(4)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(4)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(5)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(5)', 0.5, { alpha: 0 }, sequence )
			.fromTo('#artists_info li:eq(6)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(6)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(7)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(7)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(8)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(8)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(9)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(9)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(10)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(10)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(11)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(11)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(12)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(12)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(13)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(13)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(14)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(14)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(15)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(15)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(16)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(16)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(17)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(17)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(18)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(18)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(19)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(19)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(20)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(20)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(21)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(21)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(22)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(22)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(23)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(23)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(24)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(24)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(25)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(25)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(26)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(26)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(27)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(27)', 0.5, { alpha: 0 }, sequence)
			.fromTo('#artists_info li:eq(28)', 0.5, { alpha: 0 },{alpha: 1})
			.to('#artists_info li:eq(28)', 0.5, { alpha: 0 }, sequence)

		#------------------- PLAYER JS ---------------------------#
		options = { autoplay: true, muted: true };
		@player = videojs('player', options, ->
			myPlayer = this
			
			myPlayer.on 'play', ->
				console.log 'play'
				that.timelineInfo.play()
				that.timelineKnob.play()
			
			myPlayer.on 'pause', ->
				console.log 'pause'
				that.timelineInfo.pause()
				that.timelineKnob.pause()

			myPlayer.on 'seeked', ->
				that.timelineInfo.time myPlayer.currentTime()
				that.timelineKnob.time myPlayer.currentTime()
			
			# myPlayer.on 'timeupdate', ->
			# 	that.timelineInfo.time myPlayer.currentTime()

			# 	if($('#knob').hasClass 'drag')
			# 		return
			# 	percentage = ( myPlayer.currentTime() / myPlayer.duration() ) * 100;
			# 	whereYouAt = myPlayer.currentTime()
			# 	deg = Math.round((360 * (percentage / 100)))
			# 	if deg
			# 		TweenMax.to(['#knob'], .5, {rotation:deg});
			# 	else
			# 		console.log 'yo'
			# 		TweenMax.to [ '#knob' ], 0, rotation: deg
			# 	return

			return
		)
		
		rotationSnap = 360 / 28
		Draggable.create '#knob',
			type: 'rotation'
			throwProps: true
			onDragStart: ->
				$('#knob').addClass 'drag'
				if(that.player.muted())
					that.player.muted(false)
					$('#sound').addClass 'actif'
			onDrag: ->
				that.changeCurrentTime(this.rotation % 360, that.player)
			onThrowUpdate: ->
				that.changeCurrentTime(this.rotation % 360, that.player)
			onThrowComplete: ->
				$('#knob').removeClass 'drag'
			onRelease: ->
				that.player.play()
			snap: (endValue) ->
				Math.round(endValue / rotationSnap) * rotationSnap

		return 

module.player_video = player_video
