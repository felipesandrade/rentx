import React from 'react';
import { StatusBar } from 'react-native';

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { CarDTO} from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import {
    Container,
    Header,
    CarImages,
    // Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
} from './styles';
interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const navigation = useNavigation<any>();
    const route = useRoute();

    // Pegando os parametros passados pela tela Home e tipando.
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);

    // Hook responsável por identificar quando o usuário está rolando a tela
    const scrollHandler = useAnimatedScrollHandler(event => {
        // Armazena no scrollY value a posição horizontal do scroll.
        scrollY.value = event.contentOffset.y;
        // console.log(event.contentOffset.y);
    });

    // Animação do header, conforme o usuário for rolando a tela
    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            // O interpolate vai fazendo a transição da animação de forma gradativa
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),   
        }
    })

    const sliderStyleAnimation = useAnimatedStyle(() => {
        return{
            opacity: interpolate(
                scrollY.value,
                [0, 50],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car });
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <Animated.View
                style={headerStyleAnimation}
            >
                <Header>
                    <StatusBar
                        barStyle="dark-content"
                        translucent
                        backgroundColor="transparent"
                    />
                    <BackButton onPress={handleBack} />
                </Header>
                <Animated.View style={sliderStyleAnimation}>
                    <CarImages> 
                        <ImageSlider 
                            imagesUrl={car.photos}
                        />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: getStatusBarHeight(),
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16} //O número de quadros q queremos renderizar por segundo
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory 
                                key={accessory.type}
                                name={accessory.name} 
                                icon={getAccessoryIcon(accessory.type)} 
                            />            
                        ))
                    }
                </Accessories>

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button title="Escolher período do aluguel" onPress={() => handleConfirmRental()} />
            </Footer>

        </Container>
    );
}