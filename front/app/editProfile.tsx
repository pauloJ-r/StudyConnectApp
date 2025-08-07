import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator,
    Platform // -> NOVO: Para checar o sistema operacional
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // -> NOVO: Importando o Image Picker

// -> NOVO: Importe suas funções de serviço da API
// Assumimos que você tem uma função separada para upload de imagem
import { getUserProfile, updateUserProfile } from '@/services/profileService';

// Interface para os dados do perfil
interface ProfileData {
    name: string;
    course: string;
    bio: string;
    linkedin: string;
    github: string;
    picturePath: string;
}

// Componente reutilizável para os campos de input (sem alterações)
type EditableInputProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
};

const EditableInput: React.FC<EditableInputProps> = ({ label, value, onChangeText, placeholder }) => {
    return (
        <View style={styles.inputSection}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                />
                <TouchableOpacity>
                    <Feather name="edit-2" size={20} color="#555" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default function EditProfileScreen() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    // -> NOVO: Estado para armazenar a nova imagem selecionada
    const [newImage, setNewImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const userId = "68811f436c92232ca34eecb4";
                const data = await getUserProfile(userId);
                setProfile(data);
            } catch (error) {
                console.error("Erro ao buscar perfil:", error);
                Alert.alert("Erro", "Não foi possível carregar as informações do perfil.");
            } finally {
                setIsLoading(false);
            }
        };

        loadProfileData();
    }, []);

    const handleInputChange = (field: keyof ProfileData, value: string) => {
        if (profile) {
            setProfile(prevState => ({ ...prevState!, [field]: value }));
        }
    };
    
    // -> MODIFICADO: Função para escolher a imagem
    const handlePickImage = () => {
        Alert.alert(
            "Alterar Foto do Perfil",
            "Escolha uma opção",
            [
                { text: "Tirar Foto...", onPress: () => pickImage('camera') },
                { text: "Escolher da Galeria...", onPress: () => pickImage('gallery') },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    // -> NOVO: Função auxiliar que lida com a lógica da câmera e galeria
    const pickImage = async (source: 'camera' | 'gallery') => {
        let result;
        
        if (source === 'camera') {
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permissão necessária", "Você precisa permitir o acesso à câmera para tirar uma foto.");
                return;
            }
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });
        } else {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para escolher uma foto.");
                return;
            }
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });
        }

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setNewImage(selectedImage); // Armazena o objeto da imagem para o upload
            if (profile) {
                // Atualiza a imagem de preview na tela
                setProfile(prev => ({ ...prev!, picturePath: selectedImage.uri }));
            }
        }
    };

    // -> MODIFICADO: Função para confirmar e enviar as alterações
// Em EditProfileScreen.tsx

const handleConfirm = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
        const userId = "68811f436c92232ca34eecb4";

        // -> CORREÇÃO PRINCIPAL:
        // Passamos o objeto 'profile' com os textos E o objeto 'newImage' (que pode ser nulo)
        // para a mesma função de serviço. A responsabilidade agora é dela.
        await updateUserProfile(userId, profile, newImage);
        
        Alert.alert("Sucesso", "Informações do perfil atualizadas!");
        router.replace('/(tabs)/profile');
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        Alert.alert("Erro", "Não foi possível salvar as alterações.");
    } finally {
        setIsSaving(false);
    }
};

    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#4F46E5" /></View>;
    }

    if (!profile) {
        return <View style={styles.centered}><Text>Não foi possível carregar o perfil.</Text></View>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <Text style={styles.title}>Editar Informações</Text>
                <View style={styles.profilePictureContainer}>
                    <Image
                        source={{ uri: profile.picturePath || undefined }}
                        style={styles.profilePicture}
                    />
                    <TouchableOpacity style={styles.editPictureButton} onPress={handlePickImage}>
                        <Feather name="edit-2" size={18} color="#333" />
                    </TouchableOpacity>
                </View>

                <EditableInput label="Nome" value={profile.name} onChangeText={(text) => handleInputChange('name', text)} />
                <EditableInput label="Curso" value={profile.course} onChangeText={(text) => handleInputChange('course', text)} />
                <EditableInput label="Descrição" value={profile.bio} onChangeText={(text) => handleInputChange('bio', text)} />
                <EditableInput label="LinkedIn" value={profile.linkedin} onChangeText={(text) => handleInputChange('linkedin', text)} />
                <EditableInput label="GitHub" value={profile.github} onChangeText={(text) => handleInputChange('github', text)} />
            </ScrollView>

            <TouchableOpacity style={[styles.confirmButton, isSaving && styles.buttonDisabled]} onPress={handleConfirm} disabled={isSaving}>
                {isSaving ? <ActivityIndicator size="small" color="#FFF" /> : <Feather name="check" size={30} color="#FFF" />}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// Estilos (sem alterações significativas)
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
    container: { paddingHorizontal: 24, paddingBottom: 100, alignItems: 'center' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginVertical: 24 },
    profilePictureContainer: { position: 'relative', marginBottom: 32 },
    profilePicture: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#FFF', backgroundColor: '#E5E7EB' },
    editPictureButton: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#E5E7EB', borderRadius: 20, padding: 8, borderWidth: 2, borderColor: '#FFF' },
    inputSection: { width: '100%', marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '500', color: '#4B5563', marginBottom: 8 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#E5E7EB' },
    textInput: { flex: 1, fontSize: 16, color: '#1F2937' },
    confirmButton: { position: 'absolute', bottom: 30, right: 24, width: 60, height: 60, borderRadius: 30, backgroundColor: '#4F46E5', justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, },
    buttonDisabled: { backgroundColor: '#A5B4FC' },
});