'use client'

import React from 'react'

interface LogoCubeProps {
  size?: number
  duration?: number
}

const SPIN_CHAOTIC = (n: string) => `@keyframes ${n} {
  0%   { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  20%  { transform: rotateX(70deg) rotateY(140deg) rotateZ(35deg); }
  40%  { transform: rotateX(170deg) rotateY(250deg) rotateZ(-25deg); }
  60%  { transform: rotateX(260deg) rotateY(300deg) rotateZ(50deg); }
  80%  { transform: rotateX(320deg) rotateY(200deg) rotateZ(-15deg); }
  100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0deg); }
}`

// orient: 'front' = faces Z axis (front/back), 'side' = faces X axis (left/right), 'top' = faces Y axis (top/bottom)
// At any cube rotation, ~1/3 of tokens face the viewer
const TOKENS: { type: 'gas' | 'power'; x: number; y: number; z: number; delay: number; dur: number; orient: 'front' | 'side' | 'top' }[] = [
  // ── Front/back oriented (visible when front or back faces viewer) ──
  { type: 'gas',   x: -100, y: -100, z: 20,   delay: 0,   dur: 6,   orient: 'front' },
  { type: 'gas',   x: 105,  y: 95,   z: -15,  delay: 1.8, dur: 7,   orient: 'front' },
  { type: 'gas',   x: -95,  y: 90,   z: 30,   delay: 0.6, dur: 5.5, orient: 'front' },
  { type: 'gas',   x: 100,  y: -95,  z: -25,  delay: 3.2, dur: 6.5, orient: 'front' },
  { type: 'gas',   x: 0,    y: -105, z: 10,   delay: 2.4, dur: 7.5, orient: 'front' },
  { type: 'power', x: -105, y: 0,    z: -20,  delay: 0.4, dur: 6.2, orient: 'front' },
  { type: 'power', x: 95,   y: 0,    z: 35,   delay: 1.2, dur: 5.8, orient: 'front' },
  { type: 'power', x: 0,    y: 100,  z: -30,  delay: 2.8, dur: 7.2, orient: 'front' },
  { type: 'power', x: -50,  y: -50,  z: 25,   delay: 3.6, dur: 6.8, orient: 'front' },
  { type: 'power', x: 55,   y: 50,   z: -10,  delay: 4.2, dur: 5.4, orient: 'front' },
  // ── Side oriented (visible when left or right faces viewer) ──
  { type: 'gas',   x: 20,   y: -105, z: -100, delay: 0.3, dur: 6.4, orient: 'side' },
  { type: 'gas',   x: -15,  y: 100,  z: 105,  delay: 2.1, dur: 7.6, orient: 'side' },
  { type: 'gas',   x: 30,   y: 95,   z: -95,  delay: 1.4, dur: 5.2, orient: 'side' },
  { type: 'gas',   x: -25,  y: -95,  z: 100,  delay: 3.8, dur: 6.6, orient: 'side' },
  { type: 'power', x: 10,   y: 0,    z: -105, delay: 0.8, dur: 7.4, orient: 'side' },
  { type: 'power', x: -20,  y: 0,    z: 100,  delay: 2.6, dur: 5.6, orient: 'side' },
  { type: 'power', x: 35,   y: -50,  z: 50,   delay: 1.6, dur: 6.2, orient: 'side' },
  { type: 'power', x: -30,  y: 50,   z: -55,  delay: 3.4, dur: 7.8, orient: 'side' },
  { type: 'power', x: 25,   y: 105,  z: 95,   delay: 4.0, dur: 5.8, orient: 'side' },
  // ── Top/bottom oriented (visible when top or bottom faces viewer) ──
  { type: 'gas',   x: -100, y: 20,   z: -100, delay: 0.5, dur: 7.2, orient: 'top' },
  { type: 'gas',   x: 105,  y: -15,  z: 95,   delay: 2.2, dur: 5.4, orient: 'top' },
  { type: 'gas',   x: -95,  y: 30,   z: 100,  delay: 1.0, dur: 6.8, orient: 'top' },
  { type: 'gas',   x: 100,  y: -25,  z: -95,  delay: 3.6, dur: 7.6, orient: 'top' },
  { type: 'power', x: 0,    y: 10,   z: -105, delay: 0.2, dur: 6.0, orient: 'top' },
  { type: 'power', x: 0,    y: -20,  z: 100,  delay: 2.0, dur: 5.2, orient: 'top' },
  { type: 'power', x: -50,  y: 35,   z: 55,   delay: 1.8, dur: 7.4, orient: 'top' },
  { type: 'power', x: 55,   y: -30,  z: -50,  delay: 3.0, dur: 6.4, orient: 'top' },
  { type: 'power', x: -105, y: 25,   z: 0,    delay: 4.4, dur: 5.6, orient: 'top' },
]

