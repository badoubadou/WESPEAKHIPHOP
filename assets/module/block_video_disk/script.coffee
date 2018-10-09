class player_video
	constructor: (@$container) ->
		@timelineKnob = new TimelineMax(paused: true)
		@timelineInfo = new TimelineMax(paused: true, reapeat : -1)
		@timelinePlatine = new TimelineMax(paused: true)
		@timelineDisk = new TimelineMax(paused: true)
		@setTimeLine()

		@player = $('#player')[0]
		@duration = 168.182
		if @player.duration && @player.duration > 1
			console.log 'correct duration'
			@duration = @player.duration
		
		@disk_speep = 0.39

		@sounddirection = 0
		@scratchBank = []
		@scratchBank.push new Howl(
				src: [ 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/video.mp3' ]
				buffer: true)
		@scratchBank.push new Howl(
				src: [ 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/video_reverse.mp3' ]
				buffer: true)
		
		$('#player').addClass('ready')
		@loadMap()
		@createTween()
		@bindEvents()

	setTimeLine : (curentTime) ->
		@timelineDisk.from('#block_video_disk', 1.5 ,{ rotation: 270, opacity:0, scale:2, ease:Power1.easeOut} )
			.from('#platine', 1 ,{opacity:0, scale:.8}, '-=.5')
			.staggerFrom('#list_artists li', .3 ,{opacity:0}, 0.04 )
			.from(['#play-video-btn', '#play-video-btn-mobile', '#pause-video-btn'], .6 ,{opacity:0}  )
			.from('#main_footer', .8 ,{y:40, ease:Power3.easeOut})
			.from('#left_col', .8 ,{x:'-100%', ease:Power3.easeOut} , '-=.8')
			.add(@show_logo)
			.from('#artists_info', .5 ,{opacity:0, ease:Power3.easeOut}, '+=2')
			.from('#smallmap', .6 ,{opacity:0, y:150, ease:Power3.easeOut} )
			.add(@reset_small_map_css)
			.from('#txt_help_disk', .8 ,{opacity:0, left: '-100%', ease:Power3.easeOut})
			.add(@show_tuto, '+=2')
			.from('.tuto', .6 ,{opacity:0, ease:Power3.easeOut}, '+=2' )
			# .totalProgress(curentTime || 0)

	showFooter_header : ->
		$('body').removeClass('hidefooter')
		$('body').removeClass('hide_left_col')
	
	reset_small_map_css : ->
		$('#smallmap').removeAttr('style')

	show_logo : ->
		$('.logoWSH').trigger 'showLogo'

	show_tuto : ->
		$('.tuto').removeClass('hide')

	loadMap : ->
		console.log '---> load small map'
		that = @
		$.get 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/smallmap-'+$('#langage_short').val()+'.svg', (data) ->
			console.log '---> small map loaded'
			div = document.createElement('div')
			div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement)
			$( "#smallmap" ).append( div.innerHTML )
			return

	skipIntro : ->
		console.log 'skipIntro : player play ------------------------------'
		@player.play()
		@timelineDisk.play()
		$('#popin').off 'endIntro'

	changeCurrentTime: (@$deg, @$myplayer, dir, speed)->
		if(@$deg<0)
			@$deg = 360  + @$deg
		percentage = @$deg / 3.6
		player_new_CT = @$myplayer.duration * (percentage/100)
		# console.log 'player_new_CT : '+player_new_CT
		@$myplayer.currentTime = player_new_CT

		@sounddirection = if dir == 'clockwise' then 0 else 1
		opositeDirection =  if dir == 'clockwise' then 1 else 0
		
		PBR = speed / @disk_speep

		PBR = Math.min(Math.max((speed / @disk_speep), 0.9), 1.2)
		roundedPBR = Number(PBR.toFixed(4))
				
		# console.log dir + '  @sounddirection  : '+@sounddirection  + '  // opositeDirection  : '+opositeDirection+'. speed : '+speed + '  PBR : '+roundedPBR
		@scratchBank[@sounddirection].rate(roundedPBR)

		sound_new_CT = if dir == 'clockwise' then player_new_CT else (@$myplayer.duration - player_new_CT)

		if @scratchBank[opositeDirection].playing()
			@scratchBank[opositeDirection].stop()
		if !@scratchBank[@sounddirection].playing()
			@scratchBank[@sounddirection].seek(sound_new_CT)
			@scratchBank[@sounddirection].play()

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
			# player.playbackRate(PBR)
			
		@$player.on 'timeupdate', checkEndTime
	#------------------- TWEEN ---------------------------#
	createTween: () ->
		that = @
		updateInfo= (id)->
			console.log ' ---------- id updateInfo : '+id
			$('#play-video-btn, #play-video-btn-mobile, #startvideo').attr('href', $('#list_artists li:eq('+id+') a').attr('href'))
			$('#list_artists li a.selected').removeClass('selected')
			$('#list_artists li:eq('+id+') a').addClass('selected')
			
			svgcontry = '#smallmap svg #'+$('#artists_info li:eq('+id+') .contry').data 'contrynicename'
			TweenMax.to(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], 0.5, {alpha: 0})

			TweenMax.to(svgcontry, 0.5, {scale: 3, transformOrigin:'50% 50%', repeat:-1, yoyo:true})

			
			TweenMax.to(svgcontry, 0.5, {alpha: 1}, '+=.5')
			$('#artists_info li').addClass('hide')
			$('#artists_info li:eq('+id+')').removeClass('hide')
			$('#popin #artist_info .info').addClass('hide')
			$('#popin #artist_info .info:eq('+id+')').removeClass('hide')

		duration_sequence = @duration / 28 
		sequence = '+='+(duration_sequence - 1)
		
		@timelineKnob =  TweenMax.to('#knob', @duration, {ease:Linear.easeNone, rotation: 360, repeat:-1, paused: true })
		@timelinePlatine =  TweenMax.to('#platine', @duration, {ease:Linear.easeNone, rotation: 360, repeat:-1, paused: true })

		@timelineInfo
			.add(-> updateInfo(0); )
			.fromTo('#artists_info li:eq(0) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(0) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(1); )
			.fromTo('#artists_info li:eq(1) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(1) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(2); )
			.fromTo('#artists_info li:eq(2) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(2) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(3); )
			.fromTo('#artists_info li:eq(3) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(3) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(4); )
			.fromTo('#artists_info li:eq(4) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(4) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(5); )
			.fromTo('#artists_info li:eq(5) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(5) .warper', 0.5, { alpha: 0 }, sequence )
			.add(-> updateInfo(6); )
			.fromTo('#artists_info li:eq(6) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(6) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(7); )
			.fromTo('#artists_info li:eq(7) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(7) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(8); )
			.fromTo('#artists_info li:eq(8) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(8) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(9); )
			.fromTo('#artists_info li:eq(9) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(9) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(10); )
			.fromTo('#artists_info li:eq(10) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(10) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(11); )
			.fromTo('#artists_info li:eq(11) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(11) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(12); )
			.fromTo('#artists_info li:eq(12) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(12) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(13); )
			.fromTo('#artists_info li:eq(13) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(13) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(14); )
			.fromTo('#artists_info li:eq(14) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(14) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(15); )
			.fromTo('#artists_info li:eq(15) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(15) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(16); )
			.fromTo('#artists_info li:eq(16) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(16) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(17); )
			.fromTo('#artists_info li:eq(17) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(17) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(18); )
			.fromTo('#artists_info li:eq(18) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(18) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(19); )
			.fromTo('#artists_info li:eq(19) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(19) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(20); )
			.fromTo('#artists_info li:eq(20) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(20) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(21); )
			.fromTo('#artists_info li:eq(21) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(21) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(22); )
			.fromTo('#artists_info li:eq(22) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(22) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(23); )
			.fromTo('#artists_info li:eq(23) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(23) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(24); )
			.fromTo('#artists_info li:eq(24) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(24) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(25); )
			.fromTo('#artists_info li:eq(25) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(25) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(26); )
			.fromTo('#artists_info li:eq(26) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(26) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(27); )
			.fromTo('#artists_info li:eq(27) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(27) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)
			.add(-> updateInfo(28); )
			.fromTo('#artists_info li:eq(28) .warper', 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
			.to('#artists_info li:eq(28) .warper', 0.5, { alpha: 0 , marginTop:-30}, sequence)

	bindEvents: ->
		that = @
		console.log 'bindEvents player_video'

		$(window).on 'resizeEnd', ->
			# if !that.timelineDisk
			# 	return 
			# curentTime = that.timelineDisk.totalProgress()
			# console.log 'resized  = '+curentTime
			# that.timelineDisk.clear()
			# # that.setTimeLine(curentTime)
			# that.timelineDisk.play(0)
			return
		
		#------------------- END TUTO -------------------#
		$('.btn_get_it').on 'click', ->
			$('.tuto').remove()
		#------------------- ENDINTRO -------------------#
		$('#popin').on 'endIntro', ->
			console.log '--------------------------- end intro'
			that.skipIntro()

		#------------------- POPIN LISTNER -------------------#
		$('#popin').on 'classChange', ->
			console.log '->>>>>>>>>>>>>>>>>>>>>>> popin change '+($(this).hasClass 'hide')
			if $(this).hasClass 'hide'
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

			$('body').trigger 'blur'
			return

		windowFocused = ->
			console.log 'focus'
			$('body').trigger 'focus'
			if $('body').hasClass 'video-disk-waiting'
				console.log 'hasClass video-disk-waiting'
				return

			if !$('#popin').hasClass 'hide'
				console.log 'popin hasNotClass hide'
				return
			
			if $('#contrys').hasClass 'selected'
				console.log 'contrys hasClass selected'
				return

			if that.player
				console.log 'play video'
				if that.player.paused
					that.player.play()
			return

		$(window).on 'pagehide blur', windowBlurred
		$(window).on 'pageshow focus', windowFocused

		#------------------- SOUND ---------------------------#
		$('#sound').on 'sound_off', ->
			that.player.muted = true

		$('#sound').on 'sound_on', ->
			console.log 'sound_on' + that.player.muted
			that.player.muted = false

		#------------------- SOUND ---------------------------#
		$('#pause-video-btn').on 'click', ->
			if $(this).hasClass 'paused'
				that.player.play()
			else
				that.player.pause()

		#------------------- PLAYER JS ---------------------------#		
		$('#player').on 'play', (e) ->
			console.log 'play video disk'
			$('body').removeClass 'video-disk-waiting'
			if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
				that.player.pause()
				return
			that.timelineInfo.play()
			that.timelineKnob.play()
			that.timelinePlatine.play()
			# $('.lds-dual-ring').addClass('done')
			console.log 'trigger hide on player Js play '
			$('.lds-dual-ring').trigger 'hidespiner'
			$('#pause-video-btn').removeClass 'paused'

		$('#player').on 'pause', ->
			console.log 'pause'+that.timelineKnob
			that.timelineInfo.pause()
			that.timelineKnob.pause()
			that.timelinePlatine.pause()
			$('#pause-video-btn').addClass 'paused'

		$('#player').on 'waiting', ->
			$('#pause-video-btn').addClass 'paused'

		$('#player').on 'stalled', ->
			$('#pause-video-btn').addClass 'paused'

		$('#player').on 'seeked', ->
			that.timelineInfo.time that.player.currentTime
		
		rotationSnap = 360 / 28
		previousRotation = 0
		Draggable.create '#knob',
			type: 'rotation'
			throwProps: true
			onRelease: ->
				if(!$('#knob').hasClass 'drag')
					that.timelineKnob =  TweenMax.fromTo('#knob', that.duration, {rotation:(this.rotation % 360)},{ease:Linear.easeNone, rotation: ((this.rotation % 360)+360), repeat:-1})
					$('#knob').removeClass 'drag'

			onDrag: ->
				$('#knob').addClass 'drag'
				yourDraggable = Draggable.get('#knob')
				dir = if yourDraggable.rotation - previousRotation > 0 then 'clockwise' else 'counter-clockwise'
				speed = Number(Math.abs(yourDraggable.rotation - previousRotation))
				roundedSpeed = Number(speed.toFixed(4))
				previousRotation = yourDraggable.rotation
				that.changeCurrentTime(this.rotation % 360, that.player, dir, roundedSpeed)
			
			onThrowUpdate: ->
				that.changeCurrentTime(this.rotation % 360, that.player, 'clockwise', that.disk_speep)
			
			onThrowComplete: ->
				that.timelineKnob =  TweenMax.fromTo('#knob', that.duration, {rotation:(this.rotation % 360)},{ease:Linear.easeNone, rotation: ((this.rotation % 360)+360), repeat:-1})
				that.player.play()
				that.scratchBank[0].stop()
				that.scratchBank[1].stop()
				$('#knob').removeClass 'drag'
				
			snap: (endValue) ->
				Math.round(endValue / rotationSnap) * rotationSnap
		return 

module.player_video = player_video
