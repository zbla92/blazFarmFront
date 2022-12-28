import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

type ScreenProps = {
  children: React.ReactNode;
  onTab?: boolean;
  withKeyboard?: boolean;
  noPadding?: boolean;
  style?: ViewStyle;
};

const Screen: React.FC<ScreenProps> = ({ children, onTab, withKeyboard, noPadding, style }) => {
  const edges: Edge[] = onTab ? ['top', 'left', 'right'] : ['top', 'left', 'right', 'bottom'];

  return (
    <SafeAreaView edges={edges} style={[styles.screen, style, { paddingHorizontal: noPadding ? 0 : 24 }]}>
      {withKeyboard ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoidingView}>
          <Pressable style={styles.keyboardAvoidingView} onPress={Keyboard.dismiss}>
            {children}
          </Pressable>
        </KeyboardAvoidingView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

export default Screen;
export { Screen };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'white',
  } as ViewStyle,
  keyboardAvoidingView: {
    flex: 1,
    flexGrow: 1,
  },
});
