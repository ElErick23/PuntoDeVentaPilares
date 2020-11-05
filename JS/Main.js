const CART = "cart",
    PROD = "prod";
const ERROR_RECHARGE = "Ocurrió un error, recarga la página por favor";
const PROD_INITIAL = [
    { name: "Tenis", price: 500, desc: "Deportivos, útiles para correr" },
    { name: "Smartphone", price: 27000, desc: "Gama alta, lo más nuevo en tecnología" },
    { name: "Guitarra", price: 3600, desc: "Hermoso sonido y el más fino acabado" }
];

var products = loadSessionObject(PROD) == null ? PROD_INITIAL : loadSessionObject(PROD);
var cart = loadSessionObject(CART) == null ? [] : loadSessionObject(CART);

alert("Casi listo, falta añadir fecha y hora en tiempo real, además de los mensaje en consola");

function moveTo(url) {
    // alert(url)
    window.location.replace(url);
}

function addProduct() {
    name = prompt("Nombre del producto");
    if (name != "null") {
        price = prompt("Precio del producto");
        if (price != null)
            if (parseFloat(price) == price) {
                desc = prompt("Descripción del producto");
                if (desc != null) {
                    correct = confirm("¿Desea añadir el siguiente producto?\n" + name + "\n$" + price + "\n" + desc);
                    if (correct) {
                        products.push({ name: name, price: price, desc: desc });
                        saveSessionObject(PROD, products);
                        location.reload();
                    }
                }
            } else
                alert("El precio debe ser un valor numérico");
    }
}

function loadList() {
    var blank_article = document.getElementById("blank");
    for (let i = 0; i < products.length; i++) {
        var clone = blank_article.cloneNode(true);
        clone.id = "";
        clone.querySelector(".article-name").innerHTML = products[i].name;
        clone.querySelector(".article-price").innerHTML = "$" + products[i].price;
        clone.querySelector(".article-desc").innerHTML = products[i].desc;
        clone.addEventListener("click", function() {
            addToCart(i);
        })
        blank_article.insertAdjacentElement("afterend", clone);
    }
}

function indexInCart(index) {
    for (i = 0; i < cart.length; i++)
        if (cart[i].index == index)
            return i;
    return null;
}

function addToCart(index) {
    if (index >= 0 && index < products.length)
        if (indexInCart(index) != null) {
            var redirection = confirm("Ya tienes este artículo en tu carrito ¿Quieres verlo?");
            if (redirection)
                moveTo("carrito.html");
        } else {
            cart.push({ index: index, units: 1 });
            saveSessionObject(CART, cart);
            alert("'" + products[index].name + "' añadido");
        }
    else
        alert(ERROR_RECHARGE);
}

function removeFromCart(cart_index) {
    if (cart_index >= 0 && cart_index < cart.length) {
        if (confirm("¿Deseas quitar este producto del carrito?")) {
            cart.splice(cart_index, 1);
            saveSessionObject(CART, cart);
            location.reload();
        }
    } else
        alert(ERROR_RECHARGE);
}

function editFromCart(cart_index, units) {
    if (cart_index >= 0 && cart_index < cart.length) {
        if (units > 0) {
            cart[cart_index].units = units;
            saveSessionObject(CART, cart);
        }
    } else
        alert(ERROR_RECHARGE);
}

function loadCart() {
    var table = document.querySelector(".table");
    var row = document.getElementById("blank");
    for (let i = 0; i < cart.length; i++) {
        var index = cart[i].index;
        var clone = row.cloneNode(true);
        clone.id = "";
        clone.querySelector(".name").innerHTML = products[index].name;
        clone.querySelector(".desc").innerHTML = products[index].desc;
        clone.querySelector(".price").innerHTML = totalPrice(products[index].price, 1, true);
        clone.querySelector(".units").innerHTML = cart[i].units;
        clone.querySelector(".total-price").innerHTML = totalPrice(products[index].price, cart[i].units, true);
        clone.querySelector(".btn-cancel").addEventListener("click", function() {
            removeFromCart(i);
        });
        clone.querySelector(".btn-remove").addEventListener("click", function(event) {
            rowElement = getEventElement(event).parentNode.parentNode;
            editFromCart(i, cart[i].units - 1)
            updateUnits(i, rowElement);
        });
        clone.querySelector(".btn-add").addEventListener("click", function(event) {
            rowElement = getEventElement(event).parentNode.parentNode;
            editFromCart(i, cart[i].units + 1)
            updateUnits(i, rowElement);
        });
        table.appendChild(clone);
    }
    updateFinalPrice();
}

function updateUnits(cart_index, rowElement) {
    unitsP = rowElement.getElementsByClassName("units")[0];
    totalP = rowElement.getElementsByClassName("total-price")[0];
    cartObject = cart[cart_index];
    unitsP.innerHTML = cartObject.units;
    totalP.innerHTML = totalPrice(products[cartObject.index].price, cartObject.units, true);
    updateFinalPrice();
}

function updateFinalPrice() {
    finalElement = document.getElementById("final-price");
    finalPrice = 0;
    for (i = 0; i < cart.length; i++) {
        productIndex = cart[i].index;
        productTotal = totalPrice(products[productIndex].price, cart[i].units, false);
        finalPrice += productTotal;
    }
    finalElement.innerHTML = "$" + finalPrice;
}

function totalPrice(price, units, format) {
    total = price * units;
    return format ? "$" + total : total;
}

function getEventElement(event) {
    return event.target || event.srcElement;
}

function saveSessionObject(tag, object) {
    sessionStorage.setItem(tag, JSON.stringify(object));
}

function loadSessionObject(tag) {
    return JSON.parse(sessionStorage.getItem(tag));
}