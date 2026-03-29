'use client'

import React from 'react'

interface MarketCubeProps {
  marketId: string
  marketName: string
  type: 'Power' | 'Gas'
  size?: number
  direction?: 'left' | 'down'
  duration?: number
}

// Chaotic multi-axis rotation keyframes — each cube gets a unique variant
const SPIN_CHAOTIC = (n: string, v: number) => {
  const paths = [
    `@keyframes ${n} {
      0%   { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      25%  { transform: rotateX(90deg) rotateY(180deg) rotateZ(45deg); }
      50%  { transform: rotateX(200deg) rotateY(360deg) rotateZ(-30deg); }
      75%  { transform: rotateX(310deg) rotateY(180deg) rotateZ(60deg); }
      100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0deg); }
    }`,
    `@keyframes ${n} {
      0%   { transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); }
      20%  { transform: rotateY(120deg) rotateX(-60deg) rotateZ(30deg); }
      40%  { transform: rotateY(200deg) rotateX(-180deg) rotateZ(-45deg); }
      60%  { transform: rotateY(280deg) rotateX(-270deg) rotateZ(20deg); }
      80%  { transform: rotateY(340deg) rotateX(-340deg) rotateZ(-15deg); }
      100% { transform: rotateY(360deg) rotateX(-360deg) rotateZ(0deg); }
    }`,
    `@keyframes ${n} {
      0%   { transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg); }
      30%  { transform: rotateZ(-50deg) rotateX(130deg) rotateY(100deg); }
      50%  { transform: rotateZ(30deg) rotateX(180deg) rotateY(220deg); }
      70%  { transform: rotateZ(-40deg) rotateX(280deg) rotateY(300deg); }
      100% { transform: rotateZ(0deg) rotateX(360deg) rotateY(360deg); }
    }`,
    `@keyframes ${n} {
      0%   { transform: rotateX(0deg) rotateZ(0deg) rotateY(0deg); }
      25%  { transform: rotateX(-100deg) rotateZ(40deg) rotateY(90deg); }
      50%  { transform: rotateX(-180deg) rotateZ(-20deg) rotateY(200deg); }
      75%  { transform: rotateX(-280deg) rotateZ(50deg) rotateY(300deg); }
      100% { transform: rotateX(-360deg) rotateZ(0deg) rotateY(360deg); }
    }`,
  ]
  return paths[v % paths.length]
}

