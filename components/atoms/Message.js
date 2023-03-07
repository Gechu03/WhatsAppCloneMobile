import React from 'react'
import { View } from 'react-native';
import relativeTime  from 'dayjs/plugin/relativeTime'
import  dayjs  from 'dayjs';
import { Text, StyleSheet } from 'react-native'

dayjs.extend(relativeTime)

const Message = ({ mensaje }) => {
   const isMyMessage = () => {
      return mensaje.user.id === 'u1';
   };

   
      return (
         <View style={[styles.container,
            {
               backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
               alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'
         },]}>
            <Text>{mensaje.text}</Text>
            <Text style={styles.time}>{dayjs(mensaje.createdAt).fromNow(true)}</Text>
         </View>
      )
   
   
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      alignSelf: 'flex-start',
      margin: 5,
      padding: 10,
      borderRadius: 15,
      maxWidth: '80%',

      shadowColor: 'black',
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1,
      elevation:  2,
   },
   time:{
      color:'gray',
      alignSelf:'flex-end'
   },
});

export default Message