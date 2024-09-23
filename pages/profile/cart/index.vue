<template>
    <main class="home">
        <main class="body">
            <article class="products-container">
                <header v-if="1">
                    <span class="header" @click="customerStore.getCart()">
                        {{ $t("cart") }} <span>({{ customerStore.cart.length }})</span>
                    </span>
                </header>
                <LayoutProfileCartTable :products="customerStore.cart" v-if="customerStore.cart.length > 0" />
                <span class="no-data-fount" v-else>{{ $t('no-data-found') }}</span>
            </article>
        </main>
    </main>
</template>

<script setup>

    const customerStore = useCustomerProductStore();
    customerStore.getCart();

</script>

<style lang="scss" scoped>

    article.products-container {
        padding: 0 !important;
        header {
            display: flex;
            justify-content: space-between;
            > span {
                color: #000 !important;
            }
        }
    }

</style>