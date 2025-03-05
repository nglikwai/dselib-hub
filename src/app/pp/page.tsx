import { metaData, SubjectMetaType } from 'src/data/meta';

import SubjectCard from './_components/SubjectCard';

import { Badge } from '@/components/components/ui/badge';
import { webData } from '@/constants/index';

export default function Home() {
  return (
    <div className='border-l border-dashed'>
      <div className='grid'>
        <div className='border-b border-dashed'>
          <div className='container mx-auto px-6 border-x border-dashed py-12 flex flex-col items-start gap-4'>
            <h1>{webData.slogan}</h1>
            <div className='text-neutral-500 text-lg leading-10 font-light'>
              <p>{webData.description}</p>
              所有試題均來自網上。
            </div>
            <div className='flex gap-5 items-center'>
              <Badge>DSE</Badge>
              <span className='text-sm'>CE</span>
              <span className='text-sm'>A-Level</span>
            </div>
          </div>
        </div>

        <div className='grid gap-12 container mx-auto px-6 border-x border-dashed py-10 pb-20'>
          {allSubjects.map(category => (
            <div className='grid gap-4' key={category.key}>
              <h2>{category.displayNameTc}</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {category.items.map(subject => (
                  <SubjectCard key={subject.key} subject={subject} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const getMeta = (subjects: string[]) =>
  subjects.map(sub =>
    metaData.find(item => item.key === sub)
  ) as SubjectMetaType[];

const allSubjects = [
  {
    key: 'core',
    displayName: 'Core',
    displayNameTc: '核心科目',
    items: getMeta(['chi', 'eng', 'm0', 'ls']),
  },
  {
    key: 'science',
    displayName: 'Science',
    displayNameTc: '科學',
    items: getMeta(['phy', 'chem', 'bio', 'm1', 'm2']),
  },
  {
    key: 'business',
    displayName: 'Business',
    displayNameTc: '商業',
    items: getMeta(['bafs', 'econ']),
  },
  {
    key: 'liberal',
    displayName: '文科',
    displayNameTc: '文科',
    items: getMeta(['chihist', 'enghist', 'geog']),
  },
  {
    key: 'others',
    displayName: 'Others',
    displayNameTc: '其他',
    items: getMeta(['ict', 'ths']),
  },
];
