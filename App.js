import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatList from './components/molecules/ListarComponenets';
import mensajes from './assets/data/chats.json'
import ListOfChatsScreen from './components/screens/ListOfChatsScreen';
import ChatScreen from './components/screens/ChatScreen';


export default function App() {
  return (
    <View style={styles.container}>

      {/* <ListOfChatsScreen />   */}
      <ChatScreen />
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
