<script setup>
import { ref, onMounted } from 'vue'
import { getCart, updateCartLine, removeCartLine } from '../services/shopify'
import { setCartCount } from '../store/cart'

const cart = ref(null)

onMounted(async () => {
  const cartId = localStorage.getItem('cartId')

  if (cartId) {
    cart.value = await getCart(cartId)
    console.log('CART DATA:', cart.value)
  }
})

const increase = async (line) => {
  const cartId = localStorage.getItem('cartId')

  const newQty = line.node.quantity + 1

  const updatedCart = await updateCartLine(
    cartId,
    line.node.id,
    newQty
  )

  setCartCount(updatedCart.totalQuantity)

  // refresh cart
  cart.value = await getCart(cartId)
}

const decrease = async (line) => {
  const cartId = localStorage.getItem('cartId')

  const newQty = line.node.quantity - 1

  if (newQty < 1) return

  const updatedCart = await updateCartLine(
    cartId,
    line.node.id,
    newQty
  )

  setCartCount(updatedCart.totalQuantity)

  // refresh cart
  cart.value = await getCart(cartId)
}

const removeItem = async (line) => {
  const cartId = localStorage.getItem('cartId')

  const updatedCart = await removeCartLine(
    cartId,
    line.node.id
  )

  setCartCount(updatedCart.totalQuantity)

  // refresh cart UI
  cart.value = await getCart(cartId)
}

const goToCheckout = async () => {
  const cartId = localStorage.getItem('cartId')

  const cartData = await getCart(cartId)

  if (cartData && cartData.checkoutUrl) {
    window.location.href = cartData.checkoutUrl
  }
}
</script>

<template>
  <div>
    <h1>Your Cart</h1>

    <div v-if="cart && cart.lines.edges.length">
      <div v-for="line in cart.lines.edges" :key="line.node.id">
        <p>{{ line.node.merchandise.product.title }}</p>

        <p>
            Qty: {{ line.node.quantity }}
        </p>

        <button @click="increase(line)">+</button>
        <button @click="decrease(line)">-</button>
        <button @click="removeItem(line)">Remove</button>
        <button @click="goToCheckout">
        Checkout
        </button>
      </div>
    </div>

    <div v-else>
      Cart is empty
    </div>
  </div>
</template>