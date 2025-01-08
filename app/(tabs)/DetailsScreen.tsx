import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const { image, description, location, weight } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.details}>Localização: {location}</Text>
            <Text style={styles.details}>Peso: {weight}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    details: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#01B70D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DetailsScreen;
