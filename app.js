let pubnubDemo = new PubNub({
    publishKey: 'pub-c-a8993ad4-41c7-4c80-9946-717678ce1c21',
    subscribeKey: 'sub-c-75198444-7c9a-11ea-87e8-c6dd1f7701c5'
});


pubnubDemo.addListener({
    message:function(event){
        let output = document.getElementById('get');
        //if ( channel === event.channel) {}
            output.appendChild(document.createTextNode(event.channel + ": " + event.message.message));
            linebreak = document.createElement("br");
            output.appendChild(linebreak);

    }
});
window.setInterval(function(){
    pubnubDemo.subscribe({
        channels: [getChannel()]
    });
}, 500);


getChannel = () => {
    let channel;
    let orientation = document.querySelector('#getLocation').innerHTML;
    let dir = parseInt(orientation);
    if (dir != null) {
        if(45 > dir || dir >315){
            channel = "North"
        }
        if (45<dir && dir <135) {
            console.log(dir)
            channel = "East"
        }
        if (dir >135 && dir < 225) {
            channel = "South"
        }
        if (dir >225 && dir <315) {
            channel = "West"
        }
    }
    else {
        channel = 'demo_tutorial'
    }
    return channel
};
let sendMsg =()=> {
    let input = document.querySelector('.message');
    console.log(input.value);
    if( input.value !== "") {
        pubnubDemo.publish({ message: { "message" : input.value }, channel: getChannel() }).catch(err => console.log(err.message));
    }
    input.value = "";
};
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
    document.querySelector("#getLocation").innerHTML = heading.toFixed([0]);
    //heading - 0 - 360,  45>Norr>315, 45<East<135, 135<south<225, 225<west<315
}
}



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


