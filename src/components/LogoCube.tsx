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

const TOKENS: { type: 'gas' | 'power'; x: number; y: number; z: number; delay: number; dur: number }[] = [
  { type: 'gas',   x: -60, y: -70, z: 40,  delay: 0,   dur: 6   },
  { type: 'gas',   x: 70,  y: 30,  z: -50, delay: 1.5, dur: 7   },
  { type: 'gas',   x: -30, y: 80,  z: 60,  delay: 0.8, dur: 5.5 },
  { type: 'gas',   x: 80,  y: -40, z: -30, delay: 2.2, dur: 6.5 },
  { type: 'gas',   x: -75, y: 15,  z: -60, delay: 3,   dur: 7.5 },
  { type: 'gas',   x: 40,  y: -80, z: 50,  delay: 1,   dur: 6   },
  { type: 'gas',   x: -50, y: 55,  z: -70, delay: 2.5, dur: 5   },
  { type: 'gas',   x: 20,  y: -10, z: 80,  delay: 3.8, dur: 6.8 },
  { type: 'power', x: 55,  y: -55, z: -40, delay: 0.5, dur: 7   },
  { type: 'power', x: -65, y: 40,  z: 55,  delay: 2,   dur: 6   },
  { type: 'power', x: 25,  y: 65,  z: -65, delay: 1.2, dur: 5.5 },
  { type: 'power', x: -40, y: -25, z: 75,  delay: 3.5, dur: 7.5 },
  { type: 'power', x: 75,  y: 50,  z: 25,  delay: 0.3, dur: 6.5 },
  { type: 'power', x: -55, y: -70, z: -35, delay: 2.8, dur: 5   },
  { type: 'power', x: 10,  y: 75,  z: 45,  delay: 1.8, dur: 7.2 },
  { type: 'power', x: -80, y: -5,  z: -15, delay: 4,   dur: 6.2 },
]

export default function LogoCube({ size = 300, duration = 24 }: LogoCubeProps) {
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

  const faces = [
    'LOGO',
    'LOGO',
    'Own Energy. Not a Bill.',
    'The First Energy That Never Expires.',
    'Buy Energy Like Bitcoin. Use It Like Cash.',
    'Energy Has a Price. Now It Has a Token.',
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
        @keyframes tkn-bob-0 {
          0%   { transform: translate3d(0,0,0); opacity:0.7; }
          33%  { transform: translate3d(6px,-10px,4px); opacity:0.9; }
          66%  { transform: translate3d(-4px,5px,-6px); opacity:0.6; }
          100% { transform: translate3d(0,0,0); opacity:0.7; }
        }
        @keyframes tkn-bob-1 {
          0%   { transform: translate3d(0,0,0); opacity:0.65; }
          33%  { transform: translate3d(-8px,6px,-5px); opacity:0.85; }
          66%  { transform: translate3d(5px,-8px,7px); opacity:0.55; }
          100% { transform: translate3d(0,0,0); opacity:0.65; }
        }
        @keyframes tkn-bob-2 {
          0%   { transform: translate3d(0,0,0); opacity:0.75; }
          33%  { transform: translate3d(7px,8px,-4px); opacity:0.55; }
          66%  { transform: translate3d(-6px,-6px,8px); opacity:0.9; }
          100% { transform: translate3d(0,0,0); opacity:0.75; }
        }
        @keyframes tkn-bob-3 {
          0%   { transform: translate3d(0,0,0); opacity:0.6; }
          33%  { transform: translate3d(-5px,-7px,6px); opacity:0.8; }
          66%  { transform: translate3d(8px,4px,-5px); opacity:0.65; }
          100% { transform: translate3d(0,0,0); opacity:0.6; }
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
          {/* Cube faces */}
          {faceTransforms.map((transform, i) => (
            faces[i] === 'LOGO'
              ? <div key={i} style={{ ...logoFace, transform }}>
                  <img
                    src="/BS_image.jpg"
                    alt="BlackSlon"
                    style={{ width: faceSize, height: faceSize, objectFit: 'cover', display: 'block' }}
                  />
                </div>
              : <div key={i} style={{ ...faceBase, transform }}>
                  <span style={{
                    color: 'rgba(200,180,120,0.7)',
                    fontSize: size * 0.058,
                    fontWeight: 100,
                    fontFamily: 'var(--font-raleway), sans-serif',
                    letterSpacing: '0.06em',
                    textTransform: 'none',
                    textAlign: 'center',
                    userSelect: 'none',
                    padding: '0 24px',
                    lineHeight: 1.5,
                  }}>{faces[i]}</span>
                </div>
          ))}

          {/* Floating 100 kWh tokens inside the cube */}
          {TOKENS.map((t, i) => {
            const isGas = t.type === 'gas'
            return (
              <div
                key={`tkn-${i}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate3d(${t.x}px, ${t.y}px, ${t.z}px)`,
                  transformStyle: 'preserve-3d',
                  pointerEvents: 'none',
                }}
              >
                <div style={{
                  animation: `tkn-bob-${i % 4} ${t.dur}s ease-in-out infinite`,
                  animationDelay: `${t.delay}s`,
                }}>
                  <div style={{
                    padding: '2px 5px',
                    borderRadius: 3,
                    border: `1px solid ${isGas ? 'rgba(34,211,238,0.45)' : 'rgba(251,191,36,0.45)'}`,
                    background: isGas ? 'rgba(6,120,180,0.12)' : 'rgba(180,120,0,0.12)',
                    boxShadow: `0 0 6px ${isGas ? 'rgba(34,211,238,0.25)' : 'rgba(251,191,36,0.25)'}, 0 0 12px ${isGas ? 'rgba(34,211,238,0.1)' : 'rgba(251,191,36,0.1)'}`,
                    fontSize: 6,
                    fontFamily: 'monospace',
                    color: isGas ? 'rgba(103,232,249,0.85)' : 'rgba(253,224,71,0.85)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap' as const,
                    userSelect: 'none' as const,
                  }}>
                    100 kWh
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
