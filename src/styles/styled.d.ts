import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
 // Criando o ThemeType e copiando a mesma tipagem do nosso tema  
 type ThemeType = typeof theme;

 //Extendendo as caracteristicas do ThemeType no Default Theme
 export interface DefaultTheme extends ThemeType {}

}