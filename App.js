/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
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
    // var path = `~/Documents/Pages/test1.txt`;
    // RNFS.writeFile(path, "Lorem ipsum dolor sit amet", "utf8")
    //   .then(success => this.setState({ testPath: path }))
    //   .catch(err => this.setState({ error: "File" + err.message }));
    // const dirPath = "~/Documents" + "/CreateSampleDir";
    // RNFS.mkdir(dirPath)
    //   .then(success => {
    //     const fileNames = ["test1.png"];
    //     fileNames.forEach(fileName => {
    //       var path = `${dirPath}/${fileName}`;
    //       RNFS.writeFile(path, "Lorem ipsum dolor sit amet", "utf8")
    //         .then(success => this.setState({ testPath: path }))
    //         .catch(err => this.setState({ error: "File" + err.message }));
    //     });
    //   })
    //   .catch(err => this.setState({ error: "DIR" + err.message }));
  };

  onDownloadImagePress() {
    const dirPath = RNFS.DocumentDirectoryPath + "/CreateSampleDir";
    RNFS.mkdir(dirPath).then(success => {
      RNFS.downloadFile({
        fromUrl: "https://facebook.github.io/react-native/img/header_logo.png",
        toFile: `${RNFS.DocumentDirectoryPath}/CreateSampleDir/react-native.png`
      })
        .promise.then(r => {
          this.setState({ isDone: true });
        })
        .catch(err => this.setState({ error: "File" + err.message }));
    });
  }

  render() {
    const preview = this.state.isDone ? (
      <View>
        <Image
          style={{
            width: 100,
            height: 100,
            backgroundColor: "black"
          }}
          source={{
            uri: `file://${
              RNFS.DocumentDirectoryPath
            }/CreateSampleDir/react-native.png`,
            scale: 1
          }}
        />
        <Text>{`file://${
          RNFS.DocumentDirectoryPath
        }/CreateSampleDir/react-native.png`}</Text>
      </View>
    ) : null;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{RNFS.DocumentDirectoryPath}</Text>
        {preview}
        <Text style={styles.welcome}>isDone: {this.state.isDone}</Text>
        <Text style={styles.welcome}>error: {this.state.error}</Text>
        <Text style={styles.welcome}>testPath: {this.state.testPath}</Text>
        <Text onPress={() => this.onDownloadImagePress()}>Download Image</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "~/Documents/Keynote/img.JPG",
            scale: 1
          }}
        />
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
