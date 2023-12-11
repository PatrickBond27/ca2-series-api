import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, FlatList, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import SerieItem from '../../../components/SerieItem';

export default function Page() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios.get('https://ca1-series-api-app.vercel.app/api/series')
         .then(response => {
          console.log(response.data);
          setSeries(response.data);
         })
         .catch(e => {
            console.error(e);
         });

  }, []);

  const onDelete = (id?: string) => {
    let newSeries = series.filter((serie: any) => serie._id !== id);
    setSeries(newSeries);
  }

  let seriesList = series.map((serie: any) => {
    return <SerieItem key={serie._id} serie={serie} />
  });
  
  return (
    <>
    {/* <Text>This is the view all series page</Text> */}

    {seriesList}

    {/* <FlatList
        data={series}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      /> */}


    <Link href={{
        pathname: '/series/[id]',
        params: { id: '235641726gfjwhgvfuwf' }
    }}>This is serie 1</Link>

    <Link href={{
        pathname: '/series/[id]',
        params: { id: 'secondblahblah8753842' }
    }}>Second serie</Link>

    <Link href={{
        pathname: '/series/[id]',
        params: { id: '33333333333' }
    }}>Cool serie</Link>
    </>
  );
}