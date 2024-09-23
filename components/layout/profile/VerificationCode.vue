<template>
    <span class="options">
        <input type="text" v-model="VerificationCode">
        <button @click="salerProduct.delivered(order.id, VerificationCode, index)">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>
    </span>
</template>

<script setup>

    const { order, index } = defineProps(['order', 'index']);
    const salerProduct = useSalerProductStore();
    const VerificationCode = ref(null);

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .options {
        width: 200px;
        text-align: center;
        display: flex;
        justify-content: center;
        input {
            vertical-align: bottom;
            background-color: #f5f5f5;
            flex: 1;
            text-align: center;
            font-weight: bold;
            border-radius: 1px;
            border: 1px solid #ccc;
        }
        button {
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