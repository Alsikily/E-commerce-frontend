<template>
    <div class="search">
        <section class="input">
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="search" @keypress.enter="customerProduct.searchWord($event)" @keyup="customerProduct.search($event)">
        </section>
        <section class="suggestions">
            <ul>
                <li v-for="product in customerProduct.searchResults">
                    <NuxtLink :to='`/products/${product.id}`' @click="customerProduct.setSearchEmpty">
                        {{ locale == 'en-us' ? product.en_name : product.ar_name }}
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>

    const customerProduct = useCustomerProductStore();
    const { locale } = useI18n();

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    div.search {
        position: relative;
        &.parent {
            width: 500px;
            margin: 0 25px;
        }
        &.small {
            width: 200px;
        }
        section.input {
            $padding-left: 30px;
            display: flex;
            align-items: center;
            position: relative;
            height: 37px;
            > span.icon {
                position: absolute;
                width: 30px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                > svg {
                    width: 18px;
                    height: 18px;
                }
            }
            > input {
                width: 100%;
                height: 100%;
                border: 1px solid colors.$color-light;
                border-radius: 3px;
                padding-inline-start: $padding-left;
                &:focus {
                    border-color: colors.$color-colored;
                }
            }
            &:has(input:focus) > span.icon svg {
                color: colors.$color-colored;
            }
        }
        section.suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #fff;
            box-shadow: 0px 5px 6px #ccc;
            z-index: 999;
            border-radius: 3px;
            > ul {
                > li {
                    > a {
                        display: block;
                        width: 100%;
                        padding: 10px 5px;
                        color: #000;
                        &:hover {
                            background-color: colors.$color-colored;
                            color: #fff;
                        }
                    }
                    &:not(:last-child) {
                        > a {
                            border-bottom: 1px solid #ddd;
                        }
                    }
                }
            }
        }

    }

    

</style>