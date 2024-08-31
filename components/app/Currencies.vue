<script setup lang="ts">

const {state} = useStore()

const defaultCurrency = useCookie('default-currency', {
    default: ()=> 'USD',
    watch: true
});

</script>

<template>
    <div class="mr-3">
        <v-select v-model="defaultCurrency" rounded
                  :items="state.currencies" item-title="code" item-value="code"
                  hide-details density="compact" v-tooltip:bottom="$t('Default currency')">

            <template #selection="{item}">
                <span v-text="item.value.toUpperCase()" class="text-body-2 font-weight-bold"/>
            </template>

            <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :title="`${item.raw.code} - ${item.raw.name}`"/>
            </template>

        </v-select>
    </div>
</template>
