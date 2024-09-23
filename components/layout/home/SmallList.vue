<template>
    <div class="list">
        <span class="icon" @click="settings.smallNavOpen = !settings.smallNavOpen">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
        </span>
        <ul v-if="settings.smallNavOpen">
            <li>
                <LayoutHomeHeaderSearch class='small' />
            </li>
            <li>
                {{ $t('lang') }}: <LayoutLangSwitcher />
            </li>
            <li>
                <NuxtLink :to='localePath("/profile/favourites")' title="Favourites">
                    {{ $t('favourites') }}
                </NuxtLink>
            </li>
            <li>
                <NuxtLink v-if="!authStore.isLogin" to="/login">{{ $t('login') }}</NuxtLink>
                <NuxtLink v-else to="/profile/statistics">{{ $t('dashboard') }}</NuxtLink>
            </li>
            <li style="cursor: pointer" @click="settings.smallNavOpen = !settings.smallNavOpen;settings.asideOpen = !settings.asideOpen">{{ $t('menu') }}</li>
            <li>
                <LayoutHomeCartButton />
            </li>
        </ul>
    </div>
</template>

<script setup>

    const localePath = useLocalePath();
    const authStore = useAuthStore();
    const settings = useAppSettings();

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .list {
        display: none;
        > span svg {
            cursor: pointer;
        }
        ul {
            position: absolute;
            z-index: 996;
            background: #fff;
            border: 1px solid colors.$color-light;
            border-top: none;
            right: 2px;
            li:not(:has(> a)) {
                padding: 5px 10px;
                color: #000;
            }
            li:has(> a) {
                > a {
                    display: inline-block;
                    padding: 5px 10px;
                    text-transform: capitalize;
                    color: #000;
                }
            }
        }
    }

    #app.ar-eg {
        .list {
            ul {
                top: 42px;
                left: 2px;
                right: auto;
            }
        }
    }

    #app.en-us {
        .list {
            ul {
                top: 39px;
                right: 2px;
                left: auto;
            }
        }
    }

</style>