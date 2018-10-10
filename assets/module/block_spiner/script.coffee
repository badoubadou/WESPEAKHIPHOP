class spiner
	constructor: (@spiner) ->
		@timelineSpiner = new TimelineMax(paused:true, onReverseComplete:@maskSpiner, onStart: @unmaskSpiner)		
			.to('.lds-dual-ring .ring_black', 2 ,{scale: 0, ease:Power3.easeOut})	
		@bindEvents()
		@showSpiner()

	maskSpiner : ->
		$('.lds-dual-ring').hide()

	unmaskSpiner : ->
		$('.lds-dual-ring').show()
	
	showSpiner : ->
		that = @
		@timelineSpiner.play()

	hideSpiner : ->
		that = @
		that.timelineSpiner.reverse()
		
	bindEvents : ->
		that = @

		that.spiner.on 'hidespiner', ->
			that.hideSpiner()

		that.spiner.on 'showspiner', ->
			that.showSpiner()

module.spiner = spiner