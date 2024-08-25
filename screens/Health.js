import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
  Statusbar,
} from "react-native";
import themeContext from "../config/themeContext";

import Card from "../components/Card";
import newAPI, { API_KEY } from "../apis/News";
import theme from "../config/theme";

const Health = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [newstech, setNewsTech] = useState([]);

  useEffect(() => {
    getNewsFromAPI();
  }, []);

  function getNewsFromAPI() {
    newAPI
      .get(`everything?q=health&pageSize=20&apiKey=${API_KEY}`)
      .then(async function (response) {
        setNewsTech(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  if (!newstech) {
    return null;
  }

  const theme = useContext(themeContext);

  return (
    <View style={{ backgroundColor: theme.backColor, flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#DA3349" />
      ) : (
        <FlatList
          data={newstech.articles}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => <Card item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  midText: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: theme.headerColor,
    Statusbar: "#5f348a",
    marginTop: 10,
    marginLeft: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: theme.headerColor,
    Statusbar: "#5f348a",
    marginTop: 10,
    marginLeft: 20,
  },
});

export default Health;
