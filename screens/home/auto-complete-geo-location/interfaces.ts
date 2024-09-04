import {TextInputProps, TextStyle, ViewStyle} from 'react-native';

interface PlaceAutocompleteProps {
  quaryData: {key: string; types: string[]};
  placeholder?: string;
  onPlaceSelected: (placeId: string, description: string) => void;
  debounceDelayInSeconds?: number;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  placeHolderColor?: string;
  resultItemTextStyle?: TextStyle;
  resultItemStyle?: ViewStyle;
  resultListStyle?: ViewStyle;
  textInputProps?: TextInputProps;
  onTextChanged?: (text: string) => void;
}
export default PlaceAutocompleteProps;
