import NextI18Next from 'next-i18next'

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de','es','fr']
})

export const {
  appWithTranslation,
  withNamespaces,
} = NextI18NextInstance
