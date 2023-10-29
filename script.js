let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
searchBtn.addEventListener("click", () => {
  // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});
// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
  }
}

////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.querySelector(".close");
    const checkoutButton = document.getElementById("checkout-button");

    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const price = parseFloat(button.getAttribute("data-price"));
            const cartItem = document.querySelector(`#cart-items [data-id="${id}"]`);

            if (cartItem) {
                // Se o item já estiver no carrinho, aumente a quantidade
                const itemPrice = parseFloat(cartItem.getAttribute("data-price"));
                const itemQuantity = parseInt(cartItem.getAttribute("data-quantity")) + 1;
                cartItem.textContent = `${button.previousElementSibling.textContent} - $${(itemPrice * itemQuantity).toFixed(2)}`;
                cartItem.setAttribute("data-quantity", itemQuantity);
            } else {
                // Caso contrário, crie um novo item no carrinho
                const newCartItem = document.createElement("li");
                newCartItem.textContent = `${button.previousElementSibling.textContent} - $${price.toFixed(2)}`;
                newCartItem.setAttribute("data-id", id);
                newCartItem.setAttribute("data-price", price);
                newCartItem.setAttribute("data-quantity", 1);

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remover";
                removeButton.addEventListener("click", () => {
                    const quantity = parseInt(newCartItem.getAttribute("data-quantity"));
                    if (quantity > 1) {
                        newCartItem.setAttribute("data-quantity", quantity - 1);
                        newCartItem.textContent = `${button.previousElementSibling.textContent} - $${(price * (quantity - 1)).toFixed(2)}`;
                    } else {
                        newCartItem.remove();
                    }
                    total -= price;
                    cartTotal.textContent = total.toFixed(2);
                });
                newCartItem.appendChild(removeButton);

                cartItems.appendChild(newCartItem);
            }

            total += price;
            cartTotal.textContent = total.toFixed(2);
        });
    });

    closeCart.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    checkoutButton.addEventListener("click", () => {
        // Adicione aqui a lógica para finalizar a compra, como enviar os itens do carrinho para um servidor ou processar o pagamento.
        alert("Compra finalizada!");
        // Você pode redirecionar o usuário para uma página de pagamento real ou fazer outras ações necessárias.
    });
});
