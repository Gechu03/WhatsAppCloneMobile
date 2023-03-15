import {ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import BG from '../../assets/images/BG.png'
import ListarComponentes from '../molecules/ListarComponenets'
import messages from '../../assets/data/messages.json'
import InputBox from '../atoms/InputBox'

const ChatScreen = () => {

 

   return (
      <KeyboardAvoidingView style={styles.container}>
         <ImageBackground source={BG} style={styles.list}>
            <ListarComponentes listaMensajes={messages} tipo="mensajes" />
            <InputBox style={styles.input}/>
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
   input:{
      flex: 1,
      top:0,
   }
})

export default ChatScreen