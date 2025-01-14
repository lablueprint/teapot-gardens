import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from  'react-native';
import Collapsible from 'react-native-collapsible';
import styles from './collapsible';


export default function CollapsibleComp ( { data }) {
    const toggleCollapsed = () => {
        setIsCollapsed((prevState) => !prevState);
    }
    
    const [isCollapsed, setIsCollapsed] = useState(true);
    
    const handleFollow = () => {
        //handlefollow add console log
        console.log("Patricks: @gucci.poochy")
    }
    <View style={ styles.container }>
        <Pressable onPress={ toggleCollapsed }>
            <Text style={ styles.title }>
                { data.title }
            </Text>
        </Pressable>
        <Collapsible collapsed= { isCollapsed }>
            <Text style= { styles.subTitle }>
                { data.title}
            </Text>
            <Text style= { styles.body }>
                { data.body}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleFollow}>
                <Text>Follow</Text>
            </TouchableOpacity>
        </Collapsible>
    </View>
}



