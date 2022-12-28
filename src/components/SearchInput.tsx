import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TextInputProps as OriginalTextInputProps,
  View,
  Text,
} from 'react-native';

import { colors } from '../theme';

interface SearchInputProps extends OriginalTextInputProps {
  set: Function;
  error?: string;
  clearError?: Function;
  placeholder?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const SearchInput = ({
  set,
  error,
  defaultValue,
  placeholder = 'Search',
  style,
  clearError,
  value,
  isLoading = false,
  icon,
  ...args
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[style, styles.wrapper]}>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
      {!isLoading && icon && <View style={styles.additionalIcon}>{icon}</View>}
      <TextInput
        {...args}
        defaultValue={defaultValue}
        onChangeText={v => {
          if (error && clearError) clearError();
          set(v);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaded}
        style={[styles.input, error && styles.errorInput, isFocused && styles.focusedInput]}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  input: {
    color: colors.black,
    borderWidth: 0.5,
    borderColor: '#BCCDDF',
    borderRadius: 16,
    paddingRight: 44,
    paddingLeft: 40,
    fontSize: 20,
    paddingVertical: 13,
  },

  focusedInput: {
    borderColor: colors.primary,
  },
  icon: {
    position: 'absolute',
    left: 12,
    top: 15,
    zIndex: 1,
  },

  error: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15,
    paddingTop: 7,
  },
  loader: {
    position: 'absolute',
    right: 16,
    top: 17,
    zIndex: 1,
  },
  additionalIcon: {
    position: 'absolute',
    right: 12,
    top: 11,
    zIndex: 1,
  },
});
