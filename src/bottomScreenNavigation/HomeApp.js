import { StyleSheet, Text, View, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';

import Colors from '../outils/Colors';
import Header from '../components/Header';
import HeaderTask from '../components/tasks/HeaderTask';
import TrierTasks from '../components/tasks/TrierTasks';
import AddTask from '../components/tasks/AddTask';

import ListTask from '../components/tasks/ListTask';
import DeleteTask from '../components/tasks/DeleteTask';

const HomeApp = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);

  const openAddTaskModal = () => {
    setModalVisible(true);
  };

  const closeAddTaskModal = () => {
    setModalVisible(false);
  };

  const openDeleteTaskModal = () => {
    setModalDeleteVisible(true);
  };

  const closeDeleteTaskModal = () => {
    setModalDeleteVisible(false);
  };

  return (
    <View style={styles.container}>

      <Header />

      <View style={styles.content}>
        <View style={styles.content1}>
          <HeaderTask openModal={openAddTaskModal} />
        </View>
        <View style={styles.content2}>
          <TrierTasks />
        </View>
         {/* Modal pour Ajouter une tâche */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeAddTaskModal}
        >
          <View style={styles.modalBackground}>
            <AddTask onClose={closeAddTaskModal} />
          </View>
        </Modal>

       
      </View>
      
      <ScrollView contentContainerStyle={{ gap: 20 }}>
        <ListTask openDeleteTaskModal={openDeleteTaskModal} />
        <ListTask openDeleteTaskModal={openDeleteTaskModal} />
        <ListTask openDeleteTaskModal={openDeleteTaskModal} />
        <ListTask openDeleteTaskModal={openDeleteTaskModal} />
        <ListTask openDeleteTaskModal={openDeleteTaskModal} />

        {/* Modal pour Supprimer une tâche */}
        <Modal
          transparent={true}
          visible={isModalDeleteVisible}
          animationType="slide"
          onRequestClose={closeDeleteTaskModal}
        >
          <View style={styles.modalBackground}>
            <DeleteTask onClose={closeDeleteTaskModal} />
          </View>
        </Modal>
      </ScrollView>
     
    </View>
  );
};

export default HomeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gris,
  },
  content: {
    flexDirection: 'column',
  },
  content1: {
    height: 100,
    //backgroundColor: 'red',
  },
  content2: {
    height: 60,
    //backgroundColor: Colors.vert4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fond semi-transparent
  },
});
