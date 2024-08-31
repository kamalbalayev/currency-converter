<script setup lang="ts">

const {state} = useStore()
const runtimeConfig = useRuntimeConfig()
const baseURL = runtimeConfig.public.apiURL

const defaultCurrency = useCookie('default-currency');

const loading = ref(false)

const fromCurrency = ref(defaultCurrency.value)
const amount = ref(1)

const toCurrency = ref(state.currencies[0].code)
const convertedAmount = ref(0)

const convert = async ()=> {

    loading.value = true

    const { status, data }: any = await useFetch(`${baseURL}/latest?from=${fromCurrency.value}&to=${toCurrency.value}&amount=${amount.value}`)

    if(status.value === 'success'){
        convertedAmount.value = data.value.rates[toCurrency.value]
    }

    loading.value = false
}

const reverse = ()=>{

    let from = fromCurrency.value,
        fromAmount = amount.value,
        to = toCurrency.value,
        toAmount = convertedAmount.value;

    fromCurrency.value = to
    toCurrency.value = from
    amount.value = toAmount || 1
    convertedAmount.value = fromAmount || 1
}

</script>

<template>
    <v-container class="py-6">

        <h1 class="font-weight-black mb-6" v-text="$t('Converter')"/>

        <v-row>

            <v-col cols="12" md="8">
                <v-card elevation="6" rounded="lg" class="pa-10">
                    <v-row align="end" justify="center">

                        <v-col cols="12" sm="5">

                            <small class="d-block px-3" v-text="$t('From')"/>

                            <v-row dense>
                                <v-col cols="5">
                                    <v-select v-model="fromCurrency" rounded hide-details density="compact"
                                              :items="state.currencies" item-title="code" item-value="code">

                                        <template #selection="{item}">
                                            <span v-text="item.value.toUpperCase()" class="text-body-2 font-weight-bold"/>
                                        </template>

                                        <template v-slot:item="{ props, item }">
                                            <v-list-item v-bind="props" :title="`${item.raw.code} - ${item.raw.name}`"/>
                                        </template>

                                    </v-select>
                                </v-col>
                                <v-col cols="7">
                                    <v-number-input v-model="amount" :min="0.1" :step="1" rounded hide-details density="compact" class="ml-2"/>
                                </v-col>
                            </v-row>

                        </v-col>

                        <v-col cols="12" sm="2" class="d-flex justify-center">
                            <v-btn rounded="pill" variant="tonal" icon="mdi-repeat" height="40" @click="reverse"/>
                        </v-col>

                        <v-col cols="12" sm="5">

                            <small class="d-block px-3" v-text="$t('To')"/>

                            <v-row dense>
                                <v-col cols="7">
                                    <v-text-field v-model="convertedAmount" variant="solo-filled" :min="1" rounded hide-details readonly density="compact" class="mr-2"/>
                                </v-col>
                                <v-col cols="5">
                                    <v-select v-model="toCurrency" rounded hide-details density="compact"
                                              :items="state.currencies" item-title="code" item-value="code">

                                        <template #selection="{item}">
                                            <span v-text="item.value.toUpperCase()" class="text-body-2 font-weight-bold"/>
                                        </template>

                                        <template v-slot:item="{ props, item }">
                                            <v-list-item v-bind="props" :title="`${item.raw.code} - ${item.raw.name}`"/>
                                        </template>

                                    </v-select>
                                </v-col>
                            </v-row>

                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-btn block rounded variant="flat" color="primary" :disabled="!amount" @click="convert">
                                {{$t('Convert')}}
                            </v-btn>
                        </v-col>

                    </v-row>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-img src="https://static.vecteezy.com/system/resources/previews/013/167/051/original/currency-exchange-3d-illustration-free-png.png"
                       aspect-ratio="2" class="bg-lighten rounded-lg"/>
            </v-col>

        </v-row>

    </v-container>
</template>