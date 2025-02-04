import { Text, View , StyleSheet, TouchableOpacity, ScrollView, Modal} from 'react-native'
import React, { Component , useState } from 'react';
import FonteAwesome6 from 'react-native-vector-icons/FontAwesome6'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Colors from '../../outils/Colors'
import DeleteTask from './DeleteTask';

export default class ListTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalDeleteVisible: false,
    };
  }

  openDeleteTaskModal = () => {
    this.setState({ isModalDeleteVisible: true });
  };

  closeDeleteTaskModal = () => {
    this.setState({ isModalDeleteVisible: false });
  };

  toggleAchievedColor = () => {
    this.setState(prevState => ({ isAchieved: !prevState.isAchieved }));
  };

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.contain}>
        <View style={styles.containName}>
          <Text>Name</Text>
          <TouchableOpacity onPress={this.toggleAchievedColor}>
              <FonteAwesome6 
                name="circle-check" 
                size={20} 
                style={[
                  styles.iconAchieved, 
                  { color: this.state.isAchieved ? Colors.vert2 : 'grey' }
                ]}
              />
            </TouchableOpacity>
        </View>
        <View style={styles.containDate}>
          <Text>Date</Text>
          <TouchableOpacity onPress={this.openDeleteTaskModal}>
            <MaterialIcons name="delete" size={22} style={styles.iconDelete} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Modal
            transparent={true}
            visible={this.state.isModalDeleteVisible}
            animationType="slide"
            onRequestClose={this.closeDeleteTaskModal}
            style={styles.modalBackground}
          >
            <View style={styles.modalBackground}>
              
              <TouchableOpacity onPress={this.closeDeleteTaskModal}>
                 <DeleteTask/>
              </TouchableOpacity>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:'100%',
    alignItems: 'center', // Centrer verticalement les enfants
    
  },
  contain:{
    width:'90%',
    height:120,
    borderRadius:15,
    backgroundColor: 'white',
    alignItems: 'center', // Centrer verticalement les enfants
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center', // Écarte les élément
  },
  containName:{
    marginTop:20,
    width:'90%',
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Écarte les élément
  },
  containDate:{
    width:'90%',
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Écarte les élément
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fond semi-transparent
  },
  iconAchieved: {
    marginLeft: 10,
    //opacity:0.4,
  },
  iconDelete: {
    marginLeft: 10,
    color: Colors.vert5,
    opacity:0.7,
  }
})