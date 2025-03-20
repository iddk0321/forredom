import i18n from '../src/i18n/client'
import '../src/app/[lng]/global.css'
import { I18nextProvider } from 'react-i18next'
import { Preview } from '@storybook/react'
import { QueryClientProvider } from '../src/components/common'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { handlers } from '../src/mocks/handler'

initialize()

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'ko',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ko', title: 'Korean' },
        { value: 'en', title: 'English' },
      ],
      showName: true,
    },
  },
}

export const parameters = {
  nextjs: {
    appDirectory: true,
  },
  msw: {
    handlers,
  },
}

export const decorators: Preview['decorators'] = [
  (Story, context) => {
    const { locale } = context.globals
    i18n.changeLanguage(locale)
    return (
      <QueryClientProvider>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </QueryClientProvider>
    )
  },
]

const preview = {
  loaders: [mswLoader],
}

export default preview
