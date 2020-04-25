var pubnubDemo = new PubNub({
    publishKey: 'pub-c-a8993ad4-41c7-4c80-9946-717678ce1c21',
    subscribeKey: 'sub-c-75198444-7c9a-11ea-87e8-c6dd1f7701c5\n'
});
pubnubDemo.addListener({
    message:function(message){
        console.log(message())
    }
});

pubnubDemo.subscribe({
    channels: ['north','south','west','east']
});

function orientationDetection() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
    }


function handleOrientation(event)
{
    var heading = event.alpha;
    if (typeof event.webkitCompassHeading !== "undefined") {
        heading = event.webkitCompassHeading;
        console.log(heading)
    }
    console.log(heading);
    document.querySelector("#getLocation").innerHTML = heading;
}
}

let sendMsg =()=> {
    let input = document.querySelector('.message');
    console.log(input.value)
    let output = document.querySelector('#getMsg')
    if(input.value !== "") {
        output.innerHTML += `<br/>` + input.value;
        input.value ="";
    }
};


/*let input = document.querySelector('.message');
input.addEventListener("keyup", e => {
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
        // Cancel the default action, if needed
        e.preventDefault();
        // Trigger the button element with a click
        return document.getElementById("msg-button").click();
    }
});*/


