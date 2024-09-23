<template>
    <NuxtLayout name="home">
        <header v-if="1"><span>{{ $t("search") }}: </span>{{ action }}</header>
        <section class="products" v-if="1">
            <LayoutHomeProduct v-for="(product, index) in customerStore.searchProducts" :product=product :index=index productType="search" />
        </section>
        <LayoutLoadingProducts v-else />
    </NuxtLayout>
</template>

<script setup>

    const route = useRoute();
    let action = route.query.action;
    const customerStore = useCustomerProductStore();
    customerStore.getProducts();
    customerStore.getSearchProducts(action);

    watch (
        () => route.query.action,
        () => {
            action = route.query.action;
            customerStore.getSearchProducts(route.query.action);
        },
    );

    definePageMeta({
        validate: async (route) => {
            return route.query.action ? true : false;
        }
    })

</script>
