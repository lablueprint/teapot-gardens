import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Homepage from "@screens/homepage/homepage";
import DiscoverPage from "@screens/discover/discover";
import Profile from "@screens/profile/profile_page";
import EditProfile from "@screens/profile/edit_profile";
import ProfileQR from "@screens/profile/profile_qr";
import Login from "@screens/login/login";

import Plant from "@screens/plant/plant";
import Index from "@app/index";

import EventPage from "@screens/event/event_page";
import ProgramPage from "@screens/program_page/program_page";
import CreateEvent from "@screens/program_page/create_event";
import CreateProgram from "@screens/discover/create_program";
import SignIn from "@screens/login/signin";

import NotificationPage from "@screens/notification/notification_page";
import AdminDashboard from "@screens/admin_dashboard/admin_dashboard"
import RegistrationPage from "@screens/event/registration_page";
import CommunityPhotos from "@screens/event/community_photos"

import Garden from "@screens/garden/garden"
import Nursery from "@screens/garden/nursery"

import notificationIcon from "@assets/notifications.png";
import menuIcon from "@assets/menu.png";
import tempIcon from "@assets/tempicon.png";
import closeIcon from "@assets/close.png";

import IntroSlides from "@screens/login/introSlides";
import AdminScanner from "@screens/event/admin_scanner";
import { Draw } from "@mui/icons-material";

const Drawer = createDrawerNavigator();

// AsyncStorage key constant
const ONBOARDING_KEY = 'hasSeenOnboardingV2';

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>Menu</Text>
                <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeButton}>
                    <Image source={closeIcon} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.drawerItemsContainer}>
                {["Home", "View Plant", "My Events", "Discover", "Garden", "Nursery"].map((screen, index) => {
                    const routeName = (screen === "My Events") ? "Temp" : screen;
                    const isActive = props.state.routes[props.state.index].name === routeName;

                    return (
                        <DrawerItem
                            key={index}
                            label={screen}
                            onPress={() => props.navigation.navigate(routeName)}
                            icon={() => <Image source={tempIcon} style={styles.drawerIcon} />}
                            labelStyle={styles.drawerLabel}
                            style={isActive ? styles.activeDrawerItem : styles.inactiveDrawerItem}
                        />
                    );
                })}
            </View>

            <View style={styles.profileContainer}>
                <DrawerItem
                    label="Profile"
                    onPress={() => props.navigation.navigate("Profile")}
                    icon={() => <Image source={tempIcon} style={styles.drawerIcon} />}
                    labelStyle={styles.drawerLabel}
                    style={props.state.routes[props.state.index].name === "Profile" ? styles.activeDrawerItem : styles.inactiveDrawerItem}
                />
            </View>
        </DrawerContentScrollView>
    );
};

//  two separate navigators :-) one for onboarding and one for main app
const createOnboardingNavigator = () => (
    <Drawer.Navigator
        screenOptions={{
            headerShown: false,
            drawerStyle: { width: 0 } 
        }}
        drawerContent={() => null}
    >
        <Drawer.Screen name="IntroSlides" component={IntroSlides} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Home" component={Homepage} />
    </Drawer.Navigator>
);

const createMainNavigator = () => {
    const noHeaderScreens = ["IntroSlides", "Login", "SignIn"];
    
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="Login"
            screenOptions={({ route, navigation }) => ({
                headerShown: !noHeaderScreens.includes(route.name),
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.iconButton}>
                        <Image source={menuIcon} style={styles.icon} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("NotificationPage")} style={styles.iconButton}>
                        <Image source={notificationIcon} style={styles.icon} />
                    </TouchableOpacity>
                ),
                headerTitle: "",
                headerStyle: {
                    backgroundColor: "#ffffff",
                    shadowOpacity: 0, 
                },
                drawerStyle: {
                    backgroundColor: "#f5f5f5",
                    width: '75%',
                },
                drawerContentStyle: {
                    backgroundColor: "transparent",
                },
                overlayColor: "transparent",
            })}
        >
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Home" component={Homepage} />
            <Drawer.Screen name="Discover" component={DiscoverPage} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="EditProfile" component={EditProfile} />
            <Drawer.Screen name="ProfileQR" component={ProfileQR} />
            <Drawer.Screen name="View Plant" component={Plant} />
            <Drawer.Screen name="Temp" component={Index} />
            <Drawer.Screen name="EventPage" component={EventPage} />
            <Drawer.Screen name="ProgramPage" component={ProgramPage} />
            <Drawer.Screen name="CreateEvent" component={CreateEvent} />
            <Drawer.Screen name="CreateProgram" component={CreateProgram} />
            <Drawer.Screen name="SignIn" component={SignIn} />
            <Drawer.Screen name="NotificationPage" component={NotificationPage} />
            <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
            <Drawer.Screen name="AdminScanner" component={AdminScanner} />
            <Drawer.Screen name="RegistrationPage" component={RegistrationPage} />
            <Drawer.Screen name="CommunityPhotos" component={CommunityPhotos} />
            <Drawer.Screen name="Garden" component={Garden} />
            <Drawer.Screen name="Nursery" component={Nursery} />
        </Drawer.Navigator>
    );
};

const HamburgerMenu = () => {
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                console.log("Checking AsyncStorage for onboarding status...");
                const hasSeenOnboarding = await AsyncStorage.getItem(ONBOARDING_KEY);
                console.log("AsyncStorage status:", hasSeenOnboarding);
                
                if (hasSeenOnboarding === 'true') {
                    console.log("User has completed onboarding, showing main app");
                    setHasCompletedOnboarding(true);
                } else {
                    console.log("User has not completed onboarding, showing intro");
                    setHasCompletedOnboarding(false);
                }
            } catch (error) {
                console.log('Error checking onboarding status:', error);
                setHasCompletedOnboarding(false);
            } finally {
                setIsLoading(false);
            }
        };
        
        checkOnboardingStatus();
    }, []);
    
    // Show loading indicator while checking AsyncStorage
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }
    
    // Render the appropriate navigator based on onboarding status
    return hasCompletedOnboarding ? createMainNavigator() : createOnboardingNavigator();
};

export default HamburgerMenu;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    iconButton: {
        marginHorizontal: 15,
        padding: 5,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
    drawerContainer: {
        flex: 1,
        backgroundColor: "#A8A8A8",
    },
    drawerHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        marginBottom: 20,
        marginTop: -30,
    },
    drawerTitle: {
        fontSize: 28,
        fontWeight: 500,
        color: "#333",
    },
    closeButton: {
        padding: 5,
    },
    closeIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    drawerItemsContainer: {
        flex: 1,
    },
    drawerIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        resizeMode: "contain",
    },
    drawerLabel: {
        fontSize: 24,
        fontWeight: "500",
        color: "#333",
    },
    profileContainer: {
        paddingTop: 10
    },
    activeDrawerItem: {
        backgroundColor: "#f5f5f5",
    },
    inactiveDrawerItem: {
        backgroundColor: "transparent",
    },
});
