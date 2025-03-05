import Link from 'next/link';

import { getSortedYears } from 'src/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/components/ui/card';

export default ({ subject }: { subject: SubjectType }) => {
  const years = getSortedYears(subject.years);

  return (
    <Link href={`/pp/${subject.key}`}>
      <Card className='hover:bg-secondary transition cursor-pointer'>
        <CardHeader>
          <CardTitle className='flex gap-2 items-center'>
            {subject.icon}
            <span>{subject.displayNameTc}</span>
          </CardTitle>
          <CardDescription>{subject.displayName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {years[0]}-{years.at(-1)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

type SubjectType = {
  key: string;
  displayName: string;
  displayNameTc: string;
  icon: React.ReactNode;
  years: string[];
};
