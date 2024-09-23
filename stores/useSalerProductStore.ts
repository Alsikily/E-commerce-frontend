import { defineStore } from 'pinia'

type productDataType = {
    en_name: (string|null),
    ar_name: (string|null),
    quantity: (number|null),
    unit_price: (number|null),
    discount: (number|null),
    status: ('like new'|'good'|'fair'|'poor'|'damaged'|'refurbished'|'parts only'),
    cat_id: (number|null),
    delivery: ('free'|'paid'),
    delivery_charge: number,
    en_description: (string|null),
    ar_description: (string|null),
    images: Blob[]
}

export const useSalerProductStore = defineStore('salerProduct', () => {

    // states
    const authStore = useAuthStore();
    const productData = reactive<productDataType>({
        en_name: null,
        ar_name: null,
        quantity: null,
        unit_price: null,
        discount: null,
        status: 'like new',
        cat_id: null,
        delivery: 'free',
        delivery_charge: 0,
        en_description: null,
        ar_description: null,
        images: []
    });
    const requesting = reactive({
        getMyProducts: false,
        getMyOrders: false
    });
    const ReqAddProduct = ref(false);
    const myProducts = ref([]);
    const orders = ref([]);

    // Functions
    async function getMyProducts() {

        if (!requesting.getMyProducts) {
            
            requesting.getMyProducts = true;

            try {

                const response = await useApiFetch("profile/product", {
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                });

                if (response.value.status == 'success') {

                    myProducts.value = response.value.data;

                }

            } catch (error) {
                console.log(error);
            }

            requesting.getMyProducts = false;

        }

    }

    async function addProduct() {

        if (!ReqAddProduct.value) {

            ReqAddProduct.value = true;

            try {

                type ResponseProductType = {
                    value: {
                        status: string,
                        data: {
                            id: number
                        }
                    }
                };

                let formData = new FormData();

                formData.append('en_name', productData.en_name !== null ? productData.en_name : '');
                formData.append('ar_name', productData.ar_name !== null ? productData.ar_name : '');
                formData.append('quantity', productData.quantity !== null ? productData.quantity.toString() : '');
                formData.append('unit_price', productData.unit_price !== null ? productData.unit_price.toString() : '');
                formData.append('discount', productData.discount !== null ? productData.discount.toString() : '');
                formData.append('status', productData.status !== null ? productData.status : '');
                formData.append('cat_id', productData.cat_id !== null ? productData.cat_id.toString() : '');
                formData.append('delivery', productData.delivery !== null ? productData.delivery.toString() : '');
                formData.append('delivery_charge', productData.delivery_charge !== null ? productData.delivery_charge.toString() : '');
                formData.append('en_description', productData.en_description !== null ? productData.en_description : '');
                formData.append('ar_description', productData.ar_description !== null ? productData.ar_description : '');

                for (let i = 0; i < productData.images.length; i++) {
                    formData.append('images[]', productData.images[i]);
                }

                const response = await useApiFetch("profile/product", {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                }) as ResponseProductType;

                // if (response.value.status == 'success') {

                //     categories.value = response.value.data;

                // }

            } catch (error) {
                console.log(error);
            }

            ReqAddProduct.value = false;

        }

    }

    async function deleteMyProduct(productID: number, productIndex: number) {

        const response = await useApiFetch(`profile/product/${productID}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `${authStore.token}`
            }
        });

        if (response.value.status == 'success') {

            myProducts.value.splice(productIndex, 1);

        }

    }

    async function getMyOrders() {

        if (!requesting.getMyOrders) {
            
            requesting.getMyOrders = true;

            try {

                const response = await useApiFetch("profile/product/orders", {
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                });

                if (response.value.status == 'success') {

                    orders.value = response.value.data;

                }

            } catch (error) {
                console.log(error);
            }

            requesting.getMyOrders = false;

        }

    }

    async function delivered(orderID: number, VerificationCode: number, orderIndex: number) {

        if (!requesting.delivered) {

            requesting.delivered = true;

            const response = await useApiFetch(`profile/product/orders/${orderID}`, {
                method: 'PUT',
                body: {
                    VerificationCode: VerificationCode
                },
                headers: {
                    Authorization: `${authStore.token}`
                }
            }) as ResponseProductsType;

            if (response.value.status == 'success') {
                orders.value.splice(orderIndex, 1);
            }

            requesting.delivered = false;

        }

    }

    return {

        // States
        productData,
        ReqAddProduct,
        myProducts,
        orders,

        // Functions
        addProduct,
        getMyProducts,
        deleteMyProduct,
        getMyOrders,
        delivered

    };

})