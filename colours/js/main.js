//class that creates a card

class ColorCard{
    id; //id of the card
    color; //color shown on the card
    addToList; //add to the list
    htmlElement; //create a html element
    circle; //circle object to put the color in
    text; //text for the copied message

    constructor(newId, newColor, addToList){
        //setting properties
        this.id = newId; // assign id from input to variable id
        this.color = newColor; //assign color from input to variable color
        this.addToList = addToList; //assign list name to variable addToList

        // make htmlelement to render
        this.htmlElement = document.createElement("li") //create html element li and assign to variable htmlElement
        this.htmlElement.classList = "colors__color"; // give html element li a class

        this.circle = document.createElement("figure"); //create html element figure and assign to variable circle
        this.circle.classList = "colors__circle"; //give html element figure a class
        this.circle.style.background = this.color; //give html element a style background with data from variable color

        this.text = document.createElement("p"); //create html element p and assign to variable text
        this.text.innerText = "copied"; //give html element p a text
        this.text.classList = "colors__text"; //give html element p a class

        this.htmlElement.onclick = this.onHTMLElementClicked; //detect an onclick even from htmlElement and execute a function
        //final render
        this.render(); // render all the elements in the render() function
    }

    onHTMLElementClicked = () => { //create a function
        this.circle.classList.add("colors__circle--selected"); // add a class to element circle
        document.title = this.color; //give the website document the title of the color variable.
        window.navigator.clipboard.writeText(this.color); //put the data of the variale color in the clipboard.
    }

    render(){ //create a render function
        this.htmlElement.appendChild(this.circle); //assign html element circle as child to html element htmlElement
        this.htmlElement.appendChild(this.text); //assign html element text as child to html element htmlElement
        this.addToList.appendChild(this.htmlElement); // assign html element htmlElement as child to html element addToList
    }
}

//class that the list creates
class ColorList{
    id; //variable id
    htmlElement; //variable htmlElement

    constructor(newId){
        this.id = newId; //assign newId to variable id
        this.htmlElement = document.createElement("ul"); //assign a created html element ul to variable htmlElement
        this.htmlElement.id = this.id; //assign variable id to the htmlElement id property
        this.htmlElement.classList.add("colors"); //give html element htmlElement a class
        this.render(); //render function
    }

    render(){
        document.querySelector("body").appendChild(this.htmlElement); //assing html element htmlElement as child to the body
    }
}

//class that create random hsl color
class HSLGenerator{
    randomHue; //variable randomHue
    randomSaturation; //variable randomSaturation
    randomLightness; //variable randomLightness
    hsl; //variable hsl
    
    constructor(){
        this.generateHSL(); //execute function generateHSL()
    }

    generateHue = function(){ //create function generateHue()
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1); //assign to variable randomHue a random number between 1 and 360
    }

    generateSaturation= function(){ //create function generateSaturation()
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11) + "%"; //assign to variable randomSaturation a random number between 11 and 79 and add a percentage symbol
    }

    generateLightness = function(){ // create function generateLightness()
        this.randomLightness = Math.floor(Math.random() * (79 - 11) + 11) + "%"; //assign to variable randomLightnes a random number between 11 and 79 and add a percentage symbol
    }

    generateHSL  = function(){ //create function generateHSL
        this.generateHue(); //execute function generateHue()
        this.generateSaturation(); //execute function generateSaturation()
        this.generateLightness(); //execute function generateLightness()
        this.hsl = `hsl(${this.randomHue}, ${this.randomSaturation}, ${this.randomLightness})`; // combine variables randomHue, randomSaturation and randomLightness, add it into a string and assing it to variable hsl
    }
}

//class that generates a function for the webpage
class App{
    id; //variable id
    colorList; // variable colorList
    hslGenerator; //variable hslGenerator

    constructor(newId){
        this.id = newId; //assign newId from input to variable id
        this.colorList = new ColorList(this.id); //assign class ColorList() with constructor to variable colorList
        this.hslGenerator = new HSLGenerator(); //assign class HSLGenerator() to variable hslGenerator
        this.generateColorCards(); //execute function generateColorCards()
    }

    generateColorCards = function(){ //create function generateColorCards()
        for(let i = 1; i < 101; i++){ //for loop that runs 100x
            this.hslGenerator.generateHSL(); //use hslGenerator to execute class generateHSL()
            new ColorCard(i, this.hslGenerator.hsl, document.getElementById(this.colorList.id)); //execute class ColorCard() using variable i from the for loop, the hslGenerator function with the hsl property and a getdocumentbyid function as constructor
        }
    }
}

const app = new App("js--app"); //assign class App() with constructor to variable app to execute class

//new ColorCard(i, hsl, document.getElementById(colorList.id));
