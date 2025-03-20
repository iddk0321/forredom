import { Repository } from '@/types/github'

export const mockRepositories: Repository[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `repo${i + 1}`,
  description: `description${i + 1}`,
  stargazers_count: 999 - i * 10,
  updated_at: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
}))

export const mockRepository: Repository = {
  id: 1,
  name: 'test-repo',
  description: 'This is a test repository',
  language: 'TypeScript',
  stargazers_count: 100,
  forks_count: 50,
  open_issues_count: 10,
  clone_url: 'https://github.com/test/test-repo',
  updated_at: new Date().toISOString(),
}
