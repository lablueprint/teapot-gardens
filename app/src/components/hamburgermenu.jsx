import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Homepage from "@screens/homepage/homepage";
import DiscoverPage from "@screens/discover/discover";
import Profile from "@screens/profile/profile_page";
import Plant from "@screens/plant/plant";
import Index from "@app/index";

import EventPage from "@screens/event/event_page";
import ProgramPage from "@screens/program_page/program_page";
import CreateProgram from "@screens/discover/create_program"

import notificationIcon from "@assets/notifications.png";
import menuIcon from "@assets/menu.png";
import tempIcon from "@assets/tempicon.png";
import closeIcon from "@assets/close.png";

const Drawer = createDrawerNavigator();

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
                {["Home", "View Plant", "My Events", "Discover"].map((screen, index) => {
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

const HamburgerMenu = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="Home"
            screenOptions={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.iconButton}>
                        <Image source={menuIcon} style={styles.icon} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => alert("notifications!")} style={styles.iconButton}>
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
            <Drawer.Screen name="Home" component={Homepage} />
            <Drawer.Screen name="Discover" component={DiscoverPage} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="View Plant" component={Plant} />
            <Drawer.Screen name="Temp" component={Index} />
            <Drawer.Screen name="EventPage" component={EventPage} />
            <Drawer.Screen name="ProgramPage" component={ProgramPage} />
            <Drawer.Screen name="CreateProgram" component={CreateProgram} />
        </Drawer.Navigator>
    );
};

export default HamburgerMenu;


const styles = StyleSheet.create({
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

