<template>
    <main class="invoice" v-if='customerProduct.cart.length > 0'>
        <section class="products">
            <header class="flex-table">
                <span>{{ $t('product') }}</span>
                <span>{{ $t('unit_price') }}</span>
                <span>{{ $t('quantity') }}</span>
                <span>{{ $t('discount') }}</span>
                <span>{{ $t('total') }}</span>
            </header>
            <div class="product flex-table" v-for="product in customerProduct.cart">
                <span>{{ locale == 'en-us' ? product.en_name : product.ar_name }}</span>
                <span class="prices">
                    <span class="new">{{ product.new_price }}</span>
                    <span class="old">{{ product.unit_price }}</span>
                </span>
                <span>{{ product.quantity }}</span>
                <span>{{ product.discount }}</span>
                <span class="total">{{ product.new_price * product.quantity }}</span>
            </div>
        </section>
        <hr>
        <div class="total">
            <span class="title">{{ $t('total') }}</span>
            <span class="total">{{ totalPrice }}</span>
        </div>
        <hr>
        <input type='text' class="address" v-model='customerProduct.OrderAddress' placeholder="Address" required />
        <select v-model="customerProduct.paymentMethod">
            <option value="credit">Credit</option>
            <option value="cash">Cash</option>
        </select>
        <button @click="customerProduct.cartPayment()">Buy Now</button>
    </main>
</template>

<script setup>

    const { locale } = useI18n();
    const customerProduct = useCustomerProductStore();
    customerProduct.getInvoiceProducts();

    const totalPrice = computed(() => {
        return customerProduct.cart.reduce((total, item) => {
            return total + (item.new_price * item.quantity);
        }, 0);
    });

    if (customerProduct.cart.length == 0) {
        navigateTo('/');
    }

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    main.invoice {
        max-width: 700px;
        height: 2000px;
        margin: 30px auto 0 auto;
        // background: #ddd;
        > section.products {
            .flex-table {
                display: flex;
                text-align: center;
                > span {
                    width: 90px;
                    &:nth-child(1) {
                        flex: 1;
                        text-align: start;
                        font-weight: bold;
                    }
                    &:last-child.total {
                        color: colors.$color-colored-2;
                        font-weight: bold;
                    }
                    &.prices {
                        span.old {
                            text-decoration: line-through;
                            font-size: 12px;
                        }
                        span.new {
                            font-weight: bold;
                            color: colors.$color-colored-2;
                            display: inline-block;
                            margin-right: 2px;
                        }
                    }
                }
            }
            > header {
                background-color: colors.$color-dark;
                padding: 12px 0px;
                padding-inline-start: 5px;
                > span {
                    // color: colors.$color-colored-2;
                    color: #fff;
                    font-weight: bold;
                }
            }
            > .product {
                padding: 8px 0;
            }
        }
        > hr {
            border: 0;
            height: 1px;
            background-color: #ddd;
            margin-bottom: 6px;
        }
        > div.total {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            > span.title {
                flex: 1;
                font-weight: bold;
            }
            > span.total {
                width: 90px;
                text-align: center;
                color: colors.$color-colored-2;
                font-weight: bold;
            }
        }
    }

    select {
        width: 100%;
        height: 40px;
        font-weight: bold;
        color: #333;
        border: 1px solid colors.$color-light;
    }

    input.address {
        max-width: 100%;
        max-height: 400px;
        padding: 12px 6px;
        margin-bottom: 6px;
        border: 1px solid colors.$color-light;
        &::placeholder {
            color: #333;
        }
    }

    button {
        display: block;
        margin-top: 5px;
        background-color: colors.$color-colored-2;
        color: #fff;
        font-weight: bold;
        height: 40px;
        width: 100%;
    }

</style>