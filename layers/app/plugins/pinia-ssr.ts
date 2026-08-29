import { createPinia, setActivePinia } from 'pinia'
import { toRaw } from 'vue'

export default defineNuxtPlugin({
  name: 'pinia',
  setup(nuxtApp) {
    const pinia = createPinia()
    nuxtApp.vueApp.use(pinia)
    setActivePinia(pinia)

    if (nuxtApp.payload?.pinia) {
      pinia.state.value = nuxtApp.payload.pinia
    }

    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload.pinia = toRaw(pinia).state.value
      setActivePinia(undefined)
    })

    return { provide: { pinia } }
  },
})
