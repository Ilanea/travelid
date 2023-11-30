import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../theme/theme.js';
import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const loremIpsumText = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt`;

function handleHotels(hotelCount, expanded, toggleExpanded, navigation) {
  var arr = [];
  function handleImage(i) {
    switch (i) {
    case 0:
      return([require("../pics/hotel.jpg"), "Hotel Innsbruck", "Am Ufer des Inns und direkt im Stadtzentrum befindet sich das charmante Hotel Das Innsbruck**** Das Innsburuck**** bietet 115 stilvoll gestaltete Zimmer und Suiten in mehreren Kategorien. Der Panorama Wellness | SPA über den Dächern Innsbrucks erwartet Sie mit Panoramafenstern, einem Aromadampfbad, einer Biosauna (45°C, 50% Luftfeuchtigkeit), einer finnischen Sauna (90°C), Erlebnisduschen, einem Eisbrunnen, einer Infrarotkabine, einer Tee- und Vitaminecke, einem Ruheraum sowie einer Sonnenterrasse. Der 24/7 Golden Pool | Dress on SPA ist vom Goldenen Dachl inspiriert und biete neben dem Goldenen Pool, Ruhebereiche und eine Textilsauna. Gegen Aufpreis stehen Ihnen auch ein Solarium und ein Massageangebot zur Verfügung. Zu den weiteren Annehmlichkeiten des Hotels zählen eine Abend-Hotelbar & Minotti Lounge mit Kaminfeuer und Pianoklängen, ein á la carte Abendrestaurant, ein Spotdepot sowie ein Conventionbereich für bis zu 80 Personen."])
    case 1:
      return([require('../pics/tivoli1.jpg'), "Hotel Innsbruck Tivoli", "Das Hotel verbindet einprägsame Architektur mit professioneller Gastlichkeit – ein City-Hotel, das Ihnen einen echten Wohlfühl-Mehrwert bietet. Sie wohnen in einem der höchsten Gebäude der Stadt, mit viel Komfort und herzlichem Service. Auf der Terrasse in der 11. Etage eröffnet sich Ihnen ein atemberaubendes Panorama auf die Tiroler Berge und die weltberühmte Bergisel Sprungschanze. Genießen Sie Ihren Lieblingsdrink über den Dächern einer der wohl schönsten Alpenstädte! Auch in den Seminarräumen geht es hoch hinaus, sie bieten bis zu 80 Tagungsgästen einen weiten Horizont und genialen Ausblick. Für Entspannung steht Ihnen der hauseigene Saunabereich offen. Die Bistro-Bar des Hotels verwöhnt die Gäste abends zusätzlich mit einem kleinen, aber feinen Speisenangebot. Die gebührenpflichtige Hotel-Tiefgarage verfügt über 57 Stellplätze"])
    }
  }

  for (let i = 0; i < hotelCount; i++) {

    arr.push(
      <View key={i} style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Booking")}>
          <View style={styles.imageView}>
            <View style={styles.shadowContainer}>
            <Image
              source={handleImage(i)[0]}
              style={styles.imageStyle}
            />
            </View>
            <View style={styles.overlayView}>
              <Text style={{ fontWeight: "bold" }}>
                {handleImage(i)[1]}
              </Text>
              <Text>
                ⭐⭐⭐⭐
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", alignItems: "flex-start", paddingLeft: 30 }}>
          <Text style={styles.DetailsHeadline}>Details</Text>
        </View>
        <View>
          <Text style={styles.DetailsText}>
            {expanded[i]
              ? handleImage(i)[2]
              : `${handleImage(i)[2].substr(0, 130)}...`}
          </Text>
          <TouchableOpacity
            onPress={() => toggleExpanded(i)}
            style={styles.seeMoreButton}
          >
            <Text style={{ textDecorationLine: "underline" }}>{expanded[i] ? "See Less" : "See More"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return arr;
}

export default function Results() {
  const navigation = useNavigation();
  const hotelCount = 2;

  const [expanded, setExpanded] = useState(Array(hotelCount).fill(false));

  const toggleExpanded = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const hotels = handleHotels(hotelCount, expanded, toggleExpanded, navigation);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        source={require('../pics/background_results.png')}
        style={styles.stackImage}
      />
      <View style={styles.headerContainer}>
        <Text style={{ padding: 10, backgroundColor: "#C9D4E4", width: 80, textAlign: "center", borderRadius: 20 }}>Hotel</Text>
      </View>
      <View style={{ height: "20%" }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {hotels}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
    height: "100%",
  },
  headerContainer: {
    paddingBottom: 10,
    paddingTop: 30,
    paddingLeft: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: theme.backgroundLightBlue,
    zIndex: 1,
    top: "17%",
    height: "10%"
  },
  stackImage: {
    width: '100%',
    height: '27%',
    position: "absolute",
    zIndex: 1,
  },
 
  imageView: {
    height: 240,
    width: 350,
    marginVertical: 10,
    position: "relative",
  },
  shadowContainer: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  overlayView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "25%",
    width: "45%",
    alignItems: "center",
    paddingTop: 4,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  scrollContainer: {
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: theme.backgroundLightBlue,
  },
  DetailsHeadline: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16
  },
  DetailsText: {
    width: 350,
    color: "#7A7289"
  },
  imageStyle: {
    borderRadius: 20,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  seeMoreButton: {
    marginBottom: 20,
    width: 90,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
