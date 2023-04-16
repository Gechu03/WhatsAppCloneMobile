import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native'
import Logo from '../Logo.png'
import CustomInput from '../../../components/atoms/CustomInput'
import CustomButton from '../../../components/atoms/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'

const SignInScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { height } = useWindowDimensions()
  const navigation = useNavigation()

  const onSignInPressed = async () => {
    if (loading) {
      return
    }
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(email.test(username) === false){
      Alert.alert('Error:', 'Email dont match the requirements')
      return
    }

    setLoading(true)
    try {
      const response = await Auth.signIn(username, password)
      navigation.navigate('Home')
      setUsername('');
      setPassword('');
      setLoading(false)
    } catch (e) {
      Alert.alert('Error:', e.message)
    }
    setLoading(false)
    
  }

  const onSignUpPress = () => {
    navigation.navigate('SignUp')
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          required={true}
          placeholder="Email"
          value={username}
          setValue={setUsername}
          type='email'
        />

        <CustomInput
          required={true}
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
          type='password'
        />

        <CustomButton
          text={loading ? 'Loading ...' : 'Sign In'}
          onPress={onSignInPressed}
        />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
  },

  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
})

export default SignInScreen
