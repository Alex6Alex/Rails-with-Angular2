ymaps.ready(init);
var myMap, 
    myPlacemark;

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
    
    myPlacemark = new ymaps.Placemark([44.578526, 33.532156], {
        title: 'Аптека №1',
        address: 'Центр Севастополя'
    }, {
        hintLayout: HintLayout,
        preset: 'islands#darkGreenMedicalIcon'
    });
    
    myMap.geoObjects.add(myPlacemark);
}