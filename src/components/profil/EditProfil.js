import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../outils/Colors';
import GenreDropdown from './GenreDropdown';

const EditProfil = ({ goBack }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* En-tête du modal */}
      <View style={styles.header}>
        
        <Text style={styles.title}>Profil</Text>
        <TouchableOpacity onPress={goBack}>
          <Icon name="times" size={30} color={Colors.vert5} />
        </TouchableOpacity>
      </View>

      {/* Section Photo de profil */}
      <View style={styles.photoSection}>
        <TouchableOpacity style={styles.photoContainer}>
          <Icon name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Formulaire d'édition */}
      <View style={styles.formSection}>
        <TextInput style={styles.input} placeholder="Nom" />
        <TextInput style={styles.input} placeholder="Prénom" />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
        <GenreDropdown style={styles.input} />
        
      </View>

      {/* Bouton Valider */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonOK}>
          <Text style={styles.buttonText}>Valider</Text>
          <MaterialIcon name="edit" size={20} color="white" style={styles.iconSpacing} />
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
  formSection: {
    width: '100%',
  },
  input: {
    height: 43,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  iconSpacing: {
    marginLeft: 15,
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
    padding:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize:15,
    color: 'white',
    textAlign: 'center',
  },
});

export default EditProfil;
