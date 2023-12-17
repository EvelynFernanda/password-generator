import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from "react";
import useStorage from "../../hooks/useStorage";
import { PasswordItem } from "../../components/PasswordItem";

export function Passwords() {
    const [listPasswords, setListPasswords] = useState([])
    const focused = useIsFocused()

    const { getItem, removeItem } = useStorage()

    async function loadPasswords() {
        const passwords = await getItem('@pass')
        setListPasswords(passwords)
    }

    async function handleRemovePassword (item){
        const passwords = await removeItem('@pass', item)
        setListPasswords(passwords)
    }

    useEffect(() => {
        loadPasswords()
    }, [focused])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ddeddd' }}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas senhas</Text>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={listPasswords}
                    style={{ flex: 1, paddingTop: 14 }}
                    keyExtractor={(item) => String(item)}
                    renderItem={({ item }) => <PasswordItem data={item} removePassword={() => handleRemovePassword(item)} />}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1f8c01',
        paddingBottom: 14,
        paddingTop: 58,
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'

    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
    }
})