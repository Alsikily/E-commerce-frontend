<template>
    <NuxtLayout name="callback">
        <strong>Payment Done successfully</strong>
    </NuxtLayout>
</template>

<script setup>

    const { paymentId } = useRoute().query;
    const customerProduct = useCustomerProductStore();
    customerProduct.paymentSuccess(paymentId);

</script>

<style lang="scss" scoped>

</style>