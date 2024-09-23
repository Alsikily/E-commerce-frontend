<template>
    <div>
        <input type="text" v-model="product_quantity">
        <button class="save-quantity" @click="customerProduct.updateQuantity(product.id, product_quantity)">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>
    </div>
</template>

<script setup>

    const { product } = defineProps(['product']);
    const customerProduct = useCustomerProductStore();
    const product_quantity = ref(product.quantity);

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .input {
        input {
            vertical-align: bottom;
            background-color: #f5f5f5;
            width: 45px;
            height: 40px;
            text-align: center;
            font-weight: bold;
            border-radius: 1px;
            border: 1px solid #ccc;
        }
        button.save-quantity {
            width: 45px;
            height: 40px;
            background-color: colors.$color-dark;
            color: #fff;
            border-radius: 1px;
            &.saving {
                pointer-events: none;
                background-color: #ddd;
                color: #a5a5a5;
            }
        }
    }
</style>