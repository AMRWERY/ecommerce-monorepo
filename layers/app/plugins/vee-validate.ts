import { defineRule, configure } from 'vee-validate'
import { all as rules } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ar from '@vee-validate/i18n/dist/locale/ar.json'

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(rules).forEach(([name, rule]) => {
    defineRule(name, rule)
  })

  configure({
    generateMessage: localize({ en, ar }),
  })

  const i18n = nuxtApp.$i18n as { locale: { value: string } }
  watch(() => i18n.locale.value, (value) => setLocale(value), { immediate: true })
})
