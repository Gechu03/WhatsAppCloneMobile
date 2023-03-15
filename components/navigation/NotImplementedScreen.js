import { View, Text, Image, StyleSheet } from 'react-native';

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://media.makeameme.org/created/im-working-on-5c5a62.jpg',
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'gray',
  },
  image: {
    width: '80%',
    aspectRatio: 2 / 1,
  },
});

export default NotImplementedScreen;