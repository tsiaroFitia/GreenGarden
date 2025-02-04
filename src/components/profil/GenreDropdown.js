import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GenreDropdown = () => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choisir le genre" value="" />
        <Picker.Item label="Homme" value="Homme" />
        <Picker.Item label="Femme" value="Femme" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    height: 43,
    width: '100%',
  },
});

export default GenreDropdown;
