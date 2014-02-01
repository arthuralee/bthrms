/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
    this.initializeMap();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    console.log('Cordova deviceready fired');
  },

  initializeMap: function() {
    var map;

    var MY_MAPTYPE_ID = 'custom_style';

    function initialize() {
      var featureOpts = [
        {
          stylers: [
          { hue: '#fbf2cb' },
          { visibility: 'simplified' },
          { gamma: 0.8 },
          { weight: 0.4 }
          ]
        },
        {
          elementType: 'labels',
          stylers: [
          { visibility: 'on' }
          ]
        }
      ];

      var mapOptions = {
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: MY_MAPTYPE_ID
      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var customMapType = new google.maps.StyledMapType(featureOpts);
      map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
      
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    navigator.geolocation.getCurrentPosition(function(position) {
      // position map
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(pos);

      // add current location marker
      var currentIcon = new google.maps.MarkerImage('img/current.png', null, null, null, new google.maps.Size(18,18));
      var marker = new google.maps.Marker({
        position: pos,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: currentIcon
      });
    });

  }
};
