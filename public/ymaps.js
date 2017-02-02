ymaps.ready(init);
var myMap, 
    myPlacemark,
    myGeocoder;

function init(){ 
    myMap = new ymaps.Map("mymap", {
        center: [44.578526, 33.532156],
        zoom: 11,
        controls: ['zoomControl', 'fullscreenControl']
    }); 

    HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
    "<b>{{ properties.title }}</b><br/> {{ properties.address }}" +
    "</div>", {
            getShape: function () {
                var el = this.getElement(),
                    result = null;
                if (el) {
                    var firstChild = el.firstChild;
                    result = new ymaps.shape.Rectangle(
                        new ymaps.geometry.pixel.Rectangle([
                            [0, 0],
                            [firstChild.offsetWidth, firstChild.offsetHeight]
                        ])
                    );
                }
                return result;
            }
        }
    );

    var lat = 0;
    var lng = 0;

    myGeocoder = ymaps.geocode("Севастополь, Ульянова 2");
    myGeocoder.then(
        function(res){
            //alert(res.geoObjects.get(0).geometry.getCoordinates());
            myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
                title: 'Аптека №2',
                address: 'Центр Севастополя'
            }, {
                hintLayout: HintLayout,
                preset: 'islands#darkGreenMedicalIcon'
            });
            
            myMap.geoObjects.add(myPlacemark);
        }
    );
    
    myPlacemark = new ymaps.Placemark([44.578526, 33.532156], {
        title: 'Аптека №1',
        address: 'Центр Севастополя'
    }, {
        hintLayout: HintLayout,
        preset: 'islands#darkGreenMedicalIcon'
    });
    
    myMap.geoObjects.add(myPlacemark);
}

//change city areas
function setArea(num){
    switch(num){
        case 0:{
            myMap.setCenter([44.578526, 33.532156]);
            myMap.setZoom(11);
            break;
        }
        case 1:{
            myMap.setCenter([44.568588, 33.452416]);
            myMap.setZoom(13);
            break;
        }
        case 2:{
            myMap.setCenter([44.584961, 33.524793]);
            myMap.setZoom(13);
            break;
        }
        case 3:{
            myMap.setCenter([44.615463, 33.568546]);
            myMap.setZoom(13);
            break;
        }
        case 4:{
            myMap.setCenter([44.528813, 33.594336]);
            myMap.setZoom(13);
            break;
        }
    }
}