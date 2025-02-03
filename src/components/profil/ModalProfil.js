import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../outils/Colors';

const ModalProfil = ({ onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={styles.photo}></View>

<TouchableOpacity onPress={onEdit}>
  <Animatable.View animation="fadeInLeftBig" style={styles.button1}>
    <Text style={styles.buttonText1}>Edit Profil</Text>
  </Animatable.View>
</TouchableOpacity>

<TouchableOpacity>
  <Animatable.View animation="fadeInRightBig" style={styles.button2}>
    <Text style={styles.buttonText2}>Log Out</Text>
    <MaterialIcons name="logout" style={{ color: Colors.vert2, justifyContent: 'space-between',}}/>
  </Animatable.View>
</TouchableOpacity>

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  Content: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  button1: {
    width: '100%',
    height: 40,
    borderRadius: 15,
    backgroundColor: Colors.vert2,
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText1: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  button2: {
    width: '100%',
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.vert2,
    flexDirection:'row',
    marginBottom: 15,
    alignItems:'center',
  },
  buttonText2: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.vert2,
  },
  photo: {
    width: 120,
    height: 120,
    backgroundColor: Colors.vert2, // Couleur du cercle
    borderRadius: 60, // Cercle parfait
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white', // Bordure blanche autour du cercle
  },
});

export default ModalProfil;
