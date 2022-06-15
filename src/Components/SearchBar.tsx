import { useTheme } from '@/Hooks'
import React from 'react'
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'

type SearchBarProps = {
  disabledButton: boolean
  onPressButton(): void
  buttonTitle: string
}

const SearchBar = ({
  disabledButton,
  onPressButton,
  buttonTitle,
  ...restProps
}: SearchBarProps & TextInputProps) => {
  const { Layout, Common, Colors } = useTheme()

  return (
    <View style={[Layout.alignItemsCenter]}>
      <TextInput
        {...restProps}
        style={[Common.textInput, Layout.fullWidth]}
        placeholderTextColor={Colors.text}
      />

      <TouchableOpacity
        style={[Common.button.base]}
        disabled={disabledButton}
        onPress={onPressButton}
      >
        <Text>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default SearchBar
