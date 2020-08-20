import React, { useState } from 'react';
import './Background.css';
import Particles from 'react-particles-js';
import arrayOfParticleJsConfigObjects from '../data/particlesJsParams';

const optionsToName = {
  simple: 'Simple',
  bubbles: 'Bubbles',
  snow: 'Snow',
};

export default function Background() {
  const [backgrounds, setBackgrounds] = useState(
    arrayOfParticleJsConfigObjects
  );
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const [particeQuanity, setParticleQuantity] = useState(
    backgrounds[currentBackgroundIndex].params.particles.number.value
  );
  const [particleSize, setParticleSize] = useState(
    backgrounds[currentBackgroundIndex].params.particles.size.value
  );

  const changeBackground = (index) => {
    setCurrentBackgroundIndex(index);
    setParticleQuantity(backgrounds[index].params.particles.number.value);
    setParticleSize(backgrounds[index].params.particles.size.value);
  };

  const changeParticeQuantity = (e) => {
    setParticleQuantity(e.target.value);
    const updatedBackgrounds = backgrounds.map((background) => {
      const newBackground = JSON.parse(JSON.stringify(background));
      newBackground.params.particles.number.value = particeQuanity;
      return newBackground;
    });
    setBackgrounds(updatedBackgrounds);
  };

  const changeParticleSize = (e) => {
    setParticleSize(e.target.value);
    const updatedBackgrounds = backgrounds.map((background) => {
      const newBackground = JSON.parse(JSON.stringify(background));
      newBackground.params.particles.size.value = particleSize;
      return newBackground;
    });
    setBackgrounds(updatedBackgrounds);
  };

  return (
    <React.Fragment>
      <Particles
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
        }}
        params={backgrounds[currentBackgroundIndex].params}
      />

      <div className="bg-options">
        <span className="bg-options-title">Background</span>
        {backgrounds.map((background, index) => {
          return (
            <div
              key={background.id}
              className={`bg-option ${
                index === currentBackgroundIndex && 'bg-active'
              }`}
              onClick={() => changeBackground(index)}
            >
              {optionsToName[background.name]}
            </div>
          );
        })}
        <div className="partice-quantity slider-container">
          <input
            type="range"
            min="0"
            max="400"
            step="1"
            value={particeQuanity}
            onChange={changeParticeQuantity}
            className="slider"
          />
          <div>Particle Quantity</div>
        </div>
        <div className="particle-size slider-container">
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={particleSize}
            onChange={changeParticleSize}
            className="slider"
          />
          <div>Particle Size</div>
        </div>
      </div>
    </React.Fragment>
  );
}
