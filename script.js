    const products = [
      {
        name: 'Cable RJ45',
        price: 1.50,
      },
      {
        name: 'Cable USB Type C',
        price: 10,
      },
      {
        name: 'Cable HDMI 2.0',
        price: 13.50,
      },
    ]

    let cart = {
      items: [],
      totalPrice: 0
    }

    function renderAllProducts() {
      const productTable = document.getElementById('products')
      productTable.innerHTML=''
      products.forEach((product, index) => {
        productTable.innerHTML += `
          <tr>
             <td>${product.name}</td>
             <td>${product.price}</td>
             <td>
               <button 
                  class="btn btn-success"  onclick="addToCart(${index})">
                     ADD TO CART </button>

             </td>
          </tr>
        `
      })
    }

    function renderAllCartItems() {
      const cartItemTable = document.getElementById('cart-items')
      const totalPriceElement = document.getElementById('total-price')
      let totalPrice = 0
      cartItemTable.innerHTML=''
      if(cart.items.length === 0) {
        cartItemTable.innerHTML = `
           <tr>
             <id colspan="5">
               There is no item in cart yet
             </td>
           </tr>
        `
      }
      cart.items.forEach((cartItem, index) => {
        totalPrice += cartItem.total
        cartItemTable.innerHTML += `
          <tr>
             <td>${cartItem.name}</td>
             <td>${cartItem.price}</td>
             <td>${cartItem.quantity}</td>
             <td>${cartItem.total}</td>
             <td>
               <button class="btn btn-danger" onclick="removeFromCart('${cartItem.name}')"> REMOVE FROM CART </button>
             </td>
          </tr>
        `
      })
      totalPriceElement.innerText = `Total: DT ${totalPrice}`
    }


    function addToCart(productIndex) {
      const product = products[productIndex]
      let isAlreadyInCart = false

      let newCartItems = cart.items.reduce((state, item) => {
        if(item.name === product.name) {
          isAlreadyInCart = true
          const newItem = {
            ...item,
            quantity: item.quantity + 1,
            total: (item.quantity +1 ) * item.price
          }

          return [...state, newItem];
        }
        return [...state, item]
      }, [])

      if(!isAlreadyInCart) {
        newCartItems.push({
          ...product,
          quantity: 1,
          total: product.price,
        })
      }

      cart = {
        ...cart,
        items: newCartItems,
      }
      renderAllCartItems();
    }

    function removeFromCart(productName){
        let newCartItems = cart.items.reduce((state, item) => {
            if(item.name === productName) {
              const newItem = {
                ...item,
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * item.price
              }
    
              if(newItem.quantity > 0) {
                  return [...state, newItem]
              } 
              return state
            }
            return [...state, item]
        }, [])
        cart = {
            ...cart, 
            items: newCartItems
        }

       renderAllCartItems()
    }


    renderAllProducts()
    renderAllCartItems()
