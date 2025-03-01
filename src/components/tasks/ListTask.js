import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../outils/Colors";
import DeleteTask from "./DeleteTask";
import { supabase } from "../../../supabase";

export default function ListTask({ tasks, refreshTasks }) {
  const [isModalDeleteVisible, setModalDeleteVisible] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);

  // Bascule le statut "is_achieved" d'une tâche
  const toggleAchieved = async (taskId, isAchieved) => {
    try {
      const { error } = await supabase
        .from("task")
        .update({ is_achieved: !isAchieved })
        .eq("id", taskId);

      if (error) throw error;

      refreshTasks();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
  };

  // Ouvre le modal de suppression
  const openDeleteTaskModal = (taskId) => {
    setModalDeleteVisible(true);
    setSelectedTaskId(taskId);
  };

  // Ferme le modal de suppression
  const closeDeleteTaskModal = () => {
    setModalDeleteVisible(false);
    setSelectedTaskId(null);
  };

  // Supprime une tâche
  const deleteTask = async () => {
    if (!selectedTaskId) return;

    try {
      const { error } = await supabase
        .from("task")
        .delete()
        .eq("id", selectedTaskId);

      if (error) throw error;

      closeDeleteTaskModal();
      refreshTasks();
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskContainer}>
          <TouchableOpacity
            onPress={() => toggleAchieved(task.id, task.is_achieved)}
          >
            <FontAwesome6
              name="circle-check"
              size={24}
              color={task.is_achieved ? Colors.vert2 : "grey"}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={styles.taskDetails}>
            <Text
              style={[styles.textName, task.is_achieved && styles.achievedText]}
            >
              {task.name || "Nom non défini"}
            </Text>
            <Text
              style={[styles.textDate, task.is_achieved && styles.achievedText]}
            >
              {task.date
                ? new Intl.DateTimeFormat("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(task.date))
                : "Date non définie"}
            </Text>
          </View>

          <TouchableOpacity onPress={() => openDeleteTaskModal(task.id)}>
            <MaterialIcons
              name="delete"
              size={24}
              color={Colors.vert5}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ))}

      {isModalDeleteVisible && (
        <DeleteTask onClose={closeDeleteTaskModal} onConfirm={deleteTask} />
      )}
    </View>
  );
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
});
