import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/components/navigation';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports'

Amplify.configure({...awsconfig, 
  Analytics: {
  disabled: true,
},});

function App() {
  console.disableYellowBox = true;
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


export default App;