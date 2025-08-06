import { ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import PostItem from "./PostItem";
import { Post } from '@/types/post';

type PostListProps = {
    posts?: Post[];
    onEndReached: (postsLength: number) => Promise<void>;
    isLoading: boolean;
    refreshing: boolean;
    onRefresh: () => Promise<void>;
};

function EmptyPostMessage() {
    return (
        <View style={styles.emptyPostMessageContainer}>
            <Text style={styles.emptyPostMessageText}>
                Ainda não há nenhuma publicação aqui, seja o primeiro a postar!
            </Text>
        </View>
    );
}

export default function PostList({ posts = [], onEndReached, onRefresh, isLoading, refreshing }: PostListProps) {
    return (
        <FlatList
            contentContainerStyle={{ marginBottom: 100 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyPostMessage />}
            data={posts}
            keyExtractor={(item, index) => item?._id ?? index.toString()}
            renderItem={({ item }) => (
                <PostItem postData={item} />
            )}
            onEndReached={() => onEndReached(posts.length)}
            onEndReachedThreshold={0.7}
            ListFooterComponent={isLoading ? <ActivityIndicator style={{ marginBottom: 150 }} /> : <View style={{ marginBottom: 150 }}></View>}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#2196F3']}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    emptyPostMessageContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
    },
    emptyPostMessageText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    }
});