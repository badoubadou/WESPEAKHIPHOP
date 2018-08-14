window.isMobile = ->
	typeof window.orientation != 'undefined' or navigator.userAgent.indexOf('IEMobile') != -1

init = ->
	console.log 'init'
	player_youtube = new module.player_youtube()
	flip_disk = new module.flip_disk()
	popin = new module.popin()
	block_pays =  new module.block_pays()
	$('body').addClass 'doc-ready'
	$('body').trigger 'doc-ready'

console.log 'start js'
	
$(window).load( init )

