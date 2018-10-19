'use strict'
window.isMobile = ->
	typeof window.orientation != 'undefined' or navigator.userAgent.indexOf('IEMobile') != -1

init = ->
	console.log 'window load -> init'
	player_video_youtube = new module.player_video_youtube()
	spiner = new module.spiner($('.lds-dual-ring'))
	popin = new module.popin()
	logo = new module.logo()
	
	$('body').addClass 'doc-ready'
	$('body').trigger 'doc-ready'

	window.layout = window.currentLayout()
	console.log 'layout : '+layout

	player_video = new module.player_video()

$(window).load( init )


window.currentLayout = ->
	console.log '--------------- > '+ $('#checklayout .desktop').css('display')
	if ($('#checklayout .mobile').css('display') == 'block')
		return 'mobile'
	if ($('#checklayout .ipad').css('display') == 'block')
		return 'ipad'
	if ($('#checklayout .desktop').css('display') == 'block')
		return 'desktop'

document.addEventListener 'gesturestart', (e) ->
	e.preventDefault()
	return

document.addEventListener 'touchmove', ((event) ->
  event = event.originalEvent or event
  if event.scale > 1
    event.preventDefault()
  return
), false

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