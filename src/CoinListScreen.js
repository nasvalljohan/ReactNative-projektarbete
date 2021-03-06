import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Boxes from "./Boxes";
import AndroidHeaderCoinListScreen from "./AndroidHeaderCoinListScreen";
import { useEffect, useState } from "react";

const CoinListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=SEK&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C1h"
    )
      .then((response) => response.json())
      .then((apiFetch) => setData(apiFetch), console.log("API Fetched"))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? <AndroidHeaderCoinListScreen /> : null}
      <FlatList
        keyboardShouldPersistTaps={"always"}
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item, separators }) => (
          <Boxes
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.current_price}
            priceChangePercentage={item.price_change_percentage_24h}
            logoURL={item.image}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  androidHeader: {
    alignItems: "center",
    height: 70,
    borderWidth: 0.2,
    borderBottomColor: "#fce0de",
  },
  bigtitle: {
    marginTop: 30,
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
  },
});

export default CoinListScreen;
