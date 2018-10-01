class popin
	constructor: () ->
		@bindEvents()

	window.closePopin= ->
		$('.video-container, #abouttxt, #artist_info, #shareinfo').addClass 'hide'
		
		if(!$('#popin').hasClass('hide'))
			$('#popin').addClass('hide').trigger 'classChange'
		
		$('#popin').trigger 'closePopin'
		console.log 'close popin'

	bindEvents : ->
		showPopin = ($target)->
			console.log $target + '$target$target$target'
			$('.video-container, #abouttxt, #artist_info, #shareinfo').addClass 'hide'
			$('#popin').toggleClass('hide').trigger 'classChange'
			$($target).removeClass('hide')

		#------------------- ABOUT  --------------------------#
		$('#apropos_btn').on 'click': (e) ->
			e.preventDefault()
			showPopin('#popin #abouttxt')
			
		$('#about-btn, .block_contry .bio').on 'click':(e) ->
			e.preventDefault()
			if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
				artistid = $(this).data('artistid') - 1
				console.log('artistid ='+artistid)
				$('#popin #artist_info .info').addClass 'hide'
				$('#popin #artist_info .info:eq('+artistid+')').removeClass 'hide'
				showPopin('#artist_info')
				return
			showPopin('#artist_info')
			
		$('#share').on 'click': (e) ->
			e.preventDefault()
			showPopin('#shareinfo')

		$('#close, #back').on 'click', ->
			window.closePopin()

module.popin = popin