<script setup>
import { ref, onMounted } from 'vue'
import { shopifyFetch } from '../services/shopify'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])

onMounted(async () => {
  try {
    const data = await shopifyFetch(`
      query {
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              images(first: 1) {
                edges {
                    node {
                        url
                    }
                }
              }
            }
          }
        }
      }
    `)

    // safer assignment
    products.value = data?.products?.edges || []
  } catch (err) {
    console.error("API ERROR:", err)
  }
})
</script>
<template>
  <div class="container">
    <h1>Products</h1>

    <div v-if="products.length === 0">
      Loading or no products found...
    </div>

    <div class="grid">
        <ProductCard
            v-for="item in products" 
            :key="item.node.id"
            :product="item.node"
        />
    </div>
  </div>
</template>

<style>
.container {
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 8px;
  transition: 0.2s;
}

.card:hover {
  transform: scale(1.03);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>