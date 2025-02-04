import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OpenGalery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    // Demande de permission d'accès à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission required to access the gallery.');
      return;
    }

    // Ouverture de la galerie pour sélectionner une image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert('No image was selected.');
    } else {
      // Mise à jour du state pour afficher l'image sélectionnée
      setSelectedImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage.uri }} style={styles.image} />
      ) : (
        <Text>No image selected</Text>
      )}

      <Button title="Open Gallery" onPress={pickImage} />
    </View>
  );
};

export default OpenGalery;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  image: {
    width: 600,
    height: 600,
    borderRadius: 10,
    marginBottom: 20,
  },
});
