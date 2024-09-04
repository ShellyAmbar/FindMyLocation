import React, {memo} from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';

import styles from './auto-complete-geo-location.styles';

import useAutoCompleteGeoLocation from './hooks/useAutoCompleteGeoLocation';
import PlaceAutocompleteProps from './interfaces';

const AutoCompleteGeoLocation = ({
  quaryData,
  placeholder = 'Search',
  onPlaceSelected,
  debounceDelayInSeconds = 1,
  containerStyle,
  inputStyle,
  placeHolderColor = '#FFF',
  resultItemStyle,
  resultItemTextStyle,
  resultListStyle,
  textInputProps = {},
  onTextChanged,
}: PlaceAutocompleteProps) => {
  const {handleSelect, suggestions, query, setQuery, setisHandleSearchEnabled} =
    useAutoCompleteGeoLocation({
      quaryData,
      onPlaceSelected,
      debounceDelayInSeconds,
      onTextChanged,
    });
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput
        placeholderTextColor={placeHolderColor}
        style={[styles.input, {...inputStyle}]}
        placeholder={placeholder}
        value={query}
        onChangeText={text => {
          setisHandleSearchEnabled(true);
          setQuery(text);
        }}
        {...textInputProps}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={item => item.place_id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect(item.place_id, item.description)}
              style={[styles.suggestion, {...resultItemStyle}]}>
              <Text style={[styles.itemText, {...resultItemTextStyle}]}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
          style={[styles.suggestionList, {...resultListStyle}]}
        />
      )}
    </View>
  );
};

export default memo(AutoCompleteGeoLocation);
