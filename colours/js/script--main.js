// const color = document.getElementById("js--color--1");

// color.onclick = function(){
//     color.children[0].classList.add("colors__circle--selected");
// }

const colors = document.getElementsByClassName("colors__color");



for(let i = 0; i < colors.length; i++){
    /*set colour*/

    // colors[i].style.aniationDelay = i/10 + "s";
    // nummer inclusief 1 -360 inclusief => hue
    // x = Math.random() * (max - min) + min;
    let randomHue = Math.floor(Math.random() * (360 - 1) + 1);
    // percentage inclusief 11 - 79 => saturatie
    let randomSaturation = Math.floor(Math.random() * (79 - 11) + 11) + "%";
    // percentage inclusief 11 - 79 => licht
    let randomLightness = Math.floor(Math.random() * (79 - 11) + 11) + "%";
    
    colors[i].children[0].style.background = `hsl(${randomHue} ${randomSaturation} ${randomLightness})`;

    /*onclick*/
    colors[i].onclick = function(){
        colors[i].children[0].classList.add("colors__circle--selected");
        navigator.clipboard.writeText(colors[i].children[0].style.background);
        document.title = colors[i].children[0].style.background;
    }
}

/* 
    function randomColor(){
   var letters = '013456789ABCDEF';
   var color = '#';
   for (let i = 0; i < 6; i++){
    color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}
*/