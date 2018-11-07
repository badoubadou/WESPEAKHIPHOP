class spiner
	'use strict'
	constructor: (@myspiner) ->
		@subring = ['.ring_1', '.ring_2', '.ring_3']
		console.log '----------------- > constructor spinner'
		TweenLite.set(@subring, {xPercent: -50,yPercent: -50});
		@timelineSpiner = new TimelineMax(paused:true, onReverseComplete:@maskSpiner, onReverseCompleteParams:[@myspiner], onStart: @unmaskSpiner, onStartParams:[@myspiner])		
			.staggerFromTo(@subring, 2 ,{opacity: 0},{scale: 1, opacity: 1, ease:Power3.easeOut}, 0.5)			
		
		@bindEvents()
		@showSpiner()

	maskSpiner : (myspiner) ->
		myspiner.trigger 'loaderhidden'
		myspiner.addClass('no_spinner').hide()

	unmaskSpiner : (myspiner) ->
		console.log 'unmaskSpiner -> '
		myspiner.removeClass('no_spinner').show()
	
	showSpiner : ->
		that = @
		that.timelineSpiner.play()

	hideSpiner : ->
		that = @
		that.timelineSpiner.reverse()
		
	bindEvents : ->
		that = @
		that.myspiner.on 'hidespiner', ->
			that.hideSpiner(that.myspiner)

		that.myspiner.on 'showspiner', ->
			console.log 'catch showspiner'
			that.showSpiner(that.myspiner)

module.spiner = spiner