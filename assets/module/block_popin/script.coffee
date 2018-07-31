class popin
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		$('#close').on 'click', ->
			if(!$('#popin').hasClass('hide'))
				console.log 'remove'
				$('#popin').addClass('hide').trigger 'classChange'
			
			if(!$('#shareinfo').hasClass('hide'))
				$('#shareinfo').addClass('hide')

		$('#share').on 'click', ->
			if($('#popin').hasClass('hide'))
				$('#popin').removeClass('hide').trigger 'classChange'
			
			if($('#shareinfo').hasClass('hide'))
				$('#shareinfo').removeClass('hide')
			else
				$('#shareinfo').addClass('hide')


module.popin = popin
