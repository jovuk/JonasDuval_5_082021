/*********** Get DOM element ***********/
const orderNumber = document.getElementById('orderId');
const contact = document.getElementById('contact');
const recap = document.getElementById('recap');
const parent = document.getElementById('parent');
const back = document.getElementById('backProduct');
const sum = document.getElementById('sum');

/*********** Order confirmation number and data ***********/
const orderID = getId();
const contactInformation = retrieveProducts('contact');
const productsOrdered = retrieveProducts('products');

/*********** Display order confirmation ***********/
contact.style.color = "#D07E46";
contact.innerText = 'Hello ' + contactInformation.firstName + ' !';
orderNumber.innerText = 'Merci pour ta commande #' + orderID;
recap.innerHTML = "Livraison à l\'adresse suivante : " + '<strong>'+ contactInformation.address +' '+ contactInformation.city + '</strong>.<br>' +
    "Une confirmation de commande te sera envoyée à " + '<strong>'+ contactInformation.email +'</strong>' ;

for (const product of productsOrdered) {
    const totalPrice = retrieveProducts('totalPrice');
    createListOrder(parent, product.name, product.description, product.imageUrl);
    sum.innerHTML = "Prix total : "+ totalPrice + "<sup>€</sup>";
}

/*********** Back to product and localStorage ***********/
back.addEventListener('click', function(ev) {
    ev.preventDefault();
    localStorage.clear();
    document.location.replace('index.html');
})

/*********** Create list of order ***********/
function createListOrder(parent, name, description, imageUrl) {
    const li = document.createElement('li');
    const image = document.createElement('img');
    const span1 = document.createElement('span');
    li.classList.add('list-group-item');
    li.classList.add('d-flex');
    li.classList.add('justify-content-between');
    li.classList.add('align-items-center');
    li.innerHTML = name;
    image.classList.add('imageBasket');
    image.src = imageUrl;
    span1.innerText = description;
    li.appendChild(image);
    li.appendChild(span1);
    parent.appendChild(li);
}
