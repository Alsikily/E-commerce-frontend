<template>
    <NuxtLayout name="home">
        <header v-if="1">{{ $t("products") }} <span>({{ customerStore.products.length }})</span></header>
        <section class="products" v-if="1">
            <LayoutHomeProduct v-for="(product, index) in customerStore.products" :product=product :index=index productType="product" />
        </section>
        <LayoutLoadingProducts v-else />
        <span class="no-data-found" v-if="customerStore.products.length == 0">{{ $t('no-data-found') }}</span>
        <div class="show-more" v-if="customerStore.currentProductsPage != 0" @click="customerStore.getProducts()">
            <span>{{ $t('show-more') }}</span>
        </div>
    </NuxtLayout>
</template>

<style scoped lang='scss'>

    div.show-more {
        margin: 50px 0;
        text-align: center;
        span {
            text-decoration: underline;
            color: blue;
            cursor: pointer;
        }
    }

</style>

<script setup>

    useHead({
        title: 'Shopping',
        meta: [
            { name: 'description', content: 'Shopping for used products' }
        ]
    });

    const customerStore = useCustomerProductStore();
    customerStore.getProducts();

</script>
