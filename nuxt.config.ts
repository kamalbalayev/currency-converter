// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1'
        }
    },

    devtools: {enabled: true},

    experimental: {
        payloadExtraction: true,
        watcher: 'parcel',
    },

    future: {
        typescriptBundlerResolution: true,
    },

    typescript: {
        shim: false
    },

    runtimeConfig: {
        public: {
            apiURL: process.env.API_URL,
            baseURL: process.env.ORIGIN,
            appName: process.env.APP_NAME,
        }
    },

    vite: {
        logLevel: 'info',
        define: {
            'process.env.DEBUG': false,
        },
        server: {

            fs: {
                strict: false
            },

            hmr: {
                port: process.env.PORT,
            }
        },
        css: {
            modules: {
                ignoreOrder: true,
            },
        },
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },

    build: {
        transpile: ['vuetify'],
    },

    imports: {
        dirs: ['composables/**']
    },

    components: {
        global: true,
        dirs: [
            {path: '~/components/app', prefix: 'app'},
        ]
    },

    modules: [

        '@nuxt/devtools',
        '@nuxtjs/i18n',
        '@nuxtjs/google-fonts',
        '@vite-pwa/nuxt',

        '@pinia/nuxt',

        (_options: any, nuxt: any) => {
            nuxt.hooks.hook('vite:extendConfig', (config: any) => {
                config.plugins.push(vuetify({autoImport: true}))
            })
        },
    ],

    css: [],

    googleFonts: {
        display: 'swap',
        families: {
            Roboto: [300, 400, 500, 700, 900]
        }
    },

    pinia: {
        autoImports: [
            'defineStore'
        ],
    },

    i18n: {
        defaultLocale: 'ru',
        baseUrl: process.env.ORIGIN,
        lazy: true,
        seo: true,
        detectBrowserLanguage: false,
        intervalPlural: true,
        customRoutes: 'config',
        langDir: './lang',
        compilation: {
            strictMessage: false,
        },
        locales: [
            {code: 'ru', iso: 'ru-RU', name: 'Русский', file: 'ru', dir: 'ltr'},
            {code: 'en', iso: 'en-US', name: 'English', file: 'en', dir: 'ltr'},
        ],
        pages: {
            'converter/index':{
                "ru": "/converter",
                "en": "/converter"
            }
        }
    },
    pwa: {

        injectRegister: 'auto',
        registerType: 'autoUpdate',
        strategies: 'generateSW',
        registerWebManifestInRouteRules: true,

        manifest: {
            id: "/",
            base: '/',
            scope: '/',
            start_url: '/',
            lang: 'ru',
            name: 'Currency Converter',
            short_name: 'Currency Converter',
            description: 'Currency Converter',
            theme_color: "#3b78b7",
            background_color: "#FFFFFF",
            display: "standalone",
            orientation: "portrait",
            display_override: ["window-controls-overlay"],
            launch_handler: {client_mode: ["navigate-existing", "auto"]},
            edge_side_panel: {preferred_width: 480},
            handle_links: "preferred",
            mobileAppIOS: true,
            use_cache: true,
            useWebmanifestExtension: true,
            appleStatusBarStyle: "black-translucent",
            appleMobileWebAppCapable: 'yes',
            appleMobileWebAppStatusBarStyle: 'black',
            icons:[
                {
                    src: 'apple-splash-landscape-dark-2048x1536.png',
                    sizes: `2048x1536`,
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: 'apple-splash-landscape-light-2048x1536.png',
                    sizes: `2048x1536`,
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: 'apple-splash-portrait-dark-1536x2048.png',
                    sizes: `1536x2048`,
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: 'apple-splash-portrait-light-1536x2048.png',
                    sizes: `1536x2048`,
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: 'apple-touch-icon-180x180.png',
                    sizes: `180x180`,
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: 'maskable-icon-512x512.png',
                    sizes: `512x512`,
                    type: "image/png",
                    purpose: "maskable"
                },
                {
                    src: 'pwa-64x64.png',
                    sizes: `64x64`,
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: 'pwa-192x192.png',
                    sizes: `192x192`,
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: `512x512`,
                    type: "image/png",
                    purpose: "any"
                },
            ],
        },
        pwaAssets: {
            config: true,
        },
        workbox: {
            sourcemap: true,
            skipWaiting: true,
            clientsClaim: true,
            cleanupOutdatedCaches: true,
            navigateFallback: undefined,
            globPatterns: ['**/*.{js,css,html,png,svg,ico,ttf}'],
            runtimeCaching: [
                {
                    urlPattern: ({ url }: any) => url.pathname.startsWith('/'),
                    handler: 'CacheFirst',
                    method: 'GET',
                    options: {
                        cacheName: 'app-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 * 24 * 3
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                }
            ]
        },
        injectManifest: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico,ttf}'],
        },
        client: {
            installPrompt: true,
            // periodicSyncForUpdates: 60,
        },
        devOptions: {
            enabled: false,
            type: 'module',
            suppressWarnings: true,
            navigateFallbackAllowlist: [/^\/$/],
            navigateFallback: '/',
        },
    }
})