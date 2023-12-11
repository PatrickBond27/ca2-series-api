import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteButton from './DeleteButton';

interface MyProps {
    serie: {
        _id: string;
        title: string;
        city: string;
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
                {serie.title}
            </Link>
            <Text>{serie.city}</Text>
            <Button title="Edit" onPress={() => router.push(`/series/${serie._id}/edit`)} />
            <DeleteButton resource="series" id={serie._id} deleteCallback={onDelete} />
            <Text>_____________</Text>
        </View>
    );
}