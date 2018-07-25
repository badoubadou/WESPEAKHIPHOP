class player_youtube
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		window.onYouTubeIframeAPIReady = ->
			$('#zone_youtube .shield').on 'click', ->
				$('#zone_youtube').removeClass 'play'
				$('.lds-dual-ring').addClass 'done'
				window.playerYT.stopVideo()
				return

			$('#list_artists li a').on 'click', ->
				event.preventDefault()
				idyoutube = $(this).data 'idyoutube'
				$('.lds-dual-ring').removeClass 'done'
				if(!window.playerYT)
					window.playerYT = new (YT.Player)('player_youtube',
						height: '390'
						width: '640'
						videoId: idyoutube
						fs: 0
						playerVars: { 
							autoplay: 1, 
							showinfo: 0, 
							autohide: 1, 
							disablekb: 1, 
							enablejsapi: 1, 
							fs: 0, 
							modestbranding: true, 
							rel: 0, 
							hl: 'pt'
							cc_lang_pref: 'pt', 
							cc_load_policy: 1, 
							color: 'white', 
						}
						events:
							'onReady': onPlayerReady
							'onStateChange': onPlayerStateChange)
				else
					window.playerYT.loadVideoById idyoutube
					$('#zone_youtube').addClass 'play'
				
				return
				
		window.onPlayerReady = (event) ->
			$('#zone_youtube').addClass 'play'
			$('.lds-dual-ring').addClass 'done'
			event.target.playVideo()
			return

		window.onPlayerStateChange = (event) ->
			# if event.data == YT.PlayerState.PLAYING and !done
			# 	setTimeout stopVideo, 6000
			# 	done = true
			return

		window.stopVideo = ->
			window.playerYT.stopVideo()
			return

		tag.src = 'https://www.youtube.com/iframe_api'
		firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode.insertBefore tag, firstScriptTag
		player = undefined
		done = false

module.player_youtube = player_youtube


tag = document.createElement('script')

