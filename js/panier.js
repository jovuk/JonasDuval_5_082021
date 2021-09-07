//Mise à jour du basketPreview
basketPreviewFunction();
/*********** Get DOM element ***********/
const basket = document.getElementById('basket');
const sum = document.getElementById('sum');
const firstName = document.getElementsByName('firstName')[0];
const lastName = document.getElementsByName('lastName')[0];
const address = document.getElementsByName('address')[0];
const city = document.getElementsByName('city')[0];
const email = document.getElementsByName('email')[0];
const orderValidation = document.getElementById('orderForm');
const modalRemoveBasket = document.getElementById('modalRemoveBasket');
const buttonRemoveBasket= document.getElementById('buttonRemoveBasket');
const emptyBasket = document.getElementById('emptyBasket');

let productsId = [];
/*********** Get data from the API with a promise ***********/
get("http://localhost:3000/api/cameras")
    .then(function () {
        let pricingTotal = 0;
        const productsInLocalStorage = retrieveProducts("productsOrdered");
        if(productsInLocalStorage){
            for (const product of productsInLocalStorage){
                productsId.push(product._id);
                createList(basket, product.name, product.description, product.price, product.imageUrl, product.quantity)
                pricingTotal += product.price * product.quantity;
                sum.innerHTML = "Prix total : "+ pricingTotal + "<sup>€</sup>";
                localStorage.setItem('totalPrice', JSON.stringify(pricingTotal));
                orderValidation.removeAttribute('hidden');
                sum.removeAttribute('hidden');
            }}
            else { 
                emptyBasket.removeAttribute('hidden');
                buttonRemoveBasket.hidden = true;
                
            }       
    })
    .catch(error => alert("Erreur : " + error));
/*********** empty basket  ***********/
    modalRemoveBasket.addEventListener('click', () => {
        clearBasket();
        location.reload();
    })
/*********** Get form data ***********/
orderValidation.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const contact = {
        "firstName" : firstName.value,
        "lastName": lastName.value,
        "address" : address.value,
        "city" : city.value,
        "email" : email.value
    }

    const order = {
        "products" : productsId,
        "contact" : contact
    }
    post("http://localhost:3000/api/cameras/order", order)
        .then(function (response) {
            localStorage.setItem('contact', JSON.stringify(response.contact));
            localStorage.setItem('products', JSON.stringify(response.products));
            document.location.replace('order.html?id=' + response.orderId);

        })
        .catch(error => alert("Erreur : " + error));
})

/*********** Form validation ***********/
orderValidation.addEventListener('submit', function() {
    this.reportValidity();
}, false);

/*********** Create list of choosed product ***********/
function createList(parent, name, description, price, imageUrl, quantity) {
    const li = document.createElement('li');
    const image = document.createElement('img');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
    li.classList.add('list-group-item');
    li.classList.add('d-flex');
    li.classList.add('justify-content-between');
    li.classList.add('align-items-center');
    li.innerHTML = name;
    image.classList.add('imageBasket');
    image.src = imageUrl;
    span1.innerText = description;
    span2.classList.add('badge');
    span2.classList.add('bg-primary');
    span2.classList.add('rounded-pill');
    span2.innerHTML = 'Prix : ' + price + "<sup>€</sup>";
    span3.classList.add('quantity');
    span3.innerText = 'Quantités: ' + quantity;
    li.appendChild(image);
    li.appendChild(span1);
    li.appendChild(span3);
    li.appendChild(span2);
    parent.appendChild(li);
}

