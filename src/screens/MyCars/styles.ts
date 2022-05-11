import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 273px;

    justify-content: center;
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 30}px;

    background-color: ${({ theme }) => theme.colors.header};
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};

    font-family: ${({ theme }) => theme.fonts.secondary_500};
    font-size: ${RFValue(30)}px;

    margin-top: 40px;
`;

export const Msg = styled.Text`
    color: ${({ theme }) => theme.colors.shape};

    font-family: ${({ theme }) => theme.fonts.secondary_400};
    font-size: ${RFValue(15)}px;

    margin: 18px 0;
    padding-bottom: 34px;

`;