import GitlabProvider from '@auth/core/providers/gitlab'
import Credentials from '@auth/core/providers/credentials'
import type { AuthConfig } from '@auth/core'
import type { JWT } from '@auth/core/jwt'
import { useRuntimeConfig } from '#imports'
import { NuxtAuthHandler } from '#auth'
import type { Provider } from '@auth/core/providers'

const runtimeConfig = useRuntimeConfig()
const defaultGitlabBaseUrl = 'https://gitlab.com'
const gitlabBaseUrl =
  runtimeConfig.public.gitlab.baseUrl || defaultGitlabBaseUrl

const providers: Provider[] = [
  GitlabProvider({
    authorization: `${gitlabBaseUrl}/oauth/authorize?scope=read_user read_api`,
    token: `${gitlabBaseUrl}/oauth/token`,
    userinfo: `${gitlabBaseUrl}/api/v4/user`,
    clientId: runtimeConfig.gitlab.clientId,
    clientSecret: runtimeConfig.gitlab.clientSecret
  })
]

if (process.env.NUXT_PUBLIC_AUTH_MOCK === 'true') {
  providers.push(
    Credentials({
      authorize() {
        const user = {
          id: 'john.doe',
          name: 'John Doe',
          email: 'john.doe@email.com'
        }
        return user
      }
    })
  )
}

export const authOptions: AuthConfig = {
  basePath: '/api/auth',
  secret: runtimeConfig.auth.secret,
  events: {
    async signOut(message) {
      const withToken = message as { token: JWT }
      if (withToken.token) {
        const body = new FormData()
        body.set('token', withToken.token.accessToken!)
        body.set('client_id', runtimeConfig.gitlab.clientId)
        body.set('client_secret', runtimeConfig.gitlab.clientSecret)
        const response = await fetch(
          `${gitlabBaseUrl}/oauth/revoke?client_id=${runtimeConfig.gitlab.clientId}&client_secret=${runtimeConfig.gitlab.clientSecret}&token=${withToken.token.accessToken}`,
          {
            method: 'POST',
            body,
            headers: { Authorization: `Bearer ${withToken.token.accessToken}` }
          }
        )
        if (!response.ok) throw Error('Failed to revoke token')
      }
    }
  },
  callbacks: {
    jwt: ({ token, account, user }) => {
      const provider = account?.provider || token.provider
      // Initial sign in
      if (account && user) {
        token.provider = account.provider
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpired = (account.expires_at as number) * 1000
        token.refreshTokenExpired =
          Date.now() + (account.refresh_expires_in as number) * 1000
        token.user = user
      }

      if (provider === 'credentials') return token

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpired as number)) return token

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = token.user as any
        session.error = token.error as string
        session.accessToken = token.accessToken as string
        session.accessTokenExpired = token.accessTokenExpired as number
      }
      return session
    }
  },
  providers
}

export default NuxtAuthHandler(authOptions, runtimeConfig)

// eslint-disable-next-line max-lines-per-function
async function refreshAccessToken(token: JWT) {
  try {
    if (Date.now() > (token.refreshTokenExpired as number)) throw Error
    const details = {
      client_id: process.env.NUXT_AUTH_CLIENT_ID,
      client_secret: process.env.NUXT_AUTH_CLIENT_SECRET,
      grant_type: ['refresh_token'],
      refresh_token: token.refreshToken
    }
    const formBody: string[] = []
    Object.entries(details).forEach(([key, value]: [string, any]) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value)
      formBody.push(encodedKey + '=' + encodedValue)
    })
    const formData = formBody.join('&')
    const url = `${process.env.NUXT_PUBLIC_AUTH_ISSUER}/protocol/openid-connect/token`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formData
    })
    const refreshedTokens = await response.json()
    if (!response.ok) throw refreshedTokens
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpired: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + refreshedTokens.refresh_expires_in * 1000
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

declare module '@auth/core/types' {
  interface Session {
    accessToken?: string
    user?: {
      id: string
      name: string
      email: string
      image?: string
    }
    error?: string
    accessTokenExpired?: number
  }
}
declare module '@auth/core/jwt' {
  interface JWT {
    provider: string
    accessToken?: string
  }
}
