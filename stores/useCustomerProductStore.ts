import { defineStore } from 'pinia'

type ResponseProductsType = {
    value: {
        status: string,
        data: {
            id: number
        }
    }
};

type ResponseProductType = {
    value: {
        status: string,
        data: {
            id: number
        }
    }
};

type ResponseFavouritesType = {
    value: {
        status: string,
        data: {
            id: number
        }
    }
};

type productType = {
    id?: number
}

export const useCustomerProductStore = defineStore('customerProduct', () => {

    /* States */
    const authStore = useAuthStore();
    const filters = reactive({
        priceFrom: null,
        priceTo: null,
        discountFrom: null,
        discountTo: null,
        status: [],
        delivery: [],
        category: [],
        review: null,
        sortBy: null,
        sortDir: 'ASC'
    });
    const requesting = reactive({
        getProducts: false,
        getProduct: false,
        getFavourites: false,
        getCart: false,
        getCartCount: false,
        toggleFav: false,
        toggleCart: false,
        cartPayment: false,
        getMyOrders: false,
        delivered: false,
        removeFromCart: false,
    });
    const requestingCartQuantity = ref([]);
    const searchResults = ref([]);
    const searchProducts = ref([]);
    const products = ref([]);
    const product = ref(null);
    const favourites = ref([]);
    const cart = ref([]);
    const cartCount = ref(0);
    const paymentMethod = ref<'credit'|'cash'>('credit');
    const OrderAddress = ref<string | null>(null);
    const currentProductsPage = ref(1);
    const orders = ref([]);

    function setSearchEmpty() {
        searchResults.value = [];
    }

    async function searchWord(e) {

        const word = e.target.value.trim();
        if (word.length) {

            setSearchEmpty();
            navigateTo(`/search?action=${word}`);

        }

    }

    async function getSearchProducts(action: string) {

        setSearchEmpty();
        const word = action.trim();

        try {

            const response = await useApiFetch(`product/search/all`, {
                query: {
                    ProductName: word
                },
                headers: {
                    Authorization: `${authStore.token}`
                }

            });

            if (response.value.status == 'success') {
                searchProducts.value = response.value.data;
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function search(e) {

        const word = e.target.value.trim();
        if (e.key != 'Enter' && word.length) {

            try {

                const response = await useApiFetch(`product/search`, {
                    query: {
                        ProductName: word
                    },
                    headers: {
                        Authorization: `${authStore.token}`
                    }

                });

                if (response.value.status == 'success') {
                    searchResults.value = response.value.data;
                }

            } catch (error) {
                console.log(error);
            }

        } else if (!word.length) {
            setSearchEmpty();
        }

    }

    async function getProducts() {

        if (!requesting.getProducts && currentProductsPage.value != 0) {

            requesting.getProducts = true;

            try {

                const response = await useApiFetch(`product`, {
                    query: {
                        priceFrom: filters.priceFrom,
                        priceTo: filters.priceTo,
                        discountFrom: filters.discountFrom,
                        discountTo: filters.discountTo,
                        status: filters.status.join(','),
                        delivery: filters.delivery.join(','),
                        category: filters.category.join(','),
                        // review: filters.review.length > 0 ? filters.review.sort()[-1] : null,
                        review: filters.review,
                        sortBy: filters.sortBy,
                        sortDir: filters.sortDir,
                        page: currentProductsPage.value
                    },
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                }) as ResponseProductsType;

                if (response.value.status == 'success') {

                    products.value.push(...response.value.data);

                    if (response.value.pagination.last_page > currentProductsPage.value) {
                        currentProductsPage.value++;
                    } else if (response.value.pagination.last_page == currentProductsPage.value) {
                        currentProductsPage.value = 0;
                    }

                }

            } catch (error) {
                console.log(error);
            }

            requesting.getProducts = false;

        }

    }

    async function getProduct(product_id: number) {

        if (!requesting.getProduct) {

            requesting.getProduct = true;

            try {

                const response = await useApiFetch(`product/${product_id}`, {
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                }) as ResponseProductType;

                if (response.value.status == 'success') {
                    product.value = response.value.data;
                }

            } catch (error) {
                console.log(error);
            }

            requesting.getProduct = false;

        }

    }

    async function getFavourites() {

        if (!requesting.getFavourites) {

            requesting.getFavourites = true;

            try {

                const response = await useApiFetch("product/favourites", {
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                }) as ResponseFavouritesType;

                if (response.value.status == 'success') {

                    favourites.value = response.value.data;

                }

            } catch (error) {
                console.log(error);
            }

            requesting.getFavourites = false;

        }

    }

    async function getCart() {

        if (!requesting.getCart) {

            requesting.getCart = true;

            try {

                const response = await useApiFetch("product/cart", {
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                }) as ResponseFavouritesType;

                if (response.value.status == 'success') {

                    cart.value = response.value.data;

                }

            } catch (error) {
                console.log(error);
            }

            requesting.getCart = false;

        }

    }

    async function getCartCount() {

        if (!requesting.getCartCount) {

            requesting.getCartCount = true;

            try {

                const response = await useApiFetch("product/cart-count", {
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                }) as ResponseFavouritesType;

                if (response.value.status == 'success') {

                    cartCount.value = response.value.data;

                }

            } catch (error) {
                console.log(error);
            }

            requesting.getCartCount = false;

        }

    }

    function switchFav(index: number, type: ('fav' | 'product')) {

        if (type == 'product') {
            return products.value[index].addToFav ^= 1;
        } else if (type == 'search') {
            return searchProducts.value[index].addToFav ^= 1;
        }
        return favourites.value[index].addToFav ^= 1;

    }

    function switchCart(index: number, type: ('fav' | 'product')) {

        if (type == 'product') {
            let cartFlag = products.value[index].addToCart ^= 1;
            cartCount.value += cartFlag == 1 ? 1 : -1;
            return cartFlag;
        } else if (type == 'search') {
            let cartFlag = searchProducts.value[index].addToCart ^= 1;
            cartCount.value += cartFlag == 1 ? 1 : -1;
            return cartFlag;
        } else {
            let cartFlag = cart.value[index].addToCart ^= 1;
            cartCount.value += cartFlag == 1 ? 1 : -1;
            return cartFlag;
        }

    }

    async function toggleFav(productID: number, index: number, productType: ('fav' | 'product')) {

        if (!requesting.toggleFav) {

            requesting.toggleFav = true;
            const addToFav = switchFav(index, productType);

            const response = await useApiFetch(`product/${productID}/toggle-fav`, {
                method: 'POST',
                body: {
                    addToFav: addToFav
                },
                headers: {
                    Authorization: `${authStore.token}`
                }
            }) as ResponseProductsType;

            // if (response.value.status == 'success') {

            //     products.value = response.value.data;

            // }

            requesting.toggleFav = false;

        }

    }

    async function toggleCart(productID: number, index: number, productType: ('fav' | 'product' | 'search')) {

        if (!requesting.toggleCart) {

            requesting.toggleCart = true;
            const addToCart = switchCart(index, productType);

            const response = await useApiFetch(`product/${productID}/toggle-cart`, {
                method: 'POST',
                body: {
                    addToCart: addToCart
                },
                headers: {
                    Authorization: `${authStore.token}`
                }
            }) as ResponseProductsType;

            // if (response.value.status == 'success') {

            //     products.value = response.value.data;

            // }

            requesting.toggleCart = false;

        }

    }

    async function updateQuantity(productID: number, quantity: number) {

        if (requestingCartQuantity.value.indexOf(productID) == -1) {
            requestingCartQuantity.value.push(productID);
            const response = await useApiFetch(`product/${productID}/update-quantity`, {
                method: 'PATCH',
                body: {
                    quantity: quantity
                },
                headers: {
                    Authorization: `${authStore.token}`
                }
            }) as ResponseProductsType;

            // if (response.value.status == 'success') {

            //     products.value = response.value.data;

            // }

            requestingCartQuantity.value.splice(requestingCartQuantity.value.findIndex(el => el == productID), 1);

        }

    }

    async function cartPayment() {

        if (!requesting.cartPayment) {

            requesting.cartPayment = true;

            try {

                const response = await useApiFetch('product/payment/cart', {
                    method: 'POST',
                    body: {
                        PaymentMethod: paymentMethod.value,
                        address: OrderAddress.value
                    },
                    headers: {
                        Authorization: `${authStore.token}`
                    }
                }) as ResponseProductsType;

                requesting.cartPayment = false;

                if (response.value.IsSuccess) {

                    navigateTo(response.value.Data.InvoiceURL, { external: true });
                    return;

                } else if (response.value.status == 'success') {

                    navigateTo('/');
                    return;

                }

            } catch (error) {

                requesting.cartPayment = false;

            }

        }

    }

    async function paymentSuccess(paymentId: number) {

        const response = await useApiFetch('product/payment/cart/success', {
            method: 'POST',
            body: {
                PaymentId: paymentId
            },
            headers: {
                Authorization: `${authStore.token}`
            }
        });

    }

    async function paymentFaild(paymentId: number) {

        const response = await useApiFetch('product/payment/cart/success', {
            method: 'POST',
            body: {
                PaymentId: paymentId
            },
            headers: {
                Authorization: `${authStore.token}`
            }
        });

    }

    async function getInvoiceProducts() {



    }

    async function getMyOrders() {

        if (!requesting.getMyOrders) {
            
            requesting.getMyOrders = true;

            try {

                const response = await useApiFetch("product/purchases/orders", {
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

    async function removeFromCart(productID, index) {

        if (!requesting.removeFromCart) {

            requesting.removeFromCart = true;

            const response = await useApiFetch(`product/cart/${productID}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `${authStore.token}`
                }
            }) as ResponseProductsType;

            if (response.value.status == 'success') {
                cart.value.splice(index, 1);
            }


        }

    }

    return {

        // States
        requesting,
        filters,
        products,
        product,
        favourites,
        cart,
        cartCount,
        searchResults,
        searchProducts,
        paymentMethod,
        currentProductsPage,
        orders,
        OrderAddress,

        // Functions
        setSearchEmpty,
        search,
        getSearchProducts,
        getProducts,
        getProduct,
        getFavourites,
        getCart,
        toggleFav,
        toggleCart,
        getCartCount,
        searchWord,
        updateQuantity,
        cartPayment,
        paymentSuccess,
        paymentFaild,
        getInvoiceProducts,
        getMyOrders,
        removeFromCart

    };

})