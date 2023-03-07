import {View, Text, StyleSheet, TextInput} from 'react-native'
import {AntDesign, MaterialIcons} from '@expo/vector-icons'

function InputBox() {
  return (
    <View style={styles.container}>
      <AntDesign  name='plus' size={20} color='royalblue' />
      <TextInput style={styles.input} placeholder='type your massage...'/>
      <MaterialIcons style={styles.send} name='send' size={16} color='white' />
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      backgroundColor: 'whitesmoke',
      paddingVertical: 10,
      justifyContent: 'space-around',
      alignItems: 'center',
      
   },
   input: {
      flex: 1,
      backgroundColor: 'white',
      color: 'black',
      paddingHorizontal: 10,
      borderRadius: 50,
      paddingVertical: 5,
      maxWidth: '75%',
   },
   send: {
      backgroundColor: 'royalblue',
      padding: 7,
      borderRadius: 30,
      overflow: 'hidden',
   }
})

export default InputBox