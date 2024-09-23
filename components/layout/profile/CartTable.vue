<template>
    <section class="table">
        <table>
            <thead>
                <tr>
                    <th>
                        {{ $t('image') }}
                    </th>
                    <th>
                        {{ $t('product-name') }}
                    </th>
                    <th>
                        {{ $t('unit-price') }}
                    </th>
                    <th>
                        {{ $t('discount') }}
                    </th>
                    <th>
                        {{ $t('quantity') }}
                    </th>
                    <th>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products">
                    <td>
                        <img :src="JSON.parse(product.images)[0]">
                    </td>
                    <td>
                        <NuxtLink :to='localePath(`/products/${product.id}`)'>
                            {{ locale == 'en-us' ? product.en_name : product.ar_name }}
                        </NuxtLink>
                    </td>
                    <td class="price">
                        <span class="new-price">{{ product.unit_price - (product.unit_price * (product.discount / 100)) }}</span>
                        <span class="old-price" v-if="product.discount > 0">{{ product.unit_price }}</span>
                    </td>
                    <td>
                        <span class="dark-light">
                            -{{ product.discount }}%
                        </span>
                    </td>
                    <td class="input">
                        <LayoutProfileQuantity :product=product />
                    </td>
                    <td>
                        <svg @click='customerStore.removeFromCart(product.id, index)' viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="buy">
            <NuxtLink to='cart/payment'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Buy now
            </NuxtLink>
        </div>
    </section>
</template>

<script setup>

    const localePath = useLocalePath();
    const { locale } = useI18n();
    const { products } = defineProps(['products']);
    const customerStore = useCustomerProductStore();

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    section.table {
        > table {
            border-collapse: collapse;
            width: 100%;
            thead {
                tr {
                    background-color: colors.$color-dark;
                    color: #fff;
                    > th {
                        &:last-child {
                            > svg {
                                color: #fff;
                                cursor: auto;
                            }
                        }
                    }
                }
            }
            tbody {
                background-color: #eee0;
                border: 1px solid #eee;
                border-top: 0;
                > tr {
                    border-bottom: 1px solid #eee;
                }
            }
            tr {
                height: 60px;
                > th,
                > td {
                    text-align: center;
                    &.input {
                        input {
                            vertical-align: bottom;
                            background-color: #f5f5f5;
                            width: 45px;
                            height: 40px;
                            text-align: center;
                            font-weight: bold;
                            border-radius: 1px;
                            border: 1px solid #ccc;
                        }
                        button.save-quantity {
                            width: 45px;
                            height: 40px;
                            background-color: colors.$color-dark;
                            color: #fff;
                            margin-inline-start: 5px;
                            border-radius: 1px;
                            &.saving {
                                pointer-events: none;
                                background-color: #ddd;
                                color: #a5a5a5;
                            }
                        }
                    }
                    &.price {
                        > span {
                            display: block;
                            line-height: 16px;
                        }
                        > span.new-price {
                            color: colors.$color-colored-2;
                            font-weight: bold;
                        }
                        > span.old-price {
                            font-size: 14px;
                            text-decoration: line-through;
                            color: #acacac;
                        }
                    }
                    > span.dark-light {
                        background-color: colors.$color-colored-2-light;
                        color: colors.$color-colored-2;
                        padding: 6px 11px;
                        border-radius: 3px;
                        font-weight: bold;
                        font-size: 14px;
                    }
                    > img {
                        width: 50px;
                        height: 50px;
                        margin-top: 6px;
                        margin-bottom: 1px;
                    }
                    > a {
                        text-decoration: underline;
                        color: colors.$color-colored;
                    }
                    &:first-child {
                        width: 70px;
                    }
                    &:nth-child(3) {
                        line-height: 24px;
                    }
                    &:last-child {
                        width: 30px;
                        > svg {
                            width: 18px;
                            color: colors.$color-danger;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .buy {
            display: flex;
            justify-content: flex-end;
            a {
                display: flex;
                align-items: center;
                flex-basis: fit-content;
                gap: 5px;
                background-color: colors.$color-colored-2;
                color: #fff;
                padding: 6px 8px;
                margin-top: 5px;
                cursor: pointer;
            }
        }
    }

</style>