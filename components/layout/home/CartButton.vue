<template>
    <span class="icon cart">
        <NuxtLink :to='localePath("/profile/cart")'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span>
                {{ $t("cart") }} ({{ customerProduct.cartCount }})
            </span>
        </NuxtLink>
    </span>
</template>

<script setup>

    const localePath = useLocalePath();
    const customerProduct = useCustomerProductStore();

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .cart {
        color: red;
        a {
            background-color: colors.$color-colored;
            color: #fff;
            border-radius: 5px;
            padding: 7px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            width: 112px;
            text-transform: capitalize;
            > svg {
                color: #fff;
            }
        }
    }

</style>