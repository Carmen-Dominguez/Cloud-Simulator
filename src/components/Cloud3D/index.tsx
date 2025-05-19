import React from 'react';
import { AppState } from '../../reducer';

type Props = {
  time: AppState["TimeState"];
  phaseDuration: number;
  weather: AppState["WeatherState"];
};

export const Cloud3D = ({ time, phaseDuration, weather }: Props) => (
  <group>
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  </group>
);
