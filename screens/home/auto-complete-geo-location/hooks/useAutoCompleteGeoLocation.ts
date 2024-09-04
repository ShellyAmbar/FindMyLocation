import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import useDebounce from './useDebounce';
import UsePlaceAutocompleteProps from './interfaces';
import {Keyboard} from 'react-native';

const useAutoCompleteGeoLocation = ({
  quaryData,
  onPlaceSelected,
  debounceDelayInSeconds = 1,
  onTextChanged,
}: UsePlaceAutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [isHandleSearchEnabled, setisHandleSearchEnabled] = useState(true);
  const [suggestions, setSuggestions] = useState<
    Array<{place_id: string; description: string}>
  >([]);

  const fetchSuggestions = useCallback(
    async (input: string) => {
      if (!input) {
        setSuggestions([]);
        return;
      }

      const typesArray = quaryData.types.join().replace(/,/g, '|');
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${quaryData.key}&types=${typesArray}`;

      try {
        const response = await axios.get(url);

        if (response.data.predictions) {
          setSuggestions(response.data.predictions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    },
    [quaryData.key, quaryData.types],
  );

  const handleSelect = useCallback(
    (placeId: string, description: string) => {
      setisHandleSearchEnabled(false);
      setQuery(description);

      setSuggestions([]);
      onPlaceSelected(placeId, description);
      Keyboard.dismiss();
    },
    [setQuery, setSuggestions, onPlaceSelected],
  );

  const debounce = useDebounce({
    text: query,
    delay: debounceDelayInSeconds * 1000,
  });

  useEffect(() => {
    if (isHandleSearchEnabled) {
      fetchSuggestions(debounce);
      onTextChanged && onTextChanged(debounce);
    }
  }, [debounce]);

  return {
    handleSelect,
    suggestions,
    query,
    setQuery,
    setisHandleSearchEnabled,
  };
};

export default useAutoCompleteGeoLocation;
