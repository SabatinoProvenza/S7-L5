const url = "https://striveschool-api.herokuapp.com/api/product/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYWQzY2Y0YmQ0NzAwMTU4NWIxZDciLCJpYXQiOjE3NjI1MDM5OTYsImV4cCI6MTc2MzcxMzU5Nn0.-mvXec-0WH24zpCSkKLPeP1hYMLDRLKs1NhTZpduDhg"

const params = new URLSearchParams(location.search)
const productId = params.get("id")

const container = document.getElementById("productDetails")

if (productId) {
  fetch(url + productId, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore nel recupero del prodotto")
      }
    })
    .then((product) => {
      container.innerHTML = `
  <div class="d-flex justify-content-center mt-5">
    <div class="card shadow-sm border-0" style="width: 24rem;">
      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
      <div class="card-body text-center">
        <h4 class="card-title fw-bold mb-1">${product.name}</h4>
        <p class="text-muted mb-2">${product.brand}</p>
        <p class="card-text small mb-3">${product.description}</p>
        <p class="fw-bold text-success fs-5">€${product.price}</p>

        <div class="d-flex justify-content-center gap-3 mt-3">
          <a href="backoffice.html?id=${product._id}" class="btn btn-warning btn-sm px-3">Modifica</a>
          <a href="index.html" class="btn btn-secondary btn-sm px-3">Torna alla home</a>
        </div>
      </div>
    </div>
  </div>
`
    })

    .catch((err) => {
      console.error("Errore nel recupero dettagli:", err)
      container.innerHTML = `<p class="text-danger">Impossibile caricare il prodotto.</p>`
    })
} else {
  container.innerHTML = `<p class="text-danger">Nessun prodotto selezionato.</p>`
}
