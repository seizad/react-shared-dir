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

const rootPath = Platform.select({
  ios: RNFS.DocumentDirectoryPath,
  android: `${RNFS.ExternalStorageDirectoryPath}/SampleReactDir`
});

type Props = {};
export default class App extends Component<Props> {
  state = { error: null };

  componentDidMount() {
    Platform.OS === "ios" ? this.createFiles() : this.createFolderAndFiles();
  }

  createFiles = () => {
    const fileNames = ["test1.txt", "test2.txt"];

    fileNames.forEach(fileName => {
      let path = `${rootPath}/${fileName}`;
      RNFS.writeFile(path, "Lorem ipsum dolor sit amet", "utf8").catch(err =>
        this.setState({ error: "File: " + err.message })
      );
    });
  };

  createFolderAndFiles = () => {
    RNFS.mkdir(rootPath)
      .then(() => this.createFiles())
      .catch(err => this.setState({ error: "DIR: " + err.message }));
  };

  get errors() {
    const { error } = this.state;

    return error ? (
      <Text style={styles.instructions}>Errors: {error}</Text>
    ) : null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>rootPath: {rootPath}</Text>
        <Text style={styles.instructions}>Now open the Files app</Text>
        {this.errors}
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
