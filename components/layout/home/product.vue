<template>
    <NuxtLink :to='localePath(`/products/${product.id}`)' class="product">
        <header>
            <img :src='JSON.parse(product.images)[0]' width="285" height="250" alt="product image">
            <span class="discount" v-if="authStore.isLogin && product.discount > 0">
                -{{ product.discount }}%
            </span>
            <span :class="['fav', product.addToFav == 1 ? 'faved': '']" @click.prevent="customerProduct.toggleFav(product.id, index, productType)" v-if="authStore.isLogin">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </span>
        </header>
        <section class="infos">
            <div class="info">
                <h5>
                    {{ locale == 'en-us' ? product.en_name : product.ar_name }}
                </h5>
                <span class="prices">
                    <span class="new">{{ product.new_price }}</span>
                    <span class="old" v-if="product.discount > 0">{{ product.unit_price }}</span>
                </span>
            </div>
            <div class="info">
                <span class="rate">
                    <svg v-for="x in product.product_review" v-if="product.product_review > 0" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <span v-else>Not reviews</span>
                    <span v-if="product.product_review">({{ product.reviews }})</span>
                </span>
                <button v-if="authStore.isLogin" @click.prevent="customerProduct.toggleCart(product.id, index, productType)">
                    Cart
                    <svg v-if="product.addToCart != 1" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <svg v-else viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
            <slot />
        </section>
    </NuxtLink>
</template>

<script setup>

    const localePath = useLocalePath();
    const { locale } = useI18n();
    const { product, index, productType } = defineProps(['product', 'index', 'productType']);
    const authStore = useAuthStore();
    const customerProduct = useCustomerProductStore();

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    a.product {
        border-radius: 6px;
        box-shadow: 5px 5px 5px #f5f5f5;
        > header {
            position: relative;
            img {
                width: 100%;
                height: 250px;
            }
            > span.fav {
                position: absolute;
                top: 15px;
                right: 15px;
                background-color: #fff;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                > svg {
                    width: 18px;
                    color: #000;
                }
                &.faved {
                    background-color: red;
                    > svg {
                        color: #fff;
                        fill: #fff;
                    }
                }
            }
            > span.discount {
                position: absolute;
                top: 15px;
                left: 15px;
                width: 50px;
                text-align: center;
                color: #fff;
                border-radius: 15px;
                font-size: 12px;
                height: 23px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: colors.$color-colored-2;
            }
        }
        > .infos {
            padding: 6px 5px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            > .info {
                display: flex;
                justify-content: space-between;
                gap: 5px;
                > h5 {
                    flex: 1;
                    color: #000;
                }
                > .prices {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    width: fit-content;
                    align-items: flex-end;
                    > .new {
                        color: colors.$color-colored-2;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    > .old {
                        font-size: 10px;
                        color: #a9a9a9;
                        text-decoration: line-through;
                    }
                }
                > .rate {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    svg {
                        width: 14px;
                        color: colors.$color-colored-2;
                        fill: colors.$color-colored-2;
                    }
                    > span {
                        font-size: 12px;
                    }
                }
                > button {
                    background-color: transparent;
                    color: colors.$color-colored;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    > svg {
                        width: 12px;
                    }
                }
            }
        }
    }
</style>
