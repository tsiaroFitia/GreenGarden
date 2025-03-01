import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import Colors from "../outils/Colors";
import Header from "../components/Header";
import HeaderTask from "../components/tasks/HeaderTask";
import TrierTasks from "../components/tasks/TrierTasks";
import AddTask from "../components/tasks/AddTask";
import ListTask from "../components/tasks/ListTask";
import { supabase } from "../../supabase";
import CustomSnackbar from "../components/CustomSnackBar";

const HomeApp = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All"); // État pour le filtre
  const [refreshing, setRefreshing] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackType, setSnackType] = useState("success");

  // Fonction pour ouvrir le modal d'ajout de tâche
  const openAddTaskModal = () => setModalVisible(true);

  // Fonction pour fermer le modal d'ajout de tâche
  const closeAddTaskModal = () => setModalVisible(false);

  // Fonction pour gérer les messages de succès ou d'erreur
  const handleAddTaskMessage = (message, type) => {
    setSnackMessage(message);
    setSnackType(type);
    setSnackVisible(true);
  };

  // Fonction pour charger les tâches depuis Supabase
  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("task")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      setTasks(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
    }
  };

  // Fonction pour gérer le changement de filtre
  const handleFilterChange = (filter) => {
    setFilter(filter); // Met à jour l'état du filtre
  };

  // Fonction pour gérer le rafraîchissement de la liste
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  // Charge les tâches lors du premier rendu du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <View style={styles.content1}>
          <HeaderTask openModal={openAddTaskModal} />
        </View>
        <View style={styles.content2}>
          <TrierTasks onFilterChange={handleFilterChange} />
        </View>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeAddTaskModal}
        >
          <View style={styles.modalBackground}>
            <AddTask
              onAddTask={handleAddTaskMessage}
              onClose={closeAddTaskModal}
            />
          </View>
        </Modal>
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ListTask tasks={tasks} filter={filter} refreshTasks={fetchTasks} />
      </ScrollView>

      {/* CustomSnackbar pour afficher les messages */}
      <CustomSnackbar
        visible={snackVisible}
        message={snackMessage}
        onDismiss={() => setSnackVisible(false)}
        type={snackType}
      />
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
    flexDirection: "column",
  },
  content1: {
    height: 100,
  },
  content2: {
    height: 60,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
