<template>
    <div class="reviewer">
        <span class="star colored" v-for="star in rate">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </span>
        <span class="star" v-for="star in (5 - rate)">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </span>
    </div>
</template>

<script setup>

const { rate } = defineProps(['rate']);

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .reviewer {
        display: flex;
        gap: 5px;
        > .star {
            &.colored {
                > svg {
                    color: colors.$color-colored-2;
                    fill: colors.$color-colored-2;
                }
            }
        }
    }

</style>