import { api } from '@/Services/api'
import fetchByName from './fetchByName'

export const cocktailApi = api.injectEndpoints({
  endpoints: build => ({
    fetchByName: fetchByName(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchByNameQuery } = cocktailApi
