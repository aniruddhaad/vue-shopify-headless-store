# 🧠 Headless Shopify Storefront (Vue 3)

A headless eCommerce frontend built using Vue 3 that consumes Shopify Storefront GraphQL APIs, implementing a complete cart lifecycle and checkout flow.

---

## 🚀 Features

- Product listing (GraphQL query)
- Product detail page (dynamic routing)
- Add to cart (cartLinesAdd mutation)
- Update quantity (cartLinesUpdate)
- Remove items (cartLinesRemove)
- Persistent cart (localStorage + API sync)
- Checkout via Shopify hosted checkout

---

## 🏗️ Architecture

```
Vue (Vite SPA)
   ↓
Vue Router
   ↓
Component Layer (UI)
   ↓
Pinia Store (global state)
   ↓
Shopify Service (GraphQL layer)
   ↓
Shopify Storefront API
   ↓
Checkout (Shopify hosted)
```

---

## 🔁 Cart Flow

```
User Action → Add to Cart
        ↓
Check cartId (localStorage)
        ↓
Create cart (if missing)
        ↓
Add line (variantId)
        ↓
Update global state (Pinia)
        ↓
Persist + sync with API
```

---

## ⚙️ Tech Stack

- Vue 3 (Composition API)
- Vite
- Vue Router
- Pinia
- Shopify Storefront API (GraphQL)
- JavaScript (ES Modules)

---

## 🧠 Key Learnings

- Managing cart lifecycle in headless Shopify (no built-in session cart)
- Handling GraphQL mutations and schema constraints
- Variant-based cart operations (not product-based)
- Syncing frontend state with backend state
- Designing separation between UI and API layers

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file:

```
VITE_SHOPIFY_DOMAIN=your-store-url
VITE_SHOPIFY_STOREFRONT_TOKEN=your-token
```

---

## 📌 Notes

- This project focuses on architecture and API integration rather than UI styling  
- Built as a learning + exploration project for headless commerce  
