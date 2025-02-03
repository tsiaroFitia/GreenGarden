import { StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react';

import Colors from '../../outils/Colors';

export default class DeleteTask extends Component {
  render() {
    return (
      <View style={styles.container}>
         <View style={styles.contain}>
            <View style={styles.header}>
                <Text style={{ fontSize: 18, color: Colors.vert1, fontWeight:'bold', alignItems:'center',justifyContent:'center',}}>Delete</Text>
            </View>
            <View style={styles.body}>
                <Text style={{marginTop:20, textAlign:'center'}}>Do you really want delete this task ?</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity>
                    <View style={styles.buttonOK}>
                        <Text style={{textAlign:'center'}}>OK</Text>
                    </View>

                </TouchableOpacity>
              
                {/* Bouton Cancel pour fermer le modal */}
                <TouchableOpacity onPress={this.props.onClose}>
                  <View style={styles.buttonCancel}>
                    <Text style={{ textAlign: 'center' }}>Cancel</Text>
                  </View>
                </TouchableOpacity>
            </View>
            
         </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    },
    contain: {
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      elevation: 10, // Ombre pour Android
      shadowColor: '#000', // Ombre pour iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: Colors.vert1,
    },
    body: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    footer: {
      //width:'100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonOK: {
      backgroundColor: Colors.vert1,
      borderRadius: 10,
      width:87,
      //width: '48%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonCancel: {
      backgroundColor: Colors.gris,
      borderRadius: 10,
      width:87,
     // width: '48%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    }
  });
  