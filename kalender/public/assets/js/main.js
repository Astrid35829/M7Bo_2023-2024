console.log("beep");

class Header{
    headerElement;
    infoDivElement;
    infoYearElement;
    infoMonthElement;
    navigationDivElement;
    navigationButtonLeft;
    navigationButtonRight;
    navigatonButtonLeftI;
    navigationButtonRightI;
    placeToRenderHeader;
    constructor(){
        this.placeToRenderHeader = document.querySelector("body");
        console.log(this.placeToRenderHeader);
        this.headerElement = document.createElement('header');
        this.headerElement.classList = 'calender__header';

        this.infoDivElement = document.createElement('div');
        this.infoDivElement.classList = 'header__info';

        this.infoYearElement = document.createElement('h1');
        this.infoYearElement.classList = 'header__year';
        this.infoYearElement.innerText = this.getYear();
        
        this.infoMonthElement = document.createElement('h2');
        this.infoMonthElement.classList = 'header__month';
        this.infoMonthElement.innerText = this.getMonth();

        this.navigationDivElement = document.createElement('div');
        this.navigationDivElement.classList = 'header__navigation';

        this.navigationButtonLeft = document.createElement('figure');
        this.navigationButtonLeft.classList = 'navigation__button navigation__button--left';
        this.navigationButtonLeftI = document.createElement('i');
        this.navigationButtonLeftI.classList = 'fa-solid fa-chevron-left';

        this.navigationButtonRight = document.createElement('figure');
        this.navigationButtonRight.classList = 'navigation__button navigation__button--right';
        this.navigationButtonRightI = document.createElement('i');
        this.navigationButtonRightI.classList = 'fa-solid fa-chevron-right';
    }

    render(){
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.infoDivElement);
        this.infoDivElement.appendChild(this.infoYearElement);
        this.infoDivElement.appendChild(this.infoMonthElement);
        this.headerElement.appendChild(this.navigationDivElement);
        this.navigationDivElement.appendChild(this.navigationButtonLeft);
        this.navigationButtonLeft.appendChild(this.navigationButtonLeftI);
        this.navigationDivElement.appendChild(this.navigationButtonRight);
        this.navigationButtonRight.appendChild(this.navigationButtonRightI);
    }

    getMonth(){
        const date = new Date();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let name = month[date.getMonth()];
        return name;
    }

    getYear(){
        const date = new Date();
        const year = date.getFullYear();
        return year;
    }
}

class Main{
    mainElement;
    weekdaysListElement;
    weekdayListItemElement = [];
    weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    monthListElement;
    monthListItemElement = [];
    placeToRenderMain;
    constructor(placeToRenderMain){
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];
        this.mainElement = document.createElement('main');
        this.mainElement.classList = 'calender__main';

        this.weekdaysListElement = document.createElement('ul');
        this.weekdaysListElement.classList = 'month__weekdays';

        for(let i = 0; i < 7; i++){
            this.weekdayListItemElement[i] = document.createElement('li');
            this.weekdayListItemElement[i].classList = "month__weekday";
        }

        this.weekdayListItemElement[0].innerText = this.weekdayNames[0];
        this.weekdayListItemElement[1].innerText = this.weekdayNames[1];
        this.weekdayListItemElement[2].innerText = this.weekdayNames[2];
        this.weekdayListItemElement[3].innerText = this.weekdayNames[3];
        this.weekdayListItemElement[4].innerText = this.weekdayNames[4];
        this.weekdayListItemElement[5].innerText = this.weekdayNames[5];
        this.weekdayListItemElement[6].innerText = this.weekdayNames[6];

        this.monthListElement = document.createElement('ul');
        this.monthListElement.classList = 'month__days';

        for(let i = 0; i < 34; i++){
            this.monthListItemElement[i] = document.createElement('li');
            this.monthListItemElement[i].classList = 'month__day';
        }
    }

    render(){
        this.placeToRenderMain.appendChild(this.mainElement);
        this.mainElement.appendChild(this.weekdaysListElement);
        for(let i = 0; i < this.weekdayListItemElement.length; i++){
            this.weekdaysListElement.appendChild(this.weekdayListItemElement[i]);
        }
        this.mainElement.appendChild(this.monthListElement);
        for(let i = 0; i < this.monthListItemElement.length; i++){
            this.monthListElement.appendChild(this.monthListItemElement[i ]);
        }
    }
}

const header = new Header("body");
header.render();

const main = new Main('body');
main.render();

