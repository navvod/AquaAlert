import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

import Home from "../screens/Home/Home";
import { GlobalStyles } from "../constants/styles";
import AddBeverageScreen from '../screens/Beverage/AddBeverageScreen';
import Intro from '../screens/Intro/Intro';
import Registration from '../screens/Intro/Register/Register';
import Login from '../screens/Intro/Login/login';
import Age from '../screens/Intro/Age/age'
import ActivityLevelScreen from "../screens/Intro/ActivityLevel/ActivityLevelScreen";
import WaterConsumptionScreen from "../screens/Intro/WaterConsumptionScreen/WaterConsumptionScreen"
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfile from "../screens/Profile/EditProfileScreen";
import TimeSelection from "../screens/Intro/Time/TimeSelection";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen"
import LocationMapScreen from "../screens/Location/LocationMapScreen";
import ShopDetails from "../screens/Location/ShopDetailsScreen";
import WeeklyProgress from "../screens/WeeklyProgress/WeeklyProgress";
import SplashScreen from "../screens/Intro/SplashScreen/SplashScreen";
import WelcomeScreen from "../screens/Intro/SplashScreen/WelcomeScreen";
import OnboardingScreen1 from "../screens/Intro/SplashScreen/OnboardingScreen1";
import OnboardingScreen2 from "../screens/Intro/SplashScreen/OnboardingScreen2";
import OnboardingScreen3 from "../screens/Intro/SplashScreen/OnboardingScreen3";
import ShopRegistrationScreen1 from "../screens/Profile/ShopRegistration/ShopRegistrationScreen1";
import ShopRegistrationScreen2 from "../screens/Profile/ShopRegistration/ShopRegistrationScreen2";
import DailyTips from '../screens/Profile/Tips/DailyTips';
import ForActionDays from '../screens/Profile/Tips/ForActionDays';
import HotWeatherTips from '../screens/Profile/Tips/HotWeatherTips';
import HealthWellness from '../screens/Profile/Tips/HealthWellness';
import GenderScreen from '../screens/Intro/Gender/Gender'
import Weight from '../screens/Intro/Weight/Weight';
import ContactUsScreen from "../screens/Profile/contactus/ContactUsScreen";




const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function HomeOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 70,
          backgroundColor: "white",
          borderTopColor: "transparent",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 20,
          elevation: 20,
        },
        tabBarShowLabel: false, // Remove labels under icons
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            color = focused ? "#00aaff" : "#8e8e93";
          } else if (route.name === "Location") {
            iconName = focused ? "location" : "location-outline";
            color = focused ? "#00aaff" : "#8e8e93";
          } else if (route.name === "Alarm") {
            iconName = focused ? "alarm" : "alarm-outline";
            color = focused ? "#00aaff" : "#8e8e93";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            color = focused ? "#00aaff" : "#8e8e93";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            color = focused ? "#00aaff" : "#8e8e93";
          }

          return (
            <View style={focused ? styles.focusedTab : null}>
              <Ionicons name={iconName} size={focused ? 30 : 24} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: GlobalStyles.colors.primary500,
        tabBarInactiveTintColor: "#8e8e93",
      })}
    >
      <BottomTab.Screen 
            name="Home" 
            component={Home}
            options={{
              title: 'Daily Water Consumption', // This changes the header title
              headerTitleAlign: 'center', // Aligns the header title in the center
              headerTitleStyle: {
                fontSize: 20, // Customize the font size
                fontWeight: 'bold', // Make the title bold
                color: '#00aaff', // Customize the color
              },
            }}
          />
           <BottomTab.Screen 
            name="Location" 
            component={LocationMapScreen}
            options={{
              title: 'Find Pure Water', // This changes the header title
              headerTitleAlign: 'center', // Aligns the header title in the center
              headerTitleStyle: {
                fontSize: 20, // Customize the font size
                fontWeight: 'bold', // Make the title bold
                color: '#00aaff', // Customize the color
              },
            }}
          />
     <BottomTab.Screen
          name="Alarm"
          component={NotificationScreen}
          options={{
            title: 'Reminder', // Add this line to set the title
            headerTitleAlign: 'center', // Align the title in the center
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#00aaff',
            },
            tabBarIcon: ({ focused, color, size }) => (
              <View style={styles.floatingIcon}>
                <Ionicons name="alarm" size={30} color={focused ? "#ffffff" : "#8e8e93"} />
              </View>
            ),
          }}
        />

        <BottomTab.Screen
          name="Settings"
          component={WeeklyProgress}
          options={{
            title: 'Weekly Progress', // This changes the header title
            headerTitleAlign: 'center', // Aligns the header title in the center
            headerTitleStyle: {
              fontSize: 20, // Customize the font size
              fontWeight: 'bold', // Make the title bold
              color: '#00aaff', // Customize the color
            },
            tabBarIcon: ({ focused, size }) => (
              <View style={focused ? styles.focusedTab : null}>
                <Ionicons
                  name={focused ? "analytics" : "analytics-outline"} // Change to progress icon
                  size={focused ? 30 : 24}
                  color={focused ? "#00aaff" : "#8e8e93"} // Set color based on focus
                />
              </View>
            ),
          }}
        />
          <BottomTab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              title: 'Profile', // This changes the header title
              headerTitleAlign: 'center', // Aligns the header title in the center
              headerTitleStyle: {
                fontSize: 20, // Customize the font size
                fontWeight: 'bold', // Make the title bold
                color: '#00aaff', // Customize the color
              },
            }}
          />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedTab: {
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    padding: 10,
    elevation: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aaff',
    marginLeft: 10,
  },
  floatingIcon: {
    position: "absolute",
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#00aaff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 20,
  },
});

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Age" component={Age} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="ActivityLevelScreen" component={ActivityLevelScreen} />
      <Stack.Screen name="WaterConsumptionScreen" component={WaterConsumptionScreen} />
        <Stack.Screen name="HomeOverview" component={HomeOverview} />
        <Stack.Screen name="AddBeverageScreen" component={AddBeverageScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="TimeSelection" component={TimeSelection} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="LocationMapScreen" component={LocationMapScreen} />
        <Stack.Screen name="ShopDetails" component={ShopDetails} />
        <Stack.Screen name="WeeklyProgress" component={WeeklyProgress} />
        <Stack.Screen name="ShopRegistrationScreen1" component={ShopRegistrationScreen1} options={{ headerShown: false }}/>
        <Stack.Screen name="ShopRegistrationScreen2" component={ShopRegistrationScreen2} options={{ headerShown: false }}/>
        <Stack.Screen name="DailyTips" component={DailyTips} />
      <Stack.Screen name="ForActionDays" component={ForActionDays} />
      <Stack.Screen name="HotWeatherTips" component={HotWeatherTips} />
      <Stack.Screen name="HealthWellness" component={HealthWellness} />
      <Stack.Screen name="Weight" component={Weight} />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
