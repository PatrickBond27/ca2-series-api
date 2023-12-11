import axios from 'axios';
import { Button } from 'react-native';
import { useSession } from '../contexts/AuthContext';
import { useState } from 'react';

interface MyProps {
    resource: string;
    id: string;
    deleteCallback?: (id?: string) => void;
}

export default function DeleteButton({resource, id, deleteCallback}: MyProps) {
    const [deleting, setDeleting] = useState(false);
    const { session } = useSession();

    const handleDelete = () => {
        axios.delete(`https://ca1-series-api-app.vercel.app/api/${resource}/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
        .then(response => {
          console.log(response.data);
        //   let newList = festivals.filter();

        if (deleteCallback){
            (deleteCallback(id))
        }
        })
        .catch(e => {
            console.error(e);
        });

    };

    return (
        <Button title={(deleting) ? "Deleting..." : "Delete"} onPress={handleDelete} color="ff000" />
    );

}