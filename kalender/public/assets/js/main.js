class Main {
    headerElement;
    infoDivElement;
    infoYearElement;
    infoMonthElement;
    navigationDivElement;
    navigationButtonLeft;
    navigationButtonRight;
    navigationButtonLeftI;
    navigationButtonRightI;
    placeToRenderHeader;

    mainElement;
    weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    weekdaysListElement;
    weekdayListItemElement = [];
    monthListElement;
    monthListItemElement = [];
    placeToRenderMain;

    prevNextIcon;

    constructor(placeToRenderMain) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = new Date();
        let currYear = date.getFullYear();
        let currMonth = date.getMonth();
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
        let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
        let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
        let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month


        this.placeToRenderHeader = document.querySelector("body");

        this.headerElement = document.createElement('header');
        this.headerElement.classList = 'calender__header';

        this.infoDivElement = document.createElement('div');
        this.infoDivElement.classList = 'header__info';

        this.infoYearElement = document.createElement('h1');
        this.infoYearElement.classList = 'header__year';

        this.infoMonthElement = document.createElement('h2');
        this.infoMonthElement.classList = 'header__month';

        this.navigationDivElement = document.createElement('div');
        this.navigationDivElement.classList = 'header__navigation';

        this.navigationButtonLeft = document.createElement('figure');
        this.navigationButtonLeft.classList = 'navigation__button';
        this.navigationButtonLeft.setAttribute('id', 'prev');
        this.navigationButtonLeftI = document.createElement('i');
        this.navigationButtonLeftI.classList = 'fa-solid fa-chevron-left';

        this.navigationButtonRight = document.createElement('figure');
        this.navigationButtonRight.classList = 'navigation__button';

        this.navigationButtonRightI = document.createElement('i');
        this.navigationButtonRightI.classList = 'fa-solid fa-chevron-right';
        this.navigationButtonRight.setAttribute('id', 'next');
        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];
        this.mainElement = document.createElement('main');
        this.mainElement.classList = 'calender__main';

        this.weekdaysListElement = document.createElement('ul');
        this.weekdaysListElement.classList = 'month__weekdays';

        this.renderWeekdays();

        this.monthListElement = document.createElement('ul');
        this.monthListElement.classList = 'month__days';

        let prevButton = this.navigationButtonLeft;
        let nextButton = this.navigationButtonRight;

        this.renderCalendar(date, months, currMonth, currYear, lastDateofLastMonth, lastDateofMonth, lastDayofMonth, firstDayofMonth);

        prevButton.onclick = () => {
            let newMonth = currMonth - 1;
            let newYear = currYear;
        
            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            }
        
            let newDate = new Date(newYear, newMonth, new Date().getDate()); // Create a new Date object
        
            // Recalculate dependent variables
            let newFirstDayofMonth = new Date(newYear, newMonth, 1).getDay();
            let newLastDateofMonth = new Date(newYear, newMonth + 1, 0).getDate();
            let newLastDayofMonth = new Date(newYear, newMonth, newLastDateofMonth).getDay();
            let newLastDateofLastMonth = new Date(newYear, newMonth, 0).getDate();
        
            currYear = newDate.getFullYear();
            currMonth = newDate.getMonth();
        
            // Render calendar with new data
            this.renderCalendar(newDate, months, currMonth, currYear, newLastDateofLastMonth, newLastDateofMonth, newLastDayofMonth, newFirstDayofMonth);
        };

        nextButton.onclick = () => {
            let newMonth = currMonth + 1;
            let newYear = currYear;

            if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            }

            let newDate = new Date(newYear, newMonth, new Date().getDate()); // Create a new Date object

            console.log("newDate:", newDate);
            console.log("newMonth:", newMonth);
            console.log("newYear:", newYear);

            currYear = newDate.getFullYear();
            currMonth = newDate.getMonth();

            console.log("currYear after update:", currYear);
            console.log("currMonth after update:", currMonth);

            this.renderCalendar(newDate, months, currMonth, currYear, lastDateofLastMonth, lastDateofMonth, lastDayofMonth, firstDayofMonth);
        };

    }

    renderWeekdays() {
        for (let i = 0; i < 7; i++) {
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
    }

    renderCalendar(date, months, currMonth, currYear, lastDateofLastMonth, lastDateofMonth, lastDayofMonth, firstDayofMonth) {
        this.monthListElement.innerHTML = "";
        for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
            this.monthListItemElement[i] = document.createElement('li');
            this.monthListItemElement[i].classList = 'month__day inactive__day';
            this.monthListItemElement[i].innerText = lastDateofLastMonth - i + 1;
            this.monthListElement.appendChild(this.monthListItemElement[i]); // Append here
        }

        for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
            // adding active class to li if the current day, month, and year matched
            let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                && currYear === new Date().getFullYear() ? "month__day current__day" : "month__day active__day";
            this.monthListItemElement[i] = document.createElement('li');
            this.monthListItemElement[i].classList = isToday;
            this.monthListItemElement[i].innerText = i;
            this.monthListElement.appendChild(this.monthListItemElement[i]); // Append here
            // RAAAAAAH fuck this...
        }

        for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
            this.monthListItemElement[i] = document.createElement('li');
            this.monthListItemElement[i].classList = 'month__day inactive__day';
            this.monthListItemElement[i].innerText = i - lastDayofMonth + 1;
            this.monthListElement.appendChild(this.monthListItemElement[i]); // Append here
        }

        this.infoYearElement.innerText = currYear;
        this.infoMonthElement.innerText = months[currMonth];
/*         console.log(date, currMonth, currYear, lastDateofLastMonth, lastDateofMonth, lastDayofMonth, firstDayofMonth);
 */    }


    render() {
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.infoDivElement);
        this.infoDivElement.appendChild(this.infoYearElement);
        this.infoDivElement.appendChild(this.infoMonthElement);
        this.headerElement.appendChild(this.navigationDivElement);
        this.navigationDivElement.appendChild(this.navigationButtonLeft);
        this.navigationButtonLeft.appendChild(this.navigationButtonLeftI);
        this.navigationDivElement.appendChild(this.navigationButtonRight);
        this.navigationButtonRight.appendChild(this.navigationButtonRightI);

        this.placeToRenderMain.appendChild(this.mainElement);
        this.mainElement.appendChild(this.weekdaysListElement);
        for (let i = 0; i < this.weekdayListItemElement.length; i++) {
            this.weekdaysListElement.appendChild(this.weekdayListItemElement[i]);
        }
        this.mainElement.appendChild(this.monthListElement);

    }
}

const main = new Main('body');
main.render();