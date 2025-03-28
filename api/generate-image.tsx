import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const quote = searchParams.get('quote') || 'This is a quote';
  const name = searchParams.get('name') || 'Anonymous';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#111',
          padding: 80,
          fontSize: 48,
          color: 'white',
        },
        children: [
          { type: 'div', props: { children: quote } },
          {
            type: 'div',
            props: {
              style: { marginTop: 40, fontSize: 28, color: '#aaa' },
              children: `– ${name}`,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    }
  );
}
