import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export function PasswordItem({ data, removePassword }) {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={[styles.textVisible, !passwordVisible && styles.text]}>{data}</Text>
            <View style={styles.iconArea}>
                <TouchableOpacity onPress={removePassword}>
                    <Ionicons size={18} color="#fff" name="trash-outline" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Ionicons size={18} color="#fff" name={!passwordVisible ? "eye-outline" : 'eye-off-outline'} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2a591d',
        padding: 14,
        width: '100%',
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textVisible: {
        color: '#fff',
    },
    text: {
        backgroundColor:'#949c92',
        color: 'transparent',
        borderRadius: 8,
        minWidth: '50%',
    },
    iconArea: {
        gap: 16,
        flexDirection: 'row'
    }
})