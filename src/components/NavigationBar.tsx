import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LayoutChangeEvent, Pressable, StyleSheet, View, Text } from 'react-native';
import { colors } from '../theme';

const MIN_WIDTH = 60;
const MAX_WIDTH = 90;

type NavigationBarProps = {
  title?: string;
  backHandler?: () => void | any;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
};

const NavigationBar = ({ title, leftAction, rightAction, backHandler }: NavigationBarProps) => {
  const [width, setWidth] = useState(0);
  const navigation = useNavigation();

  const onRightActionsViewLayout = (event: LayoutChangeEvent) => {
    if (!rightAction) return;

    setWidth(Math.max(event.nativeEvent.layout.width, MAX_WIDTH));
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.side, { width }]}>
        {leftAction ? (
          leftAction
        ) : navigation.canGoBack() ? (
          <Pressable
            style={styles.backButton}
            hitSlop={10}
            onPress={() => {
              backHandler && backHandler();
              navigation.goBack();
            }}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.titleContainer}>
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>
      <View style={[styles.side, { width }]} onLayout={onRightActionsViewLayout}>
        <View style={styles.rightActionWrapper}>{rightAction ?? null}</View>
      </View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    height: 48,
  },
  side: {
    minWidth: MIN_WIDTH,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    left: -6,
  },
  titleContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  title: {
    color: colors.textAccented,
    fontWeight: '500',
    fontSize: 16,
  },
  rightActionWrapper: {
    alignSelf: 'flex-end',
  },
  backButtonText: {
    color: colors.textAccented,
    fontWeight: '500',
    fontSize: 16,
  },
});
