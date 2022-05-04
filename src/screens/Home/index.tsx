import React, { useEffect, useState } from 'react';
import  { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
   Container,
   Header,
   TotalCars,
   HeaderContent,
   CarList,
} from './styles';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  // const carData = {
  //   brand: 'AUDI',
  //   name: 'RS 5 Coupé',
  //   rent: {
  //       period: 'AO DIA',
  //       price: 120,
  //   },
  //   thumbnail: 'https://www.downloadclipart.net/large/audi-rs5-red-png.png',
  // }

  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails', { car });
  }

  // Listando os carros a partir da API.
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
        {/* Alterando a cor do StatusBar */}
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Header>
          <HeaderContent>
            <Logo 
              width={RFValue(108)}
              height={RFValue(12)}
            />
            <TotalCars>
              Total de 12 carros
            </TotalCars>
          </HeaderContent>     
        </Header>
        { loading ? <Load /> : 
          <CarList
            data={cars}
            keyExtractor={ item => item.id }
            renderItem={({ item }) =>  
              <Car data={ item } onPress={ () => handleCarDetails(item) } />
            }
          />
        }
    </Container>
  );
}
