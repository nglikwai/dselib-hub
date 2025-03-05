'use client';
import Script from 'next/script';

const AdSense = () => {
  return (
    <>
      <Script
        async
        src={
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6622218753379872'
        }
        crossOrigin='anonymous'
      />

      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client='ca-pub-6622218753379872'
        data-ad-slot='9949100685'
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
      <Script id='adsbygoogle-init'>
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </Script>
    </>
  );
};

export default AdSense;
