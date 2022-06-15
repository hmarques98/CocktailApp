import React from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { HomeContainer, RecipeContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef, RootStackParamList } from './utils'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Stack = createStackNavigator<RootStackParamList>()

const ApplicationNavigator = () => {
  const { darkMode, NavigationTheme } = useTheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeContainer} />

          <Stack.Screen name="Recipe" component={RecipeContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
