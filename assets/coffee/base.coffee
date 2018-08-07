isMobile = ->
	if navigator.userAgent.match(/Mobi/)
		return true
	if 'screen' of window and window.screen.width < 1366
		return true
	connection = navigator.connection or navigator.mozConnection or navigator.webkitConnection
	if connection and connection.type == 'cellular'
		return true
	false


init = ->
	$('body').addClass 'doc-ready'
	$('#mask_shield').addClass 'hide'
	# $('.loader-bar').removeClass('show-progress')

	
$(window).load( init )

hasTouch = ->
	'ontouchstart' of document.documentElement or navigator.maxTouchPoints > 0 or navigator.msMaxTouchPoints > 0

if !hasTouch()
	document.body.className += ' hasHover'


player_video = new module.player_video()
player_youtube = new module.player_youtube()
flip_disk = new module.flip_disk()
popin = new module.popin()
block_pays =  new module.block_pays()

