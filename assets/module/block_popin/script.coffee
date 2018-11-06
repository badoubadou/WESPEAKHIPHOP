class popin
	'use strict'
	constructor: () ->
		@timelinePopin = null
		@bindEvents()

	afterclose: ->
		console.log 'afterclose'
		$('#popin').addClass('hide').trigger('classChange')
		$('#popin').addClass('hide').trigger('closePopin')
		$('#popin').removeAttr('style')
		$('#popin').find('*').removeAttr('style')
		$('.video-container, #abouttxt, #artist_info, #shareinfo, #logowhite').addClass 'hide'		
		
	closePopin: ->
		console.log 'closePopin @timelinePopin : '+@timelinePopin
		if(@timelinePopin)
			@timelinePopin.reverse()
		else		
			console.log 'trigger : classChange closePopin'
			$('#popin').addClass('hide')
			$('#popin').trigger 'classChange'
			$('#popin').trigger 'closePopin'
		
	bindEvents : ->
		that = @
		showPopin = ($target)->
			$('.video-container, #abouttxt, #credittxt, #contacttxt, #artist_info, #shareinfo, #logowhite').addClass 'hide'
			if($('#popin').hasClass('hide'))
				$('#popin').removeClass('hide').trigger 'classChange'
			
			$('#popin').removeClass 'greybg'
			
			console.log '??????? fuck it : '+($target == '#popin #credittxt')+'. $target : '+$target
			if($target == '#popin #abouttxt')
				$('#popin').addClass 'greybg'
			if($target == '#popin #credittxt')
				$('#popin').addClass 'greybg'
			if($target == '#popin #contacttxt')
				$('#popin').addClass 'greybg'
				
			$($target).removeClass('hide')
			if($target == '.video-container')
				$('.video-container').addClass 'trans'
			
			that.timelinePopin = new TimelineMax({onReverseComplete:that.afterclose})
			that.timelinePopin.from('#popin', .6 ,{opacity: 0, ease:Power3.easeOut})
				.fromTo($target, 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
		
		#------------------- ABOUT  --------------------------#
		$('#apropos_btn').on 'click touchstart', (e) ->
			showPopin('#popin #abouttxt')
			e.stopPropagation()
			e.preventDefault()
			return false
		#------------------- CREDIT  --------------------------#
		$('#credit_btn').on 'click touchstart', (e) ->
			showPopin('#popin #credittxt')
			e.stopPropagation()
			e.preventDefault()
			return false
		#------------------- CONTACT  --------------------------#
		$('#mail_btn').on 'click touchstart', (e) ->
			showPopin('#popin #contacttxt')
			e.stopPropagation()
			e.preventDefault()
			return false
		#------------------- CREDIT  --------------------------#
		$('#about-btn, .block_contry .bio').on 'click touchstart',(e) ->
			if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
				artistid = $(this).data('artistid') - 1
				console.log('artistid ='+artistid)
				$('#popin #artist_info .info').addClass 'hide'
				$('#popin #artist_info .info:eq('+artistid+')').removeClass 'hide'
				showPopin('#artist_info')
				return
			showPopin('#artist_info')
			e.stopPropagation()
			e.preventDefault()
			return false
			
		$('#share').on 'click touchstart', (e) ->
			showPopin('#shareinfo')
			e.stopPropagation()
			e.preventDefault()
			return false

		$('#close, #back').on 'click touchstart', (e) ->
			that.closePopin()
			e.stopPropagation()
			e.preventDefault()
			return false

		$('#popin').on 'showVideo', ->
			console.log 'belors ?? - showVideo'
			showPopin('.video-container')

module.popin = popin