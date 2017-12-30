
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { purple } from '../utils/colors';

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  androidBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
});

export default function TextButton({ children, onPress, style = {}, ...props }) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, style]}
      onPress={onPress}
      {...props}>
      {children}
    </TouchableOpacity>
  )
}
