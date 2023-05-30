import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

const ContactListItem = ({
  user,
  onPress = () => {},
  selectable = false,
  isSelected = false,
}) => {
  return (
    <Pressable onPress={() => onPress()} id={user?.id} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri:
            user?.image ??
            'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg',
        }}
      />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {user?.name}
        </Text>

        <Text numberOfLines={2} style={styles.date}>
          {user.status}
        </Text>
      </View>

      {selectable &&
        (isSelected ? (
          <AntDesign name="checkcircle" size={24} color="royalblue" />
        ) : (
          <FontAwesome name="circle-thin" size={24} color="lightgray" />
        ))}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 70,
    borderTopColor: 'gray',
    borderTopWidth: 0.2,
    paddingVertical: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
  },
  date: {
    fontWeight: '300',
    color: 'gray',
    overflow: 'hidden',
  },
})

export default ContactListItem
