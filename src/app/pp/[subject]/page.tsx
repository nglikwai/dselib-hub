import { ExternalLink } from 'lucide-react';
import data from 'src/data';
import { metaData } from 'src/data/meta';
import { getSortedYears } from 'src/lib/utils';

import PastpaperDisplay from './_components/PastpaperDisplay';

import { Badge } from '@/components/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/components/ui/tabs';

export default async ({ params }: { params: Promise<{ subject: string }> }) => {
  const { subject } = await params;

  const meta = metaData.find(item => item.key === subject);

  const years = getSortedYears(meta?.years ?? []);

  const papers = data[subject as keyof typeof data];

  const languages = Object.keys(papers);

  const examTags = ['DSE']
    .concat(meta?.years.some(y => +y < 2012) ? ['CE'] : [])
    .concat(meta?.years.some(y => y.includes('al')) ? ['AL'] : []);

  const formatPastpaper = (key: string) =>
    Object.entries(papers[key as keyof typeof papers] ?? {}).map(
      ([year, papers]) =>
        ({
          year,
          papers,
        }) as { year: string; papers: string[] }
    );

  return (
    <div className='py-4 grid'>
      <div className='flex justify-between'>
        <div className='grid gap-2 py-6'>
          <h1>{meta?.displayNameTc}</h1>
          <p className='text-neutral-400'>
            {years?.[0]}-{years?.at(-1)}
          </p>
          <div className='flex gap-2 mt-2'>
            {examTags.map(item => (
              <Badge variant={'secondary'} key={item}>
                <span className='mr-[6px]'>{item}</span>
                <ExternalLink size={12} />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue={languages[1] || languages[0]}>
        <div className='flex justify-end pb-4'>
          <TabsList>
            {[
              { key: 'chi', displayName: '中' },
              { key: 'eng', displayName: 'EN' },
            ].map(language => (
              <TabsTrigger
                key={language.key}
                value={language.key}
                disabled={!languages.includes(language.key)}
              >
                {language.displayName}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {['chi', 'eng'].map(language => (
          <TabsContent key={language} value={language}>
            <PastpaperDisplay
              pastpapers={formatPastpaper(language)}
              language={language}
              subject={subject}
              examTags={examTags}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
