import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../../outils/Colors';

export default class AddTask extends Component {
  state = {
    date: new Date(),
    showDatePicker: false,
  };

  // Fonction pour afficher ou masquer le calendrier
  showDatepicker = () => {
    this.setState({ showDatePicker: true });
  };

  // Fonction pour gérer la date sélectionnée
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      showDatePicker: false,
      date: currentDate,
    });
  };

  render() {
    const { date, showDatePicker } = this.state;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Task</Text>
          <TouchableOpacity onPress={this.props.onClose}>
            <MaterialIcons name="cancel" size={30} color={Colors.vert4} />
          </TouchableOpacity>
        </View>

        {/* Contenu principal */}
        <View style={styles.body}>
          <View style={styles.formGroup}>
            <Text>Name</Text>
            <TextInput
              placeholder="Enter the name of the task..."
              style={styles.textInput}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Date</Text>
            <TouchableOpacity onPress={this.showDatepicker}>
              <View style={styles.dateInput}>
                <FontAwesome name="calendar" size={22} color={Colors.vert4} />
                <Text style={styles.dateText}>{date.toDateString()}</Text>
              </View>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={this.onDateChange}
              />
            )}
          </View>
        </View>

        {/* Bouton d'ajout */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.props.onClose}>
            <View style={styles.buttonAddTask}>
              <Text style={styles.buttonText}>Add</Text>
              <MaterialIcons name="navigate-next" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.vert4,
  },
  body: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  textInput: {
    marginTop: 10,
    backgroundColor: Colors.gris,
    padding: 10,
    borderRadius: 10,
  },
  dateInput: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: Colors.gris,
    padding: 10,
    borderRadius: 10,
  },
  dateText: {
    color: 'black',
    marginLeft: 10,
  },
  footer: {
    alignItems: 'flex-end',
  },
  buttonAddTask: {
    width: 90,
    height: 45,
    backgroundColor: Colors.vert2,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
