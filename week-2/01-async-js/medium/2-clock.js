let seconds = 0;
let minutes= 0;
let hours = 0;
let zone = "";
setInterval(() => {
    let time = "";
    if(seconds == 60){
        seconds = 0;
        minutes++;
    }
    if(minutes == 60) {
        minutes=0;
        hours++;
    }
    if(hours == 24){
        hours =0;
    }
    if(hours < 12){
        zone = "AM";
    }
    else{
        zone = "PM";
    }
    let hourString = hours;
    let minuteString = minutes;
    let secondString = seconds;
    if(hours < 10){
        hourString = "0"+ hourString;
    }
    if(minutes < 10) {
        minuteString = "0"+ minuteString;
    }
    if(seconds < 10){
        secondString = "0" + secondString; 
    }
    time = hourString + ":" + minuteString + ":" + secondString + " " + zone;
    console.log(time);
    seconds++;
},1000);