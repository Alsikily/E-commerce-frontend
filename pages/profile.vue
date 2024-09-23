<template>
    <main class="profile">
        <LayoutHomeHeader />
        <main class="body">
            <LayoutProfileAside />
            <article class="content">
                <NuxtPage />
            </article>
        </main>
    </main>
</template>

<script setup>

    definePageMeta({
        middleware: 'auth'
    });

    const customerStore = useCustomerProductStore();
    customerStore.getCartCount();

</script>

<style lang="scss" scoped>
    main.profile {
        height: 100vh;
        overflow: hidden;
        main.body {
            display: flex;
            height: calc(100vh - 50px);
            > article.content {
                flex: 1;
                overflow: hidden;
                padding: 10px;
            }
        }
    }
</style>