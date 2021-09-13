/*********** API calls with GET method ***********/
function get(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
}

/*********** Send DATA to the API with POST Method ***********/
function post(url, data) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 201) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(request.status);
                }
            }
        };
        request.send(JSON.stringify(data));
    });
}

/*********** Retrieved data from localStorage ***********/
function retrieveProducts(data) {
    return JSON.parse(localStorage.getItem(data));
    
}

/*********** Get ID from URL ***********/
function getId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("id");
}

/*********** Function Basket Preview ***********/
const basketPreview = document.getElementById ('basketPreview');
function basketPreviewFunction() {
    if (localStorage.length >= 1) { 
        basketPreview.innerHTML = `Panier <span class="badge rounded-pill bg-danger align-middle my-auto">€</span>`;
    } 
}
/*********** Clear basket ***********/
function clearBasket() {
    localStorage.clear();
}
