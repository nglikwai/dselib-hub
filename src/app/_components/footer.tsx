import AdSense from '@/components/AdSense';

export default () => {
  return (
    <>
      <footer className=' text-neutral-400 border-dashed text-sm'>
        <div className='container mx-auto py-5 px-6 border-dashed grid gap-3'>
          <p className='text-center w-full'>
            © 2025 Dse Lib. All rights reserved.
          </p>
        </div>
      </footer>
      <AdSense />
    </>
  );
};
