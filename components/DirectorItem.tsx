import { Text, View, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteButton from './DeleteButton';

interface MyProps {
    director: {
        _id: string;
        full_name: string;
        email: string;
        series: string;
    };
    onDelete?: (id?: string) => void;
}

export default function DirectorItem({director, onDelete}: MyProps){
    const router = useRouter();

    return (
        <View>
            <Link href={{
                pathname: '/directors/[id]',
                params: { id: director._id }
            }} style={styles.fullname} >
                {director.full_name}
                {director.directors}
            </Link>
            <Text style={styles.description} >{director.description}</Text>
            <Text style={styles.email} >{director.email}</Text>
            <Text style={styles.series} >{director.series}</Text>
            <View style={styles.createButton} >
            <Button title="Create" onPress={() => router.push('/series/create')} color='#287b28' />
            </View>
            <View style={styles.editButton} >
            <Button title="Edit" onPress={() => router.push(`/directors/${director._id}/edit`)} style={styles.editButton} />
            </View>
            <View style={styles.deleteButton} >
            <DeleteButton resource="directors" id={director._id} deleteCallback={onDelete} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        marginBottom: 40, // Add margin spacing
    },
    fullname: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#eeeeee', // text color
        marginBottom: 10,
    },
    email: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#eeeeee', // text color
        marginBottom: 10,
    },
    directors: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#eeeeee', // text color
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#eeeeee', // text color
        marginBottom: 10,
    },
    series: {
        fontSize: 15,
        color: '#eeeeee', // text color
        marginBottom: 10,
    },
  });