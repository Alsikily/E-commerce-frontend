<template>
    <main>
        <slot />
        <div class="home">
            <NuxtLink to="/">{{ $t('home') }}</NuxtLink>
        </div>
    </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        flex-direction: column;
        gap: 25px;
        > div.home {
            width: fit-content;
            > a {
                background-color: colors.$color-colored-2;
                color: #fff;
                font-weight: bold;
                padding: 12px 50px;
                display: inline-block;
                border-radius: 2px;
            }
        }
    }

</style>