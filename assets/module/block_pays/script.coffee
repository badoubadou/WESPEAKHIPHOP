class block_pays
	constructor: () ->
		@soundInitiated = false
		@loadMap()
		@allSound = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
		@playlistUrls = @allSound
		@ordre_pays = $('#artists_info_map').data 'ordre_pays'
		@bindEvents()
		console.log 'block_pays constructor'
		# @buildContrySound()

	loadMap : ->
		console.log '---> load big map'
		that = @
		$.get 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/map.svg', (data) ->
			console.log '---> big map loaded'
			div = document.createElement('div')
			div.innerHTML = (new XMLSerializer).serializeToString(data.documentElement)
			$( "#big_map" ).append( div.innerHTML )
			return

	bindEvents : ->
		that = @
		#------------------- FOOTER LISTNER -------------------#
		$('#mode_switcher').on 'switch_to_face_pays', ->
			that.buildContrySound()

		$('#mode_switcher').on 'switch_to_face_artist', ->
			console.log 'switch_to_face_artist'
			if window.pauseSound
				window.pauseSound()
			$('.pastille').removeClass 'big'
			$('#artists_info_map .block_contry').removeClass 'opacity_1'
			console.log 'switch_to_face_artist'

		#------------------- SOUND - CONTROL ------------------#
		$('#sound').on 'sound_off', ->
			console.log 'window.pCount ='+window.pCount
			console.log 'window.howlerBank.length ='+window.pCount
			if that.soundInitiated
				window.howlerBank[window.pCount].volume(0)

		$('#sound').on 'sound_on', ->
			if that.soundInitiated
				window.howlerBank[window.pCount].volume(1)

		#------------------- pastille -------------------------#
		$('#mouse_over_bg').on 'mouseover':(e) ->
			if @playlistUrls.length < 27
				that.buildContrySound()

		$('.pastille').on 'mouseover':(e) ->
			if $(this).hasClass 'big'
				return 
			that.buildContrySound($(this),true)

		$('.pastille').on 'click':(e) ->
			if $(this).hasClass 'big'
				that.buildContrySound()
			else
				that.buildContrySound($(this))

	#------------------- SOUND - PLAYER -----------------------#
	buildContrySound : (pastille, ismouseover)->
		that = @
		console.log 'buildContrySound - '+pastille
		if pastille
			that.playlistUrls = pastille.data 'sound'
			defaultPlaylist = false
		else
			console.log 'no pastille'
			that.playlistUrls = that.allSound 
			defaultPlaylist = true
			console.log '??? ------------->'+that.ordre_pays[0]

		window.pauseSound()
		window.pCount = 0
		window.howlerBank = []

		onPlay = (e) ->
			if pastille
				nicename = $(pastille).data 'nicename'
			else
				nicename = that.ordre_pays[window.pCount]

			that.openContryBox($('.pastille[data-nicename="'+nicename+'"]'), ismouseover)
			console.log 'start '+window.pCount+'; contry : '+ nicename
			return

		onEnd = (e) ->
			window.pCount = if window.pCount + 1 != window.howlerBank.length then window.pCount + 1 else 0
			console.log 'howlerBank Play pCount = '+window.pCount
			if !$('#sound').hasClass 'actif'
				window.howlerBank[window.pCount].volume(0)
			window.howlerBank[window.pCount].play()
			return

		# build up howlerBank:     
		that.playlistUrls.forEach (current, i) ->
			window.howlerBank.push new Howl(
				src: [ 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/'+that.playlistUrls[i]+'.mp3' ]
				onend: onEnd
				onplay: onPlay
				buffer: true)
			return
		# initiate the whole :
		if !$('#sound').hasClass 'actif'
			window.howlerBank[0].volume(0)
		window.howlerBank[0].play()
		that.soundInitiated = true
		return 
	
	window.pauseSound = ()->
		if window.howlerBank
			console.log 'fade'
			window.howlerBank[window.pCount].stop()
		
	closeContryBox : ()->
		$('.pastille').removeClass 'big'
		$('#artists_info_map .block_contry').removeClass 'opacity_1'
		$('.big').off 'mouseleave'
		# window.pauseSound()

	openContryBox : (pastille, ismouseover)->
		$('.pastille').removeClass 'big'
		$('#artists_info_map .block_contry').removeClass 'opacity_1'
		place = '.'+pastille.data 'nicename'
		$('#artists_info_map '+place).addClass 'opacity_1'
		if @playlistUrls.length < 27 && !ismouseover
			pastille.addClass 'big'
			
		# @buildContrySound(pastille)
			
module.block_pays = block_pays