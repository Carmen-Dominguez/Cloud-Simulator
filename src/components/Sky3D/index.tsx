import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Cloud3D } from '../Cloud3D';
import { AppState } from '../../reducer';

type Props = {
  time: AppState["TimeState"];
  phaseDuration: number;
  weather: AppState["WeatherState"];
};

export const Sky3D = ({ time, phaseDuration, weather }: Props) => (
  <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
    <Canvas dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} />

      <Suspense fallback={null}>
        <Cloud3D time={time} phaseDuration={phaseDuration} weather={weather} />
      </Suspense>
    </Canvas>
  </div>
); 