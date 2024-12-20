import { Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import React, { ReactNode } from 'react';

interface ButtonCompProps {
  buttonContent: string;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  prefixIcon?: ReactNode;
  surfixIcon?: ReactNode;
  onPushFun?: () => void;
}

export default function ButtonComp({
  buttonContent,
  buttonStyle,
  buttonTextStyle,
  prefixIcon,
  surfixIcon,
  onPushFun,
}: ButtonCompProps) {
  return (
    <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center' }, buttonStyle]} onPress={onPushFun}>
      {prefixIcon && <View style={{ marginRight: 8 }}>{prefixIcon}</View>}
      <Text style={buttonTextStyle}>{buttonContent}</Text>
      {surfixIcon && <View style={{ marginLeft: 8 }}>{surfixIcon}</View>}
    </TouchableOpacity>
  );
}
