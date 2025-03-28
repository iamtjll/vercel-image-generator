import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const quote = searchParams.get('quote') || 'This is a quote.';
  const name = searchParams.get('name') || 'Anonymous';
  const title = searchParams.get('title') || '';
  const logo = searchParams.get('logo') || '';
  const photo = searchParams.get('photo') || '';
  const bg = searchParams.get('bg') || '#111';
  const handle = searchParams.get('handle') || '';
  const website = searchParams.get('website') || '';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          background: bg.startsWith('http') ? `url(${bg}) center / cover` : bg,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          fontFamily: 'sans-serif',
          position: 'relative',
        },
        children: [
          logo && {
            type: 'img',
            props: {
              src: logo,
              style: {
                position: 'absolute',
                top: 40,
                right: 40,
                width: 120,
              },
            },
          },
          photo && {
            type: 'img',
            props: {
              src: photo,
              style: {
                borderRadius: '50%',
                width: 200,
                height: 200,
                marginBottom: 40,
                objectFit: 'cover',
              },
            },
          },
          title && {
            type: 'div',
            props: {
              style: {
                fontSize: 48,
                fontWeight: 'bold',
                marginBottom: 20,
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 40,
                textAlign: 'center',
                maxWidth: 1000,
              },
              children: quote,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: 30,
                fontSize: 28,
                color: '#ccc',
              },
              children: `– ${name}`,
            },
          },
          (handle || website) && {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 60,
                fontSize: 24,
                color: '#aaa',
                textAlign: 'center',
              },
              children: `${handle}${handle && website ? ' · ' : ''}${website}`,
            },
          },
        ],
      },
    },
    {
      width: 1500,
      height: 1500,
    }
  );
}
