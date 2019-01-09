/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import RNFS from "react-native-fs";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    error: "",
    testPath: ""
  };

  componentDidMount() {
    this.createFolder();
  }
  createFolder = () => {
    const dirPath = RNFS.DocumentDirectoryPath + "/CreateSampleDir";
    RNFS.mkdir(dirPath)
      .then(success => {
        const fileNames = ["test1.txt"];

        fileNames.forEach(fileName => {
          var path = `${dirPath}/${fileName}`;
          RNFS.writeFile(path, "Lorem ipsum dolor sit amet", "utf8")
            .then(success => {
              this.setState({ testPath: path });
              console.log(fileName + ": FILE WRITTEN!");
            })
            .catch(err => {
              this.setState({ error: err.message });
              console.log(err.message);
            });
        });
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{RNFS.DocumentDirectoryPath}</Text>
        <Text style={styles.welcome}>error: {this.state.error}</Text>
        <Text style={styles.welcome}>testPath: {this.state.testPath}</Text>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
