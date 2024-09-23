import { useApiFetch } from '~/composables/useApiFetch';

type RegisterFormData = {
    name: string,
    email: string,
    password: string
};
type LoginFormData = Pick<RegisterFormData, ("email" | "password")>;

export const useAuthMethodsStore = defineStore('authMethods', () => {

    const authStore = useAuthStore();

    const authenticating = ref(false);

    const LoginErrors = ref(false);
    const RegisterErrors = ref({});
    const VerifyErrors = ref({});
    const loginData = ref<LoginFormData>({
        email: '',
        password: ''
    });
    const registerData = ref<RegisterFormData>({
        name: '',
        email: '',
        password: ''
    });
    const verifyEmailCode = ref<number | null>(null);

    function setStates(usr: null, islog: false, tkn: null, verify: false) {
        authStore.user = usr;
        authStore.isLogin = islog;
        authStore.token = tkn;
        authStore.verify = verify;
    }

    function redirectToLogin() {
        navigateTo(`/login`);
    }

    async function register() {

        if (!authenticating.value) {

            authenticating.value = true;

            const response = await useApiFetch("register", {
                method: "POST",
                body: registerData
            });

            if (response.value.data.status == "success") {
                setStates(response.value.data.user, true, `${response.value.data.authorisation.type} ${response.value.data.authorisation.token}`, true);
                navigateTo('/verify-email');
            } else if (response.value.data.status == "error") {
                RegisterErrors.value = response.value.data.messages;
            }

            authenticating.value = false;

        }

    }

    async function sendVerificationCode() {

        if (!authenticating.value) {

            authenticating.value = true;

            const response = await useApiFetch("resend-verification", {
                method: "POST",
                headers: {
                    Authorization: `${authStore.token}`
                }
            });

            authenticating.value = false;

        }

    }

    async function verify() {

        if (!authenticating.value) {

            authenticating.value = true;

            const response = await useApiFetch("verify-email", {
                method: "POST",
                body: {
                    verifyEmailCode: verifyEmailCode.value
                },
                headers: {
                    Authorization: `${authStore.token}`
                }
            });

            authenticating.value = false;

            if (response.value.status == "success") {
                authStore.verify = false;
            } else if (response.value.status == "error") {
                VerifyErrors.value = response.value.messages;
            }

        }

    }

    async function login() {

        if (!authenticating.value) {

            authenticating.value = true;

            useFetch(`http://127.0.0.1:8000/api/login`, {
                method: 'POST',
                body: loginData
            }).then(res => {

                const response = res.data;
                if (response.value.data.status == "success") {

                    let user = response.value.data.user;
                    let token = `${response.value.data.authorisation.type} ${response.value.data.authorisation.token}`;
                    let userVerified = user.email_verified_at != null;

                    setStates(user, true, token, !userVerified);
                    authenticating.value = false;

                    if (userVerified) {
                        navigateTo('/');
                    } else {
                        navigateTo('/verify-email', userVerified);
                    }
                } else {
                    throw createError({ statusCode: 401 });
                }

            }).catch(_ => {
                LoginErrors.value = true;
                authenticating.value = false;
            });

            return 'as';
            try {

                if (error) {
                    console.log(error.value.statusCode);
                    console.log(error.response.status);
                    if (error.value && error.value.statusCode === 401) {
                        // Handle 401 Unauthorized error here
                        console.log('Unauthorized: ', error.value.data);
                    } else {
                        // Handle other errors
                        console.error('Error:', error);
                    }
                } else {

                    if (response.value.data.status == "success") {
                        console.log('ds');
                        let user = response.value.data.user;
                        let token = `${response.value.data.authorisation.type} ${response.value.data.authorisation.token}`;
                        let userVerified = user.email_verified_at != null;
        
                        setStates(user, true, token, !userVerified);
        
                        if (userVerified) {
                            navigateTo('/');
                        } else {
                            navigateTo('/verify-email', userVerified);
                        }
        
                    } else if (response.value.data.status == "error") {
                        console.log('fal');
                        LoginErrors.value = response.value.data.messages;
                    }
        
                }

            } catch (error) {
                
            }
            // try {

            //     // const response = await useApiFetch("login", {
            //     //     method: "POST",
            //     //     body: loginData
            //     // });

            //     const { data: response} = await useFetch(`http://127.0.0.1:8000/api/login`, {

            //         watch: false,
            //         method: 'post',
            //         body: loginData

            //     });

            //     console.log('dd', response);

            // } catch (error) {

            //     console.log('asd', error);

            // }

            // const { data: response} = await useFetch(`http://127.0.0.1:8000/api/login`, {

            //     watch: false,
            //     method: 'post',
            //     body: loginData

            // });

            authenticating.value = false;

        }

    }

    async function logout() {

        if (!authenticating.value) {

            authenticating.value = true;

            const response = await useApiFetch("logout", {
                method: "POST",
                headers: {
                    Authorization: `${authStore.token}`
                }
            });

            authenticating.value = false;

            if (response.value.status == "success") {

                setStates(null, false, null);
                redirectToLogin();

            }

            return response;

        }

    }

    return {
        loginData,
        registerData,
        verifyEmailCode,
        authenticating,
        RegisterErrors,
        VerifyErrors,
        LoginErrors,
        login,
        register,
        sendVerificationCode,
        verify,
        logout
    };

})