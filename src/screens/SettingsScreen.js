import { View, Button } from 'react-native'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native'

const SettingsScreen = () => {
  const navigation = useNavigation()

  const SingOutHandler = () => {
    Auth.signOut()
    navigation.navigate('SignIn')
    
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={SingOutHandler} title="Sign out" />
    </View>
  )
}

export default SettingsScreen
