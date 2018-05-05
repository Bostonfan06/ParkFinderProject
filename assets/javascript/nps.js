// <!-- START of Javascript -->

var parkCode = ''

// on click, it retrieves the parkCode that is hard coded in the list of values for the national parks
$("#enterbtn").on("click", function (event) {
    event.preventDefault()
    parkCode = $("#parkCode-input option:selected")
    console.log(parkCode[0].value)
    
    // stateCode = $("#stateCode-input option:selected")
    // console.log(stateCode[0].value)

    // stores locally the value for parkcode needed to send to the next page and used for the ajax call of main.js file.
    localStorage.setItem('name', parkCode[0].value)
    // localStorage.setItem('state', stateCode[0].value)

    // on click, it sends the user to 2nd landing page - (index2.0.html)
    window.location = "../ParkFinderProject/main.html"

    // END of click button function
})
