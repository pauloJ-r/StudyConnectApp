import { Post, PostTag } from "@/types/post";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostUserCard from "./PostUserCard";
import BadgeItem from "./BadgeItem";
import PostLikeIcon from '@/assets/icons/post-like-icon.svg';
import PostCommentIcon from '@/assets/icons/post-comment-icon.svg';
import AnswerPostButton from "./AnswerPostButton";
import { useContext, useState } from "react";
import { togglePostLike } from "@/services/postService";
import { AuthContext } from "@/context/authContext";
import { Colors } from "@/constants/Colors";

// A prop continua a mesma: esperamos o objeto de post completo
type PostProps = {
    postData: Post;
};

export default function PostItem({ postData }: PostProps) {

    const { user, token } = useContext(AuthContext);
    // --- Extração Segura de Dados ---
    // Aqui, pegamos os dados do 'postData' e preparamos para usar na renderização,
    // fornecendo valores padrão para evitar erros.
    const [liked, setLiked] = useState<boolean>(postData.likes?.includes(user?.id)); // Verifica se o usuário já curtiu o post
    const [likesCount, setLikesCount] = useState<number>(postData.likes?.length || 0); // Conta os likes de forma segura

    const author = postData.userId; // O autor pode ser nulo
    const title = postData.titulo || 'Post sem título'; // Valor padrão para o título
    const content = postData.texto || ''; // Valor padrão para o conteúdo
    const tags = postData.tags || []; // Garante que 'tags' seja sempre um array
    const commentsCount = postData.comments?.length || 0; // Conta os comentários de forma segura

    async function handleLikeToggle(postId: string) {
        try {
            const data = await togglePostLike(postId, token);
            setLiked(data.liked);
            setLikesCount(data.likes.length);
        } catch (error) {
            console.error("Erro ao alternar like do post:", error);
        }
    }

    return (
        <View style={styles.container}>

            {/* Renderiza o card do autor APENAS SE o autor existir */}
            {author && <PostUserCard userData={author} />}

            <View style={styles.postContentContainer}>
                <Text style={styles.postContentText}>
                    {title}
                </Text>
            </View>

            {/* Renderiza o container de conteúdo APENAS SE houver conteúdo */}
            {content && (
                <View style={styles.postContentContextContainer}>
                    <Text style={styles.postContentContextText}>
                        {content}
                    </Text>
                </View>
            )}

            <View style={styles.postBadgesContainer}>
                {tags.map((tag: any, index: number) => (
                    // Supondo que 'BadgeItem' espere um objeto com 'name'
                    <BadgeItem badgeData={tag.name || tag} key={index} />
                ))}
            </View>

            <View style={styles.postFooterContainer}>
                <View style={styles.postFooterActionsContainer}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <PostCommentIcon width={25} height={25} />
                        </TouchableOpacity>
                        <Text style={{ marginStart: 5, ...styles.postFooterActionsText }}>
                            {commentsCount}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handleLikeToggle(postData._id)}>
                            <PostLikeIcon width={25} height={25} fill={liked ? Colors.primary_1 : 'none'} />
                        </TouchableOpacity>
                        <Text style={{ marginStart: 5, ...styles.postFooterActionsText }}>
                            {likesCount}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <AnswerPostButton post={postData} />
                </View>
            </View>
        </View>
    );
}

// Seus estilos foram mantidos exatamente como o original
const styles = StyleSheet.create({
    container: {
        padding: 18,
        marginVertical: 16,
        backgroundColor: '#FFF',
        borderRadius: 16,
        flexDirection: 'column',
    },
    postContentContainer: {
        marginTop: 10,
        paddingHorizontal: 8,
    },
    postContentText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
    postContentContextContainer: {
        marginTop: 10,
        padding: 16,
        backgroundColor: '#E7E7E7',
        borderRadius: 11,
    },
    postContentContextText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    postBadgesContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        gap: 8,
        marginTop: 10, // Adicionado um espaçamento para ficar melhor
    },
    postFooterContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    postFooterActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    postFooterActionsText: {
        fontSize: 16,
        fontWeight: '300',
        fontFamily: 'Poppins-Regular',
    }
});