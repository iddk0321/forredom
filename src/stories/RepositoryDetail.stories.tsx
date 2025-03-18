import type { Meta, StoryObj } from '@storybook/react'
import { RepositoryDetail } from '@/app/[lng]/[username]/[repo]/_components/RepositoryDetail'

const meta: Meta<typeof RepositoryDetail> = {
  title: 'Components/RepositoryDetail',
  component: RepositoryDetail,
  args: {
    username: 'vercel',
    repo: 'next.js',
  },
}

export default meta

type Story = StoryObj<typeof RepositoryDetail>

export const Default: Story = {
  render: (args) => <RepositoryDetail {...args} />,
}
