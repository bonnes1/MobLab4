let pubnubDemo = new PubNub({
    publishKey: 'pub-c-a8993ad4-41c7-4c80-9946-717678ce1c21',
    subscribeKey: 'sub-c-75198444-7c9a-11ea-87e8-c6dd1f7701c5\n'
});

let direction = "";
pubnubDemo.addListener({
    message:function(event){
        let output = document.getElementById('get')
        output.appendChild(document.createTextNode(event.message.message))
        linebreak = document.createElement("br");
        output.appendChild(linebreak);
    }
});

pubnubDemo.subscribe({
    channels: ['demo_tutorial']
});

let sendMsg =()=> {
    let input = document.querySelector('.message');
    console.log(input.value);
    if( input.value !== "") {
        pubnubDemo.publish({ message: { "message" : input.value }, channel: 'demo_tutorial' });
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
    let dir = heading.toFixed([0]);
    if(45>dir>315){
        direction = "North"
    }
    else if (45<dir<135) {
        direction = "East"
    }
    else if (135<dir<225) {
        direction = "South"
    }
    else if (225<dir<315) {
        direction = "West"
    }
    console.log(heading);
    document.querySelector("#getLocation").innerHTML = dir + " " + direction;
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


