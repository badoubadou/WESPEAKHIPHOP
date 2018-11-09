class logo
	'use strict'
	constructor: (@el_logowhite) ->
		TweenLite.set 'svg', visibility: 'visible'
		MorphSVGPlugin.convertToPath 'line'
		@drawLogoWhite = new TimelineMax({paused:true, onComplete:@finishedShowLogo, onCompleteParams:[@el_logowhite], onReverseComplete:@destroyLogo});
		@drawLogoWhite.from("#logowhite #mask1_2_black", 1, {drawSVG:0, ease:Power3.easeInOut} )
			.from("#logowhite #mask2_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.1 )
			.from("#logowhite #mask3_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.2 )
			.from("#logowhite #mask4_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.3 )
			.from("#logowhite #mask5_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.4 )
			.from("#logowhite #mask6_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.5 )
			.from("#logowhite #mask7_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.6 )
			.from("#logowhite #mask8_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.7 )
			.from("#logowhite #mask9_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.8 )
			.from("#logowhite #mask10_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.9 )
			.from("#logowhite #mask11_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},1 )
			.from("#logowhite #mask12_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},1.1 )
			.from("#logowhite #mask13_black", 1.3, {drawSVG:0, ease:Power3.easeInOut},1.2 )
		@dLB = new TimelineMax({paused:true});		
		# @dLB.from("#blacklogo #mask1_2_black", 1, {drawSVG: 0,ease: Power3.easeInOut})
		# 	.from("#blacklogo #mask2_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.1)
		# 	.from("#blacklogo #mask3_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.2)
		# 	.from("#blacklogo #mask4_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.3)
		# 	.from("#blacklogo #mask5_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.4)
		# 	.from("#blacklogo #mask6_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.5)
		# 	.from("#blacklogo #mask7_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.6)
		# 	.from("#blacklogo #mask8_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.7)
		# 	.from("#blacklogo #mask9_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.8)
		# 	.from("#blacklogo #mask10_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.9)
		# 	.from("#blacklogo #mask11_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1)
		# 	.from("#blacklogo #mask12_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1.1)
		# 	.from("#blacklogo #mask13_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1.2)
		@reverse_delay = null
		@bindEvents()
	
	finishedShowLogo : (el_logowhite)->
		el_logowhite.trigger 'finishedShowLogo'

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

	setAnnimBlack : ->
		@dLB.from("#blacklogo #mask1_2_black", 1, {drawSVG: 0,ease: Power3.easeInOut})
			.from("#blacklogo #mask2_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.1)
			.from("#blacklogo #mask3_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.2)
			.from("#blacklogo #mask4_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.3)
			.from("#blacklogo #mask5_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.4)
			.from("#blacklogo #mask6_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.5)
			.from("#blacklogo #mask7_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.6)
			.from("#blacklogo #mask8_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.7)
			.from("#blacklogo #mask9_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.8)
			.from("#blacklogo #mask10_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.9)
			.from("#blacklogo #mask11_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1)
			.from("#blacklogo #mask12_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1.1)
			.from("#blacklogo #mask13_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1.2)

	destroyLogo : ->
		console.log 'destroyLogo'
		if @el_logowhite
			console.log 'do destroyLogo'
			@el_logowhite.off()
			svglogo = @el_logowhite.find('svg').detach()
			$('#blacklogo').append(svglogo)
			@el_logowhite = null
			@setAnnimBlack()

		@drawLogoWhite = null
		@reverse_delay = null
		console.log 'destroyLogo'

	bindEvents : ->
		that = @
		that.el_logowhite.on 
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
			that.dLB.play()

module.logo = logo