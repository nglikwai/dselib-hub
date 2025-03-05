import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'dselib',
    short_name: 'dselib',
    description: 'dselib',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/book.svg',
        sizes: '192x192',
        type: 'image/svg',
      },
    ],
  };
}
