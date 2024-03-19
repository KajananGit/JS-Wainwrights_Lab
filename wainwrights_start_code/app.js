let wainwrightsData;
const wainwrightsList = document.querySelector("#wainwrights-list");
const wainwrightsForm = document.querySelector("#wainwrights-form");



const getAllWainwrights = async () => {
    const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    const jsonData = await response.json();
    wainwrightsData = jsonData;
    mapWainwirghts(wainwrightsData);
};

const mapWainwirghts = (dataArray) => {
    for (let element of dataArray){
        listNewItem(element);
    }
}

const listNewItem = (item) => {
    const list = document.createElement("li");
    const name = document.createElement("h2");
    const height = document.createElement("h3");
    const area = document.createElement("h4");

    name.innerText = item.name;
    height.innerText = item.heightMetres;
    area.innerText = item.area.areaName;

    list.appendChild(name);
    list.appendChild(height);
    list.appendChild(area);

    wainwrightsList.appendChild(list);
}

wainwrightsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userInputValue = event.target["user-input"].value;

    wainwrightsList.innerText = "";
    const templist = document.createElement("li");
    const awaitingMessage = document.createElement("p");

    awaitingMessage.innerText = "Awaiting API...";
    templist.appendChild(awaitingMessage);
    wainwrightsList.appendChild(templist);


    const result = wainwrightsData.filter((data) => {
        if(data.name.toLowerCase().includes(userInputValue.toLowerCase())){
            wainwrightsList.innerText = "";
            listNewItem(data);
        }
    })
    
});



getAllWainwrights();