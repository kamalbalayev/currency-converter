<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()
const baseURL = runtimeConfig.public.apiURL
const defaultCurrency = useCookie('default-currency');

const exchangeRates = ref(null)

const getExchangeRates = async ()=> {

    const { status, data }: any = await useFetch(`${baseURL}/latest?from=${defaultCurrency.value}`)

    if(status.value === 'success'){
        exchangeRates.value = data.value
    }
}

getExchangeRates()

watch(()=> defaultCurrency.value, ()=> getExchangeRates())

</script>

<template>
    <v-container class="py-6">

        <h1 class="font-weight-black" v-text="$t('Exchange Rates')"/>

        <template v-if="!!exchangeRates">

            <p v-text="`${$t('Date')}: ${exchangeRates?.date}`" class="text-body-2 mb-6"/>

            <v-row>
                <template v-for="[code, value] in Object.entries(exchangeRates.rates)" :key="code">
                    <v-col cols="6" sm="4" md="2">
                        <v-card rounded="lg" color="lighten" flat class="pa-3">
                            <small class="text-caption d-block">{{exchangeRates.amount}} {{exchangeRates.base}}</small>
                            <strong class="d-block text-h6 lh-1">{{ value.toFixed(2) }} {{ code }}</strong>
                        </v-card>
                    </v-col>
                </template>
            </v-row>

        </template>

    </v-container>
</template>