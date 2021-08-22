import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native'
export default function useTheme(): NonNullable<ColorSchemeName> {
	return _useColorScheme() as NonNullable<ColorSchemeName>
}
