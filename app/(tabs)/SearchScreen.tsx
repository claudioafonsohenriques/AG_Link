import React from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
    const navigation = useNavigation(); // Hook para acesso à navegação

    const filters = [
        'Luanda', 'Congo', 'Benguela', 'Huambo', 'Uíge',
        'Hortaliças', 'Grãos', 'Frutas'
    ];

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => navigation.navigate('HomeScreen')} />
                <View style={styles.searchContainer}>
                    <FontAwesome5 name="search" size={16} color="#A9A9A9" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Pesquisar..."
                        placeholderTextColor="#A9A9A9"
                        autoFocus
                    />
                </View>
            </Appbar.Header>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterContainer}
            >
                {filters.map((filter, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.filterButton}
                        onPress={() => console.log(`Filtro selecionado: ${filter}`)}
                    >
                        <Text style={styles.filterText}>{filter}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    appbar: {
        backgroundColor: 'white',
        elevation: 4,
        paddingHorizontal: 10,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 35,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchBar: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    filterContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    filterButton: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        height: 35, // Ajuste para garantir a consistência
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginRight: 10,
    },
    filterText: {
        fontSize: 14,
        color: '#333',
    },
});

export default SearchScreen;