<template>
    <aside :class="[settings.asideOpen ? 'opened' : '']">
        <ul>
            <li>
                <header>
                    <NuxtLink to="statistics">
                        <span class="icon">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                        </span>
                        {{ $t("statistics") }}
                    </NuxtLink>
                </header>
            </li>
            <li>
                <header @click="openSections.product = !openSections.product">
                    <span class="icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                    </span>
                    {{ $t("products") }}
                </header>
                <section v-if="openSections.product">
                    <NuxtLink to="/profile/products">
                        {{ $t('my-products') }}
                    </NuxtLink>
                    <NuxtLink to="/profile/products/orders">{{ $t('orders') }}</NuxtLink>
                    <NuxtLink to="/profile/products/add-product">
                        {{ $t("add-product") }}
                    </NuxtLink>
                </section>
            </li>
            <li>
                <header>
                    <NuxtLink to="/profile/purchases/orders">
                        <span class="icon">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>                        </span>
                        {{ $t("purchases") }}
                    </NuxtLink>
                </header>
                <!-- <header @click="openSections.purchases = !openSections.purchases">
                    <span class="icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </span>
                    {{ $t("purchases") }}
                </header>
                <section v-if="openSections.purchases">
                    <NuxtLink to="/profile/purchases/orders">
                        Orders
                    </NuxtLink>
                    <NuxtLink to="two">
                        Refused
                    </NuxtLink>
                </section> -->
            </li>
            <li>
                <header>
                    <NuxtLink to="/profile/cart">
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        </span>
                        {{ $t("cart") }}
                    </NuxtLink>
                </header>
            </li>
            <li>
                <header>
                    <NuxtLink to="favourites" style="color: red">
                        <span class="icon" style="">
                            <svg style="fill: red; color: red" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </span>
                        {{ $t("favourites") }}
                    </NuxtLink>
                </header>
            </li>
        </ul>
        <span class="logout" @click="authMethods.logout()">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
        </span>
    </aside>
</template>

<script setup>

    const authMethods = useAuthMethodsStore();
    const settings = useAppSettings();

    const openSections = reactive({
        product: false,
        purchases: false,
        follow: false
    });

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    %sd{
        display: flex;
        align-items: center;
        gap: 7px;
        height: 52px;
        width: 100%;
        border-bottom: 1px solid colors.$color-light;
        color: #000;
        font-weight: bold;
        font-size: 14px;
    }

    main {
        display: flex;
        aside {
            width: 250px;
            background-color: #fff;
            height: calc(100vh - 50px);
            border-inline-end: 1px solid colors.$color-light;
            flex-direction: column;
            justify-content: space-between;
            display: flex;
            &.opened {
                display: flex !important;
            }
            > span.logout {
                border-top: 1px solid colors.$color-light;
                display: flex;
                height: 50px;
                align-items: center;
                padding: 0 10px;
                gap: 5px;
                font-weight: bold;
                cursor: pointer;
                > svg {
                    width: 20px;
                }
            }
            > ul {
                > li {
                            text-transform: capitalize;
                    > header {
                        cursor: pointer;
                        @extend %sd;
                        &:not(:has(> a)) {
                            padding: 0 10px;
                        }
                        > span.icon {
                            width: 20px;
                            > svg {
                                width: 18px;
                            }
                        }
                        > a {
                            padding: 0 10px;
                            @extend %sd;
                            > span.icon {
                                width: 20px;
                                > svg {
                                    width: 18px;
                                }
                            }
                            &.router-link-active {
                                background-color: #eee;
                            }
                        }
                    }
                    > section {
                        display: flex;
                        flex-direction: column;
                        border-bottom: 1px solid colors.$color-light;
                        > a {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            padding-inline-start: 40px;
                            font-size: 12px;
                            color: #000;
                            font-weight: bold;
                            &:not(:last-of-type) {
                                border-bottom: 1px dashed #ddd;
                            }
                            &.router-link-exact-active {
                                background-color: #eee;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 600px) {
        aside {
            position: absolute;
            z-index: 995;
            display: none !important;
        }
    }

</style>