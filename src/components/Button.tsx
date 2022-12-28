import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View, ViewStyle, Text } from 'react-native';
import { colors } from '../theme';

interface buttonProps {
  label: string;
  icon?: React.ReactElement;
  onPress: () => void;
  disabled?: boolean;
  outline?: boolean;
  borderless?: boolean;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'link';
  size?: 'large' | 'medium' | 'small';
  style?: ViewStyle;
  isLoading?: boolean;
}

export default function Button({
  label,
  icon,
  onPress,
  disabled,
  outline,
  borderless,
  type = 'button',
  size = 'large',
  variant = 'primary',
  style,
  isLoading,
}: buttonProps) {
  if (type === 'button' && size === 'small') {
    return (
      <Pressable onPress={onPress} style={styles.pressable_button_small}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.text_button_small}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[
        styles[`pressable_${type}_${size}`],
        styles[`pressable_${type}_${variant}`],
        styles[`pressable_${type}_${disabled ? 'disabled' : 'enabled'}`],
        outline && styles.outline,
        borderless && styles.borderless,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || isLoading}
      onPress={() => {
        onPress();
      }}
      hitSlop={type === 'link' ? 10 : 0}>
      {isLoading ? (
        <ActivityIndicator style={{ padding: 1.5 }} animating color={outline ? '#000' : '#fff'} />
      ) : (
        <Text
          style={[
            styles[`text_${type}_${size}`],
            styles[`text_${type}_${variant}`],
            outline && styles.text_outline,
            borderless && styles.text_borderless,
            disabled && styles.text_disabled,
          ]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable_button_large: {
    padding: 14,
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.48,
    shadowRadius: 5,
    width: '100%',
  },
  pressable_button_disabled: {
    backgroundColor: colors.disabled,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },

  text_button_large: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },

  text_link_large: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 1,
  },

  pressable_button_primary: {
    backgroundColor: colors.primary,
  },
  pressable_button_secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    shaddowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },

  text_button_primary: {
    color: colors.white,
  },

  text_button_secondary: {
    color: colors.primary,
  },

  pressable_link_medium: {
    padding: 6,
  },

  text_link_primary: {
    color: colors.primaryLine,
    textAlign: 'center',
  },

  outline: {
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.white,
    shadowColor: colors.transparent,
    shadowOffset: { width: 0, height: 0 },
  },

  borderless: {
    backgroundColor: colors.white,
    shadowColor: colors.transparent,
    shadowOffset: { width: 0, height: 0 },
  },

  text_outline: {
    color: colors.primary,
  },

  text_borderless: {
    color: colors.primary,
  },

  text_disabled: {
    color: colors.textDisabled,
  },

  pressable_button_small: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    minWidth: 32,
    borderRadius: 48,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
  },
  iconContainer: {
    marginRight: 4,
  },
  text_button_small: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
  },
});
