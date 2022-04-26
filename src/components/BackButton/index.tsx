import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

//importando o tema padrão da nossa aplicação
import { useTheme } from 'styled-components';

import {
    Container,
} from './styles';

interface Props extends BorderlessButtonProps {
    color?: string;
}

export function BackButton({ color, ...rest }: Props) {
    // Inicializando o tema padrão na constante theme.
    const theme = useTheme();

    return(
        <Container {...rest}>
            <MaterialIcons 
                name="chevron-left"
                size={24}
                // Se existir uma cor setada, mostra a cor se não seta a cor text do tema
                color={color ? color : theme.colors.text}
            />
        </Container>
    );
}