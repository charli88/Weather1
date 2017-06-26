$(document).ready(function(){
	$('#submit').click(function(){
	
		var cityName=$('#input').val();
		var weatherURL="http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=b20804012f604fe0be183fa2719dd840";


		console.log(weatherURL);



		$.ajax({
			url:weatherURL,
			success:function(result){
				console.log(result);

				var html;
				var type = $('#select').val();
				var label = $('#select option:selected').text();
				
				switch(type) {
					case 'main':
					
						var main = result.main;
						html =
							'	<ul>' +
							'		<li><b>Температура:</b> ' + main.temp + ' <em>(min: ' + main.temp_min + ', max: ' + main.temp_max + ')</em></li>' +
							'		<li><b>Давление:</b> ' + main.pressure + ' <em>(Море: ' + main.sea_level + ')</em></li>' +
							'	</ul>';
						break;


					case 'weather':
						html = "	<ul>";
						$.each(result.weather, function(key, weather) {
							html +=
								'	<li><img class="weather-icon" src="http://openweathermap.org/img/w/' + weather.icon + '.png" /><b>' + weather.main + '</b></li>' + '<li><b>Описание:</b>' + weather.description + '</li>';
						});
						html += "	</ul>";
						break;    

					case 'wind':
						var wind = result.wind;
						html =
							'	<ul>' +
							'		<li><b>Направления:</b> ' + wind.deg + '</li>' +
							'		<li><b>Скорость:</b> ' + wind.speed + '</li>' +
							'	</ul>';
						break;  
						
					case 'sys':
						var sys = result.sys;
						html =
							'	<ul>' +
							'		<li><b>Страна:</b> ' + sys.country + '</li>' +
							'		<li><b>Закат:</b> ' + sys.sunset + '</li>' +
							'		<li><b>Восход:</b> ' + sys.sunrise + '</li>' +
							'	</ul>';
						break;  
						
						case 'coord':
						var coord = result.coord;
						html =
							'	<ul>' +
							'		<li><b>Долгота:</b> ' + coord.lon + '</li>' +
							'		<li><b>Широта:</b> ' + coord.lat + '</li>' +
							
							'	</ul>';
						break;  
						
						
						
					default:return;}
				$('#content').prepend(
					'<article class="weather">' +
					'	<h2>' + result.name + ' <em>(' + label + ')</em></h2>' +
					'	<div class="weather-main">' +
							html +
					'	</div>' +
					'</article>'

				);
			}		
		})
	})
});
