<template>
    <span class="switcher">
        <span class="lang" @click="switchLang('ar-eg')" v-if="locale == 'en-us'">
            AR
        </span>
        <span class="lang" @click="switchLang('en-us')" v-else-if="locale == 'ar-eg'">
            EN
        </span>
    </span>
</template>

<script setup lang="ts">

    const { locale, setLocale } = useI18n()

    function switchLang(lang) {
        setLocale(lang);
    }

</script>

<style lang="scss" scoped>
    span.switcher {
        align-self: center;
        .lang {
            font-weight: bold;
            cursor: pointer;
        }
    }
</style>