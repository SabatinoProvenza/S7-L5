const url = "https://striveschool-api.herokuapp.com/api/product/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYWQzY2Y0YmQ0NzAwMTU4NWIxZDciLCJpYXQiOjE3NjI1MDM5OTYsImV4cCI6MTc2MzcxMzU5Nn0.-mvXec-0WH24zpCSkKLPeP1hYMLDRLKs1NhTZpduDhg"

const container = document.getElementById("productsContainer")

// Funzione per recuperare i prodotti
fetch(url, {
  headers: {
    Authorization: token,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error(
        `Errore nella risposta ricevuta dal server: ${res.status}`
      )
    }
  })
  .then((data) => {
    // Funzione per creare le card
    const showProducts = function (products) {
      container.innerHTML = "" // pulisce il container

      products.forEach((product) => {
        const col = document.createElement("div")
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4"

        col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted">${product.brand}</p>
          <p class="card-text small">${product.description}</p>
          <p class="card-text fw-bold">€${product.price}</p>
          <div class="mt-auto d-flex justify-content-between">
            <a href="backoffice.html?id=${product._id}" class="btn btn-primary btn-sm">Modifica</a>
           <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')">Elimina</button>
          </div>
        </div>
      </div>
    `
        container.appendChild(col)
      })
    }
    showProducts(data)
  })
  .catch((err) => console.error("Errore nel recupero prodotti:", err))

const deleteProduct = function (id) {
  window.location.href = `backoffice.html?id=${id}&delete=true`
}
