import { CocktailQueryResponse } from '@/Services/modules/cocktail/fetchByName'
import { RootState } from '@/Store'
import { useSelector } from 'react-redux'

const useDrinkById = (id: string) => {
  const drink = useSelector<RootState>(state =>
    state.cocktail.find(item => item.id === id),
  ) as CocktailQueryResponse

  return drink
}

export default useDrinkById
