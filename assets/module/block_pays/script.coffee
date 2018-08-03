class block_pays
	constructor: () ->
		@bindEvents()

	bindEvents : ->
		that = @
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

