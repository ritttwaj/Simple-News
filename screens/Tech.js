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

const Tech = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [newstech, setNewsTech] = useState([]);

  useEffect(() => {
    getNewsFromAPI();
  }, []);

  function getNewsFromAPI() {
    newAPI
      .get(`everything?q=technology&pageSize=20&apiKey=${API_KEY}`)
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
        <ActivityIndicator size="large" color="#5f348a" />
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
    marginTop: 10,
    marginLeft: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 20,
  },
});

export default Tech;
