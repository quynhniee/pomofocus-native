import React from "react";
import { FlexStyle, StyleSheet, View, ViewStyle } from "react-native";

interface StackProps {
  children?: React.ReactNode
  flexDirection?: FlexStyle["flexDirection"]
  direction?: FlexStyle["direction"]
  alignInline?: FlexStyle['justifyContent']
  alignBlock?: FlexStyle['alignItems']
  gap?: FlexStyle['gap']
  width?: FlexStyle['width']
  columnGap?: FlexStyle['columnGap']
  rowGap?: FlexStyle['rowGap']
}


const Stack = ({children,...props}: StackProps) => {
  const styles : ViewStyle = {
    direction: props.direction,
    alignItems: props.alignBlock,
    justifyContent: props.alignInline,
    flexDirection: props.flexDirection,
    gap: props.gap,
    width: props.width,
    columnGap: props.columnGap,
    rowGap: props.rowGap,
  }
  
  return (
    <View
      style={styles}
    >
      {children}
    </View>
  );
};

Stack.defaultProps = {
  flexDirection: 'column',
  direction: 'ltr',
  alignInline: 'flex-start',
  alignBlock: 'stretch',
  width: '100%',
  rowGap: 10
};


export default Stack;