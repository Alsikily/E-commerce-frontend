<template>
    <NuxtLayout name="home">
        <section class="product-info">
            <section class="images">
                <LayoutProductSlider :product="customerProduct.product" />
            </section>
            <section class="info">
                <h1>
                    {{ locale == 'en-us' ? customerProduct.product.en_name : customerProduct.product.ar_name }}
                </h1>
                <NuxtLink :to="`/traders/${customerProduct.product.add_by}`" class='name'>{{ customerProduct.product.name }}</NuxtLink>
                <span>{{ $t('category') }}: {{ locale == 'en-us' ? customerProduct.product.en_cat_name : customerProduct.product.ar_cat_name }}</span>
                <span>{{ $t('quantity') }}: {{ customerProduct.product.quantity }} PCS</span>
                <span class="unit-price">
                    <span class="prices">
                        {{ $t('price') }}:
                        <span class="new-price">{{ customerProduct.product.new_price }}</span>
                        <span class="old-price">{{ customerProduct.product.unit_price }}</span>
                    </span>
                    <span class="discount">-{{ customerProduct.product.discount }}%</span>
                </span>
                <span class="delivery">{{ $t('delivery') }}: 
                    <span class="free" v-if="customerProduct.product.delivery == 'free'">
                        {{ customerProduct.product.delivery }}
                    </span>
                    <span class="paid" v-else>{{ customerProduct.product.delivery_charge }}</span>
                </span>
                <span>
                    {{ $t('status') }}: {{ customerProduct.product.status }}
                </span>
                <span>
                    {{ $t('payment') }}: {{ customerProduct.product.payment }}
                </span>
                <span>
                    {{ $t('views') }}: {{ customerProduct.product.views }}
                </span>
                <NuxtLink to="asd">Fsa</NuxtLink>
                <LayoutRate :rate="customerProduct.product.product_review" />
                <p class="description">
                    {{ locale == 'en-us' ? customerProduct.product.en_description : customerProduct.product.ar_description }}
                </p>
            </section>
        </section>
        <section class="reviews-container">
            <header>{{$t('customers-reviews')}}</header>
            <section class="reviews">
                <div class="review" v-for="review in customerProduct.product.product_reviews">
                    <span class='name'>{{ review.user.name }}</span>
                    <span class="rate" v-if="review.rate">
                        <LayoutProductRate :rate="review.rate" />
                    </span>
                    <span class="comment" v-if="review.comment">{{ review.comment }}</span>
                </div>
            </section>
        </section>
    </NuxtLayout>
</template>

<script setup>

    const { locale } = useI18n();
    const customerProduct = useCustomerProductStore();
    const product_id = useRoute().params.id;
    await customerProduct.getProduct(product_id);

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .product-info {
        display: flex;
        gap: 7px;
        overflow: hidden;
        margin-bottom: 35px;
        > .images {
            flex: 1;
            height: 500px;
        }
        > .info {
            width: 200px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            > h1 {
                overflow: hidden;
                font-size: 18px;
                &::first-letter {
                    text-transform: capitalize;
                }
            }
            a.name {
                font-size: 14px;
                font-weight: normal;
                color: #0066ff;
                text-decoration: underline;
            }
            span.unit-price {
                display: inline-block;
                span.prices {
                    display: inline-flex;
                    gap: 5px;
                    span.new-price {
                        color: colors.$color-colored-2;
                        font-weight: bold;
                    }
                    span.old-price {
                        font-size: 12px;
                        align-self: flex-end;
                        text-decoration: line-through;
                    }
                }
                span.discount {
                    background-color: colors.$color-colored-2-light;
                    color: colors.$color-colored-2;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-weight: bold;
                    font-size: 14px;
                    margin-left: 8px;
                    display: inline-block;
                }
            }
            span.delivery {
                span.free {
                    background-color: colors.$color-success-light;
                    color: colors.$color-success;
                    padding: 2px 6px;
                    font-weight: bold;
                    font-size: 14px;
                }
            }
            p.description {
                flex: 1;
            }
        }
    }

    section.reviews-container {
        > header {
            margin-bottom: 15px;
            font-weight: bold;
        }
        > .reviews {
            > .review {
                $circle-radius: 8px;
                $mixed-padding: 12px;
                border-inline-start: 1px solid colors.$color-colored;
                margin-inline-start: $circle-radius;
                padding-bottom: 25px;
                > span.name {
                    color: colors.$color-colored;
                    font-weight: bold;
                    position: relative;
                    display: block;
                    padding-inline-start: $mixed-padding;
                    line-height: $circle-radius * 2;
                    margin-bottom: 8px;
                    &::before {
                        content: '';
                        position: absolute;
                        top: 0px;
                        left: -$circle-radius;
                        width: $circle-radius * 2;
                        height: $circle-radius * 2;
                        border-radius: 50%;
                        background-color: colors.$color-colored;
                    }
                }
                span.rate {
                    display: block;
                    padding-inline: $mixed-padding;
                    margin-bottom: 2px;
                }
                span.comment {
                    display: block;
                    padding-inline: $mixed-padding;
                    font-size: 14px;
                    line-height: 22px;
                    color: #555555;
                }
            }
        }
    }

    @media (max-width: 800px) {
        .product-info {
            display: block;
            > .images {
                height: 400px;
                margin-bottom: 10px;
            }
        }
    }

</style>