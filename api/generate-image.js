import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const quote = searchParams.get('quote') || 'This is a quote.';
  const name = searchParams.get('name') || 'Anonymous';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'white',
          background: '#111',
          width: '100%',
          height: '100%',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ marginBottom: '40px' }}>{quote}</div>
        <div style={{ fontSize: 24, color: '#aaa' }}>– {name}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
