import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../outils/Colors";
import DeleteTask from "./DeleteTask";
import { supabase } from "../../../supabase";
import CustomSnackbar from "../CustomSnackBar";

export default function ListTask({ tasks, filter, refreshTasks }) {
  const [isModalDeleteVisible, setModalDeleteVisible] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);
  const [snackVisible, setSnackVisible] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [snackType, setSnackType] = React.useState("success");

  // Filter tasks based on the filter value
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true; // Show all tasks
    if (filter === "Achieved") return task.is_achieved; // Show completed tasks
    if (filter === "Inachieved") return !task.is_achieved; // Show incomplete tasks
    return true; // Default: show all tasks
  });

  // Toggle the achieved status of a task
  const toggleAchieved = async (taskId, isAchieved) => {
    try {
      const { error } = await supabase
        .from("task")
        .update({ is_achieved: !isAchieved })
        .eq("id", taskId);

      if (error) throw error;

      refreshTasks(); // Refresh the task list
      setSnackMessage("Task status updated!");
      setSnackType("success");
      setSnackVisible(true);
    } catch (error) {
      console.error("Error updating task:", error);
      setSnackMessage("Error updating task!");
      setSnackType("error");
      setSnackVisible(true);
    }
  };

  // Open the delete task modal
  const openDeleteTaskModal = (taskId) => {
    setModalDeleteVisible(true);
    setSelectedTaskId(taskId);
  };

  // Close the delete task modal
  const closeDeleteTaskModal = () => {
    setModalDeleteVisible(false);
    setSelectedTaskId(null);
  };

  // Delete the selected task
  const deleteTask = async () => {
    if (!selectedTaskId) {
      setSnackMessage("No task selected!");
      setSnackType("error");
      setSnackVisible(true);
      return;
    }

    try {
      const { error } = await supabase
        .from("task")
        .delete()
        .eq("id", selectedTaskId);

      if (error) throw error;

      closeDeleteTaskModal();
      refreshTasks(); // Refresh the task list
      setSnackMessage("Task deleted successfully!");
      setSnackType("success");
      setSnackVisible(true);
    } catch (error) {
      console.error("Error deleting task:", error);
      setSnackMessage("Error deleting task!");
      setSnackType("error");
      setSnackVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {filteredTasks.map((task) => (
        <View key={task.id} style={styles.taskContainer}>
          {/* Toggle task completion */}
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

          {/* Task details */}
          <View style={styles.taskDetails}>
            <Text
              style={[styles.textName, task.is_achieved && styles.achievedText]}
            >
              {task.name || "No name provided"}
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
                : "No date provided"}
            </Text>
          </View>

          {/* Delete task button */}
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

      {/* Delete task modal */}
      {isModalDeleteVisible && (
        <DeleteTask onClose={closeDeleteTaskModal} onConfirm={deleteTask} />
      )}

      {/* Snackbar for notifications */}
      <CustomSnackbar
        visible={snackVisible}
        message={snackMessage}
        onDismiss={() => setSnackVisible(false)}
        type={snackType}
      />
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
