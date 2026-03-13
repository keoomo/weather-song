//define variable for our location
let locationField;
let infoField;
let canvas;
let ctx;

//wait until html document is loaded so that we can access the keyboard input field
document.addEventListener('DOMContentLoaded', function(event) { 
  //locationField = document.getElementById("location");
  locationField = document.querySelector("#location");
  infoField = document.getElementById('info');
  canvas = document.getElementById('landscape');
  ctx = canvas.getContext('2d');

});

function sonify(){
fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+locationField.value +'?key=YH5QF5SWJL5LZ8SFPZFT2RCC2')
	.then(response => response.json())
	.then(response => {

    let temp = response.days[0].temp;
    let humidity = response.days[0].humidity;

    infoField.innerHTML = "the weather in " + locationField.value + " is " + temp + " with " + humidity + " humidity"

    drawLandscape(temp, humidity);
  })
	.catch(err => 
    console.error(err));
    infoField.innerHTML = "Error fetching data. Check your location name.";
}

function drawLandscape(temp, humidiity){
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  let hue = 240 - (temp * 2);
  ctx.fillStyle = 'hsl(' + hue + ', 100%, 60%)'
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let mountainHeight = humidity * 3;
  ctx.fillStyle = 'darkblue';
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(canvas.width/2, canvas.height - mountainHeight);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.fill();
}


