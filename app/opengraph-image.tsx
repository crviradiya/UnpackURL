import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'UnpackURL - URL Analysis Tool'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #3b82f6',
            borderRadius: '16px',
            padding: '40px',
            background: 'rgba(59, 130, 246, 0.1)',
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 800,
              background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            UnpackURL
          </h1>
          <p
            style={{
              fontSize: 30,
              color: '#e5e7eb',
              margin: 0,
              textAlign: 'center',
            }}
          >
            URL Analysis Tool
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 