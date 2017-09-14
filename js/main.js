$(function(){
	/*start-registr-form*/

		//input select-form
			$(".js-example-basic-single").each(function(){
				$(this).select2({
					placeholder: $(this).data('placeholder'),
					allowClear: true,
				});
			});
			$('.select').on('select2:close', function(){
			    var selectedValue = $(this).val();
			});
		//input select-form end

		//input img-form
		    $(".file-upload input[type=file]").change(function(){
		         var filename = $(this).val().replace(/.*\\/, "");
		         $("#filename").val(filename);
		    });
		    function readURL(input, that) {
		        if (input.files && input.files[0]) {
		            var reader = new FileReader();
		            
		            reader.onload = function (e) {
		            	console.log(e.target.result);
		            	$('.'+that+'').attr('style',  'background-image:url('+e.target.result+')');
		                // $('.'+that+'').attr('src', e.target.result);
		            }
		            
		            reader.readAsDataURL(input.files[0]);
		        }
		    }
		    $(".file-upload__img").change(function(){
		    	var that = $(this).data('exact');
		        readURL(this, that);
		    });

		    console.log($('#filename'));
		    $('.file-delete__button').on('click', function(e){
		    	$('.logo-upload').removeAttr('style ');
		    });


	    //input img-form end

	    //tabs registr
		    $(document).on('click', '.tabs__link', function(){
		    	$('.tabs__link').removeClass('tabs__link-active');
		    	$(this).addClass('tabs__link-active');
		    	var dataId = $(this).data('target');
		    	var tab = $(this).parent().parent().find('#'+dataId+'');
		    	$('.tab-block').removeClass('tab-block-active');
		    	tab.addClass('tab-block-active');
		    });
		    $(document).on('click', '.label__add-button', function(e){
		    	e.preventDefault();
		    	var choiceBut = $(this).attr('class').split(' ')[1];
		    	if(choiceBut == 'label__add-button-email'){
		    		$(this).parent().append('<input type="text" class="label__text label__text-long label__text-right">');
		    	}
		    	if(choiceBut == 'label__add-button-number'){
		    		$(this).parent().append('<input type="text" class="label__added label__added-right">');
		    	}
		    });
	    //tabs registr end

	/*end-registr-form*/

	//favorite-click
		$(document).on('click', '.add-favorites__button', function(){
			var addBlock = $(this).parent().parent();
			if(!addBlock.hasClass('favorites-active')){
				addBlock.addClass('favorites-active');
			}else{
				addBlock.removeClass('favorites-active');
			}
		});
	//favorite-click end


	//select-city functions-start
		$(document).on('click', '.city-value', function(e){
			var parTab = $(this).parent().find('.tab__all').addClass('tab__all-show');
			var layout = $('.layout-bg');

			$('body').addClass('layout-opened');

			if (! layout.length ) {
			    layout = $('<div class="layout-bg"><div>')
			        .appendTo('body');
			}
			layout.fadeIn(200);
			layout.on('click', function() {
			    hideLayout();
			})

		});

		function hideLayout() {
		    var layout = $('.layout-bg');
		    $('body').removeClass('layout-opened');
			$('.tab__all').removeClass('tab__all-show');
		    if (! layout.length ) return;
		    layout.fadeOut(200);
		};


		$('.radio-select').change(function(){
			var valuePar = $(this).parent().parent().parent();
			var valueRadio = $(this).val();
			if(valueRadio == 'tab-kaz'){
				valuePar.find('.tab-block').removeClass('tab-block-active');
				valuePar.find('#tab-kaz').addClass('tab-block-active');
			}else{
				valuePar.find('.tab-block').removeClass('tab-block-active');
				valuePar.find('#tab-all').addClass('tab-block-active');
			}
		});

		$(document).on('click', '.list-choice__item', function(){
			var thisVal = $(this).text();
			var thisInput = $(this).parent().parent().parent().parent().find('.city-value');
			thisInput.attr('value', ''+thisVal+'');
			$('.tab__all').removeClass('tab__all-show');
			return;
		});
	//select-city functions-end


	//MAp yandex
		if ($('#map').length) {
			var myMap;
			ymaps.ready(init);
			    function init(){     
					// Создаем модель мультимаршрута.

					var multiRoute = new ymaps.multiRouter.MultiRoute({
					    // Описание опорных точек мультимаршрута.

					    referencePoints: [
					        [55.734876, 37.59308],
					        "Москва, ул. Мясницкая"
					    ],
					    
					}, {
						wayPointStartIconLayout: "default#image",
						wayPointStartIconImageHref: "images/icons/map-icon.png",
						wayPointStartIconImageSize: [41, 51],
						wayPointStartIconImageOffset: [-20, -51],

						wayPointFinishIconLayout: "default#image",
						wayPointFinishIconImageHref: "images/icons/map-iconB.png",
						wayPointFinishIconImageSize: [41, 51],
						wayPointFinishIconImageOffset: [-20, -51],

						routeStrokeWidth: 1,
				        routeStrokeColor: "#ccc",
				        routeActiveStrokeWidth: 4,
				        routeActiveStrokeColor: "#f08c00",

						viaPointIconRadius: 0,
						viaPointIconFillColor: "#000088",
						viaPointActiveIconFillColor: "#E63E92",

					    boundsAutoApply: true
					});

				    viaPointButtonEconom = new ymaps.control.Button({
				        data: { content: "Эконом" },
				        options: { selectOnClick: true }
				    });

					viaPointButtonShort = new ymaps.control.Button({
					    data: { content: "Короткий" },
					    options: { selectOnClick: true }
					});

					viaPointButtonFast = new ymaps.control.Button({
					    data: { content: "Быстрый" },
					    options: { selectOnClick: true }
					});

					viaPointButtonFast.events.add('select', function (event) {
					    referencePoints = multiRoute.model.getReferencePoints();
					    console.log(referencePoints);
					    referencePoints = [ [55.734876, 37.59308], [55.746870, 37.628554], [55.753067, 37.648638], [55.758439, 37.638424], "Москва, ул. Мясницкая"];
					    var lg = referencePoints.length-2;
					    
					    multiRoute.model.setReferencePoints(referencePoints, [1, 2, 3]);

					    myMap.geoObjects.add(multiRoute);
					    console.log(referencePoints);
					    console.log(multiRoute.getActiveRoute().properties.get("duration").text);
					   	routes = multiRoute.model.getRoutes();
					    console.log(routes);
					    // var pizda = multiRoute.getActiveRoute().properties._data.distance.text;
					    // var asdsad = routes;
					    // console.log(pizda);
					    // var timeMap = routes[1].properties.get("duration").text;
					    // var distanceMap = routes[1].properties.get("distance").text;
					    // $('.km-distance').text(distanceMap);
					    // $('.time-duration').text(timeMap);
					});

					viaPointButtonFast.events.add('deselect', function () {
						var referencePoints = multiRoute.model.getReferencePoints();
						var lg = referencePoints.length-2;
						referencePoints.splice(1, lg);

						multiRoute.model.setReferencePoints(referencePoints, []);
					});

					ymaps.modules.require([
					    'MultiRouteCustomView'
					], function (MultiRouteCustomView) {
					    new MultiRouteCustomView(multiRouteModel);
					});

			    	// Создаем карту с добавленной на нее кнопкой.
			    	var myMap = new ymaps.Map('map', {
			    	        center: [55.750625, 37.626],
			    	        zoom: 7,
			    	        controls: [viaPointButtonFast, viaPointButtonShort, viaPointButtonEconom]
			    	    }, {
			    	        buttonMaxWidth: 300
			    	    }),
			    	    firstButton = new ymaps.control.Button("Кнопка");
			    		myMap.controls.add(firstButton, {float: 'right'});
				 		myMap.geoObjects.add(multiRoute);
				 		console.log(referencePoints);
				 		console.log(routes);
			    }

		}
		// if ($('#map').length) {
		// 	var myMap;
		// 	ymaps.ready(init);
		// 	function init(){ 
		// 		var myMap = new ymaps.Map("map", {
		// 		         center: [55.745508, 37.435225],
		// 		         zoom: 13
		// 		     }, {
		// 		         searchControlProvider: 'yandex#search'
		// 		     });

		// 	}
		// }
	//end map

	// city popup
		$(document).on('click', '.city__item', function(e){
			if($(this).hasClass('city__item-active')){
				$(this).removeClass('city__item-active')
				return;
			}
			$(this).addClass('city__item-active');
		})
	//city popup end

	//lang-popup
		$(document).on('click', '.lang', function(e){
			if($(this).hasClass('lang-show')){
				$(this).removeClass('lang-show')
				return;
			}
			$(this).addClass('lang-show');
		})
	//lang-popup end

	//enter-popup
		$(document).on('click', '.connect-block__item-enter', function(e){
			e.preventDefault();
			if($('.enter-popup').hasClass('enter-popup-active')){
				$('.enter-popup').removeClass('enter-popup-active')
				return;
			}
			$('.enter-popup').addClass('enter-popup-active');
		})
	//enter end

	inst = $('[data-remodal-id=search-modal]').remodal();

//end main
});