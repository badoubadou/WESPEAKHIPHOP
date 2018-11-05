'use strict'
window.isMobile = ->
	typeof window.orientation != 'undefined' or navigator.userAgent.indexOf('IEMobile') != -1

init = ->
	console.log 'window load -> init vimeo ?'
	player_video_vimeo = new module.player_video_vimeo()
	popin = new module.popin()
	logo = new module.logo()
	
	$('body').addClass 'doc-ready'
	$('body').trigger 'doc-ready'

	window.layout = window.currentLayout()
	console.log 'layout : '+layout

	# player_video = new module.player_video()
	window.scrollTo(0, 0)
	console.log 'scroll top'

$(window).load( init )
spiner = new module.spiner($('.lds-dual-ring'))


window.currentLayout = ->
	console.log '--------------- > '+ $('#checklayout .desktop').css('display')
	if ($('#checklayout .mobile').css('display') == 'block')
		return 'mobile'
	if ($('#checklayout .ipad').css('display') == 'block')
		return 'ipad'
	if ($('#checklayout .desktop').css('display') == 'block')
		return 'desktop'

document.addEventListener 'dblclick', (e) ->
	e.preventDefault()
	console.log 'prevented dooble click'
	return

document.addEventListener 'gesturestart', (e) ->
	e.preventDefault()
	console.log 'prevented gesturestart'
	return

document.addEventListener 'touchmove', ((event) ->
	event = event.originalEvent or event
	if ((event.scale != undefined) && (event.scale != 1))
		console.log 'prevented touchmove'
		event.preventDefault()
	return
), false


freezeVp = (e) ->
	e.preventDefault()
	return

if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i))
	$('body').addClass 'device-ios'
	document.body.addEventListener("touchmove", freezeVp, false);

	
# $(window).on 'resize', ->
# 	if @resizeTO
# 		clearTimeout @resizeTO
# 	@resizeTO = setTimeout((->
# 		console.log window.layout+'!='+window.currentLayout()
# 		if (layout != currentLayout())
# 			layout = currentLayout()
# 			$(this).trigger 'resizeEnd'
# 		return
# 	), 500)
# 	return