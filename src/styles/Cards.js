import { Card } from 'reactstrap';
import styled from 'styled-components';
import cardBg from '../assets/card-bg.png';

export const StyledCard = styled(Card)`
  background-color: #fff;
  background-image: url(${cardBg});
  background-repeat: round;
  background-size: cover;
  border-radius: 8px;
  cursor: pointer;
  color: #fe7b7b;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  .card-title {
    transition: all 0.2s ease-in-out;
  }
  svg {
    path {
      fill: rgba(133, 93, 100, 1);
      transition: all 0.2s ease-in-out;
    }
    transform: translatex(-18px);
    transition: all 0.2s ease-in-out;
  }
  img {
    position: absolute;
    bottom: -3px;
    right: 16px;
    transition: all 0.4s ease-in-out;
  }
  &:hover {
    background-color: rgba(133, 93, 100, 1) !important;
    .card-title {
      color: #fff !important ;
    }
    img {
      transform: translate3d(36px, -36px, 0);
      opacity: 0.2;
    }
    svg {
      transform: translatex(-10px);
      path {
        fill: #fff;
      }
    }
  }
`;
