import React, { useState } from 'react';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { StatusBar, Alert } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { 
    Calendar, 
    DayProps, 
    generateInterval,
    MarkedDateProps 
} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO} from '../../dtos/CarDTO';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';
interface RentalPeriod {
    startFromatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}

export function Scheduling(){
    //Estado armazena o último dia selecionado
    const [ lastSelectedDate, setLastSelectedDate ] = useState<DayProps>({} as DayProps);
    const [ markedDates, setMarkedDates ] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [ rentalPeriod, setRentalPeriod ] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const navigation = useNavigation<any>();
    const route = useRoute();
    // Pegando os parametros passados pela tela Home e tipando.
    const { car } = route.params as Params;

    function handleConfirmRental(){
        // Verifica se o usuário selecionou a data inicial e final
        if(!rentalPeriod.startFromatted || !rentalPeriod.endFormatted) {
            // Caso não tenha selecionado, exibe msg de alerta
            Alert.alert('Selecione o intervalo para alugar.')
        } else {
            // Caso tenha selecionado, envia para a próxima tela passando um objeto
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            });
        }
    }

    function handleBack(){
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        // Garantindo que a data inicial é menor que a data final
        if(start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFromatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        });
    }

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
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel 
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        {/* 
                            Quando usamos duas exclamações o retorno é um boolean 
                            Verifica se tem data e em caso positivo retorna true
                        */}
                        <DateValue selected={!!rentalPeriod.startFromatted}>
                            {rentalPeriod.startFromatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                           {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>

                </RentalPeriod>
            </Header>

            <Content>
                <Calendar 
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button 
                    title="Confirmar" 
                    onPress={() => handleConfirmRental()}
                    enabled={!!rentalPeriod.startFromatted}
                />
            </Footer>
        </Container>
    );
}