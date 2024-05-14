import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/backendUrl";
import * as Clipboard from "expo-clipboard";
import colors from "../../constants/colors";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let userData = await AsyncStorage.getItem("userData");
        userData = JSON.parse(userData);

        const response = await axios.post(
          `http://${url}:3000/api/v1/users/history`,
          { _id: userData._id }
        );

        if (response.status === 200) {
          setHistory(response.data.data);
        } else {
          throw new Error("Failed to fetch history");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleCopyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show("Text copied to clipboard", ToastAndroid.SHORT);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return history.length != 0 ? (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <Text style={styles.createdAt}>{item.createdAt}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => handleCopyToClipboard(item.text)}
            >
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  ) : (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginTop: 20 }}>
        No Scanned images to Show..!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: colors.neoncolor,
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  createdAt: {
    fontSize: 12,
    color: "#888",
  },
  copyButton: {
    backgroundColor: colors.lightcolor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  copyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default History;
