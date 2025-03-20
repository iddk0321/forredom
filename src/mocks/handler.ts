import { http, HttpResponse } from 'msw'
import { repositoryMocks } from '@/mocks/data'

export const handlers = [
  http.get('https://api.github.com/users/:username/repos', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const per_page = Number(url.searchParams.get('per_page')) || 10

    const startIndex = (page - 1) * per_page
    const endIndex = startIndex + per_page
    const paginatedRepos = repositoryMocks.slice(startIndex, endIndex)

    return HttpResponse.json(paginatedRepos)
  }),

  http.get('https://api.github.com/repos/:username/:repo', ({ params }) => {
    const { repo } = params

    const repository = repositoryMocks.find((r) => r.name === repo)

    if (!repository) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(repository)
  }),
]
