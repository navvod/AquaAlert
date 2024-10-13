import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { ACTIVITY_KEY, WEIGHT_KEY } from "../../constants/storage";
import { calcDailyGoal } from "../../utils/Drinks";
import UIModal from "../UI/UIModal";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import ImprovedWaterGlass from './ImprovedWaterGlass';
import NotificationScreen from '../../screens/NotificationScreen/NotificationScreen'; 
import WeeklyProgress from '../../screens/WeeklyProgress/WeeklyProgress';

const ManageDrinks = ({ userId }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [drinkProgress, setDrinkProgress] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedBeverage, setSelectedBeverage] = useState('Coffee');
  const [beverageOptions, setBeverageOptions] = useState(['Coffee', 'Yogurt', 'Tea']);
  const [dailyGoal, setDailyGoal] = useState();
  const navigation = useNavigation();

  const quantities = [
    { id: 1, value: 150, text: "150ml" },
    { id: 2, value: 200, text: "200ml" },
    { id: 3, value: 250, text: "250ml" },
    { id: 4, value: 300, text: "300ml" },
    { id: 5, value: 350, text: "350ml" },
    { id: 6, value: 400, text: "400ml" },
  ];

  useEffect(() => {
    const getUserInfo = async () => {
      const weight = await getItem(WEIGHT_KEY);
      const activity = await getItem(ACTIVITY_KEY);
      const calcDailyIntake = calcDailyGoal(weight, activity);
      setDailyGoal(calcDailyIntake);
    };
    getUserInfo();
  }, []);

  const openModalHandler = () => {
    setModalVisible(true);
  };

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  const confirmModalHandler = async (selectedQuantity) => {
    if (selectedQuantity) {
      setModalVisible(false);
      // Calculate the new total progress based on 2000ml
      const newProgress = drinkProgress + (selectedQuantity / 2000) * 100; // Normalize based on the maximum of 2000ml
      const clampedProgress = Math.min(newProgress, 100); // Clamp the value to 100%
      setDrinkProgress(clampedProgress); // Update the drink progress state
    }
  };

  const selectQuantityHandler = (selectedItem) => {
    setSelectedQuantity(selectedItem);
    confirmModalHandler(selectedItem);
  };

  const addBeverageHandler = () => {
    navigation.navigate('AddBeverageScreen', {
      addBeverage: (newBeverage) => {
        setBeverageOptions((prevBeverages) => {
          if (prevBeverages.length >= 3) {
            return [...prevBeverages.slice(1), newBeverage];
          } else {
            return [...prevBeverages, newBeverage];
          }
        });
      }
    });
  };

  const selectBeverageHandler = (beverage) => {
    setSelectedBeverage(beverage);
  };

  const renderQuantityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.quantityButton}
      onPress={() => selectQuantityHandler(item.value)}
    >
      <Text style={styles.quantityButtonText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const resetWaterProgress = () => {
    setDrinkProgress(0); // Reset the drink progress
  };

  return (
    <View style={styles.container}>
      <ImprovedWaterGlass progress={drinkProgress} />
      <Text style={styles.beveragePrompt}>How much water do you want to drink at this time?</Text>
      
      <View style={styles.beverageSelection}>
        {beverageOptions.map((beverage, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.beverageButton}
            onPress={() => selectBeverageHandler(beverage)}
          >
            <View style={[styles.beverageIcon, selectedBeverage === beverage && styles.selectedBeverageIcon]}>
              <Text style={styles.beverageEmoji}>
                {beverage === 'Coffee' ? '☕' : beverage === 'Yogurt' ? '🍶' : beverage === 'Milk' ? '🥛': beverage === 'Tea' ? '🍵':beverage === 'Orange Juice' ? '🍊':beverage === 'Red Wine' ? '🍷': '🥤'}
              </Text>
            </View>
            <Text style={styles.beverageText}>{beverage}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.beverageButton}
          onPress={addBeverageHandler}
        >
          <View style={styles.addBeverageIcon}>
            <Feather name="plus" size={24} color="white" />
          </View>
          <Text style={styles.beverageText}>Add Beverage</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quantityContainer}>
        <FlatList
          data={quantities}
          renderItem={renderQuantityItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetWaterProgress}>
        <Feather name="refresh-cw" size={24} color="white" />
      </TouchableOpacity>

      {/* Pass drinkProgress prop to NotificationScreen */}
      <NotificationScreen drinkProgress={drinkProgress}/> 
      <WeeklyProgress drinkProgress={drinkProgress} userId={userId}/> 

      <UIModal
        isVisible={isModalVisible}
        onSelect={selectQuantityHandler}
        onClose={closeModalHandler}
        onConfirm={confirmModalHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: '#f5f5f5',
    padding:5,
  },
  beveragePrompt: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
  },
  beverageSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  beverageButton: {
    alignItems: "center",
  },
  beverageIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBeverageIcon: {
    backgroundColor: '#2196F3',
  },
  beverageEmoji: {
    fontSize: 24,
  },
  addBeverageIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beverageText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  quantityContainer: {
    marginTop: 20,
    width: '90%',
  },
  quantityButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 25,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  quantityButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resetButton: {
    position: 'absolute',
    top: 20, // Move the button to the top
    right: 20, // Keep it aligned to the right
    backgroundColor: '#2196F3',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManageDrinks;
