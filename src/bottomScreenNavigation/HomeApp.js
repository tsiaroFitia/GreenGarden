import { StyleSheet, View, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Colors from '../outils/Colors';
import Header from '../components/Header';
import HeaderTask from '../components/tasks/HeaderTask';
import TrierTasks from '../components/tasks/TrierTasks';
import AddTask from '../components/tasks/AddTask';
import ListTask from '../components/tasks/ListTask';

const HomeApp = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const openAddTaskModal = () => {
    setModalVisible(true);
  };

  const closeAddTaskModal = () => {
    setModalVisible(false);
  };

  const addTask = (name, date) => {
    const newTask = { name, date };
    setTasks((prevTasks) => [...prevTasks, newTask]);
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
            <AddTask onAddTask={addTask} onClose={closeAddTaskModal} />
          </View>
        </Modal>
      </View>

      <ScrollView contentContainerStyle={{ gap: 20 }}>
        <ListTask tasks={tasks} />
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
  },
  content2: {
    height: 60,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fond semi-transparent
  },
});
