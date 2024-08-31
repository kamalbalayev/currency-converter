<script setup lang="ts">

const colorMode = useCookie('color-mode', {
    default: ()=> 'light',
});

const theme: any = useTheme()

const changeColorMode = () => {
    colorMode.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
    theme.global.name.value = colorMode.value
}

const getIcon = computed(() => theme.global.name.value === 'dark' ? 'mdi-weather-night' : 'mdi-white-balance-sunny')

const getTitle = computed(() => theme.global.name.value === 'dark' ? 'Dark mode' : 'Light mode')

</script>

<template>
    <v-btn :icon="getIcon" variant="tonal" color="primary" size="small" width="36" height="36" class="mr-3"
           v-tooltip:bottom="$t(getTitle)" @click="changeColorMode"/>
</template>