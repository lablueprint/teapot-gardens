import React, { createContext, useState } from 'react';

import plant_1_level_1 from '@assets/garden-assets/plant_1/plant_1_level_1.png';

/**
 *  Structure we keep for every plant:
 *  {
 *    id:    number,
 *    name:  string,
 *    img:   any (require/asset),
 *    stage: string
 *  }
 */

// initialise context with safe defaults
export const PlantContext = createContext({
  heroPlant: null,
  setHeroPlant: () => {},
});

export function PlantProvider({ children }) {
  const [heroPlant, setHeroPlant] = useState({
    id: 1,
    name: 'Blue Dandelion',
    img: plant_1_level_1,
    stage: 'Stage 1/3',
  });

  return (
    <PlantContext.Provider value={{ heroPlant, setHeroPlant }}>
      {children}
    </PlantContext.Provider>
  );
}
