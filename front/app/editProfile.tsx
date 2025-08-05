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
    ActivityIndicator // -> NOVO: Para indicar carregamento
} from 'react-native';
import { Feather } from '@expo/vector-icons';
// -> NOVO: Importe suas funções de serviço da API
import { getUserProfile, updateUserProfile } from '@/services/profileService'; 

// -> MODIFICADO: A interface agora pode ter valores nulos inicialmente
// e alinhamos pictureUri para picturePath para consistência com a API
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
    // -> MODIFICADO: Estados de controle e inicialização do perfil como nulo
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Para o carregamento inicial
    const [isSaving, setIsSaving] = useState(false);   // Para o processo de salvamento

    // -> NOVO: useEffect para buscar os dados do perfil quando a tela carrega
    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const userId = "68811f436c92232ca34eecb4"; // Obtenha o ID do usuário logado
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
    }, []); // O array vazio garante que isso rode apenas uma vez

    // Função para atualizar um campo específico no estado
    const handleInputChange = (field: keyof ProfileData, value: string) => {
        if (profile) {
            setProfile(prevState => ({
                ...prevState!,
                [field]: value,
            }));
        }
    };
    
    // Função para simular a seleção de uma nova imagem (sem alterações)
    const handlePickImage = () => { Alert.alert("Editar Foto", "Implemente a lógica de seleção de imagem aqui."); };

    // -> MODIFICADO: Função para confirmar e enviar as alterações para a API
    const handleConfirm = async () => {
        if (!profile) return; // Não faz nada se o perfil não estiver carregado
        const router = useRouter(); // -> NOVO: Inicializa o hook de navegação

        setIsSaving(true);
        try {
            const userId = "68811f436c92232ca34eecb4"; // ID do usuário logado
            await updateUserProfile(userId, profile); // Envia todos os dados do perfil
            Alert.alert("Sucesso", "Informações do perfil atualizadas!");
            // Opcional: navegar de volta para a tela anterior
            router.back(); // -> NOVO: Navega de volta para a tela de perfil
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            Alert.alert("Erro", "Não foi possível salvar as alterações.");
        } finally {
            setIsSaving(false);
        }
    };

    // -> NOVO: Renderiza um indicador de carregamento enquanto busca os dados
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    // -> NOVO: Renderiza uma mensagem de erro ou nada se o perfil não carregar
    if (!profile) {
        return (
            <View style={styles.centered}>
                <Text>Não foi possível carregar o perfil.</Text>
            </View>
        );
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

                {/* Os inputs agora usam os dados do state que vieram da API */}
                <EditableInput label="Nome" value={profile.name} onChangeText={(text) => handleInputChange('name', text)} />
                <EditableInput label="Curso" value={profile.course} onChangeText={(text) => handleInputChange('course', text)} />
                <EditableInput label="Descrição" value={profile.bio} onChangeText={(text) => handleInputChange('bio', text)} />
                <EditableInput label="LinkedIn" value={profile.linkedin} onChangeText={(text) => handleInputChange('linkedin', text)} />
                <EditableInput label="GitHub" value={profile.github} onChangeText={(text) => handleInputChange('github', text)} />
            </ScrollView>

            {/* -> MODIFICADO: O botão agora mostra um estado de carregamento */}
            <TouchableOpacity style={[styles.confirmButton, isSaving && styles.buttonDisabled]} onPress={handleConfirm} disabled={isSaving}>
                {isSaving ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Feather name="check" size={30} color="#FFF" />
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// -> MODIFICADO: Adicionado estilos para 'centered' e 'buttonDisabled'
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