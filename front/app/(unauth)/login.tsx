import React, { useContext, useState, useEffect } from "react";
import { Alert, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from 'expo-local-authentication'; // -> NOVO
import * as SecureStore from 'expo-secure-store'; // -> NOVO

import BaseTabSwitcher from "@/components/BaseTabSwitcher";
import { AppButton } from "@/components/Button";
import TabSwitcherSelector from "@/components/TabSwitcherSelector";
import SignupForm from "./signup";
import { Colors } from "@/constants/Colors";
import Input from "@/components/Input";
import { AuthContext } from "@/context/authContext";
import { FontAwesome5 } from '@expo/vector-icons'; // -> NOVO: Para o ícone de digital

export default function LoginScreen() {
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // -> NOVO: Estados para controlar a disponibilidade da biometria
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    // -> NOVO: useEffect para checar a compatibilidade do dispositivo na inicialização
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            if (compatible) {
                const enrolled = await LocalAuthentication.isEnrolledAsync();
                if (enrolled) {
                    setIsBiometricSupported(true);
                }
            }
        })();
    }, []);


    const handleLogin = async (loginEmail?: string, loginPassword?: string) => {
        const finalEmail = loginEmail || email;
        const finalPassword = loginPassword || password;

        if (!finalEmail || !finalPassword) {
            Alert.alert("Erro", "Por favor, preencha o email e a senha.");
            return;
        }

        try {
            await login({ email: finalEmail, password: finalPassword });
            
            // -> NOVO: Salva as credenciais após o login bem-sucedido
            await SecureStore.setItemAsync('user_email', finalEmail);
            await SecureStore.setItemAsync('user_password', finalPassword);
            
            Alert.alert("Sucesso", "Login realizado com sucesso!");
            router.replace("/(tabs)");
        } catch (error: any) {
            Alert.alert("Erro", error.message || "Erro ao fazer login.");
        }
    };

    // -> NOVO: Função para lidar com o toque no botão de biometria
    const handleBiometricLogin = async () => {
        const authResult = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Faça login com sua digital',
            fallbackLabel: 'Use sua senha',
        });

        if (authResult.success) {
            // Se a digital for válida, pega as credenciais salvas
            const savedEmail = await SecureStore.getItemAsync('user_email');
            const savedPassword = await SecureStore.getItemAsync('user_password');

            if (savedEmail && savedPassword) {
                // Efetua o login com as credenciais salvas
                handleLogin(savedEmail, savedPassword);
            } else {
                Alert.alert("Erro", "Nenhuma credencial salva. Faça login com email e senha primeiro.");
            }
        } else {
            Alert.alert("Falha", "A autenticação biométrica falhou ou foi cancelada.");
        }
    };

    return (
        <View style={styles.wrapper}>
            <Image
                source={require("../../assets/images/logo-complete.png")}
                style={styles.logo}
            />

            <BaseTabSwitcher>
                <TabSwitcherSelector
                    text="Entrar"
                    isActive={activeTab === "login"}
                    onTabPress={() => setActiveTab("login")}
                />
                <TabSwitcherSelector
                    text="Criar Conta"
                    isActive={activeTab === "signup"}
                    onTabPress={() => setActiveTab("signup")}
                />
            </BaseTabSwitcher>
            
            {activeTab === "login" ? (
                <View style={styles.form}>
                    <Text style={styles.title}>Bem-vindo de volta!</Text>
                    <Text style={styles.subtitle}>Entre para continuar seus estudos</Text>

                    <Input
                        placeholder="Email"
                        iconName="envelope"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Senha"
                        iconName="key"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* -> NOVO: Container para os botões */}
                    <View style={styles.buttonContainer}>
                        <AppButton
                            style={styles.loginButton}
                            label="Entrar"
                            onPress={() => handleLogin()}
                        />
                        {/* Renderiza o botão de digital apenas se for compatível */}
                        {isBiometricSupported && (
                            <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricLogin}>
                                <FontAwesome5 name="fingerprint" size={24} color={Colors.primary_1} />
                            </TouchableOpacity>
                        )}
                    </View>

                </View>
            ) : (
                <SignupForm />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.light.background,
    },
    logo: {
        width: 180,
        height: 60,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 50,
    },
    form: {
        marginTop: 24,
        paddingHorizontal: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 4,
        color: "#4A3DB7",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#444",
        textAlign: "center",
        marginBottom: 24,
    },
    // -> NOVO: Estilos para o container de botões
    buttonContainer: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    loginButton: {
        flex: 1, // Faz o botão de login ocupar o espaço restante
    },
    biometricButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.primary_1,
        borderRadius: 8,
    },
});
// testando