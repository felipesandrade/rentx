import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { format } from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { NavigationHelpersContext, useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { CarDTO} from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { api } from '../../services/api';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
    Footer,
} from './styles';
interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    startFromatted: string;
    endFormatted: string;
}

export function SchedulingDetails() {
    const [ loading, setLoading ] = useState(false);
    const [ reantalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);
    
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const route = useRoute();
    // Pegando os parametros passados pela tela Home e tipando.
    const { car, dates } = route.params as Params;

    const rentDays = dates.length;
    const rentTotal = Number(dates.length) * Number(car.rent.price);

    async function handleConfirmRental(){
        setLoading(true);

        // Retorna os agendamento para um determinado carro.
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1 ])), 'dd/MM/yyyy'),
            car
        });

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
        .then(() => navigation.navigate('SchedulingComplete'))
        .catch(() => {
            Alert.alert('N??o foi poss??vel confirmar o agendamento.')
            setLoading(false);
        })
    }

    function handleBack(){
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            startFromatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1 ])), 'dd/MM/yyyy'),
        })
    }, [])

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="dark-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton onPress={handleBack} />
            </Header>
            <CarImages> 
                <ImageSlider 
                    imagesUrl={car.photos}
                />
            </CarImages>

            <Content>
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

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather 
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{reantalPeriod.startFromatted}</DateValue>
                    </DateInfo>

                    <Feather 
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>AT??</DateTitle>
                        <DateValue>{reantalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ {car.rent.price} x{rentDays} di??rias</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button 
                    title="Alugar agora"
                    color={theme.colors.success} 
                    onPress={() => handleConfirmRental()}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>

        </Container>
    );
}