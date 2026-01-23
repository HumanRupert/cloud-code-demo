import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Aurora Background - Flowing aurora waves effect
 * Inspired by ReactBits (https://reactbits.dev)
 */

// Shader for aurora effect
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uAmplitude;
  uniform float uSpeed;
  varying vec2 vUv;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * uSpeed;

    // Create flowing aurora waves
    float noise1 = snoise(vec2(uv.x * 2.0 + time * 0.3, uv.y * 3.0 + time * 0.2)) * uAmplitude;
    float noise2 = snoise(vec2(uv.x * 3.0 - time * 0.2, uv.y * 2.0 + time * 0.3)) * uAmplitude;
    float noise3 = snoise(vec2(uv.x * 1.5 + time * 0.4, uv.y * 2.5 - time * 0.1)) * uAmplitude;

    // Blend colors based on position and noise
    float blend1 = smoothstep(0.0, 0.6, uv.y + noise1 * 0.3);
    float blend2 = smoothstep(0.2, 0.8, uv.y + noise2 * 0.3);
    float blend3 = smoothstep(0.4, 1.0, uv.y + noise3 * 0.3);

    vec3 color = mix(uColor1, uColor2, blend1);
    color = mix(color, uColor3, blend2 * 0.5);

    // Add glow effect
    float glow = (noise1 + noise2 + noise3) * 0.15 + 0.5;
    color *= glow;

    // Fade edges
    float fadeX = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
    float fadeY = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.6, uv.y);
    float alpha = fadeX * fadeY * 0.6;

    gl_FragColor = vec4(color, alpha);
  }
`;

function AuroraMesh({ colorStops, amplitude, speed }) {
  const meshRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(colorStops[0]) },
    uColor2: { value: new THREE.Color(colorStops[1]) },
    uColor3: { value: new THREE.Color(colorStops[2]) },
    uAmplitude: { value: amplitude },
    uSpeed: { value: speed },
  }), [colorStops, amplitude, speed]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Aurora({
  colorStops = ['#38bdf8', '#3b82f6', '#06b6d4'],
  amplitude = 1.0,
  speed = 0.5,
  className = '',
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <AuroraMesh
          colorStops={colorStops}
          amplitude={amplitude}
          speed={speed}
        />
      </Canvas>
    </div>
  );
}
