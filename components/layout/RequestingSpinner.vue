<template>
    <span class="loader">
        <span></span>
        <span></span>
        <span></span>
    </span>
</template>

<script setup>

</script>

<style lang="scss" scoped>

@use "~/scss/helpers/colors" as colors;

span.loader {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: colors.$color-dark;
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    @keyframes loading {
        0%, 100% {
            height: 10px;
        }
        50% {
            height: 15px;
        }
    }
    > span {
        flex-basis: 5px;
        background-color: #fff;
        animation: loading 0.8s infinite;
        &:nth-child(2) {
            animation-delay: 0.2s;
        }
        &:nth-child(3) {
            animation-delay: 0.4s;
        }
    }
}

</style>