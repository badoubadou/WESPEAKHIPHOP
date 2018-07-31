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

			$('#list_artists li a').on 'click', ->
				event.preventDefault()
				idyoutube = YouTubeGetID($(this).attr('href'))
				console.log idyoutube

				$('.lds-dual-ring').removeClass 'done'
				console.log window.playerYT
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
					# $('#zone_youtube').addClass 'play'
				
				return
		

		window.onPlayerReady = (event) ->
			console.log 'onPlayerReady'
			event.target.playVideo()
			return

		window.onPlayerStateChange = (event) ->
			# if event.data == YT.PlayerState.PLAYING and !done
			# 	setTimeout stopVideo, 6000
			# 	done = true
			if event.data == YT.PlayerState.PLAYING and !done
				$('#zone_youtube').addClass 'play'
				$('#popin').removeClass('hide').trigger 'classChange'
				$('.lds-dual-ring').addClass 'done'
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

