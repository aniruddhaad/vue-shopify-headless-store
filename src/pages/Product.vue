<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { shopifyFetch, addToCart, createCart } from '../services/shopify'
import { cartCount, setCartCount } from '../store/cart'

const handleAddToCart = async () => {
    let cartId = localStorage.getItem('cartId')
    
    if(!cartId) {
        const cart = await createCart()
        cartId = cart.id
        localStorage.setItem('cartId', cartId)
    }

    const variantId = product.value.variants.edges[0].node.id
    const updatedCart = await addToCart(cartId, variantId)

    if(updatedCart){
        setCartCount(updatedCart.totalQuantity)
    }

    console.log('UPDATED CART: ', updatedCart)
}

const route = useRoute()
const product = ref(null)

onMounted(async () => {
    const handle = route.params?.handle


    if (!handle) {
        console.error("Handle not found in route params")
        return
    }

    const data = await shopifyFetch(`
    query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
            id
            title
            descriptionHtml
            images(first: 1) {
                edges {
                    node {
                        url
                    }
                }
            }
            variants(first: 1) {
                edges {
                    node {
                        id
                        title
                    }
                }
            }
        }
    }
    `, { handle })
    product.value = data?.productByHandle
})


</script>

<template>
    <div v-if="!product">
        Loading...
    </div>

    <div v-else>
        <h1>{{ product.title }}</h1>
        <img :src="product.images.edges[0]?.node.url" class="prodimg"/>
        <div v-html="product.descriptionHtml"></div>
        <button @click="handleAddToCart">
        Add to Cart
        </button>
    </div>
</template>
<style>
.prodimg{
    height:500px;
}
</style>