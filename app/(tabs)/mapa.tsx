import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider, Searchbar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = 'a2b9cca6cf12bf95c1739e34b7695033'; // Substitua com sua chave da API do Google
const DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [footerExpanded, setFooterExpanded] = useState(true);
  const [footerHeight] = useState(new Animated.Value(300));
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [roadConditions, setRoadConditions] = useState('Boas');
  const [mapType, setMapType] = useState('standard');
  const [route, setRoute] = useState(null);
  const [duration, setDuration] = useState(null);
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      fetchWeather(location.coords.latitude, location.coords.longitude);
      if (location) {
        // Defina o destino para a rota. Exemplo: coordenadas de um local fixo (como um destino desejado)
        const destination = { latitude: -8.8400, longitude: 13.2344 };  // Modifique com o destino desejado
        fetchRoute(location.coords.latitude, location.coords.longitude, destination.latitude, destination.longitude);
      }
    })();
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Aqui você pode alternar entre temas claro e escuro na sua aplicação
  };

  const fetchRoute = async (originLat, originLng, destinationLat, destinationLng) => {
    try {
      const response = await axios.get(DIRECTIONS_API_URL, {
        params: {
          origin: `${originLat},${originLng}`,
          destination: `${destinationLat},${destinationLng}`,
          key: API_KEY,
        },
      });
      if (response.data.routes.length > 0) {
        const routeData = response.data.routes[0].overview_polyline.points;
        const duration = response.data.routes[0].legs[0].duration.text;
        setRoute(routeData);
        setDuration(duration);
      }
    } catch (error) {
      console.error('Erro ao buscar a rota:', error);
    }
  };

  const handleBack = () => {
    navigation.navigate('HomeScreen');
  };

  const toggleFooter = () => {
    const initialValue = footerExpanded ? 300 : 50;
    const finalValue = footerExpanded ? 50 : 300;

    setFooterExpanded(!footerExpanded);
    Animated.spring(footerHeight, {
      toValue: finalValue,
      useNativeDriver: false,
    }).start();
  };

  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -8.8383,
            longitude: 13.2344,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType={mapType}
        >
          {location && (
            <>
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Minha Localização"
                description="Minha localização atual"
                pinColor="blue"
              />
              {route && (
                <Polyline
                  coordinates={decodePolyline(route)}
                  strokeColor="#FF6347"
                  strokeWidth={4}
                />
              )}
            </>
          )}
        </MapView>
        {!location && !errorMsg && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Obtendo localização...</Text>
          </View>
        )}
        {errorMsg && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}
        <Animated.View style={[styles.footer, { height: footerHeight }]}>
          <TouchableOpacity style={styles.footerContent} onPress={toggleFooter} activeOpacity={3}>
            {location && (
              <Text style={styles.footerText}>
                Minha Localização: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
              </Text>
            )}
            <View style={styles.footerIcon}>
              <FontAwesome name="truck" size={24} color="#32CD32" />
              <Text style={styles.footerIconText}>Chegada em {duration}</Text>
            </View>
            <View style={styles.footerInfo}>
              {weather ? (
                <>
                  <Text style={styles.footerInfoText}>Clima: {weather.weather[0].description}</Text>
                  <Text style={styles.footerInfoText}>Temperatura: {weather.main.temp}°C</Text>
                </>
              ) : (
                <Text style={styles.footerInfoText}>Carregando informações do clima...</Text>
              )}
              <Text style={styles.footerInfoText}>Condições da Estrada: {roadConditions}</Text>
            </View>
            <Searchbar
              placeholder="Pesquisar rotas ..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
            />
           <Text style={styles.footerInfoText}>Em caso de emergencia contactar a Equipe de suporte  no seguinte link...</Text>

          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.rightCorner}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleMapType}>
            <Ionicons name="map" size={30} color="white" />
            <Text style={styles.iconText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="compass" size={30} color="white" />
            <Text style={styles.iconText}>Bússola</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
  <Ionicons name={isDarkMode ? "moon" : "sunny"} size={30} color="white" />
  <Text style={styles.iconText}>Tema</Text>
</TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
};

const decodePolyline = (encoded) => {
  let points = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;
  while (index < len) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let deltaLat = (result & 0x01) ? ~(result >> 1) : (result >> 1);
    lat += deltaLat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let deltaLng = (result & 0x01) ? ~(result >> 1) : (result >> 1);
    lng += deltaLng;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5
    });
  }
  return points;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  footer: {
    backgroundColor: 'rgba(223, 223, 223, 0.6)',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  footerContent: {
    padding: 14,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  footerIconText: {
    marginLeft: 5,
    fontSize: 16,
  },
  footerInfo: {
    marginTop: 0,
  },
  footerInfoText: {
    fontSize: 12,
    textAlign: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  searchbar: {
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.69)',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#01B70D',
    borderRadius: 30,
    padding: 10,
  },
  rightCorner: {
    position: 'absolute',
    top: 100,
    right: 10,
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
  },
});

export default MapScreen