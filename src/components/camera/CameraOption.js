import { Text, View, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../outils/Colors';
import OpenCamera from './OpenCamera';
import * as ImagePicker from 'expo-image-picker';

const CameraOption = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setShowGallery(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
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
            <TouchableOpacity onPress={() => setShowGallery(false)} style={styles.iconCancelContainer}>
              <MaterialIcons name="cancel" color={Colors.vert1} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showCamera} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <OpenCamera />
            <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.iconCancelContainer}>
              <MaterialIcons name="cancel" color={Colors.vert1} size={40} />
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
});
