import { ref } from 'vue'

export const cartCount = ref(0)

export function setCartCount(count) {
    cartCount.value = count
}