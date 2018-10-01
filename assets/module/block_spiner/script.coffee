class spiner
	constructor: (@spiner) ->
		@timelineSpiner = new TimelineMax(paused:true, onReverseComplete:@maskSpiner, onStart: @unmaskSpiner)		
			.from('.lds-dual-ring', .6 ,{borderWidth: 0, transformOrigin: "50px 50px", ease:Power3.easeOut})
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