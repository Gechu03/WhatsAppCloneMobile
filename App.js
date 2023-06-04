import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/components/navigation';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports'
import { LogBox } from 'react-native';
Amplify.configure({...awsconfig, 
  Analytics: {
  disabled: true,
},});

function App() {

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
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