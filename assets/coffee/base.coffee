'use strict'

spiner = new module.spiner($('.lds-dual-ring'))
(($, window, document) ->
	# The $ is now locally scoped 
	# Listen for the jQuery ready event on the document
	$ ->
		# The DOM is ready!
		checkMobile = ->
			typeof window.orientation != 'undefined' or navigator.userAgent.indexOf('IEMobile') != -1

		isMobile = checkMobile()
		console.log 'window load -> init vimeo ????'
		player_video_vimeo = new module.player_video_vimeo(isMobile)
		popin = new module.popin()
		logo = new module.logo($('#logowhite'))
		window.scrollTo(0, 0)
		console.log 'scroll top'
		return
	# The rest of the code goes here!
	return
) window.jQuery, window, document


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
	if($('#credittxt').hasClass('hide'))
		e.preventDefault()
		return

if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i))
	$('body').addClass 'device-ios'
	document.body.addEventListener("touchmove", freezeVp, false);



