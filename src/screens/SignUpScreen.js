import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Pressable} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '../outils/Colors';

export default function SignInScreen({navigation}) {

  const [data, setData] = React.useState({
      email:'',
      password:'',
      check_textInputChange: false,
      secureTextEntry: true,
  });

  const textInputChange = (val) =>{
      if(val.length !== 0){
        setData({
          ...data,
          email: val,
          check_textInputChange: true,
        })
      }
      else{
        setData({
          ...data,
          email: val,
          check_textInputChange: false,
        })
      }
  };
  const handdlePasswordChange = (val) =>{
    setData({
      ...data,
      password: val,
    })
  }; 
  const updateSecureTextEntry = () =>{
    setData({
      ...data,
      secureTextEntry: false,
    })
  };


  return (
      <View style={styles.container}>
           <View style={styles.header}>
             <Text style={styles.headerText}>Register Now  !</Text>
           </View>
           <Animatable.View 
             animation='fadeInUpBig'
             style={styles.footer}
           >
              <Animatable.View 
                animation='fadeInUpBig'
                style={styles.viewInput}
              >
                 <Text style={styles.LabelTextInput} >Identifiant</Text>
                 <View style={styles.iconInput}>
                      <MaterialIcons
                        name='person'
                        color='#009367'
                        size={22}
                      />
                      <TextInput 
                        style={styles.input}
                        placeholder='Enter your identifiant ....'
                        onChangeText={(val)=> textInputChange(val)}
                      />
                      {data.check_textInputChange ? 
                      <Animatable.View
                          animation='bounceIn'
                      >
                          <Ionicons
                            name='checkmark-circle-outline'
                            color='grey'
                            size={20}
                          /> 
                      </Animatable.View>
                      
                    : null}
                 </View>

                 
              </Animatable.View>
              <Animatable.View 
                animation='fadeInUpBig'
                style={styles.viewInput}
              >
                 <Text style={styles.LabelTextInput} >Password</Text>
                 
                 <View style={styles.iconInput}>
                      <FontAwesome
                        name='lock'
                        color='#009367'
                        size={22}
                      />
                      <TextInput 
                        style={styles.input}
                        placeholder='Enter your password ....'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(val)=> handdlePasswordChange(val)}
                      />
                      <TouchableOpacity
                        onPress={updateSecureTextEntry}
                      >
                        {data.secureTextEntry ?
                        <Ionicons
                          name='eye-off'
                          color='grey'
                          size={20}
                        />
                        :
                        <Ionicons
                          name='eye'
                          color='grey'
                          size={20}
                        />
                        }
                      </TouchableOpacity>
                     
                 </View>
              </Animatable.View>

              <Animatable.View 
                animation='fadeInUpBig'
                style={styles.viewInput}
              >
                 <Text style={styles.LabelTextInput} >Confirm Password</Text>
                 
                 <View style={styles.iconInput}>
                      <FontAwesome
                        name='lock'
                        color='#009367'
                        size={22}
                      />
                      <TextInput 
                        style={styles.input}
                        placeholder='Confirm your password ....'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(val)=> handdlePasswordChange(val)}
                      />
                      <TouchableOpacity
                        onPress={updateSecureTextEntry}
                      >
                        {data.secureTextEntry ?
                        <Ionicons
                          name='eye-off'
                          color='grey'
                          size={20}
                        />
                        :
                        <Ionicons
                          name='eye'
                          color='grey'
                          size={20}
                        />
                        }
                      </TouchableOpacity>
                     
                 </View>
              </Animatable.View>

              <View style={styles.button}>
               <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                   <Animatable.View 
                      animation='fadeInLeftBig'
                      style={styles.button1}
                   >
                        <Text style={styles.buttonText1}>Sign up</Text>
                   </Animatable.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                   <Animatable.View 
                      animation='fadeInRightBig'
                      style={styles.button2}
                   >
                        <Text style={styles.buttonText2}>Sign in</Text>
                   </Animatable.View>
                </TouchableOpacity>
              </View>


           </Animatable.View>
         </View>
  );
}

const styles = StyleSheet.create({
  button:{
      paddingTop:30,
    },
    button1:{
      width:'100%',
      height: 45,
      borderRadius:15,
      backgroundColor: Colors.vert1,
      textAlign:'center',
      justifyContent:'center',
      marginBottom: 25, // Espacement entre le premier et le deuxième bouton
    },
    buttonText1:{
      fontSize: 16,
      textAlign:'center',
      justifyContent:'center',
      color:"white",
    },
    button2:{
      width:'100%',
      height: 45,
      borderRadius:15,
      borderWidth:1,
      borderColor: Colors.vert1,
      backgroundColor:'#FFFF',
      textAlign:'center',
      justifyContent:'center',
    },
    buttonText2:{
      fontSize: 16,
      textAlign:'center',
      justifyContent:'center',
      color: Colors.vert1,
    },
    buttonContainer: {
      width: 450,
      alignItems: 'center',
      marginTop: 20,
      padding: 15,
      borderRadius: 30,
      paddingBottom:-50,
      justifyContent:'flex-end',
    },
    container: {
      flex: 1,
      backgroundColor: Colors.vert1,
    },
    errorMsg:{
      color:'red',
    },
    footer: {
      flex: 2,
      backgroundColor: 'white',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingVertical: 30,
      paddingHorizontal: 35,
    },
    header: {
      flex: 1,
      backgroundColor: Colors.vert1,
      justifyContent: 'center',
    },
    headerText:{
      fontSize: 32,
      fontWeight: 'bold', // Utilisation de bold pour le poids
      color: '#FFFFFF',
      paddingLeft:30,
    },
    iconInput:{
      flexDirection: 'row',        // Aligne les éléments horizontalement
      alignItems: 'center',        // Aligne les éléments au centre sur l'axe vertical
      paddingTop: 10,
    },
    input:{
      flex: 1,                     // L'input prendra toute la largeur restante
      marginLeft: 20,              // Un petit écart entre l'icône et le champ de texte
    },
    viewInput:{
      paddingTop:10,
      paddingBottom:10,
    },
    LabelTextInput:{
      fontSize: 16,
      fontWeight: 'bold', // Utilisation de bold pour le poids
      color: Colors.vert2,
      
    },
    
});
