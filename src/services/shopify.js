const domain=import.meta.env.VITE_SHOPIFY_DOMAIN
const token=import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

const endpoint=`https://${domain}/api/2023-10/graphql.json`

export async function shopifyFetch(query, variables = {}) {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token
        },
        body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()
    return json.data
}

export async function createCart() {
    const query = `
        mutation {
            cartCreate {
                cart {
                    id
                    checkoutUrl
                }
            }
        }
    `

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token
        },
        body: JSON.stringify({ query })
    })
    
    const data = await res.json()
    return data.data.cartCreate.cart
}

export async function addToCart(cartId, variantId, quantity = 1) {
    console.log('CART ID:', cartId)
    const query = `
        mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    id
                    totalQuantity
                }
            }
        }
    `

    const variables = {
        cartId,
        lines: [
            {
                merchandiseId: variantId,
                quantity
            }
        ]
    }

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token
        },
        body: JSON.stringify({ query, variables })
    })

    const data = await res.json()
    console.log('ADD TO CART RESPONSE:', data)
    return data.data.cartLinesAdd.cart
}

export async function getCart(cartId) {
    const query = `
        query getCart($cartId: ID!) {
            cart(id: $cartId) {
            id
            totalQuantity
            checkoutUrl
            lines(first: 10) {
                edges {
                node {
                    id
                    quantity
                    merchandise {
                    ... on ProductVariant {
                        id
                        title
                        product {
                        title
                        }
                    }
                    }
                }
                }
            }
            }
        }
        `

    const variables = { cartId }

    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token
        },
        body: JSON.stringify({ query, variables })
    })

    const data = await res.json()
    return data.data.cart
}


export async function updateCartLine(cartId, lineId, quantity) {
  const query = `
    mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    cartId,
    lines: [
      {
        id: lineId,
        quantity
      }
    ]
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query, variables })
  })

  const data = await res.json()
  console.log('UPDATE CART RESPONSE:', data)

  return data.data.cartLinesUpdate.cart
}

export async function removeCartLine(cartId, lineId) {
  const query = `
    mutation removeLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    cartId,
    lineIds: [lineId]
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query, variables })
  })

  const data = await res.json()
  console.log('REMOVE RESPONSE:', data)

  return data.data.cartLinesRemove.cart
}