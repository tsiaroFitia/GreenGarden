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

  // Fonction pour ouvrir la galerie et choisir une image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setShowGallery(true);  // Afficher le modal avec l'image sélectionnée
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>
        For more information about the plant as a disease, the best weather, some issues just check the origin of the plant. Capture or Select a Photo
      </Text>
      <View style={styles.content}>
        
        {/* Ouvrir la galerie */}
        <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="insert-photo" size={40} color="white" />
          </View>
        </TouchableOpacity>

        {/* Ouvrir la caméra */}
        <TouchableOpacity style={styles.optionButton} onPress={() => setShowCamera(true)}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="photo-camera" size={40} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal pour la galerie */}
      <Modal visible={showGallery} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* Afficher l'image sélectionnée */}
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.modalText}>No image selected</Text>
            )}
            
            {/* Bouton Cancel */}
            <TouchableOpacity onPress={() => setShowGallery(false)} style={styles.iconCancelContainer}>
              <MaterialIcons name="cancel" color={Colors.vert1} size={30} style={styles.iconCancel} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal pour la caméra */}
      <Modal visible={showCamera} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <OpenCamera />
            <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.iconCancelContainer}>
              <MaterialIcons name="cancel" color={Colors.vert1} size={50} style={styles.iconCancel} />
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
    width: '73%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  labelText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.vert1,
  },
  optionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 90,
    height: 90,
    backgroundColor: Colors.vert1,
    marginRight: 20,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconCancel: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fond semi-transparent pour le modal
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%', // Modal en plein écran
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
    height: 400, // Ajustez la taille de l'image comme nécessaire
    borderRadius: 10,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
});
