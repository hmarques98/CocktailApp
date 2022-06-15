import { cocktailApi } from '@/Services/modules'
import { CocktailQueryResponse } from '@/Services/modules/cocktail/fetchByName'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

const initialState: CocktailQueryResponse[] = []
const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      cocktailApi.endpoints.fetchByName.matchFulfilled,
      (state, { payload }) => {
        return payload
      },
    )
  },
})

const { reducer } = cocktailSlice

export const selectCocktail = (state: RootState) => state.cocktail

export default reducer
