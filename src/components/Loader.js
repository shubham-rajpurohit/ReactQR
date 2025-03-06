// Loader.jsx
import React from "react";
import styled from "styled-components";

const Loader = ({ size = "300x300", color = "000000", bgColor = "ffffff", margin= "10px"}) => {
 const [width, height] = size.split("x").map(Number);
 const squareSize = Math.min(width, height) / 3;
 const translateDistance = squareSize; 
 const padding = margin; 

  return (
    <StyledWrapper
      width={width}
      height={height}
      style={{padding: padding + 'px'}}
      squareSize={squareSize}
      translateDistance={translateDistance}
      squareColor={color}
      loaderBgColor={bgColor}
    >
      <div className="loader">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="square" id={`sq${i + 1}`} />
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ${({ width, height, squareSize, translateDistance, squareColor, loaderBgColor, margin}) => `
    @keyframes loader_5191 {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .loader {
      position: relative;
      width: ${width}px;
      height: ${height}px;
      padding: ${margin}px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #${loaderBgColor};
    }

    .square {
      background: #${squareColor};
      width: ${squareSize}px;
      height: ${squareSize}px;
      position: absolute;
    }

    #sq1 { transform: translate(-${translateDistance}px, -${translateDistance}px); animation: loader_5191 675ms ease-in-out 0s infinite alternate; }
    #sq2 { transform: translate(0, -${translateDistance}px); animation: loader_5191 675ms ease-in-out 75ms infinite alternate; }
    #sq3 { transform: translate(${translateDistance}px, -${translateDistance}px); animation: loader_5191 675ms ease-in-out 150ms infinite alternate; }
    #sq4 { transform: translate(-${translateDistance}px, 0); animation: loader_5191 675ms ease-in-out 225ms infinite alternate; }
    #sq5 { animation: loader_5191 675ms ease-in-out 300ms infinite alternate; }
    #sq6 { transform: translate(${translateDistance}px, 0); animation: loader_5191 675ms ease-in-out 375ms infinite alternate; }
    #sq7 { transform: translate(-${translateDistance}px, ${translateDistance}px); animation: loader_5191 675ms ease-in-out 450ms infinite alternate; }
    #sq8 { transform: translate(0, ${translateDistance}px); animation: loader_5191 675ms ease-in-out 525ms infinite alternate; }
    #sq9 { transform: translate(${translateDistance}px, ${translateDistance}px); animation: loader_5191 675ms ease-in-out 600ms infinite alternate; }
  `}
`;

export default Loader;
