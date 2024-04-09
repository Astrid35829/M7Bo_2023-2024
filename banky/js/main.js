class GetDataFromApi {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    async getData() {
        await fetch(this.url)
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.data = data;
            })
        return this.data;
    }
}

class Header {
    headerElement;
    figureElement;
    logoIELement;
    logoHeadingElement;
    avatarFigureElement;
    avatarImgElement;
    placeToRenderHeader;


    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIELement = document.createElement("i");
        this.logoIELement.classList = "fa-solid fa-piggy-bank";

        this.logoHeadingElement = document.createElement("h1");
        this.logoHeadingElement.classList = "header__banky";
        this.logoHeadingElement.innerText = "Banky";

        this.avatarFigureElement = document.createElement("figure");
        this.avatarFigureElement.classList = "avatar";

        this.avatarImgElement = document.createElement("img");
        this.avatarImgElement.classList = "avatar__img";
        this.avatarImgElement.setAttribute("src", "./img/pfp.jpg");
        this.render();
    }

    render() {
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.figureElement);
        this.figureElement.appendChild(this.logoIELement);
        this.figureElement.appendChild(this.logoHeadingElement);
        this.headerElement.appendChild(this.avatarFigureElement);
        this.avatarFigureElement.appendChild(this.avatarImgElement);
    }
}

class BankyMain {
    placeToRenderBankyMain;
    leftSection;
    rightSection;

    constructor(placeToRenderBankyMain) {
        this.placeToRenderBankyMain = document.getElementsByTagName(placeToRenderBankyMain)[0];

        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new BankyLeftSection(this.mainElement);
        this.rightSection = new BankyRightSection(this.mainElement);
    }

    makeButtonFromData(data) {
        this.rightSection.makeButtonFromData(data);
    }

    makeTransactionsFromData(data) {
        this.leftSection.makeTransactionsFromData("Bankrekening", data);
    }

    render() {
        this.placeToRenderBankyMain.appendChild(this.mainElement);

        this.leftSection.render();
        this.rightSection.render();
    }
}

class BankyLeftSection {
    mainElement;

    constructor(mainElement) {
        this.mainElement = mainElement;
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left";

        this.bankyHeaderElement = document.createElement("header");
        this.bankyHeaderElement.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoText = document.createElement("h1");
        this.bankyLogoText.classList = "banky__money";

        this.eyeButton = document.createElement("button");
        this.eyeButton.classList = "banky__eyeButton";

        this.eyeFigureElement = document.createElement("figure");
        this.eyeFigureElement.classList = "banky__eye";

        this.eyeIElement = document.createElement("i");
        this.eyeIElement.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";


        this.transferButton = document.createElement("button");
        this.transferButton.classList = "banky__transferButton";
        this.transferButton.innerText = "Overboeken";
    }

    makeTransactionsFromData(accountToShow, data) {
        let totalMoney = 0;
        for(let i = 0; i < data[accountToShow].length; i++){
            totalMoney += data[accountToShow][i]["amount"];
            console.log(totalMoney);
        }

        this.bankyLogoText.innerText = "Saldo " + "€" + totalMoney;

        for (let i = 0; i < data[accountToShow].length; i++) {
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction";

            this.transactionFrom = document.createElement("h3");
            this.transactionFrom.classList = "banky__name";
            this.transactionFrom.innerText = data[accountToShow][i]["from/to"];

            this.transactionAmount = document.createElement("h3");
            this.transactionAmount.classList = "banky__amount";
            this.transactionAmount.innerText = data[accountToShow][i]["amount"];
            
            this.transactionsElement.appendChild(this.transactionElement);
            this.transactionElement.appendChild(this.transactionFrom);
            this.transactionElement.appendChild(this.transactionAmount);
        }
    }

    render() {
        this.mainElement.appendChild(this.leftSectionElement);

        this.leftSectionElement.appendChild(this.bankyHeaderElement);
        this.bankyHeaderElement.appendChild(this.bankyHeaderWrapElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
        this.bankyLogoElement.appendChild(this.bankyLogoIElement);
        this.bankyHeaderWrapElement.appendChild(this.bankyLogoText);
        this.bankyHeaderElement.appendChild(this.eyeButton);
        this.eyeButton.appendChild(this.eyeFigureElement);
        this.eyeFigureElement.appendChild(this.eyeIElement);
        this.leftSectionElement.appendChild(this.transactionsElement);
        
        this.leftSectionElement.appendChild(this.transferButton);
    }
}

class BankyRightSection {
    mainElement;

    constructor(mainElement) {
        this.mainElement = mainElement;

        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section banky__section--right";

        this.accountsElement = document.createElement("ul");
        this.accountsElement.classList = "banky__accounts";
    }

    makeButtonFromData(data) {
        Object.entries(data).forEach((entry) => {
            this.accountElement = document.createElement("li");
            this.accountElement.classList = "banky__account";

            this.accountElement.onclick = () => {
                console.log(entry);
            }

            this.switchAccountButton = document.createElement("button");
            this.switchAccountButton.classList = "banky__switchAccount";

            this.accountLogoElement = document.createElement("figure");
            this.accountLogoElement.classList = "banky__logo";

            this.accountLogoI = document.createElement("i");
            this.accountLogoI.classList = "fa-solid fa-house";

            this.nameOfAccountElement = document.createElement("h4");
            this.nameOfAccountElement.classList = "banky__nameOfAccount";
            this.nameOfAccountElement.innerText = "Bankrekening";
            this.nameOfAccountElement.innerText = entry[0];

            this.accountsElement.appendChild(this.accountElement);
            this.accountElement.appendChild(this.switchAccountButton);
            this.switchAccountButton.appendChild(this.accountLogoElement);
            this.accountLogoElement.appendChild(this.accountLogoI);
            this.accountElement.appendChild(this.nameOfAccountElement)
        })
    }

    render() {
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.accountsElement);
    }
}

class App {
    bankyHeader;
    bankyMain;
    getDataFromApi

    constructor() {
        this.bankyMain = new BankyMain("body");
        this.bankyHeader = new Header("body");

        this.getDataFromApi = new GetDataFromApi("../data/transactions.json");

        this.getDataFromApi
            .getData().then((data) => {
                this.bankyMain.makeTransactionsFromData(data);
                this.bankyMain.makeButtonFromData(data);
            });

        this.bankyHeader.render();
        this.bankyMain.render();
    }
}

const app = new App();

//les 9 vid 1;