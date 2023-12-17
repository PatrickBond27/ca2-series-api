import { Text, View, Button } from 'react-native';
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
            }}>
                {director.full_name}
            </Link>
            <Text>{director.email}</Text>
            <Text>{director.series}</Text>
            <Button title="Edit" onPress={() => router.push(`/directors/${director._id}/edit`)} />
            <DeleteButton resource="directors" id={director._id} deleteCallback={onDelete} />
            <Text>_____________</Text>
        </View>
    );
}