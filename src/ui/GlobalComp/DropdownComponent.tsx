import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-basic-elements'; 
import { screenWidth } from '../Dimensions/DimensionsConfig';
// Define the type for dropdown items
interface DropdownItem {
  label: string;
  value: string;
}

const data: DropdownItem[] = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
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
    height: 50,
    width : screenWidth * 40,
    borderRadius: 12,
    padding: 12,
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
