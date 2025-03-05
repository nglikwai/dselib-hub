import { SigninForm } from '@/modules/auth/components/SigninForm';

export default function SigninPage() {
  return (
    <div className='container mx-auto border-l border-r border-dashed flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm '>
        <SigninForm />
      </div>
    </div>
  );
}
