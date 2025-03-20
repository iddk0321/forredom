import { Repository } from '@/types/github'
import { apiRequest } from '@/api/request'

export const fetchRepos = async (username: string, page: number = 1, per_page: number = 10): Promise<Repository[]> => {
  return apiRequest<Repository[]>(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`)
}

export const fetchRepo = async (username: string, repo: string): Promise<Repository> => {
  return apiRequest<Repository>(`https://api.github.com/repos/${username}/${repo}`)
}
