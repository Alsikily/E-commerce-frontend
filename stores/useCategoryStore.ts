import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {

    /* Types */
    type Category = {
        "id": number,
        "en_cat_name": string,
        "ar_cat_name": string
    };
    
    /* States */

    // Category
    const categories = ref<Category[] | null>(null);

    async function getCategories() {

        try {

            type ResponseCategoryType = {
                value: {
                    status: string,
                    data: Category[]
                }
            };

            const response = await useApiFetch("category") as ResponseCategoryType;

            if (response.value.status == 'success') {

                categories.value = response.value.data;

            }

        } catch (error) {

            console.log(error);

        }

    }

    return {

        // States
        categories,

        // Functions
        getCategories

    };

})