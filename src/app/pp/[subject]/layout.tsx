import { ReactNode } from 'react';

import Breadcrumb from '../_components/breadcrumb';

import { webData } from '@/constants/index';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  // Fetch dynamic data (e.g., from an API or database)
  const subject = (await params).subject;

  return {
    title: `${subject} - ${webData.title}`, // Dynamic title
  };
}

export default async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ subject: string }>;
}) => {
  const { subject } = await params;
  return (
    <div className='container mx-auto px-6 py-8 border-l border-dashed'>
      <Breadcrumb subject={subject} />
      {children}
    </div>
  );
};
