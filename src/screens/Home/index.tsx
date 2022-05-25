import React, { useEffect, useState } from 'react';
import  { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

// Passando o RectButton para dentro do Animated. Assim o RectButton passa a ser
// um componente do Animated
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

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
  //  MyCarsButton
} from './styles';
import theme from '../../styles/theme';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Com o useSharedValue conseguimos identificar a posição em q estamos na tela.
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    // Função acionada quando o usuário pressiona e segura o botão na tela
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    // Função acionada quando o usuário arrasta o botão pela tela
    onActive(event, ctx: any){
      positionX.value =  ctx.positionX + event.translationX;
      positionY.value =  ctx.positionY + event.translationY;
    },
    // Função acionada quando o usuário solta o botão na tela
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  const navigation = useNavigation<any>();
  const theme = useTheme();

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

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
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

  // Evita que o usuário consigo retornar para a tela de splash no Android
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
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

            { 
              !loading && 
              <TotalCars>
                {`Total de ${cars.length} carros`}
              </TotalCars>
            }
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
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              myCarsButtonStyle,
              {
                position: 'absolute',
                bottom: 13,
                right: 22,
              }
            ]}
            
          >
            <ButtonAnimated 
              style={[styles.button, { backgroundColor: theme.colors.main }]}
              onPress={handleOpenMyCars}
            >
              <Ionicons 
                name="ios-car-sport" 
                size={32}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
