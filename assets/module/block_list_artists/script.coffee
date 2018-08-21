class player_youtube
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		that = @
		YouTubeGetID = (url) ->
			ID = ''
			url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
			if url[2] != undefined
				ID = url[2].split(/[^0-9a-z_\-]/i)
				ID = ID[0]
			else
				ID = url
				ID

		window.playYoutubeVideo = (idVideo)->
			console.log 'playYoutubeVideo : id. : '+idVideo
			if(!window.playerYT)
				console.log 'playerYT not yet created '
				window.playerYT = new (YT.Player)('player_youtube',
					height: '390'
					width: '640'
					videoId: idVideo
					fs: 0
					playerVars: { 
						autoplay: 1, 
						modestbranding: 1, 
						autohide: 1, 
						disablekb: 1,
						enablejsapi: 1,
						fs: 1, 
						rel: 0, 
						hl: $('#langage_short').val(),
						cc_lang_pref: $('#langage_short').val(), 
						cc_load_policy: 1, 
					}
					events:
						'onReady': onPlayerReady
						'onStateChange': onPlayerStateChange)
			else
				window.playerYT.loadVideoById idVideo

		window.onYouTubeIframeAPIReady = ->
			console.log 'onYouTubeIframeAPIReady = '+$('body').hasClass 'waiting-for-youtube'
			$('body').addClass 'onYouTubeIframeAPIReady'

			if $('body').hasClass 'waiting-for-youtube'
				console.log 'should playYoutubeVideo'
				window.playYoutubeVideo($('#idIntroYoutube').data('introid'))
				$('body').removeClass 'waiting-for-youtube'
				# $('#mask_shield').addClass 'hide'

			$('#zone_youtube .shield').on 'click', ->
				$('#zone_youtube').removeClass 'play'
				$('.lds-dual-ring').addClass 'done'
				window.playerYT.stopVideo()
				return

			$('#list_artists li a, #play-video-btn, #startvideo, a.watch').on 'click', (event) ->
				event.preventDefault()
				idyoutube = YouTubeGetID($(this).attr('href'))
				if !$('#artist_info').hasClass 'hide'
					$('#artist_info').addClass 'hide'
				$('.lds-dual-ring').removeClass 'done'
				window.currentArtist = $('#artist_info .info:not(.hide)').index()
			
				window.playYoutubeVideo(idyoutube)
				return
		
		window.onPlayerReady = (event) ->
			console.log 'onPlayerReady'
			event.target.playVideo()
			return

		window.updateTxtInfoMobile = (id) ->
			# --------- video start playing
			TweenMax.to('#artists_info li .warper', 0.5, { alpha: 0 , y:-30})
			TweenMax.to('#artists_info li:eq('+window.currentArtist+') .warper', 0.5, { alpha: 1 , y:0}, 0.5)


		window.onPlayerStateChange = (event) ->
			if event.data == YT.PlayerState.PLAYING and !done # --------- video start playing
				$('#zone_youtube').addClass 'play'
				$('#popin').removeClass('hide').trigger 'classChange'
				$('.lds-dual-ring').addClass 'done'
				$('#popin .video-container').removeClass 'hide'

				if window.pauseSound
					window.pauseSound()

				if window.isMobile()
					window.updateTxtInfoMobile($('#artist_info info:not(.hide)').index())
			
			else if event.data == YT.PlayerState.ENDED # --------- video start playing
				window.closePopin()
				console.log 'youtube is done'

			return

		window.stopVideo = ->
			console.log 'stop video'
			window.playerYT.stopVideo()
			$('#popin .video-container').addClass 'hide'
			return

		tag.src = 'https://www.youtube.com/iframe_api'
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore tag, firstScriptTag
		player = undefined
		done = false

module.player_youtube = player_youtube


tag = document.createElement('script')

