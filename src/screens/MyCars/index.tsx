import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarList,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';

import { Load } from '../../components/Load';
interface CarProps {
    id: string;
    user_id: string;
    startDate: string;
    endDate: string;
    car: CarDTO;
}

export function MyCars(){
    const [ cars, setCars ] = useState<CarProps[]>([]);
    const [ loading, setLoading ] = useState(true);

    const theme = useTheme();

    const navigation = useNavigation<any>();

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/schedules_byuser?user_id=1'); 
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);            
            }
        }
        fetchCars();
    }, []);

    return(
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton 
                    onPress={handleBack}
                    color={theme.colors.shape}
                />
                <Title>
                    Seus agendamentos,
                    estão aqui.
                </Title>
                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>
            </Header>

            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                </Appointments>

                { loading ? <Load /> :
            
                    <CarList 
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <CarWrapper>
                                <Car data={ item.car } onPress={() => {}} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        }
                    />
                }
            </Content>
            
        </Container>
    );
}