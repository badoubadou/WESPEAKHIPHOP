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
		console.log 'Show Spiner = '+@timelineSpiner
		@timelineSpiner.play()

	hideSpiner : ->
		that = @
		console.log 'Hide Spiner = '+@timelineSpiner
		that.timelineSpiner.reverse()
		
	bindEvents : ->
		that = @

		that.spiner.on 'hidespiner', ->
			console.log '-------- catch hide '
			that.hideSpiner()

		that.spiner.on 'showspiner', ->
			console.log '-------- catch show'
			that.showSpiner()

module.spiner = spiner