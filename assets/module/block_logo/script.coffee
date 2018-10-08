class logo
	constructor: (@spiner) ->
		TweenLite.set 'svg', visibility: 'visible'
		MorphSVGPlugin.convertToPath 'line'
		@drawLogoWhite = new TimelineMax({paused:true});
		@drawLogoWhite.from("#logowhite #mask1_2_", 1, {drawSVG:0, ease:Power1.easeInOut} )
			.from("#logowhite #mask2", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.1 )
			.from("#logowhite #mask3", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.2 )
			.from("#logowhite #mask4", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.3 )
			.from("#logowhite #mask5", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.4 )
			.from("#logowhite #mask6", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.5 )
			.from("#logowhite #mask7", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.6 )
			.from("#logowhite #mask8", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.7 )
			.from("#logowhite #mask9", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.8 )
			.from("#logowhite #mask10", 1.3, {drawSVG:0, ease:Power1.easeInOut},0.9 )
			.from("#logowhite #mask11", 1.3, {drawSVG:0, ease:Power1.easeInOut},1 )
			.from("#logowhite #mask12", 1.3, {drawSVG:0, ease:Power1.easeInOut},1.1 )
			.from("#logowhite #mask13", 1.3, {drawSVG:0, ease:Power1.easeInOut},1.2 )


		@dLB = new TimelineMax({paused:true});
		@dLB.from("#mask1_2_black", 1, {drawSVG: 0,ease: Power1.easeInOut})
			.from("#mask2_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.1)
			.from("#mask3_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.2)
			.from("#mask4_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.3)
			.from("#mask5_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.4)
			.from("#mask6_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.5)
			.from("#mask7_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.6)
			.from("#mask8_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.7)
			.from("#mask9_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.8)
			.from("#mask10_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 0.9)
			.from("#mask11_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 1)
			.from("#mask12_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 1.1)
			.from("#mask13_black", 1.3, {drawSVG: 0,ease: Power1.easeInOut}, 1.2)

		@bindEvents()
	
	showLogoBlack : ->
		@dLB.play()
	
	showLogoWhite : ->
		@drawLogoWhite.play()
	
	hideLogoWhite : ->
		@drawLogoWhite.reverse()
	
	bindEvents : ->
		that = @
		$('#logowhite').on 'showLogo', ->
			that.showLogoWhite()
		$('#logowhite').on 'hideLogo', ->
			that.hideLogoWhite()
		$('.logoWSH').on 'showLogo', ->
			console.log 'show logo'
			that.showLogoBlack()

module.logo = logo