class logo
	'use strict'
	constructor: (@spiner) ->
		TweenLite.set 'svg', visibility: 'visible'
		MorphSVGPlugin.convertToPath 'line'
		@drawLogoWhite = new TimelineMax({paused:true, onComplete:@finishedShowLogo, onReverseComplete:@finishedHideLogo});
		@drawLogoWhite.from("#logowhite #mask1_2_", 1, {drawSVG:0, ease:Power3.easeInOut} )
			.from("#logowhite #mask2", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.1 )
			.from("#logowhite #mask3", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.2 )
			.from("#logowhite #mask4", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.3 )
			.from("#logowhite #mask5", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.4 )
			.from("#logowhite #mask6", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.5 )
			.from("#logowhite #mask7", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.6 )
			.from("#logowhite #mask8", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.7 )
			.from("#logowhite #mask9", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.8 )
			.from("#logowhite #mask10", 1.3, {drawSVG:0, ease:Power3.easeInOut},0.9 )
			.from("#logowhite #mask11", 1.3, {drawSVG:0, ease:Power3.easeInOut},1 )
			.from("#logowhite #mask12", 1.3, {drawSVG:0, ease:Power3.easeInOut},1.1 )
			.from("#logowhite #mask13", 1.3, {drawSVG:0, ease:Power3.easeInOut},1.2 )
		@dLB = new TimelineMax({paused:true, onComplete:@finishedBlackLogo});
		@dLB.from("#mask1_2_black", 1, {drawSVG: 0,ease: Power3.easeInOut})
			.from("#mask2_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.1)
			.from("#mask3_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.2)
			.from("#mask4_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.3)
			.from("#mask5_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.4)
			.from("#mask6_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.5)
			.from("#mask7_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.6)
			.from("#mask8_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.7)
			.from("#mask9_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.8)
			.from("#mask10_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 0.9)
			.from("#mask11_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1)
			.from("#mask12_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1.1)
			.from("#mask13_black", 1.3, {drawSVG: 0,ease: Power3.easeInOut}, 1.2)
		@reverse_delay = null
		@bindEvents()
	
	finishedBlackLogo : ->
		this.kill()

	finishedHideLogo : ->
		$('#logowhite').remove()

	showLogoBlack : ->
		@dLB.play()
	
	finishedShowLogo : ->
		$('#logowhite').trigger 'finishedShowLogo'

	showLogoWhite : ->
		@drawLogoWhite.play()
	
	hideLogoWhite : ->
		that = @
		$('#logowhite').data('animstatus', 'playing')
		console.log 'catch hideLogo  data = '+$('#logowhite').data('animstatus')
		@reverse_delay = TweenMax.delayedCall 4, ->
			that.drawLogoWhite.reverse()	
		
	pausehideLogo : ->
		console.log 'pausehideLogo data = '+$('#logowhite').data('animstatus')
		$('#logowhite').data('animstatus', 'paused')
		@reverse_delay.pause()	
		
	resumehideLogo : ->
		$('#logowhite').data('animstatus', 'playing')
		@reverse_delay.resume()	

	destroyLogo : ->
		$('#logowhite').off()
		$('#logowhite').remove()

	bindEvents : ->
		that = @
		$('#logowhite').on 'destroyLogo', ->
			that.destroyLogo()

		$('#logowhite').on 'showLogo', ->
			that.showLogoWhite()

		$('#logowhite').on 'hideLogo', ->
			console.log 'catch hideLogo'
			that.hideLogoWhite()

		$('#logowhite').on 'pausehideLogo', ->
			console.log 'catch pausehideLogo'
			that.pausehideLogo()

		$('#logowhite').on 'resumehideLogo', ->
			console.log 'catch resumehideLogo'
			that.resumehideLogo()

		$('.logoWSH').on 'showLogo', ->
			console.log 'show logo'
			$('.logoWSH').off()
			that.showLogoBlack()

module.logo = logo