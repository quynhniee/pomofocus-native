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
  flexWrap?: FlexStyle['flexWrap']
  borderLeftWidth?: FlexStyle['borderLeftWidth']
}


const Stack = ({children,...props}: StackProps) => {
  const styles : ViewStyle = {
    direction: props.direction,
    alignItems: props.alignBlock,
    justifyContent: props.alignInline,
    flexDirection: props.flexDirection,
    gap: props.gap,
    columnGap: props.columnGap,
    rowGap: props.rowGap,
    flexWrap: props.flexWrap,
    flexGrow: 1,
    borderLeftWidth: props.borderLeftWidth,
    borderLeftColor: '#000',
    // width: props.width,
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
  rowGap: 10,
  flexGrow: 1, 
};


export default Stack;
