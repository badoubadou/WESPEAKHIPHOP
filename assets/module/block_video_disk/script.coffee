'use strict'
class player_video
	'use strict'
	constructor: (@$container) ->
		#------------------- SET VAR ---------------------------#
		@timelineKnob = new TimelineMax({paused: true})
		@timelineInfo = new TimelineMax({paused: true, repeat: -1})
		@timelineIntro = null
		@player = $('#player')[0]
		@scale_disk = 2
		if window.isMobile()
			$('#player').attr('src', 'https://d25xbwtykg1lvk.cloudfront.net/25f500kfaststartmobile.mp4')
			@scale_disk = 1
		
		@duration = 168.182
		if @player.duration && @player.duration > 1
			console.log 'correct duration'
			@duration = @player.duration
		
		@disk_speep = 0.39
		@sounddirection = 0
		@scratchBank = []
		@scratchBank.push new Howl(
				src: [ 'https://d25xbwtykg1lvk.cloudfront.net/video.mp3' ]
				buffer: true)
		@scratchBank.push new Howl(
				src: [ 'https://d25xbwtykg1lvk.cloudfront.net/video_reverse.mp3' ]
				buffer: true)
		
		#------------------- SET FUNCTION ---------------------------#
		@setTimeLineIntro()
		$('#player').addClass('ready')
		@createTweenInfo()
		@setTimeLineKnob()
		@setScratcher()
		@bindEvents()

	#------------------- TWEEN ---------------------------#
	resetallCss: () ->
		$('#block_video_disk, #platine ,#disk, #left_col, #smallmap, #artists_info, #txt_help_disk, #list_artists li, #play-video-btn,  #pause-video-btn, #main_footer, #left_col,#artists_info,#smallmap, #txt_help_disk, .tuto').attr('style','')
		
	createTweenInfo: (curentTime) ->
		that = @
			
		updateInfo= (id)->
			$('#play-video-btn,  .startvideofrompopin').attr('href', $('#list_artists li:eq('+id+') a').attr('href'))
			$('#play-video-btn,  .startvideofrompopin').data('ratiovideo', $('#list_artists li:eq('+id+') a').data('ratiovideo'))
			$('#list_artists li a.selected').removeClass('selected')
			$('#list_artists li:eq('+id+') a').addClass('selected')
			svgcontry = '#smallmap svg #'+$('#artists_info li:eq('+id+') .contry').data 'contrynicename'
			console.log ' ---------- id updateInfo   : '+svgcontry
			TweenMax.to(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], 0.5, {alpha: 0})
			TweenMax.to(svgcontry, 0.5, {alpha: 1})
			$('#artists_info li').removeClass('ontop')
			$('#artists_info li:eq('+id+')').addClass('ontop')
			$('#popin #artist_info .info').addClass('hide')
			$('#popin #artist_info .info:eq('+id+')').removeClass('hide')

		duration_sequence = @duration / 28 
		sequence = '+='+(duration_sequence - 1)
		
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

	removeTLIntro : ->
		$('#left_col, #smallmap, #artists_info, #txt_help_disk, #list_artists li, #play-video-btn,  #pause-video-btn, #main_footer, .tuto').attr('style','')
		this.kill()

	setTimeLineIntro : (curentTime) ->
		that = @
		that.timelineIntro = new TimelineMax({paused: true})

		TweenLite.set(['#block_video_disk', '#disk', '#platine'], {xPercent: -50,yPercent: -50});
		TweenLite.set(['#smallmap'], {xPercent: -50});

		that.timelineIntro.from('#block_video_disk', 1.5 ,{ rotation: 270, opacity:0, scale:that.scale_disk, ease:Power1.easeOut} )
			.add(@play_video_disk)
			.from('#platine', 1 ,{opacity:0, scale:.8}, '-=.5')
			.staggerFrom('#list_artists li', .3 ,{opacity:0}, 0.04 )
			.from(['#play-video-btn', '#pause-video-btn'], .6 ,{opacity:0}  )
			.from('#main_footer', .8 ,{y:40, ease:Power3.easeOut})
			.from('#left_col', .8 ,{x:'-100%', ease:Power3.easeOut} , '-=.8')
			.add(@show_logo)
			.from('.tuto', .6 ,{opacity:0, ease:Power3.easeOut} )
			.from('#smallmap', 1 ,{opacity:0, y:50, ease:Power3.easeOut} )
			.from('#artists_info', .5 ,{opacity:0, ease:Power3.easeOut})
			.from('#txt_help_disk', .8 ,{opacity:0, left: '-100%', ease:Power3.easeOut})
			
	setTimeLineKnob : (rot_from, rot_to) ->
		that = @
		if !rot_from
			rot_from = 0
		if !rot_to
			rot_to = 360
		
		that.timelineKnob.fromTo('#disk', 168.182, {rotation:rot_from},{rotation:rot_to, ease:Linear.easeNone, repeat:-1})
					
	showFooter_header : ->
		$('body').removeClass('hidefooter')
		$('body').removeClass('hide_left_col')
	
	show_logo : ->
		$('.logoWSH').trigger 'showLogo'

	play_video_disk : ->
		$('#player')[0].play()
		$('body').removeClass 'disk_on_hold'
		return

	skipIntro : ->
		console.log 'skipIntro : player play ------------------------------ ??????? '
		@timelineIntro.play()
		$('#popin').off 'endIntro'
		console.log ' is mobile ? '+window.isMobile()
		if window.isMobile()
			console.log 'so play video damned it'
			@play_video_disk()

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
	
	setScratcher: ->
		that = @
		resumePlayDisk = (rotation)->
			that.timelineInfo.time that.player.currentTime
			that.timelineInfo.play()
			that.setTimeLineKnob((rotation % 360),((rotation % 360)+360))
			that.timelineKnob.play()	

		rotationSnap = 360 / 28
		previousRotation = 0
		Draggable.create '#disk',
			type: 'rotation'
			throwProps: true
			onRelease: ->
				if(!$('#disk').hasClass 'drag')
					resumePlayDisk(this.rotation)
					$('#disk').removeClass 'drag'

			onDragStart: ->
				$('#disk').addClass 'drag'
				that.timelineInfo.pause()
			
			onDrag: ->
				yourDraggable = Draggable.get('#disk')
				dir = if yourDraggable.rotation - previousRotation > 0 then 'clockwise' else 'counter-clockwise'
				speed = Number(Math.abs(yourDraggable.rotation - previousRotation))
				roundedSpeed = Number(speed.toFixed(4))
				previousRotation = yourDraggable.rotation
				that.changeCurrentTime(this.rotation % 360, that.player, dir, roundedSpeed)
			
			onThrowUpdate: ->
				that.changeCurrentTime(this.rotation % 360, that.player, 'clockwise', that.disk_speep)
			
			onThrowComplete: ->
				resumePlayDisk(this.rotation)
				that.player.play()
				that.scratchBank[0].stop()
				that.scratchBank[1].stop()
				$('#disk').removeClass 'drag'
				
			snap: (endValue) ->
				Math.round(endValue / rotationSnap) * rotationSnap
		return 

	bindEvents: ->
		that = @
		console.log 'bindEvents player_video'

		# $(window).on 'resizeEnd', ->
		# 	# Draggable.get("#disk").kill()
		# 	# TweenMax.killTweensOf﻿($('#disk'))
		# 	# TweenMax.killAll()
		# 	# that.resetallCss()
		# 	# setTimeout (->
		# 	# 	console.log 'set scrather'
		# 	# 	that.setScratcher()
		# 	# 	return
		# 	# ), 700
			
		# 	return
		
		#------------------- END TUTO -------------------#
		$('.tuto').on 'click touchstart', (event) ->
			$('.tuto').remove()
			event.stopPropagation()
			event.preventDefault()
			$(window).on 'pagehide blur', windowBlurred
			$(window).on 'pageshow focus', windowFocused
			return false
		#------------------- ENDINTRO -------------------#
		$('#popin').on 'endIntro', ->
			that.skipIntro()

		#------------------- POPIN LISTNER -------------------#
		$('#popin').on 'classChange', ->
			console.log '->>>>>>>>>>>>>>>>>>>>>>> popin change '+($(this).hasClass 'hide')
			if ($('body').hasClass('disk_on_hold'))
				console.log 'disk on hold'
				return
			if $(this).hasClass 'hide'
				console.log 'player play '
				if that.player
					that.player.play()
			else
				console.log 'player pause '
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



		#------------------- SOUND ---------------------------#
		$('#sound').on 'sound_off', ->
			that.player.muted = true

		$('#sound').on 'sound_on', ->
			console.log 'sound_on' + that.player.muted
			that.player.muted = false

		#------------------- SOUND ---------------------------#
		$('#pause-video-btn').on 'click touchstart', (event) ->
			if $(this).hasClass 'paused'
				that.player.play()
			else
				that.player.pause()

			event.stopPropagation()
			event.preventDefault()
			return false

		#------------------- PLAYER JS ---------------------------#		
		# videoDiskCanPlay = ->
		# 	$('.skip_intro').show()
			
		# $('#player').on 'canplaythrough', videoDiskCanPlay
		
		# if $('#player')[0].readyState > 3
		# 	videoDiskCanPlay()

		$('#player').on 'play', (e) ->
			console.log 'play video disk'
			$('body').removeClass 'video-disk-waiting'
			if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
				that.player.pause()
				return
			that.timelineKnob.play()
			that.timelineInfo.play()
			console.log 'trigger hide on player Js play '
			$('.lds-dual-ring').trigger 'hidespiner'
			$('#pause-video-btn').removeClass 'paused'

		$('#player').on 'pause', ->
			console.log 'pause'+that.timelineKnob
			that.timelineInfo.pause()
			that.timelineKnob.pause()
			$('#pause-video-btn').addClass 'paused'

		# $('#player').on 'waiting', ->
		# 	console.log 'waiting'
		# 	that.timelineInfo.pause()
		# 	$('#pause-video-btn').addClass 'paused'

		# $('#player').on 'stalled', ->
		# 	console.log 'stalled'
		# 	that.timelineInfo.pause()
		# 	$('#pause-video-btn').addClass 'paused'

		# $('#player').on 'seeked', ->
		# 	that.timelineInfo.time that.player.currentTime
		
		

module.player_video = player_video
