<script setup lang="ts">

const i18nHead: any = useLocaleHead({
    addSeoAttributes: true
})

useHead({
    htmlAttrs: {
        lang: i18nHead.value.htmlAttrs.lang
    },
    title: process.env.APP_NAME,
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])]
})

const {SET_STATE} = useStore()
const runtimeConfig = useRuntimeConfig()
const baseURL = runtimeConfig.public.apiURL

const { status, data: currencies }: any = await useFetch(`${baseURL}/currencies`)

if(status.value === 'success'){

    const currencyList = Object.entries(currencies.value).map(item => {
        return {
            name: item[1],
            code: item[0],
        }
    })

    SET_STATE({key: 'currencies', value: currencyList})
}

</script>

<template>
    <v-app>

        <v-main>

            <AppHeader/>

            <slot/>

            <v-footer color="lighten" class="text-center">
                <v-container class="py-0">
                    <small class="text-grey-darken-3">
                        {{new Date().getFullYear()}} © {{ $t('All rights reserved') }}.
                    </small>
                </v-container>
            </v-footer>

        </v-main>

    </v-app>
</template>