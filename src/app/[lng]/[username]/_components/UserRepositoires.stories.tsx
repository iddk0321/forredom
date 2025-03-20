import type { Meta, StoryObj } from '@storybook/react'
import { UserRepositories } from '@/app/[lng]/[username]/_components/UserRepositories'

const meta: Meta<typeof UserRepositories> = {
  title: 'Components/UserRepositories',
  component: UserRepositories,
  args: {
    username: 'vercel',
  },
}

export default meta

type Story = StoryObj<typeof UserRepositories>

export const Default: Story = {
  render: (args) => <UserRepositories {...args} />,
}
