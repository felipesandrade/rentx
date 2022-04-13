import React from 'react';
import  { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
   Container,
   Header,
   TotalCars,
   HeaderContent
} from './styles';

export function Home(){
  const carDataOne = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
        period: 'AO DIA',
        price: 120,
    },
    thumbnail: 'https://www.downloadclipart.net/large/audi-rs5-red-png.png',
  };

  const carDataTwo = {
    brand: 'PORSCHE',
    name: 'PANAMERA',
    rent: {
        period: 'AO DIA',
        price: 340,
    },
    thumbnail: 'https://www.pngplay.com/wp-content/uploads/13/Porsche-Panamera-PNG-Clipart-Background.png',
  };

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
        <Car
          data={carDataOne}
        />
         <Car
          data={carDataTwo}
        />
    </Container>
  );
}
