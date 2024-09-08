interface UsePlaceAutocompleteProps {
  quaryData: {key: string; types: string[]};
  onPlaceSelected: (placeId: string, description: string) => void;
  debounceDelayInSeconds?: number;
  onTextChanged?: (text: string) => void;
  country?: string;
}

export default UsePlaceAutocompleteProps;
