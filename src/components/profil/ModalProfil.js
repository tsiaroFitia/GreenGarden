import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../outils/Colors';
import EditProfil from './EditProfil';

const ModalProfil = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const navigation = useNavigation();


  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleLogout = () => {
    navigation.navigate('SignInScreen'); 
  };

  return (
    <View style={styles.container}>
      {/* Section Profil */}
      <View style={styles.profileSection}>
        <View style={styles.photo}></View>
        <Text style={styles.nameText}>Name</Text>
      </View>

      {/* Boutons d'actions */}
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={openEditModal}>
          <View style={styles.button1}>
            <Text style={styles.buttonText1}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.button2}>
            <Text style={styles.buttonText2}>Log Out</Text>
            <MaterialIcons name="logout" size={20} color={Colors.vert2} style={styles.logoutIcon} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal pour EditProfil */}
      <Modal visible={showEditModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <EditProfil goBack={closeEditModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '73%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photo: {
    width: 120,
    height: 120,
    backgroundColor: Colors.vert1,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  nameText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  actionButtons: {
    width: '100%',
  },
  button1: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.vert1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText1: {
    fontSize: 16,
    color: 'white',
  },
  button2: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.vert1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  buttonText2: {
    fontSize: 16,
    color: Colors.vert1,
  },
  logoutIcon: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default ModalProfil;
