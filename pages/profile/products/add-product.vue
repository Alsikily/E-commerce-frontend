<template>
    <main id="page">
        <section class="profile-form-container">
            <header>{{ $t("add-product") }}</header>
            <form @submit.prevent="salerProduct.addProduct">
                <div class="inputs">
                    <div class="input">
                        <label>{{ $t('product-name') }} ({{ $t('en') }})</label>
                        <input type="text" v-model="salerProduct.productData.en_name">
                    </div>
                    <div class="input">
                        <label>{{ $t('product-name') }} ({{ $t('ar') }})</label>
                        <input type="text" v-model="salerProduct.productData.ar_name">
                    </div>
                    <div class="input">
                        <label>{{ $t('quantity') }}</label>
                        <input type="text" v-model="salerProduct.productData.quantity">
                    </div>
                    <div class="input">
                        <label>{{ $t('unit-price') }}</label>
                        <input type="text" v-model="salerProduct.productData.unit_price">
                    </div>
                    <div class="input">
                        <label>{{ $t('discount') }} (%)</label>
                        <input type="text" v-model="salerProduct.productData.discount">
                    </div>
                    <div class="input">
                        <label>{{ $t('status') }}</label>
                        <select v-model="salerProduct.productData.status">
                            <option value="like new">{{ $t('like-new') }}</option>
                            <option value="good">{{ $t('good') }}</option>
                            <option value="fair">{{ $t('fair') }}</option>
                            <option value="poor">{{ $t('poor') }}</option>
                            <option value="damaged">{{ $t('damaged') }}</option>
                            <option value="refurbished">{{ $t('refurbished') }}</option>
                            <option value="parts only">{{ $t('parts-only') }}</option>
                        </select>
                    </div>
                    <div class="input">
                        <label>{{ $t('category') }}</label>
                        <select v-model="salerProduct.productData.cat_id">
                            <option :value="category.id" v-for="category in categoryStore.categories">{{ locale == 'en-us' ? category.en_cat_name : category.ar_cat_name }}</option>
                        </select>
                    </div>
                    <div class="input">
                        <label>{{ $t('delivery') }}</label>
                        <select v-model="salerProduct.productData.delivery">
                            <option value="free">{{ $t('free') }}</option>
                            <option value="paid">{{ $t('paid') }}</option>
                        </select>
                    </div>
                    <div class="input" v-if="salerProduct.productData.delivery == 'paid'">
                        <label>{{ $t('delivery-charge') }}</label>
                        <input type="text" v-model="salerProduct.productData.delivery_charge">
                    </div>
                </div>
                <div class="textarea">
                        <label>{{ $t('description') }} ({{ $t('en') }})</label>
                    <textarea v-model="salerProduct.productData.en_description"></textarea>
                </div>
                <div class="textarea">
                        <label>{{ $t('description') }} ({{ $t('ar') }})</label>
                    <textarea v-model="salerProduct.productData.ar_description"></textarea>
                </div>
                <div class="images">
                    <span class="title">{{ $t('images') }}</span>
                    <div class="images-container">
                        <div class="image" v-for="(image, index) in imagesPreview">
                            <span class="remove" @click="removeImage(index)">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </span>
                            <img :src="image">
                        </div>
                        <div class="add">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <input type="file" @change="handleImage($event)" multiple>
                        </div>
                    </div>
                </div>
                <div class="submit">
                    <LayoutRequestingSpinner v-if="salerProduct.ReqAddProduct" />
                    <input type="submit" :value="salerProduct.ReqAddProduct ? '' : $t('add')">
                </div>
            </form>
        </section>
    </main>
</template>

<script setup>

    const { locale } = useI18n();
    const categoryStore = useCategoryStore();
    const salerProduct = useSalerProductStore();

    categoryStore.getCategories();

    const imagesPreview = ref([]);

    const previewImage = (images) => {

        Array.from(images).forEach(image => {

            const reader = new FileReader();
            reader.onload = () => {
                imagesPreview.value.push(reader.result);
            };
            reader.readAsDataURL(image);

        });

    }

    function handleImage(event) {
        addImageToProduct(event);
        previewImage(event.target.files);
    }

    function removeImage(index) {
        salerProduct.productData.images.splice(index, 1);
        imagesPreview.value.splice(index, 1);
    }

    function addImageToProduct(e) {
        salerProduct.productData.images.push(...e.target.files);
    }

</script>

<style lang="scss" scoped>

    @use "~/scss/helpers/colors" as colors;

    .profile-form-container {
        .images {
            > span.title {
                margin-bottom: 4px;
                display: block;
                font-size: 12px;
                font-weight: bold;
                text-transform: capitalize;
            }
            > .images-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 10px;
                > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 140px;
                    border-radius: 3px;
                    > svg {
                        width: 22px;
                    }
                    &.add {
                        border: 1px dashed colors.$color-colored-2;
                        background-color: #ffefef38;
                        color: colors.$color-colored-2;
                        cursor: pointer;
                        position: relative;
                        &:nth-child(3n + 1) {
                            grid-column: span 3;
                        }
                        > input {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            cursor: pointer;
                        }
                    }
                    &.image {
                        position: relative;
                        overflow: hidden;
                        > span.remove {
                            position: absolute;
                            top: 6px;
                            left: 6px;
                            width: 23px;
                            height: 23px;
                            border-radius: 50%;
                            background-color: #fff;
                            color: colors.$color-colored-2;
                            cursor: pointer;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border: 1px solid colors.$color-colored-2;
                            > svg {
                                width: 13px;
                            }
                        }
                        > img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }

</style>
