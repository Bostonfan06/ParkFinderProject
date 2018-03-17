// $(document).ready(function () {
// $('[data-mobile-app-filter-menu] li').click(function () {
//     $(this).siblings().removeClass('is-active');
//     $(this).addClass('is-active');
//   });

  //on click button function that runs on first page to bring up html2.0
 var parkCodeinfo = $('parkCode-input').val();
 var stateCodeinfo = $('stateCode-input').val();
$('#enterbtn').on('click', function(){
    //get data from form box and open the map on the next page with corresponding info
    if ((parkCodeinfo = true) || (stateCodeinfo = true)){
        window.location = "index2.0.html"
        //set zoom and center on the state or park they selected
    };
    // location.href = "index2.0.html";
}); 
  

//================ init map function ============
function initMap() {
  var options = {
    zoom: 4,
    center: { lat: 39.0997, lng: -94.5786 } //We can set this lat lng to change based on user input
  }

  //New map
  var map = new google.maps.Map(document.getElementById("map"
), options) //New map object
  // // Add marker ==== This can dynamically change based on user input given lat, lng
  // var marker = new google.maps.Marker({
  //   position:{lat: 37.8651, lng: -119.5383}, //Set to yosemite as a placeholder
  //   map:map
  // });




  // array of markers. These are tests, and are temporary until we get the NPS API info populated in there. 
//   var markers = [
//     {
//       //pass any dynamic argument in the function when called. (lat lng from NPS)
//       coords: { lat: 37.8651, lng: -119.5383 }, //NPS API Info
//       parkcode: 'yose', //NPS API info
//       parkname: 'Yosemite'//NPS API info
//     },
//     {
//       //pass any dynamic argument in the function when called. (lat lng from NPS)
//       coords: { lat: 44.4280, lng: -110.5885 }, //NPS API Info
//       parkcode: 'xxxx', //NPS API info
//       parkname: 'Yellowstone'//NPS API info
//     },
//     {
//       //pass any dynamic argument in the function when called. (lat lng from NPS)
//       coords: { lat: 36.1070, lng: -112.1130 }, //NPS API Info
//       parkcode: 'xxxx', //NPS API info
//       parkname: 'Grand Canyon'//NPS API info
//     },

//   ];


  //Loop through markers. This can add all the markers for all the parks in a state
  for (var i = 0; i < markers.length; i++) {
    //add marker
    console.log('hi')
    addMarker(markers[i]); //pass 

  }


  // Add Marker function
  function addMarker(mark) {
    var marker = new google.maps.Marker({
      position: mark.coords,
      map: map,
      // content: '<h6>Hello World!</h6>'

    });

    //mouseover function for info window on marker.
    marker.addListener('mouseover', function () {
      infoWindow.open(map, marker);
    });
    marker.addListener('mouseout', function() {
      infoWindow.close();
  });

    //========= marker onClick to show info in div below. ===============
    marker.addListener('click', function() {
        $('#info-div').html("<h1> HELLO FULVOUS!</h1>");
    });

    //infowindow variable object. This info can change dynaically with the NPS API
    var infoWindow = new google.maps.InfoWindow({
      content: dynamicParkName
    });
  }
};

// END of document.ready.
// })