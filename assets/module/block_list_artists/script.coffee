class player_youtube
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		YouTubeGetID = (url) ->
			ID = ''
			url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
			if url[2] != undefined
				ID = url[2].split(/[^0-9a-z_\-]/i)
				ID = ID[0]
			else
				ID = url
				ID

		window.onYouTubeIframeAPIReady = ->
			$('#zone_youtube .shield').on 'click', ->
				$('#zone_youtube').removeClass 'play'
				$('.lds-dual-ring').addClass 'done'
				window.playerYT.stopVideo()
				return

			$('#list_artists li a, #play-video-btn, #startvideo').on 'click', ->
				event.preventDefault()
				idyoutube = YouTubeGetID($(this).attr('href'))

				if !$('#artist_info').hasClass 'hide'
					$('#artist_info').addClass 'hide'
				
				$('.lds-dual-ring').removeClass 'done'
				if(!window.playerYT)
					console.log 'not yet'
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
							fs: 1, 
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
				return
		
		window.onPlayerReady = (event) ->
			console.log 'onPlayerReady'
			event.target.playVideo()
			return

		window.onPlayerStateChange = (event) ->
			if event.data == YT.PlayerState.PLAYING and !done
				$('#zone_youtube').addClass 'play'
				$('#popin').removeClass('hide').trigger 'classChange'
				$('.lds-dual-ring').addClass 'done'
				$('#popin .video-container').removeClass 'hide'
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

