class block_pays
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		#------------------- FOOTER LISTNER -------------------#
		$('#mode_switcher').on 'switch_to_face_artist', ->
			window.pauseSound()

		#------------------- SOUND ---------------------------#
		$('#sound').on 'sound_off', ->
			if window.howlerBank[window.pCount]
				window.howlerBank[window.pCount].volume(0)

		$('#sound').on 'sound_on', ->
			if window.howlerBank[window.pCount]
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
				window.howlerBank[0].play()
			
			window.pauseSound = ()->
				if window.howlerBank
					console.log 'fade'
					window.howlerBank[window.pCount].stop()
					# window.howlerBank[window.pCount].fade(1, 0, 1000);
					# window.howlerBank[window.pCount].once 'fade', ->
					# 	return

				
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