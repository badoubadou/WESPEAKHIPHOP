class flip_disk
	constructor: () ->
		console.log 'build flip disk'
		@duree_flip = .6
		@demi_flip = @duree_flip/2
		@buildTween()
		@bindEvents()

	buildTween : (timeStamp)->
		console.log timeStamp
		@flip_tween = ﻿new TimelineMax({paused:true});﻿
		
		@flip_tween
			.staggerTo($('#list_artists li'), .3, {alpha:0},(@duree_flip / 28))
			.to($('#block_video_disk'), .3, {scale:1.1},0)
			.to($('#block_video_disk'), .3, {rotationY:90})
			.from($('#faceb'), .3, { rotationY:90, scale:1.3 })
			.to('#artists_info li .warper', 0.5, { alpha: 0 , y:-30})
			.to($('#smallmap'), .3, {ease: Power1.easeOut, alpha:0 } )
			.to('#txt_help_disk',.5,{rotationX: 90}, '-=.5' )
			.from('#txt_help_map',.5,{rotationX: 90} )
		

		@flip_tween.eventCallback 'onReverseComplete', ->
			$('#mode_switcher').trigger 'switch_to_face_artist'
			$('#smallmap').removeClass 'opacity_0'
			$('#mouse_over_bg').addClass 'hide'
			return

		@flip_tween.eventCallback 'onComplete', ->
			$('#mouse_over_bg').removeClass 'hide'
			return

	bindEvents : ->
		that = @	
		#------------------- RESIZE --------------------------#
		# $(window).resize ->
		# 	console.log 'resize'
		# 	timeStamp = that.flip_tween.time()
		# 	that.flip_tween.kill()
		# 	$('#face_artistes, #face_pays').css('transform', '')
		# 	that.buildTween(timeStamp)
		# 	return
		#------------------- SOUND ---------------------------#
		$('#sound').on 'click', ->
			event_name = 'sound_on'
			if ($('#sound').hasClass('actif'))
				event_name = 'sound_off'
			$(this).trigger event_name
			console.log event_name
			$('#sound').toggleClass 'actif'

		#------------------- SWITCH FACE ---------------------------#				
		$('#mode_switcher li a').on 'click':(e) ->
			e.preventDefault()
			$('.footer .selected').removeClass 'selected'
			$(this).addClass 'selected'
			if($(this).data('face')=='face_pays')
				$('#mode_switcher').trigger 'switch_to_face_pays'
				$('#smallmap').addClass 'opacity_0'
				that.flip_tween.play()
			else
				$('.block_contry').removeClass 'opacity_1'
				that.flip_tween.reverse()


		#------------------- FULL SCREEN ---------------------------#				
		GoInFullscreen = (element) ->
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

		$('#fullscreen').on 'click':(e) ->
			if !IsFullScreenCurrently()
				GoInFullscreen($('body').get(0))
			else
				GoOutFullscreen()

		return

module.flip_disk = flip_disk

