class popin
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		$('#share').on 'click', ->
			$('#popin').toggleClass 'hide'
		
module.popin = popin
