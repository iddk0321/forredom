import { Repository } from '@/types/github'

export const repositoryMocks: Repository[] = Array.from(
  { length: 30 },
  (_, i) => ({
    id: i + 1,
    name: `repo${i + 1}`,
    description: `description${i + 1}`,
    stargazers_count: i * 10,
    updated_at: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
  }),
)
