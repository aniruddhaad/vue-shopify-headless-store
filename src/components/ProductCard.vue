<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const { product } = defineProps({
  product: Object
})


function goToProduct() {
    router.push(`/product/${product.handle}`)
}

</script>

<template>
  <div class="card" @click="goToProduct">
    <img 
      :src="product.images.edges[0]?.node.url" 
      alt=""
    />

    <h3>{{ product.title }}</h3>
  </div>
</template>

<style scoped>
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