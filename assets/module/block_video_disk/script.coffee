class player_video
	constructor: (@$container) ->
		console.log 'metadata video loaded ---------------------- start player_video ' 
		# @bindEvents() # bind event is now after video is loaded
		@duration = 0
		@timelineKnob = new TimelineMax(paused: true)
		@timelineInfo = new TimelineMax(paused: true)
		@timelinePlatine = new TimelineMax(paused: true)

		@timelineDisk = new TimelineMax(paused: true)		
		@timelineDisk.from('#disk_hole', .6 ,{scale: 0, ease:Power3.easeOut}, 0.5)
			.from('#mask_video', 3 ,{scale: 0, ease:Power3.easeOut}, 1 )
			.staggerFromTo('#disk_lign svg path', 1, {drawSVG:"50% 50%"}, {drawSVG:"100%"}, -0.1, 1.2)
			.from('#bg_disk', 2 ,{opacity:0, scale: 0, ease:Power1.easeOut}, 1 )
			.from('#platine', 1 ,{opacity:0}, 1)
			.staggerFrom('#list_artists li', .3 ,{opacity:0}, 0.05, 1.5)
			.from('#main_footer', .3 ,{y:40}, 2 )
			.add( @showFooter, 2 )
			.from('#smallmap', .3 ,{opacity:0}, 2 )
			.from('#ico', .6 ,{opacity:0}, 2 )
			.from('#txt_help_disk', .8 ,{opacity:0, left: '-100%', ease:Power3.easeOut}, 2.1 )
			.from('#play-video-btn', .6 ,{opacity:0}, 2 )
			.from('#about-btn', .6 ,{opacity:0}, 2.1 )

		
		@player = $('#player')[0]
		@duration = @player.duration
		
		$('#player').addClass('ready')
		@loadMap()
		@createTween()
		@bindEvents()

	showFooter : ->
		$('body').removeClass('hidefooter')

	loadMap : ->
		console.log '---> load small map'
		that = @
		$.get 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/smallmap-'+$('#langage_short').val()+'.svg', (data) ->
			console.log '---> small map loaded'
			div = document.createElement('div')
			div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement)
			$( "#smallmap" ).append( div.innerHTML )
			return

	logoWhite : ->
		$('#logowhite').removeClass 'hide'
		drawLogo = new TimelineMax({});
		drawLogo.from("#logowhite #mask1_2_", 1, {drawSVG:0, ease:Power1.easeInOut} )
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
			

	bildIntroYoutube : ->
		that = @
		random = Math.floor(Math.random() * 4)
		randomid = $('#idIntroYoutube input:eq('+random+')').val()

		console.log 'bildIntroYoutube = '+randomid
		if $('body').hasClass 'onYouTubeIframeAPIReady'
			window.playYoutubeVideo(randomid)
		else
			$('body').addClass 'waiting-for-youtube'
			$('#idIntroYoutube').data('introid', randomid)

		$('#popin').on 'closePopin', ->
			console.log 'close popin'
			that.skipIntro()

		$('.skip_intro').on 'click', ->
			window.closePopin()

	skipIntro : ->
		@player.play()
		@timelineDisk.play()
		$('#popin').off 'closePopin'

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
			
		@$player.on 'timeupdate', checkEndTime
	#------------------- TWEEN ---------------------------#
	createTween: () ->
		console.log 'createTween'
		updateInfo= (id)->
			$('#play-video-btn, #startvideo').attr('href', $('#list_artists li:eq('+id+') a').attr('href'))
			$('#list_artists li a.selected').removeClass('selected')
			$('#list_artists li:eq('+id+') a').addClass('selected')
			$('#artist_info .info').addClass('hide')
			$('#artist_info .info:eq('+id+')').removeClass('hide')
			svgcontry = '#smallmap svg #'+$('#artists_info li:eq('+id+') .contry').data 'contrynicename'
			console.log svgcontry
			TweenMax.to(['#smallmap svg .smallmap-fr-st1', '#smallmap svg .smallmap-en-st1'], 0.5, {alpha: 0})
			TweenMax.to(svgcontry, 0.5, {alpha: 1}, '+=.5')

		duration_sequence = @duration / 28 
		sequence = '+='+(duration_sequence - 1)
		
		@timelineKnob =  TweenMax.to('#knob, #player', @duration, {ease:Linear.easeNone, rotation: 360, repeat:-1, paused: true })
		@timelinePlatine =  TweenMax.to('#platine', @duration, {ease:Linear.easeNone, rotation: 360*100, repeat:-1, paused: true })

		@timelineInfo
			.add(-> updateInfo(0); )
			.fromTo('#artists_info li:eq(0) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(0) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(1); )
			.fromTo('#artists_info li:eq(1) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(1) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(2); )
			.fromTo('#artists_info li:eq(2) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(2) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(3); )
			.fromTo('#artists_info li:eq(3) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(3) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(4); )
			.fromTo('#artists_info li:eq(4) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(4) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(5); )
			.fromTo('#artists_info li:eq(5) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(5) .warper', 0.5, { alpha: 0 }, sequence )
			.add(-> updateInfo(6); )
			.fromTo('#artists_info li:eq(6) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(6) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(7); )
			.fromTo('#artists_info li:eq(7) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(7) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(8); )
			.fromTo('#artists_info li:eq(8) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(8) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(9); )
			.fromTo('#artists_info li:eq(9) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(9) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(10); )
			.fromTo('#artists_info li:eq(10) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(10) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(11); )
			.fromTo('#artists_info li:eq(11) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(11) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(12); )
			.fromTo('#artists_info li:eq(12) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(12) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(13); )
			.fromTo('#artists_info li:eq(13) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(13) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(14); )
			.fromTo('#artists_info li:eq(14) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(14) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(15); )
			.fromTo('#artists_info li:eq(15) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(15) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(16); )
			.fromTo('#artists_info li:eq(16) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(16) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(17); )
			.fromTo('#artists_info li:eq(17) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(17) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(18); )
			.fromTo('#artists_info li:eq(18) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(18) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(19); )
			.fromTo('#artists_info li:eq(19) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(19) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(20); )
			.fromTo('#artists_info li:eq(20) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(20) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(21); )
			.fromTo('#artists_info li:eq(21) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(21) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(22); )
			.fromTo('#artists_info li:eq(22) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(22) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(23); )
			.fromTo('#artists_info li:eq(23) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(23) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(24); )
			.fromTo('#artists_info li:eq(24) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(24) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(25); )
			.fromTo('#artists_info li:eq(25) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(25) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(26); )
			.fromTo('#artists_info li:eq(26) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(26) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(27); )
			.fromTo('#artists_info li:eq(27) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(27) .warper', 0.5, { alpha: 0 , y:-30}, sequence)
			.add(-> updateInfo(28); )
			.fromTo('#artists_info li:eq(28) .warper', 0.5, {alpha: 0, y:30},{alpha: 1, y:0})
			.to('#artists_info li:eq(28) .warper', 0.5, { alpha: 0 , y:-30}, sequence)

	startSite: (that)->
		that.logoWhite()
		that.bildIntroYoutube()
		
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
			$('.lds-dual-ring').addClass('done')

		$('#player').on 'pause', ->
			console.log 'pause'+that.timelineKnob
			that.timelineInfo.pause()
			that.timelineKnob.pause()
			that.timelinePlatine.pause()

		$('#player').on 'seeked', ->
			that.timelineInfo.time that.player.currentTime
		
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
				that.timelineKnob =  TweenMax.fromTo('#knob, #player', that.duration, {rotation:(this.rotation % 360)},{ease:Linear.easeNone, rotation: ((this.rotation % 360)+360), repeat:-1})
				that.player.play()
				$('#knob').removeClass 'drag'

			snap: (endValue) ->
				Math.round(endValue / rotationSnap) * rotationSnap
		return 

module.player_video = player_video
