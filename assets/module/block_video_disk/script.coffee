'use strict'
class player_video
	'use strict'
	constructor: (@$container, @isMobile) ->
		#------------------- SET VAR ---------------------------#
		@disk_speep = 0.39
		@scale_disk = 2
		@duration = 168.182
		
		#------------------- SET ELEMENT ---------------------------#
		@el_popin = $('#popin')
		@el_sound = $('#sound')
		@el_player = $('#player')
		@player = $('#player')[0]
		@el_pause_btn = $('#pause-video-btn')
		@el_spiner = $('.lds-dual-ring')
		@el_body = $('body')
		@el_disk = $('#disk')
		@el_btn_play_video = $('#play-video-btn, .startvideofrompopin')
		@el_artists_info_li = $('#artists_info li')
		@el_popin_artist_info_info = $('#popin #artist_info .info')
		@el_artists_info_li = $('#artists_info li')
		@el_list_artists_li = $('#list_artists li')
		@el_tuto = $('.tuto')
		@el_window = $(window)
		@smallmapContry = '.smallmap-'+$('#langage_short').val()+'-st1'
		#------------------- SET TWEEN ---------------------------#
		@timelineKnob = new TimelineMax({paused: true})
		@timelineInfo = new TimelineMax({paused: true, repeat: -1})
		@timelineIntro = null
		if @isMobile
			$('#player').attr('src', 'https://d25xbwtykg1lvk.cloudfront.net/25f500kfaststartmobile.mp4')
			@scale_disk = 1
		
		if @player.duration && @player.duration > 1
			@duration = @player.duration
		
		#------------------- SET SOUND ---------------------------#
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
		@el_player.addClass('ready')
		@createTweenInfo()
		@setTimeLineKnob()
		@setScratcher()
		@bindEvents()

	#------------------- TWEEN ---------------------------#
	createTweenInfo: (curentTime) ->
		that = @
	
		updateInfo= (id)->
			svgcontry = '#'+that.el_artists_info_li.eq(id).find('.contry').data 'contrynicename'
			that.el_btn_play_video.attr('href', that.el_list_artists_li.eq(id).find('a').attr('href'))
			that.el_btn_play_video.data('ratiovideo', that.el_list_artists_li.eq(id).find('a').data('ratiovideo'))
			that.el_list_artists_li.find('a.selected').removeClass('selected')
			that.el_list_artists_li.eq(id).find('a').addClass('selected')
			TweenMax.to(that.smallmapContry, 0.5, {alpha: 0})
			TweenMax.to(svgcontry, 0.5, {alpha: 1})
			that.el_artists_info_li.removeClass('ontop')
			that.el_artists_info_li.eq(id).addClass('ontop')
			that.el_popin_artist_info_info.addClass('hide')
			that.el_popin_artist_info_info.eq(id).removeClass('hide')

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
			
	setTimeLineKnob : (rot_from = 0, rot_to = 360) ->
		console.log 'setTimeLineKnob' 
		@timelineKnob.fromTo('#disk', @duration, {rotation:rot_from},{rotation:rot_to, ease:Linear.easeNone, repeat:-1})
	
	show_logo : ->
		$('.logoWSH').trigger 'showLogo'

	play_video_disk : ->
		if !@isMobile
			$('#player')[0].play()
			$('body').removeClass 'disk_on_hold'
		return

	skipIntro : ->
		console.log 'skipIntro : player play ------------------------------ ??????? '
		@timelineIntro.play()
		@el_popin.off 'endIntro'
		if @isMobile
			@play_video_disk()

	changeCurrentTime: (@$deg, @$myplayer, dir, speed)->
		if(@$deg<0)
			@$deg = 360  + @$deg
		percentage = @$deg / 3.6
		player_new_CT = @$myplayer.duration * (percentage/100)
		@$myplayer.currentTime = player_new_CT

		@sounddirection = if dir == 'clockwise' then 0 else 1
		opositeDirection =  if dir == 'clockwise' then 1 else 0
		
		PBR = speed / @disk_speep
		PBR = Math.min(Math.max((speed / @disk_speep), 0.9), 1.2)
		roundedPBR = Number(PBR.toFixed(4))
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
				if(!that.el_disk.hasClass 'drag')
					resumePlayDisk(this.rotation)
					that.el_disk.removeClass 'drag'

			onDragStart: ->
				that.el_disk.addClass 'drag'
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
				that.el_disk.removeClass 'drag'
				
			snap: (endValue) ->
				Math.round(endValue / rotationSnap) * rotationSnap
		return 

	bindEvents: ->
		that = @
		#------------------- END TUTO -------------------#
		that.el_tuto.on 'click touchstart', (event) ->
			$(this).off()
			$(this).remove()
			that.el_tuto = null
			that.el_window.on 'pagehide blur', windowBlurred
			that.el_window.on 'pageshow focus', windowFocused
			event.stopPropagation()
			event.preventDefault()
			return false
		#------------------- ENDINTRO -------------------#
		that.el_popin.on 'endIntro', ->
			that.skipIntro()

		#------------------- POPIN LISTNER -------------------#
		that.el_popin.on 
			'showPopin': ->
				if that.player
					that.player.pause()
				return
			'closePopin': ->
				if that.player
					that.player.play()
				return

		#------------------- FOCUS ---------------------------#
		windowBlurred = ->
			console.log 'blur'
			if that.player
				that.player.pause()

			that.el_body.trigger 'blur'
			return

		windowFocused = ->
			console.log 'focus'
			that.el_body.trigger 'focus'
			if that.el_body.hasClass 'video-disk-waiting'
				console.log 'hasClass video-disk-waiting'
				return

			if !that.el_popin.hasClass 'hide'
				console.log 'popin hasNotClass hide'
				return
			
			if that.player
				console.log 'play video'
				if that.player.paused
					that.player.play()
			return

		#------------------- SOUND ---------------------------#
		that.el_sound.on 
			'sound_off': ->
				that.player.muted = true
				return
			'sound_on': ->
				that.player.muted = false
				return

		#------------------- SOUND ---------------------------#
		that.el_pause_btn.on 'click touchstart', (event) ->
			if $(this).hasClass 'paused'
				that.player.play()
			else
				that.player.pause()

			event.stopPropagation()
			event.preventDefault()
			return false

		#------------------- PLAYER VIDEO DISK ---------------------------#		
		that.el_player.on
			'play': ->
				that.el_body.removeClass 'video-disk-waiting'
				that.timelineKnob.play()
				that.timelineInfo.play()
				that.el_spiner.trigger 'hidespiner'
				that.el_pause_btn.removeClass 'paused'
				return
			'pause': ->
				that.timelineInfo.pause()
				that.timelineKnob.pause()
				that.el_pause_btn.addClass 'paused'
				return

module.player_video = player_video
