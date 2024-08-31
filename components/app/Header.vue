<template>
    <v-app-bar elevation="6">
        <v-container class="d-flex align-center py-0">

            <AppLogo class="mr-3"/>

            <v-btn :to="localePath('index')" :text="$t('Main page')" :title="$t('Main page')"
                   variant="text" color="primary" rounded
                   prepend-icon="mdi-home-outline" class="ml-3"/>

            <v-btn :to="localePath('converter')" :text="$t('Converter')" :title="$t('Converter')"
                    variant="text" color="primary" rounded
                   prepend-icon="mdi-calculator-variant-outline" class="ml-3"/>

            <v-spacer/>

            <AppColorMode/>

            <AppCurrencies/>

            <AppLanguage/>

        </v-container>
    </v-app-bar>
</template>