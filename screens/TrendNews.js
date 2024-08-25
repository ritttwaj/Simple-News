import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import TopNewsCard from "../components/TopNewsCard";
import newAPI, { API_KEY } from "../apis/News";

const TrendNews = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [newstech, setNewsTech] = useState([]);

  useEffect(() => {
    getNewsFromAPI();
  }, []);

  function getNewsFromAPI() {
    newAPI
      .get(`everything?domains=thenextweb.com&pageSize=20&apiKey=${API_KEY}`)
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

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator visible={true} />
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={newstech.articles}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => <TopNewsCard item={item} />}
        />
      )}
    </ScrollView>
  );
};

export default TrendNews;
