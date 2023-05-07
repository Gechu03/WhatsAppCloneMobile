import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import CustomInput from '../../../components/atoms/CustomInput'
import CustomButton from '../../../components/atoms/CustomButton'
import { useNavigation } from '@react-navigation/core'
import { Auth } from 'aws-amplify'

const SignUpScreen = () => {
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const onRegisterPressed = async () => {
    if (loading) {
      return
    }

    if (password !== passwordRepeat) {
      Alert.alert('Error:', 'The two passwords provided are not the same')
      return
    }

    let emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    if (emailTest.test(username) === false) {
      Alert.alert('Error:', 'Email dont match the requirements')
      return
    }

    setLoading(true)
    try {
      const response = await Auth.signUp({ username, password })
      navigation.navigate('ConfirmEmail', { username })
      setLoading(false)
    } catch (e) {
      Alert.alert('Error:', e.message)
    }
    setLoading(false)
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn', { email: username })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          required={true}
          type="email"
          placeholder="Email"
          value={username}
          setValue={setusername}
        />
        <CustomInput
          required={true}
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
          type="password"
        />
        <CustomInput
          required={true}
          placeholder="Repeat Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
          type="password"
        />

        <CustomButton
          style={styles.button}
          text={loading ? 'Loading...' : 'Register'}
          onPress={onRegisterPressed}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our Terms of Uses and
          Privacy Policy
        </Text>

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 180,
  },
  button: {
    marginVertical: 10,
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
    marginTop: 20,
  },
  link: {
    color: '#FDB075',
  },
})

export default SignUpScreen
