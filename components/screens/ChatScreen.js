import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import BG from '../../assets/images/BG.png'
import ListarComponentes from '../molecules/ListarComponenets'
import messages from '../../assets/data/messages.json'
import InputBox from '../atoms/InputBox'
import { useEffect } from 'react'

const ChatScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ title: route?.params?.name })
  }, [route.params.name])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 85}
      style={styles.container}
    >
      <ImageBackground source={BG} style={styles.list}>
        <ListarComponentes listaMensajes={messages} tipo="mensajes" />
        <InputBox style={styles.input} />
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    height: '100%',
  },
  input: {
    flex: 1,
    top: 0,
  },
})

export default ChatScreen
