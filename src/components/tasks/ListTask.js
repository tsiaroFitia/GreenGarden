import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { Component } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../outils/Colors";
import DeleteTask from "./DeleteTask";
import { supabase } from "../../../supabase";

export default class ListTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalDeleteVisible: false,
      selectedTaskId: null,
      tasks: [],
    };
  }

  // Récupérer les tâches depuis Supabase
  fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from("task").select("*"); // Vérifier si la table est bien "task"
      if (error) throw error;
      if (!data || data.length === 0) {
        console.log("Aucune tâche trouvée.");
      } else {
        console.log("Tâches récupérées :", data);
      }
      this.setState({ tasks: data || [] });
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
    }
  };

  componentDidMount() {
    this.fetchTasks();
  }

  // Mettre à jour l'état "is_achieved" dans Supabase
  toggleAchieved = async (taskId, isAchieved) => {
    try {
      const { error } = await supabase
        .from("task")
        .update({ is_achieved: !isAchieved })
        .eq("id", taskId);

      if (error) throw error;
      this.fetchTasks();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
  };

  // Ouvrir le modal de suppression
  openDeleteTaskModal = (taskId) => {
    this.setState({ isModalDeleteVisible: true, selectedTaskId: taskId });
  };

  // Fermer le modal de suppression
  closeDeleteTaskModal = () => {
    this.setState({ isModalDeleteVisible: false, selectedTaskId: null });
  };

  // Supprimer une tâche dans Supabase
  deleteTask = async () => {
    const { selectedTaskId } = this.state;
    if (!selectedTaskId) return;

    try {
      const { error } = await supabase
        .from("task")
        .delete()
        .eq("id", selectedTaskId);
      if (error) throw error;

      this.closeDeleteTaskModal();
      this.fetchTasks();
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  render() {
    const { tasks, isModalDeleteVisible } = this.state;

    return (
      <View style={styles.container}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskContainer}>
            {/* Icône de validation */}
            <TouchableOpacity
              onPress={() => this.toggleAchieved(task.id, task.is_achieved)}
            >
              <FontAwesome6
                name="circle-check"
                size={24}
                color={task.is_achieved ? Colors.vert2 : "grey"}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* Détails de la tâche */}
            <View style={styles.taskDetails}>
              <Text
                style={[
                  styles.textName,
                  task.is_achieved && styles.achievedText,
                ]}
              >
                {task.name}
              </Text>
              <Text
                style={[
                  styles.textDate,
                  task.is_achieved && styles.achievedText,
                ]}
              >
                {new Date(task.date).toDateString()}
              </Text>
            </View>

            {/* Icône de suppression */}
            <TouchableOpacity onPress={() => this.openDeleteTaskModal(task.id)}>
              <MaterialIcons
                name="delete"
                size={24}
                color={Colors.vert5}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Modal de confirmation de suppression */}
        <Modal
          transparent={true}
          visible={isModalDeleteVisible}
          animationType="slide"
          onRequestClose={this.closeDeleteTaskModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Voulez-vous supprimer cette tâche ?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={this.deleteTask}
                  style={styles.buttonDelete}
                >
                  <Text style={styles.buttonText}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.closeDeleteTaskModal}
                  style={styles.buttonCancel}
                >
                  <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  taskContainer: {
    width: "90%",
    height: 80,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 3,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  textDate: {
    fontSize: 14,
    color: "#666",
  },
  icon: {
    padding: 10,
  },
  achievedText: {
    textDecorationLine: "line-through",
    color: "grey",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonDelete: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
