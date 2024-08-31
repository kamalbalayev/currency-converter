<script setup lang="ts">

const router: any = useRouter()
const {$i18n}: any = useNuxtApp()
const {locale, defaultLocale}: any = useI18n()
const {current: vuetifyLocale}: any = useLocale()
const switchLocalePath = useSwitchLocalePath()

const language = useCookie('language', {
        default: (): string => defaultLocale,
        watch: true
    }
)

watch(() => language.value, (code: string) => setLanguage(code), {deep: true})

const getLangName = computed(()=> $i18n.locales.value?.find((locale: any)=> locale.code === language.value).name)

const setLanguage = (code: string) => {
    locale.value = code
    vuetifyLocale.value = code
    router.push(switchLocalePath(code))
}

</script>

<template>
    <div>
        <v-select v-model="language" rounded :items="$i18n.locales.value" item-title="name" item-value="code"
                  hide-details density="compact" v-tooltip:bottom="getLangName">
            <template #selection="{item}">
                <span v-text="item.value.toUpperCase()" class="text-body-2 font-weight-bold"/>
            </template>
        </v-select>
    </div>
</template>
