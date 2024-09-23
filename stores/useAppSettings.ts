import { defineStore } from 'pinia'

export const useAppSettings = defineStore('settings', () => {
    
    /* States */
    const smallNavOpen = ref<boolean>(false);
    const asideOpen = ref<boolean>(false);

    return {

        // States
        smallNavOpen,
        asideOpen

    };

})