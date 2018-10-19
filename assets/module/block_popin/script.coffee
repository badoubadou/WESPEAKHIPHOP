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
			$('#popin').toggleClass('hide').trigger 'classChange'
			$($target).removeClass('hide')
			if($target == '.video-container')
				$('.video-container').addClass 'trans'
			that.timelinePopin = new TimelineMax({onReverseComplete:that.afterclose})
			that.timelinePopin.from('#popin', .6 ,{opacity: 0, ease:Power3.easeOut})
				.fromTo($target, 0.5, {alpha: 0, marginTop:30, ease:Power1.easeInOut},{alpha: 1, marginTop:0})
		
		#------------------- ABOUT  --------------------------#
		$('#apropos_btn').on 'click': (e) ->
			e.preventDefault()
			showPopin('#popin #abouttxt')
		#------------------- CREDIT  --------------------------#
		$('#credit_btn').on 'click': (e) ->
			e.preventDefault()
			showPopin('#popin #credittxt')
		#------------------- CONTACT  --------------------------#
		$('#mail_btn').on 'click': (e) ->
			e.preventDefault()
			showPopin('#popin #contacttxt')
		#------------------- CREDIT  --------------------------#
		$('#about-btn, .block_contry .bio').on 'click':(e) ->
			e.preventDefault()
			if $("#mode_switcher [data-face='face_pays']").hasClass 'selected'
				artistid = $(this).data('artistid') - 1
				console.log('artistid ='+artistid)
				$('#popin #artist_info .info').addClass 'hide'
				$('#popin #artist_info .info:eq('+artistid+')').removeClass 'hide'
				showPopin('#artist_info')
				return
			showPopin('#artist_info')
			
		$('#share').on 'click': (e) ->
			e.preventDefault()
			showPopin('#shareinfo')

		$('#close, #back').on 'click', ->
			that.closePopin()

		$('#popin').on 'showVideo', ->
			showPopin('.video-container')

module.popin = popin