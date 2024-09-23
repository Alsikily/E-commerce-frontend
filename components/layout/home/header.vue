<template>
    <header>
        <div class="container">
            <NuxtLink to='/' class="logo">{{ $t('AppName') }}</NuxtLink>
            <LayoutHomeHeaderSearch class="parent" />
            <div class="icons">
                <LayoutLangSwitcher />
                <span class="icon heart">
                    <NuxtLink :to='localePath("/profile/favourites")' title="Favourites">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </NuxtLink>
                </span>
                <span :class="['icon', authStore.isLogin ? 'user-authed' : '']">
                    <NuxtLink to="/profile/statistics" title="Profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </NuxtLink>
                </span>
                <LayoutHomeCartButton />
                <!-- <span class="icon cart">
                    <NuxtLink :to='localePath("/profile/cart")'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        <span>
                            {{ $t("cart") }} ({{ customerProduct.cartCount }})
                        </span>
                    </NuxtLink>
                </span> -->
            </div>
            <LayoutHomeSmallList />
        </div>
    </header>
</template>

<script setup>

    const localePath = useLocalePath();
    const authStore = useAuthStore();

</script>

<style lang="scss" scoped>

@use '~/scss/helpers/colors' as colors;

header {
    border-bottom: 1px solid colors.$color-light;
    height: 50px;
    display: flex;
    align-items: center;
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        a.logo {
            color: colors.$color-colored;
            font-weight: bold;
            font-size: 1.5em;
        }
        div.icons {
            display: flex;
            gap: 15px;
            .icon {
                align-self: center;
                a {
                    display: flex;
                    align-items: center;
                    svg {
                        color: colors.$color-dark;
                    }
                }
                &.heart {
                    a {
                        svg {
                            width: 20px;
                            height: 20px;
                            fill: red;
                            color: red;
                        }
                    }
                }
                &.user-authed {
                    a {
                        svg {
                            width: 20px;
                            height: 20px;
                            fill: colors.$color-dark;
                            color: colors.$color-dark;
                        }
                    }
                }
                &.cart {
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
            }
        }
        .list {
            display: none;
            .icon svg {
                cursor: pointer;
            }
        }
    }
}

@media(max-width: 1000px) {
    .container {
        .search {
            display: none !important;
        }
        .icons {
            display: none !important;
        }
        .list {
            display: flex !important;
            position: relative;
        }
    }
    // .container-small {
    //     display: flex !important;
    //     justify-content: space-between;
    //     align-items: center;
    //     flex: 1;
    // }
}

</style>