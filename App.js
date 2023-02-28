import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatListItem from './components/atoms/chatListItem';

const chat = {
  id: '1',
  user: {
    image:'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
    name: 'Lukas',
  },
  lastMessage: {
    text: 'Oke',
    createdAt: '07:30',
  },
};


export default function App() {
  return (
    <View style={styles.container}>
     
      <ChatListItem chat={chat}/>
      
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
