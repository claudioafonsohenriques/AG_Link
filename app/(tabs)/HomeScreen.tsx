import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
      const navigation = useNavigation();
    const [currentOrders, setCurrentOrders] = useState([
        {
            id: '1',
            image: 'https://img.freepik.com/vetores-gratis/ilustracao-dos-desenhos-animados-de-armazem_1284-8081.jpg',
            description: 'Cargas Pequenas',
            location: 'São Paulo, SP',
            weight: '1 Tonelada',
            latitude: -23.55052,
            longitude: -46.633308
        },
        {
            id: '2',
            image: 'https://img.freepik.com/fotos-gratis/cesto-com-frutas_1232-4086.jpg',
            description: 'Carga de Frutas',
            location: 'Luanda, Viana',
            weight: '500 Kg',
            latitude: -22.9068,
            longitude: -43.1729
        },
        {
            id: '3',
            image: 'https://img.freepik.com/fotos-gratis/cesto-com-legumes_1232-4086.jpg',
            description: 'Carga de Legumes',
            location: 'Benguela, Baia Farta',
            weight: '2 Toneladas',
            latitude: -19.9208,
            longitude: -43.9345
        }
    ]);

 
    const handleAcceptCargo = (cargo) => {
        Toast.show({
            type: 'success',
            text1: 'Carga Aceita!',
            text2: `Você aceitou a carga de ${cargo.description}. 🚚`,
            visibilityTime: 7000,
            position: 'bottom',
        });

        setCurrentOrders((prevOrders) => prevOrders.filter(order => order.id !== cargo.id));

        navigation.navigate('mapa', {
            location: cargo.location,
            latitude: cargo.latitude,
            longitude: cargo.longitude,
            description: cargo.description,
        });
    };

    const handleRejectCargo = (cargoId) => {
        Toast.show({
            type: 'error',
            text1: 'Carga Recusada',
            text2: `Você recusou a carga de ID ${cargoId}. 😞`,
            visibilityTime: 7000,
            position: 'bottom',
        });

        setCurrentOrders((prevOrders) => prevOrders.filter(order => order.id !== cargoId));
    };

    const handleViewDetails = (cargo) => {
        // Navega para a tela de detalhes, passando as informações da carga
        navigation.navigate('DetailsScreen', {
            cargoId: cargo.id,
            description: cargo.description,
            location: cargo.location,
            weight: cargo.weight,
            latitude: cargo.latitude,
            longitude: cargo.longitude
        });
    };

    const renderCargoCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <Text style={styles.cardLocation}>Localização: {item.location}</Text>
                <Text style={styles.cardWeight}>Peso: {item.weight}</Text>

                <TouchableOpacity
                    style={styles.cardLink}
                    onPress={() => handleViewDetails(item)}
                >
                    <Text style={styles.linkText}>Ver Detalhes</Text>
                </TouchableOpacity>

                <View style={styles.cargoActions}>
                    <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => handleAcceptCargo(item)}
                    >
                        <Text style={styles.buttonText}>Aceitar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={() => handleRejectCargo(item.id)}
                    >
                        <Text style={styles.buttonText}>Recusar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Image source={require('./logo1.png')} style={styles.logo} />
                <TouchableOpacity
                    style={styles.searchContainer}
                    onPress={() => navigation.navigate('SearchScreen')}
                >
                    <FontAwesome5 name="search" size={16} color="#A9A9A9" style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Pesquisar...</Text>
                </TouchableOpacity>
                <Appbar.Action icon="bell" onPress={() => navigation.navigate('Notificacao')} color="#01B70D" />
            </Appbar.Header>

            <ScrollView>
                <FlatList
                    data={currentOrders}
                    renderItem={renderCargoCard}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>

            <FAB style={styles.fab} icon="map-marker" color="white" onPress={() => navigation.navigate('mapa')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    appbar: {
        backgroundColor: 'white',
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 60,
    },
    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 35,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchPlaceholder: {
        fontSize: 14,
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#01B70D',
    },
    card: {
        backgroundColor: '#FFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
    },
    cardImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    cardDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    cardDescription: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333333',
    },
    cardLocation: {
        fontSize: 14,
        color: '#666666',
        marginTop: 5,
    },
    cardWeight: {
        fontSize: 14,
        color: '#666666',
        marginTop: 5,
    },
    cargoActions: {
        flexDirection: 'row',
        marginTop: 10,
    },
    acceptButton: {
        backgroundColor: '#01B70D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    rejectButton: {
        backgroundColor: '#B0B0B0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    cardLink: {
        marginTop: 10,
        paddingVertical: 5,
    },
    linkText: {
        color: '#01B70D',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default HomeScreen;
