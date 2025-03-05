'use client';

import PastpaperCard, { PastpaperType } from './PastpaperCard';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/components/ui/tabs';

export default ({
  pastpapers,
  language,
  subject,
  examTags,
}: {
  pastpapers: PastpaperType[];
  language: string;
  subject: string;
  examTags: string[];
}) => {
  const getFilteredPastPapers = (tag: string) =>
    pastpapers
      .filter(pp => {
        switch (tag) {
          case 'DSE':
            return (
              +pp.year >= 2012 || ['sp', 'pp'].some(s => pp.year.includes(s))
            );
          case 'CE':
            return +pp.year < 2012;
          case 'AL':
            return pp.year.includes('al');
          default:
            return true;
        }
      })
      .toSorted(
        (a, b) => +b.year.replace('al', '') - +a.year.replace('al', '')
      );

  return (
    <Tabs defaultValue='DSE'>
      <div className='flex justify-end pb-4'>
        <TabsList>
          {examTags.map(tag => (
            <TabsTrigger key={tag} value={tag}>
              {tag}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {examTags.map(tag => (
        <TabsContent key={tag} value={tag}>
          <div className='flex flex-col gap-4 '>
            {getFilteredPastPapers(tag).map(({ year, papers }) => (
              <PastpaperCard
                tag={tag}
                key={year}
                pastpaper={
                  { year, papers } as { year: string; papers: string[] }
                }
                language={language}
                subject={subject}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
