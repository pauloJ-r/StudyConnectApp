import { FlatList, StyleSheet, Text, View } from 'react-native';
import PostItem from "./PostItem";
import { Post } from '@/types/post';

type PostListProps = {
    posts?: Post[];
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

export default function PostList({posts}: PostListProps) {    
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyPostMessage/>}
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <PostItem postData={item}/>
            )}
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
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    }
});