import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.header};

    padding-top: 96px;
`;

export const Content = styled.View`
    flex: 1;

    align-items: center;
    justify-content: center;

    padding-bottom: 80px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};

    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(30)}px;

    margin-top: 40px;
`;

export const Message = styled.Text`
    color: ${({ theme }) => theme.colors.text_details};

    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    line-height: ${RFValue(25)}px;
    text-align: center;

    margin-top: 16px;
`;

export const Footer = styled.View`
    width: 100%;

    align-items: center;
    justify-content: center;

    margin: ${ getBottomSpace() + 80 }px 0;
`;
