<template>
    <main class="home">
        <main class="body">
            <article class="products-container">
                <header>Orders</header>
                <section class="products-table" v-if="salerProduct.orders.length > 0">
                    <div class="row">
                        <span>{{ $t('product-name') }}</span>
                        <span class="options">{{ $t('code') }}</span>
                    </div>
                    <div class="row" v-for="(order, index) in salerProduct.orders">
                        <span>
                            <span class="name">{{ order.user.name }}</span>
                            <br>
                            <span class="name">{{ order.address }}</span>
                            <br>
                            <span class="product" v-for="product in order.products">
                                <span class="product-name">{{ locale == 'en-us' ? product.en_name : product.ar_name }}</span>
                                <span class="price">{{ product.new_price }}</span>
                            </span>
                            <span class="product">
                                <span class="product-name">Total</span>
                                <span class="price total">{{ order.InvoiceValue }}</span>
                            </span>
                        </span>
                        <LayoutProfileVerificationCode v-if='order.paid !== 1' :order="order" :index="index" />
                        <span class="options" v-else>{{ $t('paid') }}</span>
                    </div>
                </section>
                <span class="not-found" v-else>{{ $t('no-data-found') }}</span>
            </article>
        </main>
    </main>
</template>

<script setup>

    const { locale } = useI18n();
    const salerProduct = useSalerProductStore();
    await salerProduct.getMyOrders();

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    article.products-container {
        padding: 0 !important;
    }

    .products-table {
        width: 100%;
        padding-bottom: 50px;
        .row {
            display: flex;
            align-items: center;
            padding: 12px 8px;
            > svg {
                color: colors.$color-danger;
                cursor: pointer;
            }
            &:nth-child(odd) {
                background-color: #eee;
            }
            span {
                &:not(.options) {
                    flex: 1;
                    > span.product {
                        display: flex !important;
                        justify-content: space-between;
                        padding-inline-end: 15px;
                        > .product-name {
                            flex: 1;
                        }
                        > .price {
                            display: inline-block;
                            flex: 0;
                            &.total {
                                color: colors.$color-colored-2;
                                font-weight: bold;
                            }
                        }
                    }
                }
                &.options {
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
                > span.product {
                    display: block;
                }
            }
            &:first-child {
                background-color: colors.$color-dark;
                color: #fff;
                font-weight: bold;
            }
        }
    }

</style>