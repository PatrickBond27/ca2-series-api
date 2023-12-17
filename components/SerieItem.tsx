import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteButton from './DeleteButton';

interface MyProps {
    serie: {
        _id: string;
        title: string;
        description: string;
        directors: string;
        image: any;
        release_year: number;
        rating: string;
    };
    onDelete?: (id?: string) => void;
}

export default function SerieItem({serie, onDelete}: MyProps){
    const router = useRouter();

    return (
        <View>
            <Link href={{
                pathname: '/series/[id]',
                params: { id: serie._id }
            }}>
                {serie.image ? (
                    <Image source={{ uri: serie.image }} style={styles.image} />
                ) : (
                    <View style={styles.imagePlaceholder} />
                )}
            </Link>
            <Link href={{
                pathname: '/series/[id]',
                params: { id: serie._id }
            }}>
                {serie.title}
            </Link>
            <Text>{serie.description}</Text>
            <Text>{serie.release_year}</Text>
            <Button title="Create" onPress={() => router.push('/series/create')} />
            <Button title="Edit" onPress={() => router.push(`/series/${serie._id}/edit`)} />
            <DeleteButton resource="series" id={serie._id} deleteCallback={onDelete} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 8,
      marginBottom: 8,
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#ccc', // Placeholder background color
        borderRadius: 8,
        marginBottom: 8,
    },
  });