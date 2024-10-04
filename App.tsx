import { SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik';
import BouncyCheckBox from 'react-native-bouncy-checkbox'
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .required('Length is required')
  .min(4,'Should be min 4 characters')
  .max(16, 'Should be max of 16 characters')
})
export default function App() {
  const[password, setPassword] = useState('')
  const[isPassGenerated, setisPassGenerated] = useState(false);
  const[lowerCase, setlowerCase] = useState(true);
  const[upperCase, setupperCase] = useState(false);
  const[numbers, setNumbers] = useState(false);
  const[symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number)=>{
    let characterList= '';
    const upperCaseLetter='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseLetter='abcdefghijklmnopqrstuvwxyz'
    const digitCaseLetter='0123456789'
    const specialCaseLetter='!@#$%^&*()_+'

    if(upperCase) characterList+=upperCaseLetter
    if(lowerCase) characterList+=lowerCaseLetter
    if(symbols) characterList+=specialCaseLetter
    if(numbers) characterList+=digitCaseLetter

    const passResult= createPassword(characterList,passwordLength)
    setPassword(passResult);
    setisPassGenerated(true);
  }
  const createPassword= (Characters: string, passwordLength: number) =>{
    let result = ''
    for(let i=0;i<passwordLength;++i){
      const characterIndex= Math.round(Math.random()*Characters.length)
      result+=Characters.charAt(characterIndex)
    }
    return result;
  }
  const resetPassword= () =>{
    setPassword('')
    setisPassGenerated(false)
    setlowerCase(true)
    setupperCase(false)
    setSymbols(false)
    setNumbers(false)
  }
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={values =>{
          console.log(values);
          generatePasswordString(+(values.passwordLength))
       }}
      >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
       }) => (
        <>
          <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
          </View>
          <TextInput
              style={styles.inputStyle}
              value={values.passwordLength}
              onChangeText={handleChange('passwordLength')}
              placeholder='Ex:8'
              keyboardType='numeric'
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include LowerCase</Text>
            <BouncyCheckBox disableText
              isChecked={lowerCase}
              onPress={()=> setlowerCase(!lowerCase)}
              fillColor="#29AB87"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Numbers</Text>
            <BouncyCheckBox disableText
              isChecked={numbers}
              onPress={()=> setNumbers(!numbers)}
              fillColor="#29AB87"
            />
          </View><View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include UpperCase</Text>
            <BouncyCheckBox disableText
              isChecked={upperCase}
              onPress={()=> setupperCase(!upperCase)}
              fillColor="#29AB87"
            />
          </View><View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Special Symbols</Text>
            <BouncyCheckBox disableText
              isChecked={symbols}
              onPress={()=> setSymbols(!symbols)}
              fillColor="#29AB87"
            />
          </View>
          <View style={styles.formActions}>
          <TouchableOpacity 
          disabled={!isValid} 
          style={styles.primaryBtn}
          onPress={() => handleSubmit()}>
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={()=>{
            handleReset()
            resetPassword()}
            }>
            <Text style={styles.primaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
         </View>
        </>
       )}
          </Formik>
        </View>
        {isPassGenerated? (
          <View style={[styles.card,styles.cardElevated]}>
            <Text style={styles.subTitle}></Text>
            <Text style={styles.description}>Long Press To Copy</Text>
            <Text style={styles.generatedPassword} selectable={true}>{password}</Text>
          </View>
        ):null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
      cardElevated:{
        backgroundColor: '#ffffff',
        elevation: 1,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 2,  
      },
      card:{
        padding:12,
        borderRadius:6,
        marginHorizontal:12
      },
      generatedPassword:{
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 12,
        color:'#000'
      },
      subTitle:{
        fontSize: 12,
        color: '#ff0d10',
      },
      description:{
        fontSize: 12,
        color: '#ff0d10',
      },
      appContainer:{
        flex:1,
        backgroundColor:'grey',
        height:840
      },
      formContainer:{
        margin:8,
        padding:8,
      },
      title:{
        color:'#ffffff',
        fontSize:36,
        fontWeight:'bold',
        marginHorizontal:10
      },
      inputWrapper:{
        marginBottom:15,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
      },
      formActions:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
      },
      inputColumn:{
        marginTop:10,
        flexDirection:'column',
      },
      inputStyle:{
        color:'black',
        fontWeight:'bold',
        fontSize:24,
        borderWidth:1,
        borderRadius:4,
        borderColor: '#16213e',
        width:100,
        marginTop:15
      },
      heading:{
        color: '#000000',
        fontSize:25,
        fontWeight:'bold'
      },
      errorText:{
        fontSize: 12,
        color: '#ff0d10',
      },
      primaryBtn:{
        width:120,
        height:70,
        backgroundColor:'#0d7cd6',
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center',
        marginTop:10,
      },
      primaryBtnTxt:{
        color:'white',
        fontSize:16,
        fontWeight:'500',
        alignSelf:'center'
      },
      secondaryBtn:{
        width:120,
        height:70,
        marginLeft:50,
        backgroundColor:'#0d7cd6',
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        justifyContent:'center',
        marginTop:10,
      }
})