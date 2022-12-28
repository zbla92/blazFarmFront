import React from 'react';
import { Pressable, StyleSheet, View, ViewProps, ViewStyle, Text } from 'react-native';

import { colors } from '../theme';

export interface ButtonSelectProps extends ViewProps {
  label: string;
  value?: string;
  onPress?: () => void;
  disabled?: boolean;
  showIcon?: boolean;
  style?: ViewStyle;
}

export const ButtonSelect = ({
  label,
  value,
  onPress,
  disabled,
  showIcon = true,
  style,
  ...props
}: ButtonSelectProps) => {
  const isDisabled = disabled || !onPress;

  return (
    <Pressable style={StyleSheet.compose(styles.container, style)} onPress={onPress} disabled={isDisabled} {...props}>
      <View style={styles.textContent}>
        {value ? (
          <>
            <Text style={[styles.label, disabled && styles.disabledText]}>{label}</Text>
            <Text numberOfLines={1} style={[styles.value, disabled && styles.disabledText]}>
              {value}
            </Text>
          </>
        ) : (
          <Text numberOfLines={1} style={styles.placeholder}>
            {label}
          </Text>
        )}
      </View>
      {showIcon && <View style={styles.iconContainer}></View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    height: 60,
  } as ViewStyle,
  textContent: {
    flexShrink: 1,
  },
  disabledText: {
    color: colors.textDisabled,
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    color: colors.textFaded,
    marginBottom: 2,
  },
  value: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: -0.3,
    color: colors.textAccented,
  },
  placeholder: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: -0.3,
    color: colors.textFaded,
  },
  iconContainer: {
    width: 24,
  },
});
