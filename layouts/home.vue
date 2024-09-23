<template>
    <main class="home">
        <LayoutHomeHeader />
        <main class="body">
            <LayoutHomeAside :categories="categoryStore.categories" />
            <article class="products-container">
                <slot />
                <!-- <header v-if="1">{{ $t("products") }} <span>({{ customerStore.products.length }})</span></header>
                <section class="products" v-if="1">
                    <LayoutHomeProduct v-for="(product, index) in customerStore.products" :product=product :index=index productType="product" />
                </section>
                <LayoutLoadingProducts v-else /> -->
            </article>
        </main>
    </main>
</template>

<script setup>

    const categoryStore = useCategoryStore();
    const customerStore = useCustomerProductStore();
    const authStore = useAuthStore();
    categoryStore.getCategories();

    if (authStore.isLogin) {
        customerStore.getCartCount();
    }

</script>

<style lang="scss" scoped>

</style>