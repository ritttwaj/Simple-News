import React, { useContext, useState, useRef } from "react";
import {
  View,
  Modal,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Share,
  TouchableOpacity,
} from "react-native";
import themeContext from "../config/themeContext";
import WebView from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

function Card({ item }) {
  const [modalVisible, setModalVisible] = useState(false);
  const swipeableRef = useRef(null);

  // Handle sharing
  const handleShare = () => {
    const { url, title } = item;
    var message = `${title} \n\n Read More ${url} \n\n Shared via The Simple News`;
    return Share.share(
      { title, message, url: message },
      { dialogTitle: `Share ${title}` }
    );
  };

  const theme = useContext(themeContext);

  // Handle what happens when the user swipes left
  const handleLeftSwipe = () => {
    setModalVisible(true);
  };

  // Handle modal close and reset card position
  const handleCloseModal = () => {
    setModalVisible(false);
    swipeableRef.current?.close(); // Reset the card position
  };

  const leftSwipe = () => {
    return (
      <View
        style={{
          margin: 22,
          backgroundColor: theme.headerColor,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          width: 125,
          height: 496,
          overflow: "hidden",
          elevation: 1,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Open</Text>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={leftSwipe}
      onSwipeableLeftOpen={handleLeftSwipe} // Only open modal when the swipe is completed
    >
      <View
        style={{
          margin: 20,
          borderRadius: 15,
          backgroundColor: theme.cardBackground,
          height: 500,
          overflow: "hidden",
          elevation: 3,
        }}
      >
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
        <Text
          style={{
            width: width,
            marginHorizontal: width * 0.03,
            marginVertical: width * 0.03,
            fontSize: 20,
            fontWeight: "bold",
            color: theme.textColor,
            maxWidth: width * 0.85,
          }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={styles.author}>
          {item.author ? item.author : "Not Available"}
        </Text>
        <Text style={styles.desc}>
          {item.content.replace(/… \[\+\d+ chars\]$/, (match) => {
            const lineLength = 50;
            const rightAlignedText = "SWIPE RIGHT";
            const padding = lineLength - rightAlignedText.length;
            const paddedText = `${" ".repeat(padding)}`;
            return `... \n${paddedText}`;
          })}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              backgroundColor: theme.headerColor,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              width: 140,
              padding: 5,
              elevation: 3,
              marginLeft: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: "white",
              }}
            >
              🕘 {item.publishedAt}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              marginRight: 10,
            }}
            onPress={handleShare}
          >
            <Ionicons name="share-social" color={theme.textColor} size={27} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal} // handleCloseModal for closing
        statusBarTranslucent={false}
      >
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            marginTop: 5,
            overflow: "hidden",
            flexDirection: "column",
          }}
        >
          <View>
            <Button
              title="Close"
              onPress={handleCloseModal} // handleCloseModal for closing
              color={"#252525"}
            />
            <Button title="Share" onPress={handleShare} color={"#5f348a"} />
          </View>
          <WebView source={{ uri: item.url }} />
        </View>
      </Modal>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.3,
  },
  author: {
    width: width,
    marginTop: -10,
    marginHorizontal: width * 0.03,
    color: "darkgray",
  },
  desc: {
    width: width,
    marginTop: 5,
    marginHorizontal: width * 0.03,
    color: "gray",
    maxWidth: width * 0.8,
  },
});

export default Card;
