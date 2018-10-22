class spiner
	'use strict'
	constructor: (@spiner) ->
		console.log '----------------- > constructor spinner'

		TweenLite.set(['.ring_1', '.ring_2', '.ring_3'], {xPercent: -50,yPercent: -50});
		
		@timelineSpiner = new TimelineMax(paused:true, onReverseComplete:@maskSpiner, onStart: @unmaskSpiner)		
			.staggerFromTo(['.ring_1', '.ring_2', '.ring_3'], 2 ,{scale: 0.5, opacity: 0},{scale: 1, opacity: 1, ease:Power3.easeOut}, 0.5)			
			# .fromTo('.lds-dual-ring', 0.5 ,{opacity: 0},{opacity: 1, ease:Power3.easeOut}, '-=2')	
		@bindEvents()
		@showSpiner()

	maskSpiner : ->
		$('.lds-dual-ring').trigger 'loaderhidden'
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