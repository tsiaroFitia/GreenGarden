import { Text, View, StyleSheet, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../outils/Colors';
import OpenCamera from './OpenCamera';
import * as ImagePicker from 'expo-image-picker';

const CameraOption = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission required to access the gallery.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setShowGallery(true);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission required to access the camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setShowCamera(false); // Ferme la caméra après la capture
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.optionButton} onPress={pickImageFromGallery}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="insert-photo" size={40} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => setShowCamera(true)}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="photo-camera" size={40} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={showGallery} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            ) : null}
          </View>
          
          {/* Positionner le bouton "cancel" en dehors de l'image */}
          <TouchableOpacity onPress={() => setShowGallery(false)} style={styles.iconCancelContainer}>
            <MaterialIcons name="cancel" color={Colors.vert1} size={40} />
          </TouchableOpacity>

          {/* Add the search button below the image */}
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.labelSearch}>Research this plant</Text>
            <MaterialIcons name="search" color="white" size={30} />
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={showCamera} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <OpenCamera />
          </View>
          
          {/* Bouton "cancel" à l'extérieur de la caméra */}
          <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.iconCancelContainer}>
            <MaterialIcons name="cancel" color={Colors.vert1} size={40} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CameraOption;

const styles = StyleSheet.create({
  container: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.vert1,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCancelContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
    elevation: 5,
  },
  imagePreview: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchButton: {
    marginTop: 20,
    backgroundColor: Colors.vert1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelSearch: {
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
});
