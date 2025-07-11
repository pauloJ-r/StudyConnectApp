import SearchIcon from '@/assets/icons/search-icon.svg';
import FilterIcon from '@/assets/icons/filter-icon.svg';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

type SearchBarProps = {
    placeholder?: string;
    onSearch?: (text: string) => void;
    onFilterPress?: () => void;
} & TextInputProps;

export default function SearchBar({
    placeholder = 'Buscar...',
    onSearch,
    onFilterPress,
    ...rest
}: SearchBarProps) {
    const [searchContent, setSearchContent] = useState('');

    function handleChange(value: string) {
        setSearchContent(value);
        onSearch?.(value);
    }

    return (
        <View style={styles.container}>

            <SearchIcon/>

            <TextInput
                placeholder='Buscar...'
                style={styles.input}
                value={searchContent}
                onChangeText={handleChange}
                {...rest}
            />

            <TouchableOpacity>
                <FilterIcon/>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 0,
        marginHorizontal: 8,
    }
});