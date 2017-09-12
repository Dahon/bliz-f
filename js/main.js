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
		            	console.log(that);
		                $('.'+that+'').attr('src', e.target.result);
		            }
		            
		            reader.readAsDataURL(input.files[0]);
		        }
		    }
		    $(".file-upload__img").change(function(){
		    	var that = $(this).data('exact');
		        readURL(this, that);
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
						    var referencePoints = multiRoute.model.getReferencePoints();
						    referencePoints.splice(1, -1, [55.746870, 37.628554], [55.753067, 37.648638], [55.758439, 37.638424]);
						    var lg = referencePoints.length-2;
						    multiRoute.model.setReferencePoints(referencePoints, [1, 2, 3]);
						    var routes = multiRoute.model.getRoutes();
						    var asdsad = routes;
						    console.log(asdsad);
						    var timeMap = routes[1].properties.get("duration").text;
						    var distanceMap = routes[1].properties.get("distance").text;
						    $('.km-distance').text(distanceMap);
						    $('.time-duration').text(timeMap);
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
				    }
	     
/*		    var myMap;
		    var coords = {
		    	1: [55.831903, 37.411961],
		    	2: [55.763338, 37.565466],
		    	3: [55.800584, 37.675638],
		    	4: [55.744522, 37.616378],
		    	5: [55.780898, 37.642889],
		    	6: [55.793559, 37.435983],
		    	7: [55.800584, 37.675638],
		    	8: [55.744522, 37.616378],
		    };
		    var currentPoint;

		    function init(){     
		     	myMap = new ymaps.Map('map', {
	 	            center: [55.76, 37.64],
	 	            zoom: 10,
	 	            controls: [],
	 	        })

		     	setPoints(coords);

		 	    $('.map-controller a').click(function(e) {
		 	    	e.preventDefault();
		 	    	if (($(this).data('id') != currentPoint)) {
			 	    	currentPoint = $(this).data('id');
			 	    	filterPoints(currentPoint);
		 	    	}
		 	    	var mainHid = $(document).find('.block-cont#hid-'+$(this).data('id')+'');
		 	    	mainHid.addClass('active');
		 	    	$('.map-controller').addClass('hidden');
		 	    	$('.reset-map').addClass('active');
		 	    	return false;
		 	    });

		 	    $('.reset-map').click(function(e) {
		 	    	e.preventDefault();
			     	setPoints(coords);
			     	$(this).removeClass('active');
					$('.block-cont').removeClass('active');
					$('.map-controller').removeClass('hidden');
		 	    	return false;
		 	    })

		    }

		    function setPoints (coords) {
		    	// Создаем коллекцию геообъектов и задаем опции.
		    	var myGeoObjects = new ymaps.GeoObjectCollection();


		    	for (var id in coords) {
		    		var placeMark = new ymaps.Placemark(coords[id], {
		    			id: id,
		    		}, {
		                // Опции.
	                    // Необходимо указать данный тип макета.
	                    iconLayout: 'default#image',
	                    // Своё изображение иконки метки.
	                    iconImageHref: 'images/icons/map-icon.png',
	                    // Размеры метки.
	                    iconImageSize: [33, 48],
		            });

		            placeMark.events.add('click', function(e){
		            	filterPoints(id);
		            })
		    		myGeoObjects.add(placeMark);
		    	}

		    	// Добавляем коллекцию на карту.
		    	myMap.geoObjects.add(myGeoObjects);
		    	// Устанавливаем карте центр и масштаб так, чтобы охватить коллекцию целиком.
		    	myMap.setBounds(myGeoObjects.getBounds());

		    	return myGeoObjects;
		    }

		    function filterPoints (currentPoint) {
	    		myMap.geoObjects.removeAll();
	 	    	setPoints({currentPoint: coords[currentPoint]})
		        myMap.setZoom(14);
		    }*/


		}
	//end map

//end main
});