import styled from 'styled-components/native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';


interface ConfirmButtonProps extends RectButtonProps{
    color: string;
}

export const Container = styled(RectButton)<ConfirmButtonProps>`
    width: 80px;
    height: 56px;

    align-items: center;
    justify-content: center;
  

    background-color: ${({ color, theme}) => color ? color : theme.colors.shape_dark};
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};

    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
`;