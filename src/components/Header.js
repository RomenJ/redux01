import foto1 from './Absolute_Reality_v16_open_paper_notebook_with_blue_neon_letter_1 (1).jpg';
//import './Header.css'

import styled from 'styled-components';

const Header = ({ children }) => {
    return (
      <div className="header">
        <StyledHeader>
          <h1>Gestione sus tareas: To do task con React</h1>
          <a href="https://app.leonardo.ai/" title="Made with Leonardo.ai">
            <div className="photo-container">
              <img className="PhotoHeader" src={foto1} alt="fotoheader" />
            </div>
          </a>
        </StyledHeader>
      </div>
    );
  };
  
  const StyledHeader = styled.div`
  .PhotoHeader{
    width: 100%;
    height: 500px;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  h1{
    position: absolute; /* Posiciona el encabezado encima de la foto */
    top: 30%; /* Lo coloca en la mitad superior del contenedor */
    left: 50%; /* Lo coloca en el centro horizontal del contenedor */
    transform: translate(-50%, -50%); /* Lo centra tanto horizontal como verticalmente */
    background-color: rgba(0, 0, 0, 0.7); /* Fondo semitransparente para hacer que el texto sea legible */
    color: #fff; /* Color del texto */
    padding: 10px; /* Espaciado interior del encabezado */
    font-size: 24px; /* Tamaño de fuente del encabezado */
    font-weight: bold; /* Fuente en negrita */
    font-family:  arial; 
  }
  
  `;
  export default Header
  
  
  
  
  
  