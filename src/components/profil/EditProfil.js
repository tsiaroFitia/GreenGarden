import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icône de la caméra

const EditProfil = ({ goBack }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Section pour la photo de profil */}
      <View style={styles.photoContainerWrapper}>
        <TouchableOpacity style={styles.photoContainer}>
          {/* Icône de la caméra */}
          <Icon name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Formulaire */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
        />
        
        {/* Autres champs peuvent être ajoutés ici */}

        {/* Bouton de retour */}
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  photoContainerWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#4CAF50', // Couleur du cercle
    borderRadius: 60, // Cercle parfait
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white', // Bordure blanche autour du cercle
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfil;
