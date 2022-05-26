import React from 'react';

import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loadingCar.json';

import { 
    Container 
} from './styles';

export function LoadAnimation() {
    return (
        <Container>
            <LottieView
                source={loadingCar}
                style={{height: 200}}
                resizeMode="contain"// garante a proporção independente da largura e altura
                autoPlay
                loop={true} // garante q a animação n pare quando demorar a carregar as informações
            />

        </Container>
    );
}