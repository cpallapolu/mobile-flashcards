
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple
  }
});

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}
