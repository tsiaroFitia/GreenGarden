import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Colors from '../outils/Colors';

const DiscussionApp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DiscussionApp</Text>
    </View>
  )
}

export default DiscussionApp

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Colors.gris,
    textAlign:'center',
    justifyContent:'center'
  },
  text:{
    textAlign:'center',
    justifyContent:'center'
  }
})