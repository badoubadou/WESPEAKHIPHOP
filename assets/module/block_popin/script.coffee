class popin
	'use strict'
	constructor: () ->
		@timelinePopin = null
		@el_popin = $('#popin')
		@popin_content = $('.video-container, #abouttxt, #credittxt, #contacttxt, #artist_info, #shareinfo, #logowhite')
		@bindEvents()

	afterclose: (el_popin, popin_content)->
		console.log 'afterclose'
		el_popin.addClass('hide').trigger 'closePopin'
		el_popin.removeAttr('style')
		el_popin.find('*').removeAttr('style')
		popin_content.addClass 'hide'		
		
	closePopin: ->
		console.log 'closePopin @timelinePopin : '+@timelinePopin
		if(@timelinePopin)
			@timelinePopin.reverse()
		else		
			@el_popin.addClass('hide')
			@el_popin.trigger 'closePopin'
		
	bindEvents : ->
		that = @
		loadPopinAssets = ->
			$.get 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/sprite-popin.svg', (data) ->
				div = document.createElement('div')
				div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement)
				$( "#sprite_svg" ).append( div.innerHTML ).addClass('done')
				return

		showPopin = ($target)->
			that.el_popin.trigger 'showPopin'
			that.popin_content.addClass 'hide'
			if(that.el_popin.hasClass('hide'))
				that.el_popin.removeClass('hide')
			
			that.el_popin.removeClass 'greybg'
			
			if(($target == '#abouttxt') || ($target == '#credittxt') || ($target == '#contacttxt') )
				that.el_popin.addClass 'greybg'
				
			$($target).removeClass('hide')
			if($target == '.video-container')
				$('.video-container').addClass 'trans'
			
			that.timelinePopin = new TimelineMax({onReverseComplete:that.afterclose, onReverseCompleteParams:[that.el_popin, that.popin_content]})
			that.timelinePopin.from('#popin', .6 ,{opacity: 0, ease:Power3.easeOut})
				.fromTo($target, 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
		
		#------------------- ABOUT SHARE CREDIT MAIL --------------------------#
		$('.btnfooterpopin').on 'click touchstart', (e) ->
			loadPopinAssets()
			showPopin($(this).attr('href'))
			e.stopPropagation()
			e.preventDefault()
			return false
		
		#------------------- BIO  --------------------------#
		$('.about-btn').on 'click touchstart',(e) ->
			showPopin('#artist_info')
			e.stopPropagation()
			e.preventDefault()
			return false

		$('body').on 'finisedYT', ->
			that.closePopin()
			
		$('#close, #back').on 'click touchstart', (e) ->
			that.closePopin()
			e.stopPropagation()
			e.preventDefault()
			return false

		@el_popin.on 'showVideo', ->
			console.log 'belors ?? - showVideo'
			showPopin('.video-container')

module.popin = popin