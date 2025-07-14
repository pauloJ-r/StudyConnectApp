import { Post, PostTag } from "@/types/post";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PostUserCard from "./PostUserCard";
import BadgeItem from "./BadgeItem";
import PostLikeIcon from '@/assets/icons/post-like-icon.svg';
import PostCommentIcon from '@/assets/icons/post-comment-icon.svg';
import AnswerPostButton from "./AnswerPostButton";

type PostProps = {
    postData: Post;
};

export default function PostItem({ postData }: PostProps) {
    return (
        <View style={styles.container}>

            <PostUserCard userData={postData.owner} />

            <View style={styles.postContentContainer}>
                <Text style={styles.postContentText}>
                    {postData.text}
                </Text>
            </View>

            <View style={styles.postContentContextContainer}>
                <Text style={styles.postContentContextText}>
                    {postData.contextText}
                </Text>
            </View>

            {/* TODO: Remover componente temporário */}
            <View style={styles.postBadgesContainer}>
                {postData.tags.map((tag: PostTag, index: number) => (
                    <BadgeItem badgeData={tag} key={index} />
                ))}
            </View>

            <View style={styles.postFooterContainer}>
                <View style={styles.postFooterActionsContainer}>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <PostCommentIcon width={25} height={25} />
                        </TouchableOpacity>

                        <Text style={{ marginStart: 5, ...styles.postFooterActionsText }}>
                            {postData.comments?.length}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <PostLikeIcon width={25} height={25} />
                        </TouchableOpacity>

                        <Text style={{ marginStart: 5, ...styles.postFooterActionsText }}>
                            {postData.likes}
                        </Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <AnswerPostButton post={postData}/>
                </View>

            </View>

        </View>
    );
}

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
        fontWeight: '500',
    },
    postContentContextContainer: {
        marginTop: 10,
        padding: 16,
        backgroundColor: '#E7E7E7',
        borderRadius: 11,
    },
    postContentContextText: {
        fontSize: 16,
        fontWeight: '600',
    },
    postBadgesContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
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
    }
});