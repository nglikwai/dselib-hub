'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/components/ui/tabs';

export default ({ languages }: { languages: string[] }) => {
  return (
    <Tabs defaultValue='chi'>
      <TabsList>
        {[
          {
            key: 'chi',
            displayName: '中',
          },
          {
            key: 'eng',
            displayName: 'EN',
          },
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
    </Tabs>
  );
};
