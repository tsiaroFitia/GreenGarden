import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ModalProfil from '../components/profil/ModalProfil';
import EditProfil from '../components/profil/EditProfil';


class ProfilApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false, // Etat pour savoir si on est en mode édition ou pas
    };
  }

  // Fonction pour changer l'état lorsque l'on veut éditer le profil
  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    const { isEditing } = this.state;

    return (
      <View style={styles.container}>
        {isEditing ? (
          // Affiche EditProfil quand isEditing est vrai
          <EditProfil goBack={this.toggleEdit} />
        ) : (
          // Affiche ModalProfil quand isEditing est faux
          <ModalProfil onEdit={this.toggleEdit} />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfilApp;
