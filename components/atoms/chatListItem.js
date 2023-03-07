import {Text, View, Image, StyleSheet} from 'react-native';


const ChatListItem = ({chat}) => {
   
   return(
      <View id={chat?.id} style={styles.container}>
         <Image style={styles.image} source={{uri: chat?.user?.image ?? 'https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg'}} />
         <View style={styles.content}>
            <View style={styles.messageInfo}>
               <Text numberOfLines={1} style={styles.name}>{chat?.user?.name}</Text>
               <Text style={styles.date}>{chat?.lastMessage?.createdAt}</Text>
            </View>
            <Text numberOfLines={2} style={styles.date}>{chat?.lastMessage?.text}</Text>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container:{
      flexDirection: 'row',
      marginHorizontal: 10,
      height: 70,
      borderTopColor: 'gray',
      borderTopWidth: 0.2,
   },
   image:{
      width:60, 
      height:60,
      borderRadius: 30,
      marginRight: 10,
   },
   content:{
      flex: 1,
   },
   messageInfo:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
   },
   name:{
      fontWeight: 'bold',
   },
   date:{
      fontWeight: '300',
      color: 'gray',
   },
})



export default ChatListItem;