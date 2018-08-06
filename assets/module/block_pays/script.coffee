class block_pays
	constructor: () ->
		@soundInitiated = false
		@bindEvents()

	bindEvents : ->
		that = @
		#------------------- FOOTER LISTNER -------------------#
		$('#mode_switcher').on 'switch_to_face_artist', ->
			if window.pauseSound
				window.pauseSound()
			$('.pastille').removeClass 'big'
			$('#artists_info_map .block_contry').removeClass 'opacity_1'
			console.log 'switch_to_face_artist'

		#------------------- SOUND ---------------------------#
		$('#sound').on 'sound_off', ->
			console.log 'window.pCount ='+window.pCount
			console.log 'window.howlerBank.length ='+window.pCount
			if that.soundInitiated
				window.howlerBank[window.pCount].volume(0)

		$('#sound').on 'sound_on', ->
			if that.soundInitiated
				window.howlerBank[window.pCount].volume(1)


		#------------------- pastille -------------------#
		$('.pastille').on 'click':(e) ->
			buildContrySound = (pastille)->
				window.pauseSound()
				window.pCount = 0
				playlistUrls = pastille.data 'sound'
				window.howlerBank = []

				onEnd = (e) ->
					window.pCount = if window.pCount + 1 != window.howlerBank.length then window.pCount + 1 else 0
					console.log 'howlerBank Play pCount = '+window.pCount
					if !$('#sound').hasClass 'actif'
						window.howlerBank[window.pCount].volume(0)
					window.howlerBank[window.pCount].play()
					return

				# build up howlerBank:     
				playlistUrls.forEach (current, i) ->
					console.log playlistUrls[i]
					window.howlerBank.push new Howl(
						src: [ 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/'+playlistUrls[i]+'.mp3' ]
						onend: onEnd
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
				
			closeContryBox = ()->
				$('.pastille').removeClass 'big'
				$('#artists_info_map .block_contry').removeClass 'opacity_1'
				window.pauseSound()

			openContryBox = (pastille)->
				$('.pastille').removeClass 'big'
				$('#artists_info_map .block_contry').removeClass 'opacity_1'
				place = '.'+pastille.data 'nicename'
				pastille.addClass 'big'
				$('#artists_info_map '+place).addClass 'opacity_1'
				buildContrySound(pastille)


			if $(this).hasClass 'big'
				closeContryBox()
			else
				openContryBox($(this))
				
module.block_pays = block_pays