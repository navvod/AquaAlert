import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');
const GLASS_WIDTH = width * 0.4;
const GLASS_HEIGHT = GLASS_WIDTH * 1.5;

const ImprovedWaterGlass = ({ progress }) => {
  const [isFullAnimationPlaying, setIsFullAnimationPlaying] = useState(false);
  const waterHeight = useRef(new Animated.Value(0)).current;
  const celebrationAnimation = useRef(null);

  useEffect(() => {
    Animated.timing(waterHeight, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      if (progress >= 100 && !isFullAnimationPlaying) {
        setIsFullAnimationPlaying(true);
        celebrationAnimation.current?.play();
      }
    });
  }, [progress]);

  const waterStyle = {
    height: waterHeight.interpolate({
      inputRange: [0, 100],
      outputRange: [0, GLASS_HEIGHT - 50], // Updated to use the height of the glass
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.glassContainer}>
        <Image
          source={require('../../assets/glass.png')}
          style={styles.glassImage}
          resizeMode="contain"
        />
        <Animated.View style={[styles.waterContainer, waterStyle]}>
          <LinearGradient
            colors={['rgba(0, 191, 255, 0.7)', 'rgba(0, 191, 255, 0.9)']}
            style={styles.water}
          />
        </Animated.View>
        {isFullAnimationPlaying && (
          <LottieView
            ref={celebrationAnimation}
            source={require('../../assets/celebration/celebration-animation2.json')}
            style={styles.celebrationAnimation}
            autoPlay
            loop={false}
            onAnimationFinish={() => setIsFullAnimationPlaying(false)}
          />
        )}
      </View>
      <Text style={styles.percentageText}>{`${Math.round(progress)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: GLASS_WIDTH,
    height: GLASS_HEIGHT + 30, // Increased height to accommodate percentage text
    alignItems: 'center',
  },
  glassContainer: {
    width: GLASS_WIDTH,
    height: GLASS_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  glassImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  waterContainer: {
    width: '90%',
    position: 'absolute',
    bottom: '5%',
    borderBottomLeftRadius: GLASS_WIDTH / 4,
    borderBottomRightRadius: GLASS_WIDTH / 4,
    overflow: 'hidden',
  },
  water: {
    flex: 1,
  },
  celebrationAnimation: {
    position: 'absolute',
    width: GLASS_WIDTH * 2,
    height: GLASS_WIDTH * 2,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 5,
  },
});

export default ImprovedWaterGlass;