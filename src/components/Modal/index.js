import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Clipboard from 'expo-clipboard'
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"
import useStorage from "../../hooks/useStorage";

export function ModalPassword({ password, handleClose }) {
    const [notifySaveVisible, setNotifySaveVisible] = useState(false)

    const { saveItem } = useStorage()

    async function handleCopyPassword() {

        await Clipboard.setStringAsync(password)
        setNotifySaveVisible(true)
        await saveItem('@pass', password)

        setTimeout(() => {
            handleClose()
        }, 1300);
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha gerada</Text>
                <View style={styles.innerPassword}>
                    <Text style={styles.text}>{password}</Text>
                    <TouchableOpacity onPress={handleCopyPassword}>
                        <Ionicons size={18} color="#fff" name="copy-outline" style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonArea} >
                    <TouchableOpacity style={styles.button} onPress={handleClose} >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword} >
                        <Text style={styles.buttonSaveText}>Salvar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {notifySaveVisible && (
                <View style={styles.notifyArea}>
                    <Text style={styles.notifyAreaText}>Senha salva com sucesso!</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(24, 24, 24, 0.6)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: "#fff",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#5e9104",
        marginBottom: 24,
    },
    innerPassword: {
        backgroundColor: "#5e9104",
        width: '90%',
        padding: 14,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
    buttonArea: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        padding: 8,

    },
    buttonSave: {
        backgroundColor: "#68bd28",
        borderRadius: 8,

    },
    buttonSaveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    notifyArea: {
        width: '60%',
        backgroundColor: '#68bd28',
        marginTop: 16,
        borderRadius: 8,

    },
    notifyAreaText: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'center'
    },
    icon: {
        marginLeft: 16,
    }
})