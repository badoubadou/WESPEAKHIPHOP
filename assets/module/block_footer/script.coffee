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
				that.flip_tween.play()
			else
				console.log 'back'
				that.flip_tween.reverse()
		return

module.flip_disk = flip_disk

