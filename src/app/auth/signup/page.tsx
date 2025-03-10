import { SignupForm } from '@/modules/auth/components/SignupForm';

export default function SignupPage() {
  return (
    <div className='flex max-ava-h w-full items-center justify-center p-6 md:p-10 border-x border-dashed container mx-auto'>
      <div className='w-full max-w-sm'>
        <SignupForm />
      </div>
    </div>
  );
}
