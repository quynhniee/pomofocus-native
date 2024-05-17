import React from "react";
import { FlexStyle, StyleSheet, View, ViewStyle } from "react-native";

interface StackProps extends FlexStyle{
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


const Stack = ({
  children,
  direction = 'ltr', // default value
  alignBlock = 'center', // default value
  alignInline = 'flex-start', // default value
  flexDirection = 'row', // default value
  gap = 0, // default value
  columnGap = 0, // default value
  rowGap = 0, // default value
  flexWrap = 'nowrap', // default value
  borderLeftWidth = 0, // default value
  ...props
}: StackProps) => {
  const styles: ViewStyle = {
    direction,
    alignItems: alignBlock,
    justifyContent: alignInline,
    flexDirection,
    gap,
    columnGap,
    rowGap,
    flexWrap,
    flexGrow: 1,
    borderLeftWidth,
    borderLeftColor: '#000',
    ...props
  };
  
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
