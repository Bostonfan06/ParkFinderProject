// <!-- START of Javascript -->

// ============ GLOBAL VARIABLES =================
var markers = []
// console.log(markers)

//================ START of GOOGLE MAPS FUNCTION ============
function initMap() {

    var options = {
        zoom: 4,
        center: { lat: 39.0997, lng: -94.5786 } //We can set this lat lng to change based on user input
    }

    //New map object
    var map = new google.maps.Map(document.getElementById("map"), options)


    // =========== START OF AJAX CALL TO RETRIEVE PARK DETAILS & COORDINATES ============
    var parkCode = localStorage.getItem('name')
    var stateCode = localStorage.getItem('state')
    var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&fields=images&api_key=BiJRAIaZNmBh3eBVfZDeONL4s34x07I2eTRCeCBf"

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        

        // for loop to dynamically retrieve the array of the NPS API's JSON data
        for (var i = 0; i < response.data.length; i++) {

            var latLong = response.data[i].latLong
            var parkName = response.data[i].fullName

            // pass this object to the global variable array markers
            markers.push(
                {
                    // separate the latitude and longitude which are in between commas
                    lat: latLong.split(",")[0],
                    long: latLong.split(", ")[1],
                    parkname: parkName
                }
            )
            
            // =========== END of for loop function ============
        }

        // Add marker ==== This can dynamically change based on retrieved lat and long from NPS API's JSON data
        // this would plot the google markers in the map based on coordinates passed from NPS API's JSON data

        // variables to retrieve the lat, long and parkname
        var dynamicLat = markers[0].lat
        var dynamicLong = markers[0].long
        var dynamicParkName = markers[0].parkname

        // variables to remove the "lat:" & "long:" of the latitude and longitude - done using regex function
        var trimmedLat = Number(dynamicLat.replace(/lat:/g, ""))
        var trimmedLong = Number(dynamicLong.replace(/long:/g, ""))

        // console.log(trimmedLat)
        // console.log(trimmedLong)

        // variable to house the marker taken from the google maps API.
        var marker = new google.maps.Marker({

            map: map,
            position: { lat: trimmedLat, lng: trimmedLong },

        })

        // mouseover listeners for info window on marker.
        marker.addListener('mouseover', function () {
            infoWindow.open(map, marker);
        })
        marker.addListener('mouseout', function () {
            infoWindow.close();
        })

        // infowindow variable object. This info can change dynaically with the NPS API
        var infoWindow = new google.maps.InfoWindow({
            content: dynamicParkName

            //   <br />
            //       Location: ${mark.location}
            //       </h6>
        })

        //========= marker onClick to show info in the info div section of the HTML ===============
        marker.addListener('click', function () {

            // variables
            var parkCode = localStorage.getItem('name')
            // var stateCode = localStorage.getItem('state')
            var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&fields=images&api_key=BiJRAIaZNmBh3eBVfZDeONL4s34x07I2eTRCeCBf"
            var alertsURL = "https://developer.nps.gov/api/v1/alerts?parkCode=" + parkCode + "&fields=images&api_key=BiJRAIaZNmBh3eBVfZDeONL4s34x07I2eTRCeCBf"
            var visitorCenterURL = "https://developer.nps.gov/api/v1/visitorcenters?parkCode=" + parkCode + "&fields=images&api_key=BiJRAIaZNmBh3eBVfZDeONL4s34x07I2eTRCeCBf"
            var campgroundsURL = "https://developer.nps.gov/api/v1/campgrounds?parkCode=" + parkCode + "&fields=images&api_key=BiJRAIaZNmBh3eBVfZDeONL4s34x07I2eTRCeCBf"

            // start of PARK DETAILS ajax calls
            $.ajax({ 
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response.data)

                for (var i = 0; i < response.data.length; i++) {

                    var parkDetails = $("#info-div")
                    var fullName = response.data[i].fullName
                    var description = response.data[i].description
                    var url = response.data[i].url
                    var weatherInfo = response.data[i].weatherInfo
                    var directionsInfo = response.data[i].directionsInfo
                    var directionsUrl = response.data[i].directionsUrl


                    parkDetails.append("<p>Park Name: " + fullName + "</p>")
                    parkDetails.append("<p>Website: " + url + "</p>")
                    parkDetails.append("<p>Park Details: " + description + "</p>")
                    parkDetails.append("<p>Weather Info: " + weatherInfo + "</p>")
                    parkDetails.append("<p>Directions Info: " + directionsInfo + "</p>")
                    parkDetails.append("<p>Get Directions Here: " + directionsUrl + "</p>")
                    parkDetails.append("<p>---------------------------</p>")

                }

            })

            // start of ALERT DETAILS ajax calls    
            $.ajax({
                url: alertsURL,
                method: "GET",
            }).then(function (response) {
                // console.log(response.data)

                for (var i = 0; i < response.data.length; i++) {

                    var alerts = $("#alert-div")
                    var alertTitle = response.data[i].title
                    var alertCategory = response.data[i].category
                    var alertDetails = response.data[i].description

                    alerts.append("<p>Alert: " + alertTitle + "</p>")
                    alerts.append("<p>Alert: " + alertCategory + "</p>")
                    alerts.append("<p>Alert: " + alertDetails + "</p>")
                    alerts.append("<p>---------------------------</p>")
                }
            })

            // ======= END OF FOR ONCLICK ADD LISTENER ========   
        })
        // ========= END OF RESPONSE FUNCTION ============
    })

    // ======= END OF FOR INITMAP FUNCTION ======== 
}



//========================= END of GOOGLE MAPS ===================
