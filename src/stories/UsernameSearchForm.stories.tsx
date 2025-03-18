import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/client'
import { UsernameSearchForm } from '@/app/[lng]/_components/UsernameSearchForm'

const meta: Meta<typeof UsernameSearchForm> = {
  title: 'Components/UsernameSearchForm',
  component: UsernameSearchForm,
  argTypes: {
    defaultValue: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof UsernameSearchForm>

export const Default: Story = {
  args: {
    defaultValue: '',
  },
  render: (args) => (
    <I18nextProvider i18n={i18n}>
      <UsernameSearchForm {...args} onSubmit={action('onSubmit')} />
    </I18nextProvider>
  ),
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'example_user',
  },
  render: (args) => (
    <I18nextProvider i18n={i18n}>
      <UsernameSearchForm {...args} onSubmit={action('onSubmit')} />
    </I18nextProvider>
  ),
}
