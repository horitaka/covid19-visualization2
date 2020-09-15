import { mapStyle } from '../../../constants/mapStyle'

export default class GoogleMap {

  constructor(el = '#map') {
    this.map = null;
    this.el = el;
    this.features = []
    this.initialize();
  }

  initialize() {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY
    // Load Google Map API
    const tag = document.createElement('script');
    tag.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;
    tag.async = 1;
    tag.defer = 1;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // window.addEventListener('load', this.render.bind(this));
    // window.addEventListener('load', this.renderCircle.bind(this));
  }

  render() {
    this.target = document.querySelector(this.el);
    /*global google*/
    const styledMapType = new google.maps.StyledMapType(mapStyle)
    this.map = new google.maps.Map(this.target, {
      center: {
        lat: this.target.getAttribute('data-lat') * 1,
        lng: this.target.getAttribute('data-lng') * 1
      },
      zoom: 5,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
      }
    });
    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map');
  }

  renderCircle(geoJson) {
    this.clearFeatures()
    this.features = this.map.data.addGeoJson(geoJson)

    const self = this
    this.map.data.setStyle(function(feature) {
      // console.log(feature)
      var peopleNum = feature.getProperty('totalInjectedPeople');
      return {
        icon: self.getCircle(peopleNum)
      };
    });
  }

  clearFeatures() {
    if (this.features) {
      this.features.forEach((feature) => {
        this.map.data.remove(feature)
      });
    }
    this.features = []
  }

  getCircle(data) {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'red',
      fillOpacity: .2,
      // scale: Math.pow(2, data) / 10000,
      scale: Math.sqrt(data * 20),
      strokeColor: 'white',
      strokeWeight: .5
    };
  }

  addMarker(position) {
    new google.maps.Marker({position: position, map: this.map});
  }

  getCenter() {
    const lat = this.map.getCenter().lat();
    const lng = this.map.getCenter().lng();
    return {lat, lng}
  }

  moveTo(position) {
    this.map.setCenter(position);
  }

  moveToCurrentPosition() {
    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Location found.');
        // infoWindow.open(map);
        self.map.setCenter(pos);
        self.addMarker(self.getCenter())
      }, function() {
        // handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  addGeoJson(fileName) {
    let self = this
    this.map.data.loadGeoJson(fileName);
    self.map.data.setStyle(function(feature) {
	    return {icon:feature.getProperty('icon')};
    });
  }

  searchPlace(place) {
    let self = this;
    let request = {
      query: place,
      fields: ['name', 'geometry', 'photos'],
    };

    let service = new google.maps.places.PlacesService(self.map);

    service.findPlaceFromQuery(request, function(results, status) {
      console.log(results)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          self.createMarker(results[i]);
        }
        self.map.setCenter(results[0].geometry.location);
      }
    });
  }

  searchPlaceByPhone(phone) {
    let self = this;
    let request = {
      phoneNumber: phone,
      fields: ['name', 'geometry'],
    };

    let service = new google.maps.places.PlacesService(self.map);

    service.findPlaceFromPhoneNumber(request, function(results, status) {
        console.log(results)
        console.log(status)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          self.createMarker(results[i]);
        }
        self.map.setCenter(results[0].geometry.location);
      }
    });
  }

  createMarker(place) {
    console.log(place)
    let self = this
    var marker = new google.maps.Marker({
      map: self.map,
      position: place.geometry.location
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function() {
      const name = place.name
      const photo = place.photos[0].getUrl()
      // const content = place.name
      const content = `<div>${name}<br/><img src=${photo} width=300 height=300></div>`
      infowindow.setContent(content);
      infowindow.open(self.map, this);
    });
  }

}
