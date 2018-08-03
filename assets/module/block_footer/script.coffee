class flip_disk
	constructor: () ->
		console.log 'flip disk'
		duree_flip = 1.5
		demi_flip = duree_flip/2
		@flip_tween = ﻿new TimelineMax({paused:true});﻿
		@flip_tween
			.to($('#face_artistes'), .3, {ease: Power1.easeIn, scale:1.1})
			.to($('#face_artistes'), (demi_flip-0.3), {ease: Power1.easeIn, rotationY:90})
			.staggerTo($('#list_artists li'), .3, {alpha:0},duree_flip / 28,0)
			.from($('#face_pays'), demi_flip, {ease: Power1.easeOut, rotationY:90, scale:1.3},(duree_flip / 2))
		
		@flip_tween.eventCallback 'onReverseComplete', ->
			$('#mode_switcher').trigger 'switch_to_face_artist'
			$('#smallmap, #artists_info').removeClass 'opacity_0'
			return
		@bindEvents()

	bindEvents : ->
		that = @			
		$('#mode_switcher li a').on 'click':(e) ->
			e.preventDefault()
			$('.footer .selected').removeClass 'selected'
			$(this).addClass 'selected'
			if($(this).data('face')=='face_pays')
				$('#mode_switcher').trigger 'switch_to_face_pays'
				$('#smallmap, #artists_info').addClass 'opacity_0'
				that.flip_tween.play()
			else
				$('.block_contry').removeClass 'opacity_1'
				that.flip_tween.reverse()


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

