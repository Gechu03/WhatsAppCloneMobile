import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatList from './components/molecules/ListarComponenets';
import mensajes from './assets/data/chats.json'
import ListOfChatsScreen from './components/screens/ListOfChatsScreen';
import ChatScreen from './components/screens/ChatScreen';
import Navigator from './components/navigation';

export default function App() {
  return (
    <View style={styles.container}>
       <Navigator />
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
});