export default function LogoCube({ size = 300, duration = 42 }: LogoCubeProps) {
  const h = size / 2
  const faceSize = size + 2
  const faceOffset = -1

  const spinAnim = 'logo-spin-chaotic'

  const borderColor = 'rgba(200,180,120,0.3)'
  const glowColor = 'rgba(200,180,120,0.08)'

  const faceBase: React.CSSProperties = {
    position: 'absolute',
    width: faceSize,
    height: faceSize,
    top: faceOffset,
    left: faceOffset,
    border: `1px solid ${borderColor}`,
    background: 'rgba(10,8,5,0.6)',
    boxShadow: `inset 0 0 12px ${glowColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }

  const logoFace: React.CSSProperties = {
    ...faceBase,
    background: 'rgba(0,0,0,0.9)',
    border: `1px solid ${borderColor}`,
  }

  const faceTransforms = [
    `translateZ(${h}px)`,
    `rotateY(180deg) translateZ(${h}px)`,
    `rotateY(90deg) translateZ(${h}px)`,
    `rotateY(-90deg) translateZ(${h}px)`,
    `rotateX(90deg) translateZ(${h}px)`,
    `rotateX(-90deg) translateZ(${h}px)`,
  ]

  const floatAnim = 'logo-float'

  return (
    <>
      <style>{`
        ${SPIN_CHAOTIC(spinAnim)}
        @keyframes ${floatAnim} {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(3px, -5px); }
          50%  { transform: translate(-2px, -8px); }
          75%  { transform: translate(4px, -3px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes tkn-spin-cw  { 0% { transform: rotateZ(0deg); } 100% { transform: rotateZ(360deg); } }
        @keyframes tkn-spin-ccw { 0% { transform: rotateZ(0deg); } 100% { transform: rotateZ(-360deg); } }
        @keyframes tkn-zap {
          0%   { opacity: 1;    color: #fde047; text-shadow: 0 0 8px #fff, 0 0 20px rgba(253,224,71,1), 0 0 40px rgba(251,191,36,0.8); }
          3%   { opacity: 0.15; color: #fde047; text-shadow: 0 0 1px rgba(253,224,71,0.2); }
          5%   { opacity: 1;    color: #fff;    text-shadow: 0 0 30px #fff, 0 0 60px rgba(253,224,71,1), -8px 4px 6px rgba(253,224,71,0.9), 10px -5px 8px rgba(251,191,36,0.8), 0 0 100px rgba(251,191,36,0.4); }
          8%   { opacity: 0.9;  color: #fde047; text-shadow: 0 0 6px rgba(253,224,71,0.7), 4px -3px 3px rgba(253,224,71,0.6); }
          15%  { opacity: 1;    color: #fde047; text-shadow: 0 0 10px #fff, 0 0 25px rgba(253,224,71,1), 0 0 50px rgba(251,191,36,0.6); }
          18%  { opacity: 0.1;  color: #fde047; text-shadow: none; }
          20%  { opacity: 1;    color: #fff;    text-shadow: 0 0 25px #fff, 0 0 50px rgba(253,224,71,1), 6px -6px 5px rgba(253,224,71,0.9), -8px 3px 6px rgba(251,191,36,0.7); }
          23%  { opacity: 0.85; color: #fde047; text-shadow: 0 0 8px rgba(253,224,71,0.8), -3px 2px 3px rgba(253,224,71,0.5); }
          35%  { opacity: 1;    color: #fde047; text-shadow: 0 0 12px #fff, 0 0 30px rgba(253,224,71,1), 0 0 60px rgba(251,191,36,0.5); }
          37%  { opacity: 0.05; color: #fde047; text-shadow: none; }
          39%  { opacity: 0.9;  color: #fde047; text-shadow: 0 0 6px rgba(253,224,71,0.7); }
          41%  { opacity: 0.1;  color: #fde047; text-shadow: none; }
          43%  { opacity: 1;    color: #fff;    text-shadow: 0 0 35px #fff, 0 0 70px rgba(253,224,71,1), -12px 6px 10px rgba(253,224,71,0.9), 14px -7px 12px rgba(251,191,36,0.8), 0 0 120px rgba(251,191,36,0.3); }
          50%  { opacity: 0.9;  color: #fde047; text-shadow: 0 0 10px rgba(253,224,71,0.9), 5px -4px 4px rgba(253,224,71,0.6); }
          60%  { opacity: 1;    color: #fde047; text-shadow: 0 0 8px #fff, 0 0 20px rgba(253,224,71,1), 0 0 45px rgba(251,191,36,0.6); }
          62%  { opacity: 0.08; color: #fde047; text-shadow: none; }
          64%  { opacity: 1;    color: #fff;    text-shadow: 0 0 30px #fff, 0 0 55px rgba(253,224,71,1), 8px -8px 6px rgba(253,224,71,0.9), -10px 4px 8px rgba(251,191,36,0.7), 0 0 90px rgba(251,191,36,0.3); }
          70%  { opacity: 0.85; color: #fde047; text-shadow: 0 0 6px rgba(253,224,71,0.7), -4px 3px 3px rgba(253,224,71,0.5); }
          80%  { opacity: 1;    color: #fde047; text-shadow: 0 0 10px #fff, 0 0 25px rgba(253,224,71,1), 0 0 50px rgba(251,191,36,0.5); }
          83%  { opacity: 0.12; color: #fde047; text-shadow: none; }
          85%  { opacity: 1;    color: #fde047; text-shadow: 0 0 8px rgba(253,224,71,0.8); }
          92%  { opacity: 0.9;  color: #fde047; text-shadow: 0 0 6px rgba(253,224,71,0.6), 3px -2px 3px rgba(253,224,71,0.4); }
          100% { opacity: 1;    color: #fde047; text-shadow: 0 0 8px #fff, 0 0 20px rgba(253,224,71,1), 0 0 40px rgba(251,191,36,0.8); }
        }
        @keyframes tkn-vapor {
          0%   { opacity: 0.1;  filter: blur(4px);  letter-spacing: 0.15em; text-shadow: 0 0 20px rgba(56,189,248,0.3), 0 2px 4px rgba(56,189,248,0.2), 0 -2px 4px rgba(100,200,255,0.2); transform: scale(0.96); }
          12%  { opacity: 0.7;  filter: blur(0.8px);letter-spacing: 0.08em; text-shadow: 0 0 10px rgba(56,189,248,0.6), 2px 3px 6px rgba(30,144,220,0.5), -2px -2px 6px rgba(100,210,255,0.4), 0 4px 8px rgba(56,189,248,0.3); transform: scale(0.99); }
          22%  { opacity: 1;    filter: blur(0px);  letter-spacing: 0.04em; text-shadow: 0 0 6px rgba(56,189,248,0.8), 2px 3px 4px rgba(30,144,220,0.6), -2px -2px 4px rgba(100,210,255,0.5), 0 5px 10px rgba(56,189,248,0.3), 3px 1px 3px rgba(80,180,240,0.4), -3px 2px 3px rgba(80,180,240,0.4); transform: scale(1); }
          60%  { opacity: 1;    filter: blur(0px);  letter-spacing: 0.04em; text-shadow: 0 0 5px rgba(56,189,248,0.7), 2px 3px 4px rgba(30,144,220,0.5), -2px -2px 4px rgba(100,210,255,0.4), 0 4px 8px rgba(56,189,248,0.25), 3px 1px 3px rgba(80,180,240,0.35), -3px 2px 3px rgba(80,180,240,0.35); transform: scale(1); }
          78%  { opacity: 0.6;  filter: blur(1.5px);letter-spacing: 0.1em;  text-shadow: 0 -3px 12px rgba(56,189,248,0.4), 0 3px 8px rgba(30,144,220,0.3), 2px 0px 6px rgba(100,210,255,0.3); transform: scale(1.01); }
          92%  { opacity: 0.15; filter: blur(4px);  letter-spacing: 0.15em; text-shadow: 0 -6px 18px rgba(56,189,248,0.15), 0 4px 10px rgba(56,189,248,0.1); transform: scale(1.04); }
          100% { opacity: 0.1;  filter: blur(4px);  letter-spacing: 0.15em; text-shadow: 0 0 20px rgba(56,189,248,0.3), 0 2px 4px rgba(56,189,248,0.2), 0 -2px 4px rgba(100,200,255,0.2); transform: scale(0.96); }
        }
      `}</style>
      <div style={{
        width: size,
        height: size,
        perspective: 5000,
        perspectiveOrigin: '50% 50%',
        animation: `${floatAnim} 8s ease-in-out infinite`,
      }}>
        <div
          style={{
            width: size,
            height: size,
            transformStyle: 'preserve-3d',
            animation: `${spinAnim} ${duration}s linear infinite`,
            position: 'relative',
          }}
        >
          {/* Cube faces — 2 logo + 4 empty dark */}
          {faceTransforms.map((transform, i) => (
            i < 2
              ? <div key={i} style={{ ...logoFace, transform }}>
                  <img
                    src="/BS_image.jpg"
                    alt="BlackSlon"
                    style={{ width: faceSize, height: faceSize, objectFit: 'cover', display: 'block' }}
                  />
                </div>
              : <div key={i} style={{ ...faceBase, transform }} />
          ))}

          {/* Floating 100 kWh tokens — market-style effects */}
          {TOKENS.map((t, i) => {
            const isGas = t.type === 'gas'
            const spinDur = 12 + (i % 5) * 2
            const effectDur = isGas ? 7 + (i % 3) * 1.5 : 3.5 + (i % 4) * 0.8
            const orientTransform =
              t.orient === 'side'  ? 'rotateY(90deg)' :
              t.orient === 'top'   ? 'rotateX(90deg)' : ''
            return (
              <div
                key={`tkn-${i}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate3d(${t.x}px, ${t.y}px, ${t.z}px) ${orientTransform}`,
                  transformStyle: 'preserve-3d',
                  pointerEvents: 'none',
                }}
              >
                <div style={{
                  animation: `${i % 2 === 0 ? 'tkn-spin-cw' : 'tkn-spin-ccw'} ${spinDur}s linear infinite`,
                  animationDelay: `${t.delay * 0.5}s`,
                }}>
                  <span style={{
                    fontSize: 14,
                    fontFamily: 'var(--font-raleway), sans-serif',
                    whiteSpace: 'nowrap' as const,
                    userSelect: 'none' as const,
                    display: 'inline-block',
                    animationDelay: `${t.delay}s`,
                    ...(isGas ? {
                      color: '#b8e8ff',
                      fontWeight: 900,
                      WebkitTextStroke: '0.3px rgba(56,189,248,0.7)',
                      paintOrder: 'stroke fill' as const,
                      animation: `tkn-vapor ${effectDur}s ease-in-out infinite`,
                    } : {
                      color: '#fde047',
                      fontWeight: 100,
                      animation: `tkn-zap ${2.5 + (i % 3) * 0.5}s linear infinite`,
                    }),
                  } as React.CSSProperties}>
                    100 kWh
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
