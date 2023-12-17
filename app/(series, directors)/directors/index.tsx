import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button } from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';
import DirectorItem from '../../../components/DirectorItem';

export default function Page() {
  const [directors, setDirectors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title:"All Directors" });
  }, [navigation]);

  useEffect(() => {
    axios.get('https://ca1-series-api-app.vercel.app/api/directors')
         .then(response => {
          console.log(response.data);
          setDirectors(response.data);
         })
         .catch(e => {
            console.error(e);
         });

  }, []);

  const onDelete = (id?: string) => {
    let newDirectors = directors.filter((director: any) => director._id !== id);
    setDirectors(newDirectors);
  }

  let directorsList = directors.map((director: any) => {
    return <DirectorItem key={director._id} director={director} />
  });
  
  return (
    <>
    {/* <Text>This is the view all directors page</Text> */}

    {directorsList}

    {/* <FlatList
        data={directors}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}


    {/* <Link href={{
        pathname: '/directors/[id]',
        params: { id: '235641726gfjwhgvfuwf' }
    }}>This is director 1</Link>

    <Link href={{
        pathname: '/directors/[id]',
        params: { id: 'secondblahblah8753842' }
    }}>Second director</Link>

    <Link href={{
        pathname: '/directors/[id]',
        params: { id: '33333333333' }
    }}>Cool director</Link> */}
    </>
  );
}