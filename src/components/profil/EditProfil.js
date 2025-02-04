import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../../outils/Colors';

const EditProfil = ({ goBack }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // Ajoutez un state pour gérer l'image

  // Fonction pour ouvrir la galerie
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission required to access the gallery.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri); // Mettre l'URI de l'image dans le state
    }
  };

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <TouchableOpacity onPress={goBack}>
          <Icon name="times" size={30} color={Colors.vert5} />
        </TouchableOpacity>
      </View>

      {/* Section Photo de profil */}
      <View style={styles.photoSection}>
        <TouchableOpacity style={styles.photoContainer} onPress={openGallery}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="camera" size={30} color="white" />
          )}
        </TouchableOpacity>
      </View>

      {/* Formulaire d'édition */}
      <View style={styles.formSection}>
        {/* Nom */}
        <View style={styles.Viewinput}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color={Colors.vert1} />
            <TextInput placeholder="Name" style={styles.input} />
          </View>
        </View>

        {/* Email */}
        <View style={styles.Viewinput}>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={16} color={Colors.vert1} />
            <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} />
          </View>
        </View>

        {/* Prénom */}
        <View style={styles.Viewinput}>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color={Colors.vert1} />
            <TextInput placeholder="Phone" keyboardType="numeric" style={styles.input} />
          </View>
        </View>

        {/* Section Genre avec Boutons */}
        <View style={styles.Viewinput}>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === 'male' && styles.selectedButton]}
              onPress={() => handleGenderSelection('male')}
            >
              <MaterialIcons name="male" size={20} color={selectedGender === 'male' ? Colors.vert : Colors.grisclair} />
              <Text style={styles.genderText}>Homme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderButton, selectedGender === 'female' && styles.selectedButton]}
              onPress={() => handleGenderSelection('female')}
            >
              <MaterialIcons name="female" size={20} color={selectedGender === 'female' ? Colors.vert : Colors.grisclair} />
              <Text style={styles.genderText}>Femme</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bouton Valider */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonOK}>
          <Text style={styles.buttonText}>Valid</Text>
          <MaterialIcons name="edit" size={20} color="white" style={styles.iconSpacing} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.vert5,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoContainer: {
    width: 120,
    height: 120,
    backgroundColor: Colors.vert1,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  formSection: {
    width: '100%',
  },
  Viewinput: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
    borderColor: Colors.grisclair,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '45%',
    justifyContent: 'center',
  },
  selectedButton: {
    borderColor: Colors.vert1,
  },
  genderText: {
    fontSize: 14,
    marginLeft: 10,
  },
  footer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  buttonOK: {
    backgroundColor: Colors.vert1,
    borderRadius: 13,
    width: '45%',
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
  iconSpacing: {
    marginLeft: 15,
  },
});

export default EditProfil;
