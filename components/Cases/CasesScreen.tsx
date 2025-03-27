import React, {useState, useEffect} from 'react';
import type {FC, PropsWithChildren} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {getAccessToken} from '../../Libraries/Msal/msal';
import {styles} from '../../App';

type CaseData = {
  createDate: string;
  deleteDate?: string | null;
  uuid: string;
  actionsDescription: string;
  dateTime: string;
  description: string;
  estimations: string;
  landmark: string;
  lastSeenLocation: string;
  location: string;
  missingCount: number;
  name: string;
  reportingSource: string;
  suggestions: string;
};

type ItemProps = {
  createDate: string;
  actionsDescription: string;
  description: string;
};

const Item: FC<ItemProps> = ({createDate, actionsDescription, description}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>createDate</Text>
      <Text style={styles.text}>{createDate}</Text>
      <Text style={styles.text}>actionsDescription</Text>
      <Text style={styles.text}>{actionsDescription}</Text>
      <Text style={styles.text}>description</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const CasesScreen = () => {
  const [data, setData] = useState<CaseData[]>([]);

  const loadData = async () => {
    fetchData('http://eitan.dev.digital.idf.il/api/eitan/case/');
    //fetchData('http://192.168.137.226:3000/api/eitan/case/');
  };

  async function fetchData(url: string): Promise<any> {
    try {
      //console.log('networkTest local');
      //console.log(`networkTest fetchData url: ${url}`);
      const token = await getAccessToken();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      //console.log('networkTest start test response');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('networkTest Data fetched successfully!');
      const data: CaseData[] = await response.json(); // Parse JSON response
      //console.log(`this is the result - ${response.text()}`);
      setData(data);
      return data;
    } catch (error) {
      console.error('networkTest Error fetching data: ', error);
      //await login();
      //fetchData(url);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.uuid} // Unique key for each item
          renderItem={({item}) => (
            <Item
              createDate={item.createDate}
              actionsDescription={item.actionsDescription}
              description={item.description}
            />
          )}
        />
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   item: {
//     padding: 15,
//     marginVertical: 8,
//     backgroundColor: '#2996ff',
//     borderRadius: 8,

//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   text: {
//     fontSize: 18,
//     color : 'white'
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     backgroundColor: 'red',
//     borderRadius: 5,
//     marginHorizontal: 10,
//     padding: 15,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//   },
// });

export default CasesScreen;
