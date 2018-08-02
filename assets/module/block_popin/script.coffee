class popin
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		showPopin = ($target)->
			if($('#popin').hasClass('hide'))
				$('#popin').removeClass('hide').trigger 'classChange'
			
			if($($target).hasClass('hide'))
				$($target).removeClass('hide')
			else
				$($target).addClass('hide')
				$('#popin').addClass('hide').trigger 'classChange'

		$('#apropos_btn').on 'click':(e) ->
			e.preventDefault()
			showPopin('#artist_info')
			
		$('#share').on 'click', ->
			showPopin('#shareinfo')

		$('#close, #back').on 'click', ->
			if(!$('#popin').hasClass('hide'))
				console.log 'remove'
				$('#popin').addClass('hide').trigger 'classChange'
			
			if(!$('#shareinfo').hasClass('hide'))
				$('#shareinfo').addClass('hide')

			if(!$('#artist_info').hasClass('hide'))
				$('#artist_info').addClass('hide')

module.popin = popin
