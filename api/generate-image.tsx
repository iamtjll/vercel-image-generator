import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  const quote = searchParams.get('quote') || 'This is a quote.';
  const name = searchParams.get('name') || 'Anonymous';
  const title = searchParams.get('title') || '';
  const logo = searchParams.get('logo') || '';
  const photo = searchParams.get('photo') || '';
  const bg = searchParams.get('bg') || '#111';
  const handle = searchParams.get('handle') || '';
  const website = searchParams.get('website') || '';

  const useImageBg = bg.startsWith('http');

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          backgroundColor: useImageBg ? '#000' : bg,
          backgroundImage: useImageBg ? `url(${bg})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: 100,
          color: 'white',
          fontFamily: 'sans-serif',
        },
        children: [
          // Dark overlay if bg is an image
          useImageBg && {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                top: 0,
                left: 0,
              },
            },
          },
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
                zIndex: 1,
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 48,
                color: '#FFD700',
                marginBottom: 20,
                zIndex: 1,
              },
              children: '★★★★★',
            },
          },
          title && {
            type: 'div',
            props: {
              style: {
                fontSize: 42,
                fontWeight: 600,
                marginBottom: 20,
                zIndex: 1,
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 36,
                textAlign: 'center',
                maxWidth: 1000,
                lineHeight: 1.4,
                zIndex: 1,
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
                zIndex: 1,
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
                zIndex: 1,
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
