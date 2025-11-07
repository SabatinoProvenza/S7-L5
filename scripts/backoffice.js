const url = "https://striveschool-api.herokuapp.com/api/product/"
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYWQzY2Y0YmQ0NzAwMTU4NWIxZDciLCJpYXQiOjE3NjI1MDM5OTYsImV4cCI6MTc2MzcxMzU5Nn0.-mvXec-0WH24zpCSkKLPeP1hYMLDRLKs1NhTZpduDhg"

const form = document.getElementById("productForm")

const addressBar = new URLSearchParams(location.search)
const productId = addressBar.get("id")

if (productId) {
  document.querySelector("h1").innerText = "Modifica prodotto"

  fetch(url + productId, {
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
    .then((product) => {
      document.getElementById("name").value = product.name
      document.getElementById("description").value = product.description
      document.getElementById("brand").value = product.brand
      document.getElementById("imageUrl").value = product.imageUrl
      document.getElementById("price").value = product.price

      //  aggiungo un bottone "Elimina" sotto il form
      const deleteBtn = document.createElement("button")
      deleteBtn.innerText = "Elimina prodotto"
      deleteBtn.className = "btn btn-danger mt-3"
      deleteBtn.type = "button"
      const buttonsRow = form.querySelector(
        ".d-flex.justify-content-between.align-items-end"
      )

      // aggiungo il bottone nella stessa riga
      buttonsRow.appendChild(deleteBtn)

      //  quando clicchi, apre il modale
      deleteBtn.addEventListener("click", function () {
        const openModalButton = document.createElement("button")
        openModalButton.setAttribute("data-bs-toggle", "modal")
        openModalButton.setAttribute("data-bs-target", "#deleteModal")
        openModalButton.style.display = "none"
        document.body.appendChild(openModalButton)
        openModalButton.click()
        openModalButton.remove()
      })

      //  conferma l'eliminazione dal modale
      const confirmDelete = document.getElementById("confirmDeleteBtn")
      confirmDelete.addEventListener("click", function () {
        fetch(url + productId, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        })
          .then((res) => {
            if (res.ok) {
              alert("🗑️ Prodotto eliminato con successo!")
              window.location.href = "index.html"
            } else {
              alert("❌ Errore durante l'eliminazione")
            }
          })
          .catch((err) => console.log("Errore:", err))
      })
    })
}

form.addEventListener("submit", function (event) {
  event.preventDefault()

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  }

  let method
  let endpoint

  if (productId) {
    method = "PUT"
    endpoint = url + productId
  } else {
    method = "POST"
    endpoint = url
  }

  fetch(endpoint, {
    method: method,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (response.ok) {
        alert("Prodotto salvato con successo ✅")
        window.location.href = "index.html"
      } else {
        alert("Errore nel salvataggio ❌")
      }
    })
    .catch((error) => {
      console.log("Errore:", error)
    })
})
