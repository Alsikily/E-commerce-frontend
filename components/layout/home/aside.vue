<template>
    <aside :class="[settings.asideOpen ? 'opened' : '']">
        <h4>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            <span>
                {{ $t("filters-title") }}
            </span>
        </h4>
        <article class="filters">
            <section class="filter">
                <h5>
                    <span class="title">
                        {{ $t('price') }}
                    </span>
                    <span class="price" v-if="customerStore.filters.priceFrom > 0 && parseInt(customerStore.filters.priceTo) >= parseInt(customerStore.filters.priceFrom)">
                        ({{ customerStore.filters.priceFrom }} - {{ customerStore.filters.priceTo }})
                    </span>
                </h5>
                <div class="filter-body range">
                    <input type="text" v-model="customerStore.filters.priceFrom" :placeholder="$t('from')">
                    <input type="text" v-model="customerStore.filters.priceTo" :placeholder="$t('to')">
                </div>
            </section>
            <section class="filter">
                <h5>
                    <span class="title">
                        {{ $t('discount') }}
                    </span>
                    <span class="price" v-if="customerStore.filters.priceFrom > 0 && parseInt(customerStore.filters.priceTo) >= parseInt(customerStore.filters.priceFrom)">
                        ({{ customerStore.filters.discountFrom }}% - {{ customerStore.filters.discountTo }}%)
                    </span>
                </h5>
                <div class="filter-body range">
                    <input type="text" v-model="customerStore.filters.discountFrom" :placeholder="$t('from')" pattern="^(?:100|\d{1,2})$" maxlength="3">
                    <input type="text" v-model="customerStore.filters.discountTo" :placeholder="$t('to')" pattern="^(?:100|\d{1,2})$">
                </div>
            </section>
            <section class="filter">
                <h5>
                    {{ $t("status") }}
                </h5>
                <ul class="mulit-row">
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.status" value="like new" id="like-new">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="like-new">{{ $t("like-new") }}</label>
                    </li>
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.status" value="good" id="good">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="good">{{ $t("good") }}</label>
                    </li>
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.status" value="fair" id="fair">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="fair">{{ $t("fair") }}</label>
                    </li>
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.status" value="poor" id="poor">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="poor">{{ $t("poor") }}</label>
                    </li>
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.status" value="damaged" id="damaged">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="damaged">{{ $t("damaged") }}</label>
                    </li>
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.status" value="refurbished" id="refurbished">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="refurbished">{{ $t("refurbished") }}</label>
                    </li>
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.status" value="parts only" id="parts-only">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="parts-only">{{ $t("parts-only") }}</label>
                    </li>
                </ul>
            </section>
            <section class="filter">
                <h5>
                    {{ $t("delivery") }}
                </h5>
                <ul class="mulit-row">
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.delivery" value="free" id="free">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="free">{{ $t("free") }}</label>
                    </li>
                    <li>
                        <span class="input">
                            <input type="checkbox" v-model="customerStore.filters.delivery" value="paid" id="paid">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label for="paid">{{ $t("paid") }}</label>
                    </li>
                </ul>
            </section>
            <section class="filter">
                <h5>
                    {{ $t("category") }}
                </h5>
                <ul class="mulit-row">
                    <li v-for="category in categories">
                        <span class="input">
                            <input type="checkbox" :value="category.id" v-model="customerStore.filters.category" :id="`cat_${category.id}`">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </span>
                        <label :for="`cat_${category.id}`">{{ locale == 'en-us' ? category.en_cat_name : category.ar_cat_name }}</label>
                    </li>
                </ul>
            </section>
            <section class="filter">
                <h5>
                    {{ $t("review") }}
                </h5>
                <LayoutReviewer />
            </section>
            <button @click="customerStore.getProducts()">
                Filter
            </button>
        </article>
        <h4>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            <span>
                {{ $t("orders-title") }}
            </span>
        </h4>
        <article class="filters">
            <section class="filter">
                <h5>{{ $t("sort-by") }}</h5>
                <div class="filter-body selects">
                    <select @change="customerStore.getProducts()" v-model="customerStore.filters.sortBy">
                        <option value="unit_price">{{ $t("price") }}</option>
                        <option value="discount">{{ $t("discount") }}</option>
                        <option value="review">{{ $t("review") }}</option>
                    </select>
                    <select @change="customerStore.getProducts()" v-model="customerStore.filters.sortDir">
                        <option value="ASC">{{ $t("ascending") }}</option>
                        <option value="DESC">{{ $t("descending") }}</option>
                    </select>
                </div>
            </section>
        </article>
    </aside>
</template>

<script setup>

    const customerStore = useCustomerProductStore();
    const settings = useAppSettings();
    const { locale } = useI18n();
    const { categories } = defineProps(['categories']);

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    main {
        display: flex;
        aside {
            background-color: #fff;
            width: 250px;
            height: calc(100vh - 50px);
            border-inline-end: 1px solid colors.$color-light;
            overflow-y: auto;
            &.opened {
                display: block;
            }
            &::-webkit-scrollbar {
                display: none;
            }
            > h4 {
                text-transform: capitalize;
                height: 52px;
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 0 10px;
                border-bottom: 1px solid colors.$color-light;
                > svg {
                    width: 16px;
                }
            }
            > article.filters {
                padding: 25px 10px;
                display: flex;
                flex-direction: column;
                gap: 30px;
                &:not(:last-of-type) {
                    border-bottom: 1px solid colors.$color-light;
                }
                > section.filter {
                    > h5 {
                        margin-bottom: 10px;
                        display: flex;
                        justify-content: space-between;
                        text-transform: capitalize;
                        > span {
                            &.price {
                                color: colors.$color-colored-2;
                            }
                        }
                    }
                    > .filter-body {
                        &.range {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            input {
                                flex: 1;
                                height: 45px;
                                border: 1px solid colors.$color-light;
                                border-radius: 3px;
                                padding-inline-start: 6px;
                            }
                        }
                        &.selects {
                            display: flex;
                            gap: 5px;
                            select {
                                height: 45px;
                                border-radius: 3px;
                                border: 1px solid colors.$color-light;
                                flex: 2;
                                &:nth-child(2) {
                                    flex: 1;
                                }
                            }
                        }
                    }
                    > .mulit-row {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                        > li {
                            display: flex;
                            cursor: pointer;
                            gap: 8px;
                            align-items: center;
                            > span.input {
                                position: relative;
                                width: 20px;
                                height: 20px;
                                border: 1px solid colors.$color-light;
                                border-radius: 3px;
                                > input {
                                    position: absolute;
                                    opacity: 0;
                                    z-index: 1;
                                    height: 100%;
                                    width: 100%;
                                    &:checked {
                                        & ~ svg {
                                            color: #fff;
                                            display: block;
                                        }
                                    }  
                                }
                                > svg {
                                    display: none;
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                    height: 15px;
                                    width: 15px;
                                }
                                &:has(input:checked) {
                                    background-color: colors.$color-colored-2;
                                    & ~ label {
                                        color: colors.$color-colored-2;
                                    }
                                }
                            }
                            > label {
                                cursor: pointer;
                                font-size: 14px;
                                flex: 1;
                            }
                        }
                    }
                }
                > button {
                    background: colors.$color-colored-2;
                    color: #fff;
                    height: 35px;
                    font-weight: bold;
                    margin: -12px 0;
                    border-radius: 3px;
                    position: relative;
                }
            }
        }
    }

    @media (max-width: 600px) {
        aside {
            position: absolute;
            z-index: 995;
            display: none;
        }
    }

</style>