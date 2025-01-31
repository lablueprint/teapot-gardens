import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from  'react-native';
import Collapsible from 'react-native-collapsible';
import styles from './collapsible_style';


export default function CollapsibleComp ( { data }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setIsCollapsed((prevState) => !prevState);
    }
    
    
    const handleFollow = () => {
        //handlefollow add console log
        console.log("Patricks: @gucci.poochy")
    }
    return (
    <View style={ styles.container }>
        <Pressable onPress={ toggleCollapsed }>
            <Text style={ styles.title }>
                { data.title }
            </Text>
        </Pressable>
        <Collapsible collapsed= { isCollapsed }>
            <Text style= { styles.body }>
                { data.body}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleFollow}>
                <Text>Follow</Text>
            </TouchableOpacity>
        </Collapsible>
    </View>
    );
}


