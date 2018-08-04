class block_pays
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		that = @
		bell = new Wad(source: 'https://s3.eu-west-3.amazonaws.com/wespeakhiphop-assets/1.mp3')
		bell.play()
		# bell.stop()
		# ------------ SHOW BTN ------------------ #
		$('.pastille').on 'click':(e) ->
			if $(this).hasClass 'big'
				$('.pastille').removeClass 'big'
				$('#artists_info_map .block_contry').removeClass 'opacity_1'
			else
				$('.pastille').removeClass 'big'
				$('#artists_info_map .block_contry').removeClass 'opacity_1'
				place = '.'+$(this).data 'nicename'
				$(this).addClass 'big'
				$('#artists_info_map '+place).addClass 'opacity_1'
				
			
		
module.block_pays = block_pays

