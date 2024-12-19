import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-basic-elements'; 
import { screenHeight, screenWidth } from '../Dimensions/DimensionsConfig';

// Define the type for dropdown items
interface DropdownItem {
  label: string;
  value: string;
}

const data: DropdownItem[] = [
  { label: 'India', value: '1' },
  { label: 'China', value: '2' },
  { label: 'New York', value: '3' },
  { label: 'Ice Land', value: '4' },
];

const DropdownComponent: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Dropdown
      style={styles.dropdown}
      data={data}
      labelField="label"
      valueField="value"
      value={value}
      placeholder="Aspen, USA"
      placeholderStyle={{color : '#606060'}}
      containerStyle = {{borderRadius : 20}}
      iconColor='#176FF1'
      onChange={(item: DropdownItem) => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <Icon style={styles.icon} color="#176FF1" name="location-pin" type='Entypo' size={20} />

      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: screenHeight * 4,
    width : screenWidth * 33,
    borderRadius: 20,
    padding: 12,
    // backgroundColor : 'green'
  },
  icon: {
    marginRight: 5,

  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
