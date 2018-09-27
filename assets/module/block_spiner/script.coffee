class spiner
	constructor: (@spiner) ->
		@timelineSpiner = new TimelineMax(onReverseComplete:@maskSpiner, onStart: @unmaskSpiner)		
		@timelineSpiner.add(@showSpiner)
			.from('.lds-dual-ring', .6 ,{scale: 0, transformOrigin: "50px 50px", ease:Power3.easeOut})
		@bindEvents()

	maskSpiner : ->
		$('.lds-dual-ring').hide()

	unmaskSpiner : ->
		$('.lds-dual-ring').show()
	
	showSpiner : ->
		that = @
		that.timelineSpiner.play()
		console.log 'showSpiner'

	hideSpiner : ->
		that = @
		that.timelineSpiner.reverse()
		console.log 'hideSpiner'

	bindEvents : ->
		that = @
		that.spiner.on 'hide', ->
			console.log 'got hide'
			that.hideSpiner()

		that.spiner.on 'show', ->
			console.log 'got show'
			that.showSpiner()

module.spiner = spiner