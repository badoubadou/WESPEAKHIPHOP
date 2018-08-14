class popin
	constructor: () ->
		@bindEvents()

	window.closePopin= ->
		if(!$('#popin').hasClass('hide'))
			console.log 'remove'
			$('#popin').addClass('hide').trigger 'classChange'
		
		if(!$('#shareinfo').hasClass('hide'))
			$('#shareinfo').addClass('hide')

		if(!$('#artist_info').hasClass('hide'))
			$('#artist_info').addClass('hide')

		$('#popin').trigger 'closePopin'

	bindEvents : ->
		showPopin = ($target)->
			if($('#popin').hasClass('hide'))
				$('#popin').removeClass('hide').trigger 'classChange'
			
			if($($target).hasClass('hide'))
				$($target).removeClass('hide')
			else
				$($target).addClass('hide')
				$('#popin').addClass('hide').trigger 'classChange'

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
			
		$('#share').on 'click', ->
			showPopin('#shareinfo')

		$('#close, #back').on 'click', ->
			window.closePopin()

module.popin = popin
