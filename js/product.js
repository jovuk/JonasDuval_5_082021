/*********** Get DOM Elements ***********/
const img = document.getElementsByClassName('card-img-top')[0];
const h5 = document.getElementsByClassName('card-title')[0];
const p = document.getElementsByClassName('card-text')[0];
const pricing = document.getElementsByClassName('card-text')[1];
const selectLenses = document.getElementById('lenses');
const selectQuantity = document.getElementById('quantity');
const title = document.getElementsByTagName('title')[0];
const addProduct = document.getElementById('addToBasket');
const button = document.getElementById('addToBasket');

const productsLocalStorage = [];
/*********** Add product to basket ***********/
function addToBasket(id, name, description, price, imageUrl){
    button.addEventListener('click', function(ev) {
        ev.preventDefault();
        alertMessage(this.parentNode);
        button.setAttribute('disabled', 'true');
        const quantity = selectQuantity.options.selectedIndex + 1;
        const product = {
            "_id" : id,
            "name" : name,
            "description" : description,
            "price" : price,
            "imageUrl" : imageUrl,
            "quantity" : quantity
        };
        const articleInLocalStorage = [retrieveProducts("productsOrdered")];
        productsLocalStorage.push(...articleInLocalStorage, product)
        const productToSet = removeNull(productsLocalStorage.flat(4));
        localStorage.setItem("productsOrdered", JSON.stringify(productToSet));
    })
}

/*********** Create alert message ***********/
function alertMessage(parent){
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('alert-warning');
    alert.setAttribute('role', 'alert');
    alert.innerText = 'Le produit a été ajouté au panier ! ';
    parent.insertBefore(alert, addProduct);
}

/*********** basketPreview ***********/
function basketPreview() {
    if (localStorage.length == 0) {
    } else {
        let addBasketPreview = document.getElementById("basketPreview");
        addBasketPreview.removeAttribute("hidden");
    }
}

/*********** Add product data and option ***********/
function productData(imageUrl, name, description, price) {
    img.src     = imageUrl;
    h5.innerText = name;
    p.innerText = description;
    pricing.innerHTML = price + "<sup>€</sup>";
    title.innerText = name;
}

function productOption(lenses) {
    for (const lense of lenses) {
        const lenseOption = document.createElement('option');
        lenseOption.innerText = lense;
        lenseOption.setAttribute('value', lense);
        selectLenses.appendChild(lenseOption);
    }
}

function quantityOfProduct(){
    for(let i = 1; i <= 10; i++){
        const quantity = document.createElement('option');
        quantity.innerText = JSON.stringify(i);
        quantity.setAttribute('value', JSON.stringify(i));
        selectQuantity.appendChild(quantity);
    }
}

function removeNull(array) {
    return array.filter(x => x !== null)
}

/*********** Get data from the API with a promise ***********/
get("http://localhost:3000/api/cameras")
    .then(function (response) {
        for(const camera of response) {
            if(camera._id === getId()) {
                productOption(camera.lenses);
                quantityOfProduct();
                productData(camera.imageUrl, camera.name, camera.description, camera.price/100);
                addToBasket(camera._id, camera.name, camera.description, camera.price/100, camera.imageUrl);
            }
        }
    })
    .catch(error => alert("Erreur : " + error));
