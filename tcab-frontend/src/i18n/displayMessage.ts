import i18n from 'i18n-js'

import displayMessages from '../assets/displayMessages/displayMessages.json'

i18n.fallbacks = true
i18n.translations = {
  en: displayMessages,
}
/**
 * getDisplayMessage
 * @param key The i18n key.
 */
export default function getDisplayMessage(key: string) {
  const message: string = i18n.t(key)
  return key ? message : ''
}
