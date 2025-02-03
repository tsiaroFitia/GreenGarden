import { Text, TouchableOpacity, View , StyleSheet} from 'react-native'
import React, { Component } from 'react'

import Colors from '../../outils/Colors';

export default class TrierTasks extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menu}>
            <TouchableOpacity>
                <View style={styles.all}>
                    <Text>All</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.bar}>|</Text>
            <TouchableOpacity>
                <View style={styles.all}>
                    <Text>Open</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.bar}>|</Text>
            <TouchableOpacity>
                <View style={styles.all}>
                    <Text>Closed</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.bar}>|</Text>
            <TouchableOpacity>
                <View style={styles.all}>
                    <Text>Achieved</Text>
                </View>
            </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    all:{
        opacity:0.7,
    },
    bar:{
        color:'white',
    },
    container:{
        width:'100%',
        paddingVertical:5,
        alignItems: 'center', // Centrer verticalement les enfants
    },
    menu:{
        width:'90%',
        height:20,
        justifyContent:'space-between',
        flexDirection: 'row',
       // backgroundColor:Colors.vert2,
        alignItems: 'center', // Centrer verticalement les enfants
        paddingLeft:10,
        paddingRight:10,
    },
})