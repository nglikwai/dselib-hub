import Link from 'next/link';

import { AudioLines, FileText } from 'lucide-react';

import DownloadButton from './DownloadButton';

import { buttonVariants } from '@/components/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/components/ui/card';

export type PastPaperPropsType = {
  pastpaper: PastpaperType;
  language: string;
  subject: string;
  tag: string;
};

export default (props: PastPaperPropsType) => {
  const { pastpaper, language, subject, tag } = props;
  return (
    <Card className='border-dashed shadow-none'>
      <CardHeader>
        <CardTitle className='flex gap-2 items-center'>
          {pastpaper.year.replace('al', '')} {tag !== 'DSE' && tag}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex justify-between gap-4'>
        <div className='flex gap-4 flex-wrap'>
          {pastpaper.papers.map(item => (
            <Link
              target='_blank'
              key={item}
              className={buttonVariants({ variant: 'secondary' })}
              href={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${subject}/${language}/${pastpaper.year}/${item}`}
            >
              {item.includes('mp3') ? (
                <AudioLines />
              ) : (
                <FileText stroke='#00000077' />
              )}
              <span> {item}</span>
            </Link>
          ))}
        </div>

        <DownloadButton {...props} />
      </CardContent>
    </Card>
  );
};

export type PastpaperType = {
  year: string;
  papers: string[];
};
