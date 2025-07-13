import GroupParticipantsIcon from '@/assets/icons/group-participants-icon.svg';
import { Colors } from '@/constants/Colors';
import { IndexableStudyGroup } from '@/types/group';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

type GroupParticipantThumbnailImageProps = {
    source: string,
};

type SeeMoreGroupDetailsButtonProps = {
    onButtonPress?: () => void;
};

type GroupItemProps = {
    groupData: IndexableStudyGroup;
};

function GroupParticipantThumbnailImage({ source }: GroupParticipantThumbnailImageProps) {
    return (
        <Image
            source={{ uri: source }}
            style={styles.groupInfoGroupParticipantsThumbnailImage}
        />
    );
}

function SeeMoreGroupDetailsButton({ onButtonPress }: SeeMoreGroupDetailsButtonProps) {
    return (
        <TouchableOpacity style={styles.seeMoreGroupDetailsButton}>
            <Text style={styles.seeMoreGroupDetailsButtonLabel}>Ver mais</Text>
        </TouchableOpacity>
    );
}

export default function GroupItem({groupData}: GroupItemProps) {
    return (
        <View style={styles.container}>

            <View style={styles.groupInfoContainer}>
                <View style={styles.groupInfoNameContainer}>
                    <Text style={styles.groupInfoGroupName}>{groupData.name}</Text>
                </View>

                <View style={styles.groupInfoGroupParticipantsThumbnailContainer}>
                    {groupData.thumbnailParticipantsImages?.map((imageSource: string) => (
                        <GroupParticipantThumbnailImage source={imageSource}/>
                    ))}
                </View>
            </View>

            <View style={styles.groupParticipantsCountContainer}>
                <GroupParticipantsIcon width={40} height={40} />
                <Text style={styles.groupParticipantsCountText}>{groupData.participantsQuantity} Participantes</Text>
            </View>

            <SeeMoreGroupDetailsButton/>

        </View>
    );
}

const styles = StyleSheet.create({
    // Thumbnail.
    groupInfoGroupParticipantsThumbnailImage: {
        width: 40,
        height: 40,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: '#FFF',
        marginLeft: -12,
    },

    // SeeMore Button.
    seeMoreGroupDetailsButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: Colors.primary_1,
        borderRadius: 12,
        padding: 12,
    },
    seeMoreGroupDetailsButtonLabel: {
        color: '#FFF',
        fontSize: 16,
    },

    // Item.
    container: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 32,
        marginVertical: 16,
    },
    groupInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    groupInfoNameContainer: {
        flexDirection: 'column',
        flexShrink: 1,
        width: '80%',
    },
    groupInfoGroupName: {
        color: '#1B1B1B',
        fontSize: 21,
        fontWeight: '600'
    },
    groupInfoGroupParticipantsThumbnailContainer: {
        flexDirection: 'row-reverse',
        marginLeft: 16,
    },
    groupParticipantsCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    groupParticipantsCountText: {
        fontSize: 20,
        marginStart: 20,
    }
});