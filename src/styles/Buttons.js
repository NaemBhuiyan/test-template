import { Button } from 'reactstrap';
import styled from 'styled-components';

export const VacciButton = styled(Button)`
  background: ${props =>
    props.primary ? '#8f6f74' : 'rgba(154, 125, 130, 0.1);'};
  border: 0;
  color: ${props => (props.primary ? 'white' : '#8F6F74')};
  letter-spacing: 0.5px;
  box-shadow: 0px 6px 6px rgba(154, 125, 130, 0.1);
  font-family: 'Roboto Mono' !important;
  font-style: normal;
  font-weight: 500;
  &:hover {
    background: #855d64;
    box-shadow: 0px 6px 17px rgba(65, 53, 55, 0.1);
  }
`;
