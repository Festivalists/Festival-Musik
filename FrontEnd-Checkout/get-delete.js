const apiCart = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/cart'
const apiEvent = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/event'
const apiCheckout = 'https://79c7-2001-448a-20a0-4169-d4b6-218e-ebfa-7a3a.ngrok-free.app/checkout'

const bodyCart = document.querySelector('.bodyCart')
const bodyCheckout = document.querySelector('.bodyCheckout')

const showCart = (carts, events) => {
    let output = ''
    carts.forEach(cart => {
        const eventData = events.find(event => event.id == cart.tickets.id);

        output += `
            <div class="itemCart card">
                <div class="dataCart card-body" data-id=${cart.id}>
                    <h5 class="titleEvent card-title">${eventData.festivalName}</h5>
                    <p class="card-text customerName">Nama: ${cart.customerName}</p>
                    <p class="card-text phoneNumber">No. HP: ${cart.phoneNumber}</p>
                    <p class="card-text quantity">Jumlah TIket: ${cart.tickets.quantity}</p>
                    <p class="card-text totalPrice">Total Harga: ${cart.totalPrice}</p>
                    <div class="itemBtn">
                        <a href="#" class="btn editCart btn-primary">Edit</a>
                        <a href="#" class="btn deleteCart btn-danger">Hapus</a>
                        <a href="#" class="btn checkoutBtn btn-success">Checkout</a>
                    </div>
                </div>
            </div>
        `;
    });
    bodyCart.innerHTML = output;
}


const showCheckout = (checkouts, events) => {
    let output = ''
    checkouts.forEach(checkout => {
        const eventData = events.find(event => event.id == checkout.tickets.id);

        output += `
            <div class="itemCheckout card">
                <div class="dataCheckout card-body">
                    <h5 class="titleEvent card-title">${eventData.festivalName}</h5>
                    <p class="card-text">Nama: ${checkout.customerName}</p>
                    <p class="card-text">No. HP: ${checkout.phoneNumber}</p>
                    <p class="card-text">Jumlah TIket: ${checkout.tickets.quantity}</p>
                    <p class="card-text">Total Harga: ${checkout.totalPrice}</p>
                    <p class="card-text">Status Pembayaran: ${checkout.paymentStatus}</p>
                </div>
            </div>
        `;
    });
    bodyCheckout.innerHTML = output;
}


function fetchAPI(url, method = 'GET', headers = {}) {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
      'Ngrok-Version': '2'
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}


bodyCart.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah pengiriman formulir default
    let delButtonIsPressed = e.target.classList.contains('deleteCart')
    let editButtonIsPressed = e.target.classList.contains('editCart')
    let checkoutButtonIsPressed = e.target.classList.contains('checkoutBtn')

    // Ambil nilai data-id
    const cartId = e.target.closest('.dataCart').dataset.id;
    sessionStorage.setItem('cartId', cartId);
  
    if (delButtonIsPressed) {
        fetch(`${apiCart}/${cartId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => location.reload())
    
      }

    if (editButtonIsPressed) {
        window.location.href = `put.html?id=${cartId}`;
    }

    if (checkoutButtonIsPressed) {

        // 1. Ambil data dari cart menggunakan fetch
        fetch(`${apiCart}/${cartId}`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true,
                'Ngrok-Version': '2'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
        .then(cartData => {
        // 2. Kirim data cart ke endpoint checkout menggunakan fetch dengan method POST
            const checkoutData = {
                customerName: cartData.customerName,
                phoneNumber: cartData.phoneNumber,
                tickets: cartData.tickets,
                totalPrice: cartData.totalPrice,
                paymentStatus: "Lunas"
            };

            const checkoutOptions = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true,
                'Ngrok-Version': '2'
                },
                body: JSON.stringify(checkoutData),
            };

            return fetch(`${apiCheckout}/${cartId}`, checkoutOptions);
            })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
        .then(checkoutData => {
            console.log('Checkout Successful:', checkoutData);

            // 3. Hapus data di cart menggunakan fetch dengan method DELETE
            return fetch(`${apiCart}/${cartId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload())
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
        return response.json();
        })
        .then(() => {
            console.log('Cart Item Deleted');
        })
        .then(() => location.reload())
        .catch(error => {
            console.error('Error:', error.message);
        });

    }
  });


// Gunakan Promise.all untuk melakukan beberapa permintaan API secara paralel
Promise.all([
  fetchAPI(apiCart),
  fetchAPI(apiEvent),
  fetchAPI(apiCheckout),
])
  .then(responses => {
    // responses berisi array hasil dari setiap permintaan API
    const [cartData, eventData, checkoutData] = responses;

    console.log('Data Cart:', cartData);
    console.log('Data Event:', eventData);
    console.log('Data Checkout:', checkoutData);

    const carts = cartData.data;
    const events = eventData.data;
    const checkout = checkoutData.data;

    showCart(carts, events);
    showCheckout(checkout, events);

  })