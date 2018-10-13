class spiner
	constructor: (@spiner) ->
		console.log '----------------- > constructor spinner'
		@timelineSpiner = new TimelineMax(paused:true, onReverseComplete:@maskSpiner, onStart: @unmaskSpiner)		
			.to('.lds-dual-ring .ring_black', 2 ,{scale: 0, ease:Power3.easeOut})			
			.fromTo('.lds-dual-ring', 2 ,{opacity: 0},{opacity: 1, ease:Power3.easeOut}, '-=2')	
		@bindEvents()
		@showSpiner()

	maskSpiner : ->
		$('.lds-dual-ring').addClass('no_spinner').hide()

	unmaskSpiner : ->
		console.log 'unmaskSpiner -> '
		$('.lds-dual-ring').removeClass('no_spinner').show()
	
	showSpiner : ->
		that = @
		console.log '----------------------- > show spinner'
		@timelineSpiner.play()

	hideSpiner : ->
		that = @
		that.timelineSpiner.reverse()
		
	bindEvents : ->
		that = @
		that.spiner.on 'hidespiner', ->
			that.hideSpiner()

		that.spiner.on 'showspiner', ->
			console.log 'catch showspiner'
			that.showSpiner()

module.spiner = spiner