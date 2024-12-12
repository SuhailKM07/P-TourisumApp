import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'

interface ButtonCompProps {
  buttonContent: string;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  prefixIcon?: ReactNode;
  surfixIcon?: ReactNode;
}
export default function ButtonComp(
  {
    buttonContent,
    buttonStyle,
    buttonTextStyle,
    prefixIcon,
    surfixIcon
  }: ButtonCompProps) {
  return (
    <TouchableOpacity style={buttonStyle}>
      <Text style={buttonTextStyle}>{buttonContent}</Text>
    </TouchableOpacity>
  )
}

