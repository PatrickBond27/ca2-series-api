import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteButton from './DeleteButton';

interface MyProps {
    serie: {
        _id: string;
        title: string;
        description: string;
        directors: string;
        image?: any;
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
            }} style={styles.title} >
                {serie.title}
            </Link>
            <Text style={styles.description} >{serie.description}</Text>
            <Text style={styles.yearTitle} >{serie.release_year}</Text>
            <View style={styles.createButton} >
            <Button title="Create" onPress={() => router.push('/series/create')} color='#287b28' />
            </View>
            <View style={styles.editButton} >
            <Button title="Edit" onPress={() => router.push(`/series/${serie._id}/edit`)} color='#FFA500' />
            </View>
            <View style={styles.editButton} >
            <DeleteButton resource="series" id={serie._id} deleteCallback={onDelete} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 8,
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#ccc', // Placeholder background color
        marginBottom: 8,
    },
    editButton: {
        backgroundColor: '#FFA500', // Orange background color for 'edit' button
        width: 160, // Make 'edit' button more narrow
        marginBottom: 10, // Add margin spacing
    },
    createButton: {
        backgroundColor: '#287b28', // Dark Green background color for 'edit' button
        width: 160, // Make 'edit' button more narrow
        marginBottom: 10, // Add margin spacing
    },
    deleteButton: {
        width: 160, // Make 'edit' button more narrow
        marginBottom: 10, // Add margin spacing
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000', // Black text color
        marginBottom: 10,
    },
    yearTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000', // Black text color
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: '#000000', // Black text color
        marginBottom: 10,
    },
  });