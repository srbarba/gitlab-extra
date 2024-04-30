import { http, HttpResponse } from 'msw'
import { mockServer } from './mockServer'

export const mockEndpoint: MockEndpoint = (path, method, response) => {
  const _method = method === 'any' ? 'all' : method
  const contentType = response.contentType ?? 'json'
  const status = response.status ?? 200

  mockServer.use(
    http[_method](toColonTemplatePath(path), ({ params, request }) => {
      const body =
        typeof response.body === 'function'
          ? response.body(request, params)
          : response.body

      switch (contentType) {
        case 'text':
          return HttpResponse.text(body as string, { status })
        case 'xml':
          return HttpResponse.xml(body as string, { status })
        case 'buffer':
          return HttpResponse.arrayBuffer(body as ArrayBuffer, { status })
        case 'form-data':
          return HttpResponse.formData(body as FormData, { status })
        default:
          return HttpResponse.json(body, { status })
      }
    })
  )
}

function toColonTemplatePath(path: string) {
  return path.replace(/\{([^}]+)\}/g, ':$1')
}

type Body =
  | string
  | [unknown]
  | Record<string | number, unknown>
  | ArrayBuffer
  | FormData
  | ((request: Request, params: Record<string, any>) => Body)

type MockEndpoint = (
  path: string,
  method:
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'head'
    | 'options'
    | 'any',
  response: {
    body: Body
    status?: number
    contentType?: 'json' | 'xml' | 'form-data' | 'text' | 'buffer'
  }
) => void