export default function MarketCube({ marketId, marketName, type, size = 120, direction = 'left', duration = 20 }: MarketCubeProps) {
  // Simple hash from marketId for variant selection
  const variant = marketId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)

  const h = size / 2
  const country = marketName.split(' ')[0]
  const isPower = type === 'Power'
  const logoSrc = isPower ? '/BSyellow_image.png' : '/BSblue_image.png'

  const symbol = marketId.toUpperCase()

  const faces = [
    'LOGO',
    type,
    country,
    'BlackSlon',
    symbol,
    'Token',
  ]
  const borderColor   = isPower ? 'rgba(251,191,36,0.55)'  : 'rgba(34,211,238,0.55)'
  const bgColor       = isPower ? 'rgba(180,120,0,0.08)'    : 'rgba(6,120,180,0.08)'
  const textColor     = isPower ? 'rgba(253,224,71,0.95)'   : 'rgba(103,232,249,0.95)'
  const glowColor     = isPower ? 'rgba(251,191,36,0.12)'   : 'rgba(34,211,238,0.12)'

  const spinAnimName = `mc-spin-${marketId.replace(/-/g, '')}`

  const faceSize = size + 2
  const faceOffset = -1

  const faceBase: React.CSSProperties = {
    position: 'absolute',
    width: faceSize,
    height: faceSize,
    top: faceOffset,
    left: faceOffset,
    border: `1px solid ${borderColor}`,
    background: isPower ? 'rgba(180,120,0,0.04)' : 'rgba(6,120,180,0.04)',
    boxShadow: `inset 0 0 8px ${glowColor}`,
    backdropFilter: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    fontSize: size * 0.145,
    fontWeight: 100,
    fontFamily: 'var(--font-raleway), sans-serif',
    letterSpacing: '0.04em',
    textAlign: 'center',
    padding: 4,
    userSelect: 'none',
    lineHeight: 1.2,
    overflow: 'hidden',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  } as React.CSSProperties

  const logoFaceStyle: React.CSSProperties = {
    position: 'absolute',
    width: faceSize,
    height: faceSize,
    top: faceOffset,
    left: faceOffset,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
    border: `1px solid ${borderColor}`,
    background: 'transparent',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }

  const faceTransforms = [
    `translateZ(${h}px)`,
    `rotateY(180deg) translateZ(${h}px)`,
    `rotateY(90deg) translateZ(${h}px)`,
    `rotateY(-90deg) translateZ(${h}px)`,
    `rotateX(90deg) translateZ(${h}px)`,
    `rotateX(-90deg) translateZ(${h}px)`,
  ]

  // Single label floating in the center of the cube

  const electricAnim = `mc-zap-${marketId.replace(/-/g, '')}`
  const electronSweep = `mc-electron-${marketId.replace(/-/g, '')}`
  const gasAnim = `mc-vapor-${marketId.replace(/-/g, '')}`

  return (
    <>
      <style>{`
        ${SPIN_CHAOTIC(spinAnimName, variant)}
        @keyframes ${electronSweep} {
          0%   { background-position: -100% 0; }
          40%  { background-position: 200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes ${electricAnim} {
          0%   { opacity: 0;   text-shadow: 0 0 0px rgba(253,224,71,0); }
          7%   { opacity: 0;   text-shadow: 0 0 0px rgba(253,224,71,0); }
          9%   { opacity: 1;   text-shadow: 0 0 20px #fff, 0 0 40px rgba(253,224,71,1), 0 0 80px rgba(251,191,36,0.7), 0 0 120px rgba(251,191,36,0.3); }
          12%  { opacity: 0.85; text-shadow: 0 0 3px rgba(253,224,71,0.6), 5px -3px 3px rgba(253,224,71,0.8), -4px 2px 2px rgba(251,191,36,0.5); }
          18%  { opacity: 1;   text-shadow: 0 0 4px #fff, 8px -4px 4px rgba(253,224,71,1), -3px 5px 3px rgba(253,224,71,0.7), 0 0 12px rgba(251,191,36,0.4); }
          20%  { opacity: 0.6; text-shadow: 0 0 1px rgba(253,224,71,0.2); }
          28%  { opacity: 0.8; text-shadow: 0 0 2px rgba(253,224,71,0.4), -3px 2px 2px rgba(253,224,71,0.5); }
          30%  { opacity: 1;   text-shadow: 0 0 30px #fff, 0 0 60px rgba(253,224,71,1), -10px 5px 8px rgba(253,224,71,0.9), 12px -6px 10px rgba(251,191,36,0.8), 0 0 100px rgba(251,191,36,0.4); }
          32%  { opacity: 0.5; text-shadow: 0 0 1px rgba(253,224,71,0.1); }
          45%  { opacity: 0.85; text-shadow: 0 0 2px rgba(253,224,71,0.5), 4px 3px 2px rgba(253,224,71,0.6); }
          47%  { opacity: 1;   text-shadow: 0 0 5px #fff, -6px -4px 4px rgba(253,224,71,0.9), 7px 2px 3px rgba(253,224,71,0.7), 0 0 15px rgba(251,191,36,0.5); }
          49%  { opacity: 0.65; text-shadow: 0 0 1px rgba(253,224,71,0.2); }
          62%  { opacity: 0.8; text-shadow: 0 0 2px rgba(253,224,71,0.4), 3px -2px 2px rgba(253,224,71,0.5); }
          64%  { opacity: 1;   text-shadow: 0 0 25px #fff, 0 0 50px rgba(253,224,71,1), 8px -8px 6px rgba(253,224,71,0.9), -10px 4px 8px rgba(251,191,36,0.7), 0 0 90px rgba(251,191,36,0.3); }
          66%  { opacity: 0.55; text-shadow: 0 0 1px rgba(253,224,71,0.15); }
          74%  { opacity: 1;   text-shadow: 0 0 20px #fff, 0 0 40px rgba(253,224,71,1), 0 0 80px rgba(251,191,36,0.6); }
          77%  { opacity: 0;   text-shadow: 0 0 0px rgba(253,224,71,0); }
          100% { opacity: 0;   text-shadow: 0 0 0px rgba(253,224,71,0); }
        }
        @keyframes ${gasAnim} {
          0%   { opacity: 0.1;  filter: blur(4px);  letter-spacing: 0.15em; text-shadow: 0 0 20px rgba(56,189,248,0.3), 0 2px 4px rgba(56,189,248,0.2), 0 -2px 4px rgba(100,200,255,0.2); transform: scale(0.96); }
          12%  { opacity: 0.7;  filter: blur(0.8px);letter-spacing: 0.08em; text-shadow: 0 0 10px rgba(56,189,248,0.6), 2px 3px 6px rgba(30,144,220,0.5), -2px -2px 6px rgba(100,210,255,0.4), 0 4px 8px rgba(56,189,248,0.3); transform: scale(0.99); }
          22%  { opacity: 1;    filter: blur(0px);  letter-spacing: 0.04em; text-shadow: 0 0 6px rgba(56,189,248,0.8), 2px 3px 4px rgba(30,144,220,0.6), -2px -2px 4px rgba(100,210,255,0.5), 0 5px 10px rgba(56,189,248,0.3), 3px 1px 3px rgba(80,180,240,0.4), -3px 2px 3px rgba(80,180,240,0.4); transform: scale(1); }
          60%  { opacity: 1;    filter: blur(0px);  letter-spacing: 0.04em; text-shadow: 0 0 5px rgba(56,189,248,0.7), 2px 3px 4px rgba(30,144,220,0.5), -2px -2px 4px rgba(100,210,255,0.4), 0 4px 8px rgba(56,189,248,0.25), 3px 1px 3px rgba(80,180,240,0.35), -3px 2px 3px rgba(80,180,240,0.35); transform: scale(1); }
          78%  { opacity: 0.6;  filter: blur(1.5px);letter-spacing: 0.1em;  text-shadow: 0 -3px 12px rgba(56,189,248,0.4), 0 3px 8px rgba(30,144,220,0.3), 2px 0px 6px rgba(100,210,255,0.3); transform: scale(1.01); }
          92%  { opacity: 0.15; filter: blur(4px);  letter-spacing: 0.15em; text-shadow: 0 -6px 18px rgba(56,189,248,0.15), 0 4px 10px rgba(56,189,248,0.1); transform: scale(1.04); }
          100% { opacity: 0.1;  filter: blur(4px);  letter-spacing: 0.15em; text-shadow: 0 0 20px rgba(56,189,248,0.3), 0 2px 4px rgba(56,189,248,0.2), 0 -2px 4px rgba(100,200,255,0.2); transform: scale(0.96); }
        }
      `}</style>
      <div
        style={{
          width: size,
          height: size,
          perspective: 5000,
          perspectiveOrigin: '50% 50%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: size,
            height: size,
            transformStyle: 'preserve-3d',
            animation: `${spinAnimName} ${duration}s linear infinite`,
            position: 'relative',
          }}
        >
          {/* Single 100 kWh label — inside 3D container at z=0 (center), trapped behind faces */}
          <div style={{
            position: 'absolute',
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: size * 0.2,
            pointerEvents: 'none',
          }}>
            <span style={{
              fontSize: size * 0.145,
              fontFamily: 'var(--font-raleway), sans-serif',
              letterSpacing: '0.04em',
              textAlign: 'center',
              lineHeight: 1.2,
              ...(isPower ? {
                fontWeight: 100,
                background: 'linear-gradient(90deg, rgba(253,224,71,0.85) 0%, rgba(253,224,71,0.85) 35%, #fff 48%, rgba(255,255,200,1) 50%, #fff 52%, rgba(253,224,71,0.85) 65%, rgba(253,224,71,0.85) 100%)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: `${electricAnim} 3s ease-in-out infinite, ${electronSweep} 1.8s ease-in-out infinite`,
                filter: 'drop-shadow(0 0 3px rgba(253,224,71,0.6))',
              } : {
                color: '#b8e8ff',
                fontWeight: 900,
                WebkitTextStroke: `${size * 0.012}px rgba(56,189,248,0.7)`,
                paintOrder: 'stroke fill' as const,
                animation: `${gasAnim} 7s ease-in-out infinite`,
              }),
            } as React.CSSProperties}>100 kWh</span>
          </div>

          {faceTransforms.map((transform, i) => (
            faces[i] === 'LOGO'
              ? <div key={i} style={{ ...logoFaceStyle, transform }}>
                  <img src={logoSrc} alt="logo" style={{ width: faceSize, height: faceSize, objectFit: 'cover', display: 'block', imageRendering: 'auto' }} />
                </div>
              : <div key={i} style={{ ...faceBase, transform }}>
                  <span style={{
                    color: textColor,
                    fontSize: size * 0.145,
                    fontWeight: 100,
                    letterSpacing: '0.04em',
                    textAlign: 'center',
                    opacity: 0.85,
                    fontFamily: 'var(--font-raleway), sans-serif',
                  }}>
                    {faces[i]}
                  </span>
                </div>
          ))}
        </div>
      </div>
    </>
  )
}
