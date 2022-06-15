import React, { useCallback, useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'

import { useTheme } from '@/Hooks'
import { useLazyFetchByNameQuery } from '@/Services/modules/cocktail'
import { Colors } from '@/Theme/Variables'
import { navigate } from '@/Navigators/utils'
import { SearchBar } from '@/Components'

const HomeContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const [cocktailName, setCocktailName] = useState('')
  const [
    fetchByName,
    { data, isLoading, isFetching, isError, isUninitialized },
  ] = useLazyFetchByNameQuery()

  const showData = useMemo(
    () => data && !isError && !isFetching,
    [data, isError, isFetching],
  )

  const onSearchCocktail = useCallback(() => {
    fetchByName(cocktailName)
    setCocktailName('')
  }, [cocktailName, fetchByName])

  const itemSeparator = useCallback(
    () => (
      <View
        style={[Layout.fullWidth, { height: 1 }, Common.backgroundPrimary]}
      />
    ),
    [Common.backgroundPrimary, Layout.fullWidth],
  )

  if (isFetching) {
    return (
      <SafeAreaView
        style={[
          Layout.fill,
          Gutters.regularHPadding,

          Layout.justifyContentCenter,
          Layout.alignItemsCenter,
        ]}
      >
        <Text style={[Fonts.titleSmall]}>{t('home.loadingMessage')}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[Layout.fill, Gutters.regularHPadding]}>
      <View style={[Layout.fill, Gutters.regularTMargin]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={[Layout.alignItemsCenter]}>
                <Text style={[Fonts.textRegular]}>{t('home.title')}</Text>
              </View>
              <SearchBar
                buttonTitle={t('home.searchBar.button.label')}
                placeholder={t('home.searchBar.placeholder')}
                onPressButton={onSearchCocktail}
                disabledButton={isLoading || isFetching}
                value={cocktailName}
                onChangeText={setCocktailName}
              />
              {isError && (
                <Text style={[Fonts.textRegular, { color: Colors.error }]}>
                  {t('home.drinksList.headerError')}
                </Text>
              )}

              {!showData && !isUninitialized && (
                <Text style={[Fonts.titleRegular]}>
                  {t('home.drinksList.headerEmpty')}
                </Text>
              )}

              {data && (
                <Text style={[Fonts.titleRegular]}>
                  {t('home.drinksList.headerSuccess')}
                </Text>
              )}
            </>
          }
          ItemSeparatorComponent={itemSeparator}
          keyExtractor={({ id }) => id}
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[Layout.fill, Gutters.regularVMargin]}
                onPress={() => navigate('Recipe', item)}
              >
                <View style={[Layout.row, Layout.scrollSpaceBetween]}>
                  <View style={[Layout.justifyContentCenter, Layout.fill]}>
                    <Text style={[Fonts.textRegular, Gutters.tinyBMargin]}>
                      {item.drink}
                    </Text>

                    <Text style={[Fonts.textSmall]}>
                      {t('home.drinksList.totalOfIngredients', {
                        total: item.ingredients.length,
                      })}
                    </Text>
                  </View>

                  <Image
                    style={{ borderRadius: 40 }}
                    source={{ uri: item.thumbnail, height: 80, width: 80 }}
                  />
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeContainer
