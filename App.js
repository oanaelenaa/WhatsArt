import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
//import {Camera} from 'react-native-camera';
import { TfImageRecognition } from 'react-native-tensorflow';

export default class App extends Component {

  constructor() {
    super()
    this.image = require('./mona.jpg');
    this.state = {result: ""}
  }
  componentDidMount() {
    this.recognizeImage()
  }

  async recognizeImage() {

    try {
      const tfImageRecognition = new TfImageRecognition({
        model:require('./tensorflow_inception_graph.pb'),
        labels: require('./tensorflow_labels.txt')
      })

      const results = await tfImageRecognition.recognize({
        image: this.image
      })
      
      const resultText = `Name: ${results[0].name} - Confidence: ${results[0].confidence}`
      this.setState({result: resultText})
  
      await tfImageRecognition.close()
    } catch(err) {
      alert(err)
    }
  }

  render() {
      return (
        <View style={styles.container}>
            
        </View>
    );
  }
}

//"~0.54.1"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
