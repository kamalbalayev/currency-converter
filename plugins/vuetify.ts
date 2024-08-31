import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '~/assets/styles/global.scss'

// @ts-ignore
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
// @ts-ignore
import { DefaultsInstance } from "vuetify/lib/framework.mjs";

const light: ThemeDefinition = {
    dark: false,
    colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        lighten: "#ebf0ff",
        primary: "#1960a9",
        secondary: "#9333ea",
        error: "#ef4444",
        info: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
    },
};

const dark: ThemeDefinition = {
    dark: true,
    colors: {
        background: "#020617",
        surface: "#0f172a",
        lighten: "#090f1b",
        primary: "#1960a9",
        secondary: "#9333ea",
        error: "#ef4444",
        info: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
    },
};

const defaults: DefaultsInstance = {
    VAppBar: {
        elevation: 0,
    },
    VBtn: {
        class: "text-none font-weight-bold"
    },
    VCard:{
        rounded: 'lg'
    },
    VCardTitle:{
        class: 'font-weight-bold relative py-3 px-5 align-center'
    },
    VListSubheader:{
        class: 'px-2'
    },
    VTextField: {
        color: "primary",
        variant: "outlined",
        density: 'default',
        elevation: 0,
        flat: true,
    },
    VTextarea: {
        color: "primary",
        variant: "outlined",
        density: 'default',
        flat: true,
        rows: 3
    },
    VFileInput: {
        color: "primary",
        variant: "solo-filled",
        density: 'compact',
        elevation: 0,
        flat: true,
    },
    VNumberInput: {
        color: "primary",
        variant: "solo-filled",
        density: 'compact',
        flat: true,
    },
    VOtpInput: {
        variant: "solo-filled",
        density: 'compact',
        flat: true,
    },
    VSelect: {
        color: "primary",
        variant: "solo-filled",
        density: 'compact',
        clearIcon: 'mdi-close',
        listProps: {
            density: 'compact',
            nav: true,
            border: true,
            rounded: 'lg',
            elevation: 16
        },
        flat: true,
    },
    VAutocomplete: {
        color: "primary",
        variant: "solo-filled",
        density: 'compact',
        flat: true,
        menuProps: {
            elevation: 16,
            rounded: 'lg',
            border: true,
        },
        listProps: {
            density: 'compact',
            nav: true,
            rounded: 'lg',
            elevation: 0
        },
    },
    VSwitch: {
        color: "primary",
        density: 'compact',
    },
    VTooltip: {
        contentClass: "elevation-10 rounded-lg",
    },
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        components: {
            ...components,
            VNumberInput
        },
        directives,
        defaults,
        theme: {
            defaultTheme: "light",
            themes: {
                light,
                dark,
            },
        },
    })
    app.vueApp.use(vuetify)
})