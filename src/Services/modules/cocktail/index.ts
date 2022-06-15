import { api } from '@/Services/api'
import fetchByName from './fetchByName'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchByName: fetchByName(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchByNameQuery } = userApi
