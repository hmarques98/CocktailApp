import { useDrinkById, useTheme } from '@/Hooks'
import { RootStackParamList } from '@/Navigators/utils'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RecipeContainer = () => {
  const { Fonts, Gutters, Layout } = useTheme()
  const { params } = useRoute<RouteProp<RootStackParamList, 'Recipe'>>()

  const { drink, instructions, ingredients, thumbnail } = useDrinkById(
    params.id,
  )
  const { t } = useTranslation()

  const { width } = useWindowDimensions()
  return (
    <SafeAreaView style={[Layout.fill]}>
      <ScrollView>
        <Image
          resizeMode="cover"
          style={[Layout.fullWidth, { height: width - 100 }]}
          source={{ uri: thumbnail }}
        />
        <View style={[Gutters.regularHPadding, Gutters.regularTMargin]}>
          <Text style={[Fonts.titleSmall]}>{drink}</Text>
          <Text style={[Fonts.textLarge]}>{t('recipe.instructions')}:</Text>
          <Text style={[Fonts.textSmall]}>{instructions}</Text>

          <Text style={[Fonts.textLarge]}>{t('recipe.ingredients')}:</Text>
          <Text style={[Fonts.textSmall]}>{ingredients.join(', ')}.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default RecipeContainer
