import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../../components/atoms/CustomInput'
import CustomButton from '../../../components/atoms/CustomButton'
import { useNavigation } from '@react-navigation/core'
import { Auth } from 'aws-amplify'
import { useRoute } from '@react-navigation/native'
import { Alert } from 'react-native'

const ConfirmEmailScreen = () => {
  const route = useRoute()
  const [code, setCode] = useState('')
  const email = route?.params?.username
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const onConfirmPressed = async () => {
    setLoading(true)
    try {
      const response = await Auth.confirmSignUp(email, code)
      navigation.navigate('Home')
    } catch (e) {
      Alert.alert('Error:', e.message)
    }
    setLoading(false)
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn')
  }

  const onResendPress = () => {
    Auth.resendSignUp(email)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          placeholder="Enter your confirmation code"
          value={code}
          setValue={setCode}
        />

        <CustomButton text="Confirm" onPress={onConfirmPressed} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
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
  },
  link: {
    color: '#FDB075',
  },
})

export default ConfirmEmailScreen
