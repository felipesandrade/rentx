import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';

import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    Msg
} from './styles';

export function MyCars(){
    const [ cars, setCars ] = useState<CarDTO[]>([]);
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
                console.log(response);
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);            }
        }
        fetchCars();
    }, []);

    return(
        <Container>
            <Header>
                <BackButton 
                    onPress={handleBack}
                    color={theme.colors.shape}
                />
                <Title>
                    Seus agendamentos,
                    estão aqui.
                </Title>
                <Msg>
                    Conforto, segurança e praticidade.
                </Msg>
            </Header>
        </Container>
    );
}