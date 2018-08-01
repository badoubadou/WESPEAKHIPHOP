class flip_disk
	constructor: () ->
		console.log 'flip disk'
		@flip_tween = ﻿new TimelineLite({paused:true});﻿
		@flip_tween.to($('#face_artistes'), 1, {rotationY:90});
		@flip_tween.from($('#face_pays'), 1, {rotationY:90})
		@bindEvents()

	bindEvents : ->
		that = @
		$('#mode_switcher li a').on 'click':(e) ->
			e.preventDefault()
			$('.footer .selected').removeClass 'selected'
			$(this).addClass 'selected'
			if($(this).data('face')=='face_pays')
				console.log 'play'+that.flip_tween
				$('#mode_switcher').trigger 'switch_to_face_pays'
				that.flip_tween.play()
			else
				console.log 'back'
				that.flip_tween.reverse()
				$('#mode_switcher').trigger 'switch_to_face_artist'


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

