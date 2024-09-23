<template>
    <main class="home">
        <main class="body">
            <article class="products-container">
                <header v-if="1">{{ $t("favourites") }} <span>({{ customerStore.favourites.length }})</span></header>
                <section class="products" v-if="1">
                    <LayoutHomeProduct v-for="(product, index) in customerStore.favourites" :product=product :index=index productType="fav" />
                </section>
                <!-- <LayoutLoadingProducts v-else /> -->
            </article>
        </main>
    </main>
</template>

<script setup>

    const customerStore = useCustomerProductStore();
    customerStore.getFavourites();

</script>

<style lang="scss" scoped>

</style>