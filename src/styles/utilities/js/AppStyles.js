import { createGlobalStyle } from 'styled-components';
import checkIcon from '../../../assets/check.png';

const AppStyles = createGlobalStyle`
  html {
    body {
      font-family: 'Roboto Mono' !important;
      background-color: #FFF7F7;
      input, button, select, optgroup, textarea, span, li, a, button {
        font-family: 'Roboto Mono', monospace;
      }

      label {
        font-family: 'Playfair Display', serif;
      }

      .form-control-lg {
        font-size: 16px;
        font-weight: 300;
      }
      

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Playfair Display', serif;
        font-weight: normal;
        color: rgba(133, 93, 100, 1);
      }
    }

  }


  /* Text Color  */
  .text-primary {
    color: #855D64 !important;
  }
  .text-vacci-secondary {
    color: #F08881 !important;
  }
  .current-location-icon {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 8px;
    padding-top: 6px;
    cursor: pointer;
    img {
      background-color: #fff;
    }
  }
  /* Utilities  */
  .rotate-90 {
    transform: rotate(90deg);
  }
  
  // style for radio button
  .vacci-radio{
    padding: 12px 40px;
    background-color: rgba(248, 231, 231, 0.3);
    border-radius: 4px;
  }
  .custom-control-input:focus~.custom-control-label::before {
    box-shadow: 0 0 0 0.2rem #c5a0a08a;
  }
  .custom-control-label {
    font-family: 'Roboto Mono';
  }
  .custom-control-label::before{
    border: #8B7275 solid 1px
  }
  .custom-radio .custom-control-input:checked ~ .custom-control-label::after {
    background-image: url(${checkIcon});
    .vacci-radio{
      background-color: #8B7275;
    }
  }
  .custom-radio .custom-control-input:checked{
    .vacci-radio{
      background-color: #8B7275;
    }
  }
  .custom-control-input:checked~.custom-control-label::before{
    color: #fff;
    border-color: #8B7275;
    background-color: #8B7275;
  }
  .custom-control-input:not(:disabled):active~.custom-control-label::before{
    .vacci-radio{
      background-color: #8B7275;
    }
  }
  // style for widget
  .cb-footer {
    display: none;
  }
  .cb-center {
    p {
      display:none;
    }
  }
  .brand-name-heading{
    position:relative;
    display: inline-block;
    color: #f08881 !important;
    font-family: 'Playfair Display', serif;
    &:after {
      content: '';
      position: absolute;
      display: block;
      top: -10%;
      left: -1%;
      height: 86%;
      width: 110%;
      background-color: #f8e7e7;
      z-index: -1;
      transform: rotate3d(1,1,1, -7deg);
    }
  }
  // map style
  .controls {
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid transparent;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 300;
    height: 45px;
    margin-top: 10px;
    outline: none;
    padding: 0 11px 0 13px;
    text-overflow: ellipsis;
    width: 40%;
  }
  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .controls {
      width: 80%;
    }
  }
  
  .controls:focus {
    border-color: #4d90fe;
  }
  
  .title {
    font-weight: bold;
  }
  
  #infowindow-content {
    display: none;
  }
  
  #map #infowindow-content {
    display: inline;
  }
  .search {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 400px;
    z-index: 10;
  }
  
  .search input {
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 100%;
  }
  
  .locate {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    z-index: 10;
  }
  .locate img {
    width: 30px;
    cursor: pointer;
  }
  /* SHADOW */

  .shadow {
    box-shadow: ${props => props.theme.shadow};

    &-light {
      box-shadow: ${props => props.theme.lightShadow};
    }
  }

  /* NProgerss */

    #nprogress .bar {
      background: ${props => props.theme.primary};
    }

    #nprogress .peg {
        box-shadow: 0 0 10px ${props => props.theme.primary}, 0 0 5px ${props =>
  props.theme.primary};
    }

    #nprogress .spinner-icon {
      display: none;
    }

   /* Typography Utils */
  }
`;

export default AppStyles;
