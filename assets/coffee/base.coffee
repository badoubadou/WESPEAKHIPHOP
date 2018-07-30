init = ->
	$('body').addClass 'doc-ready'
	$('.loader-bar').removeClass('show-progress')

	
$(window).load( init )

hasTouch = ->
	'ontouchstart' of document.documentElement or navigator.maxTouchPoints > 0 or navigator.msMaxTouchPoints > 0

if !hasTouch()
	document.body.className += ' hasHover'


player_video = new module.player_video()
player_youtube = new module.player_youtube()
flip_disk = new module.flip_disk()
popin = new module.popin()
