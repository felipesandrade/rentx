import React from 'react';
import { StatusBar } from 'react-native';

import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';

import { ConfirmButton } from '../../components/ConfirmButton';



import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';

export function SchedulingComplete(){
    const { width } = useWindowDimensions();
    const theme = useTheme();
    return(
        <Container>
            <StatusBar 
                barStyle='light-content'
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>Carro alugado!</Title>

                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title='OK' color={theme.colors.shape_dark} />
            </Footer>
        </Container>
    );
}