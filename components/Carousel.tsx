import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';

const Carousel = ({ images, onImagePress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleImagePress = (index) => {
    onImagePress(index);
    setActiveIndex(index);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        style={styles.carousel}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(index)}
            style={[
              styles.imageContainer,
              {
                backgroundColor: activeIndex === index ? '#E0F7FA' : '#FFF', // Cor de fundo do item ativo
              }
            ]}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => {
          const dotOpacity = scrollX.interpolate({
            inputRange: [(index - 1) * 120, index * 120, (index + 1) * 120],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[styles.dot, { opacity: dotOpacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
  },
  carousel: {
    height: 110, // Ajuste a altura conforme necessário
  },
  imageContainer: {
    width: 110, // Ajuste a largura conforme necessário
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Espaço entre as imagens
     overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50', 
    marginHorizontal: 3,
  },
});

export default Carousel;
