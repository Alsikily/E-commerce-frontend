<template>
    <main class="home">
        <main class="body">
            <article class="products-container">
                <header>Products</header>
                <!-- <section class="products" v-if="1"> -->
                    <!-- <LayoutHomeProduct v-for="(product, index) in customerStore.favourites" :product=product :index=index productType="fav">
                        <LayoutProfileCartProductCounter />
                    </LayoutHomeProduct> -->
                <!-- </section> -->
                <!-- <LayoutLoadingProducts v-else /> -->
                <section class="products-table">
                    <div class="row">
                        <span>{{ $t('product-name') }}</span>
                        <span class="options">{{ $t('options') }}</span>
                    </div>
                    <div class="row" v-for="(product, index) in salerProduct.myProducts">
                        <span>
                            {{ locale == 'en-us' ? product.en_name : product.ar_name }}
                        </span>
                        <span class="options">
                            <svg @click="salerProduct.deleteMyProduct(product.id, index)" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </span>
                    </div>
                </section>
            </article>
        </main>
    </main>
</template>

<script setup>

    const { locale } = useI18n();
    const salerProduct = useSalerProductStore();
    salerProduct.getMyProducts();

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
            svg {
                color: colors.$color-danger;
                cursor: pointer;
            }
            &:nth-child(odd) {
                background-color: #eee;
            }
            span {
                &:not(.options) {
                    flex: 1;
                }
                &.options {
                    width: 100px;
                    text-align: center;
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