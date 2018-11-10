class logo
	'use strict'
	constructor: (@el_logowhite) ->
		TweenLite.set 'svg', visibility: 'visible'
		MorphSVGPlugin.convertToPath 'line'
		@drawLogoWhite = new TimelineMax({paused:true, onComplete:@finishedShowLogo, onCompleteParams:[@el_logowhite], onReverseComplete:@finishedHideLogo, onReverseCompleteParams:[@el_logowhite]});
		@drawLogoWhite.from("#mask1_2_black", 1, {drawSVG:0, ease:Power3.easeInOut} )
			.from("#mask2_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.1 )
			.from("#mask3_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.2 )
			.from("#mask4_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.3 )
			.from("#mask5_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.4 )
			.from("#mask6_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.5 )
			.from("#mask7_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.6 )
			.from("#mask8_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.7 )
			.from("#mask9_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.8 )
			.from("#mask10_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.9 )
			.from("#mask11_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},1 )
			.from("#mask12_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},1.1 )
			.from("#mask13_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},1.2 )
		@dLB = new TimelineMax({paused:true});		
		@reverse_delay = null
		@bindEvents()
	
	finishedShowLogo : (el_logowhite)->
		el_logowhite.trigger 'finishedShowLogo'

	finishedHideLogo : (el_logowhite)->
		el_logowhite.trigger 'finishedHideLogo'

	showLogoWhite : ->
		@drawLogoWhite.play()
	
	hideLogoWhite : ->
		console.log 'hideLogoWhite'
		that = @
		if @el_logowhite
			@el_logowhite.data('animstatus', 'playing')
			@reverse_delay = TweenMax.delayedCall 4, ->
				if that.drawLogoWhite
					that.drawLogoWhite.reverse()	
			
	pausehideLogo : ->
		console.log 'pausehideLogo'
		if @el_logowhite
			@el_logowhite.data('animstatus', 'paused')
			@reverse_delay.pause()	
			
	resumehideLogo : ->
		console.log 'resumehideLogo'
		if @el_logowhite
			@el_logowhite.data('animstatus', 'playing')
			@reverse_delay.resume()	

	destroyLogo : ->
		console.log 'destroyLogo -> is in fact move logo '
		if @el_logowhite
			console.log 'do move logo'
			@el_logowhite.off()
			@drawLogoWhite.seek(@drawLogoWhite.duration())
			$('#txth1').remove()
			svglogo = @el_logowhite.find('svg').detach()
			$('#blacklogo').append(svglogo)
			@el_logowhite = null
			@reverse_delay = null
			$('.btn_intro a').off().remove()

	bindEvents : ->
		that = @
		that.el_logowhite.on 
			'finishedHideLogo': ->
				that.destroyLogo()
			'destroyLogo': ->
				that.destroyLogo()
				return
			'showLogo': ->
				that.showLogoWhite()
				return
			'hideLogo': ->
				that.hideLogoWhite()
				return
			'pausehideLogo': ->
				that.pausehideLogo()
				return
			'resumehideLogo': ->
				that.resumehideLogo()
				return

		$('.logoWSH').on 'showLogo', ->
			$(this).off()
			that.drawLogoWhite.play()

module.logo = logo