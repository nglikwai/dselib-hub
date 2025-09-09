import SubjectCard from './_components/SubjectCard';

import { allSubjects, webData } from '@/constants/index';

export default function Home() {
  return (
    <main className='border-dashed'>
      <div className='grid'>
        <section className='lg:container w-full mx-auto px-6 border-dashed py-6  flex flex-col items-start gap-4'>
          <h1>{webData.slogan}</h1>
          <p className='text-neutral-500 text-lg leading-10 font-light'>
            All papers come from online
          </p>
          <menu className='flex gap-5 items-center'>
            <li className='text-sm'>DSE</li>
            <li className='text-sm'>CE</li>
            <li className='text-sm'>A-Level</li>
          </menu>
        </section>

        <div className='grid gap-12 lg:container mx-auto px-6 border-dashed py-10 pb-20'>
          {allSubjects.map(category => (
            <section className='grid gap-4' key={category.key}>
              {/* <h2>{category.displayNameTc}</h2> */}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {category.items.map(subject => (
                  <SubjectCard key={subject.key} subject={subject} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
