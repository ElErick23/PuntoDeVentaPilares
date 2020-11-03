var products = [
    ["Tenis", 500, "Para correr"],
    ["iPhone", 27000, "Absurdamente caro"]
];

var car = [
    [0, 2],
    [1, 1]
];

function moveTo(url) {
    // alert(url)
    window.location.replace(url);
}

function loadList() {
    var secc = document.getElementById("secc1");
    var article = document.getElementById("blank");
    for (i = 0; i < products.length; i++) {
        var clone = article.cloneNode(true);
        clone.id = "";
        clone.querySelector(".article-name").innerHTML = products[i][0];
        clone.querySelector(".article-price").innerHTML = "$" + products[i][1];
        clone.querySelector(".article-desc").innerHTML = products[i][2];
        secc.appendChild(clone);
    }
}

function loadCar() {
    var table = document.querySelector(".table");
    var row = document.getElementById("blank");
    for (i = 0; i < car.length; i++) {
        var ID = car[i][0];
        var clone = row.cloneNode(true);
        clone.id = "";
        clone.querySelector(".name").innerHTML = products[ID][0];
        clone.querySelector(".desc").innerHTML = products[ID][2];
        clone.querySelector(".price").innerHTML = "$" + products[ID][1];
        clone.querySelector(".units").innerHTML = car[i][1];
        clone.querySelector(".total-price").innerHTML = "$" + (car[i][1] * products[ID][1]);
        table.appendChild(clone);
    }
}