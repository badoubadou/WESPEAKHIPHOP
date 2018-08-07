class player_video
	constructor: (@$container) ->
		# @bindEvents() # bind event is now after video is loaded
		@duration = 0
		@timelineKnob = new TimelineMax(paused: true)
		@timelineInfo = new TimelineMax(paused: true)
		@timelinePlatine = new TimelineMax(paused: true)

		@timelineDisk = new TimelineMax(paused: true)		
		@timelineDisk.from('#disk_hole',.6,{scale: 0, ease:Power3.easeOut})
			.from('#mask_video',3,{scale: 0, ease:Power3.easeOut}, 0 )
			.staggerFromTo('#disk_lign svg path', 1, {drawSVG:"60% 60%"}, {drawSVG:"100%"}, -0.1, .5)
			.from('#bg_disk',2,{opacity:0, scale: 0, ease:Power1.easeOut}, 1 )
			.from('#platine',1,{opacity:0}, 1)
			.staggerFrom('#list_artists li',.3,{opacity:0}, 0.05, 1.5)
			.from('#main_footer',.3,{y:40}, 2 )
			.from('#smallmap',.3,{opacity:0}, 2 )

		
		@player = null
		@loadVideo()

	loadVideo: ->
		console.log 'loadVideo'
		videoUrl = 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/5secondes.mp4'
		# videoUrl = 'http://videotest:8888/5secondes.mp4'
		that = @
		req = new XMLHttpRequest
		req.open 'GET', videoUrl , true
		req.responseType = 'blob'
		req.onload = ->
			console.log 'onload video disk'
			# Onload is triggered even on 404 so we need to check the status code
			if @status == 200
				videoBlob = @response
				vid = URL.createObjectURL(videoBlob)
				# Video is now downloaded and we can set it as source on the video element
				document.getElementById('player').src = vid
				$('#player source').attr('src',vid)
				$('#player').addClass('ready')
				that.timelineDisk.play()
				that.bindEvents()
			return

		req.onerror = ->
			console.log 'error video'
			# Error
			return
		req.send()	

	changeCurrentTime: (@$deg, @$myplayer)->
		if(@$deg<0)
			@$deg = 360  + @$deg
		percentage = @$deg / 3.6
		player_new_CT = @$myplayer.duration * (percentage/100)
		@$myplayer.currentTime = player_new_CT

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
	
	#------------------- TWEEN ---------------------------#
	createTween: () ->

		updateInfo= (id)->
			$('#play-video-btn, #startvideo').attr('href', $('#list_artists li:eq('+id+') a').attr('href'))
			$('#list_artists li a.selected').removeClass('selected')
			$('#list_artists li:eq('+id+') a').addClass('selected')
			$('#artist_info .info').addClass('hide')
			$('#artist_info .info:eq('+id+')').removeClass('hide')
			svgcontry = '#'+$('#artists_info li:eq('+id+') .contry').data 'contrynicename'
			TweenMax.to(['#smallmap svg .smallmap-fr-st2', '#smallmap svg .smallmap-en-st2'], 0.5, {alpha: 0})
			TweenMax.to(svgcontry, 0.5, {alpha: 1}, '+=.5')

		duration_sequence = @duration / 28 
		sequence = '+='+(duration_sequence - 1)
		console.log @duration+' '+sequence
		@timelineKnob =  TweenMax.to('#knob', @duration, {ease:Linear.easeNone, rotation: 360, repeat:-1 })
		@timelinePlatine =  TweenMax.to('#platine', @duration, {ease:Linear.easeNone, rotation: 360*100, repeat:-1 })

		@timelineInfo
			.add(-> updateInfo(0); )
			.fromTo('#artists_info li:eq(0)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(0)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(1); )
			.fromTo('#artists_info li:eq(1)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(1)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(2); )
			.fromTo('#artists_info li:eq(2)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(2)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(3); )
			.fromTo('#artists_info li:eq(3)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(3)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(4); )
			.fromTo('#artists_info li:eq(4)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(4)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(5); )
			.fromTo('#artists_info li:eq(5)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(5)', 0.5, { alpha: 0 }, sequence )
			.add(-> updateInfo(6); )
			.fromTo('#artists_info li:eq(6)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(6)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(7); )
			.fromTo('#artists_info li:eq(7)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(7)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(8); )
			.fromTo('#artists_info li:eq(8)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(8)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(9); )
			.fromTo('#artists_info li:eq(9)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(9)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(10); )
			.fromTo('#artists_info li:eq(10)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(10)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(11); )
			.fromTo('#artists_info li:eq(11)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(11)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(12); )
			.fromTo('#artists_info li:eq(12)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(12)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(13); )
			.fromTo('#artists_info li:eq(13)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(13)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(14); )
			.fromTo('#artists_info li:eq(14)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(14)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(15); )
			.fromTo('#artists_info li:eq(15)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(15)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(16); )
			.fromTo('#artists_info li:eq(16)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(16)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(17); )
			.fromTo('#artists_info li:eq(17)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(17)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(18); )
			.fromTo('#artists_info li:eq(18)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(18)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(19); )
			.fromTo('#artists_info li:eq(19)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(19)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(20); )
			.fromTo('#artists_info li:eq(20)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(20)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(21); )
			.fromTo('#artists_info li:eq(21)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(21)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(22); )
			.fromTo('#artists_info li:eq(22)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(22)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(23); )
			.fromTo('#artists_info li:eq(23)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(23)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(24); )
			.fromTo('#artists_info li:eq(24)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(24)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(25); )
			.fromTo('#artists_info li:eq(25)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(25)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(26); )
			.fromTo('#artists_info li:eq(26)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(26)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(27); )
			.fromTo('#artists_info li:eq(27)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(27)', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(28); )
			.fromTo('#artists_info li:eq(28)', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(28)', 0.5, { alpha: 0 , y:-30}, sequence)
			
	bindEvents: ->
		that = @
		#------------------- FOOTER LISTNER -------------------#
		$('#mode_switcher').on 'switch_to_face_pays', ->
			if that.player
				that.player.pause()

		$('#mode_switcher').on 'switch_to_face_artist', ->
			if that.player
				that.player.play()

		#------------------- POPIN LISTNER -------------------#
		$('#popin').on 'classChange', ->
			console.log 'popin change '+($(this).hasClass 'hide')
			if $(this).hasClass 'hide'
				if window.playerYT
					window.playerYT.stopVideo()
					$('#popin .video-container').addClass 'hide'
				
				console.log 'contrys : '+($("#mode_switcher [data-face='face_pays']").hasClass 'selected')
				if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
					return
				if that.player
					that.player.play()
			else
				if that.player
					that.player.pause()
			return
		#------------------- FOCUS ---------------------------#
		windowBlurred = ->
			console.log 'blur'
			if that.player
				that.player.pause()
			return

		windowFocused = ->
			console.log 'focus'
			if !$('#popin').hasClass 'hide'
				return
				
			if !$('#contrys').hasClass 'selected'
				return

			if that.player
				that.player.play()
			return

		$(window).on 'pagehide blur', windowBlurred
		$(window).on 'pageshow focus', windowFocused

		#------------------- SOUND ---------------------------#
		$('#sound').on 'sound_off', ->
			that.player.muted = true

		$('#sound').on 'sound_on', ->
			that.player.muted = false
		
		#------------------- PLAYER JS ---------------------------#
		that.player = $('#player')[0]
		
		$('#player').on 'loadedmetadata', (e) ->
			that.player.play()
			that.duration = that.player.duration
			console.log that.player.currentTime
			that.createTween()
			return

		$('#player').on 'play', (e) ->
			if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
				that.player.pause()
				return
			console.log 'play'
			that.timelineInfo.play()
			that.timelineKnob.play()
			that.timelinePlatine.play()
			$('.lds-dual-ring').addClass('done')

		$('#player').on 'pause', ->
			console.log 'pause'+that.timelineKnob
			that.timelineInfo.pause()
			that.timelineKnob.pause()
			that.timelinePlatine.pause()

		$('#player').on 'seeked', ->
			that.timelineInfo.time that.player.currentTime

		# options = { autoplay: true, muted: true };
		# @player = videojs('player', options, ->
		# 	myPlayer = this
			
		# 	myPlayer.on 'play', ->
		# 		if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
		# 			myPlayer.pause()
		# 			return
		# 		console.log 'play'
		# 		that.timelineInfo.play()
		# 		that.timelineKnob.play()
		# 		that.timelinePlatine.play()
		# 		$('.lds-dual-ring').addClass('done')
				

			
		# 	myPlayer.on 'pause', ->
		# 		console.log 'pause'+that.timelineKnob
		# 		that.timelineInfo.pause()
		# 		that.timelineKnob.pause()
		# 		that.timelinePlatine.pause()
				
		# 	myPlayer.on 'seeked', ->
		# 		that.timelineInfo.time myPlayer.currentTime()
				
		# 	myPlayer.on 'loadedmetadata', ->
		# 		that.duration = myPlayer.duration()
		# 		that.createTween()
			
		# 	return
		# )


		
		rotationSnap = 360 / 28
		Draggable.create '#knob',
			type: 'rotation'
			throwProps: true
			onDragStart: ->
				$('#knob').addClass 'drag'
				that.timelineKnob.kill()
			onDrag: ->
				that.changeCurrentTime(this.rotation % 360, that.player)
			
			onThrowUpdate: ->
				that.changeCurrentTime(this.rotation % 360, that.player)
			
			onThrowComplete: ->
				that.timelineKnob =  TweenMax.fromTo('#knob', that.duration, {rotation:(this.rotation % 360)},{ease:Linear.easeNone, rotation: ((this.rotation % 360)+360), repeat:-1})
				that.player.play()
				$('#knob').removeClass 'drag'
			
			# onRelease: ->
			# 	console.log 'onRelease : '+(this.rotation % 360)+'that.duration : '+that.duration
			# 	$('#knob').removeClass 'drag'
			snap: (endValue) ->
				Math.round(endValue / rotationSnap) * rotationSnap

		return 

module.player_video = player_video
