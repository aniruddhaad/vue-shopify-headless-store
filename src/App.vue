<script setup>
import { onMounted } from 'vue'
import { getCart } from './services/shopify'
import { setCartCount, cartCount } from './store/cart'

onMounted(async () => {
  const cartId = localStorage.getItem('cartId')

  if(cartId) {
    const cart = await getCart(cartId)
    if(cart)
    {
      setCartCount(cart.totalQuantity)
    }
  }
})
</script>


<template>
  <div>
    <h2>My Store</h2>

    <router-link to="/">Home</router-link>
    <router-link to="/cart">Cart ({{ cartCount }})</router-link>
  </div>

  <router-view />

</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>