import { ArrowDownToLine } from 'lucide-react';
import { toast } from 'sonner';

import { PastPaperPropsType } from './PastpaperCard';

import { Button } from '@/components/components/ui/button';

export default (props: PastPaperPropsType) => {
  const { pastpaper, language, subject } = props;
  const { year, papers } = pastpaper;
  const links = papers.map(
    item =>
      `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${subject}/${language}/${year}/${item}`
  );

  const downloadFile = async (url: string) => {
    const fileName = url.split('/').pop() || 'download.pdf';
    const savedName = subject + '-' + year + '-' + fileName;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      const blob = await response.blob();

      // Create an object URL for the blob
      const downloadUrl = URL.createObjectURL(blob);

      // Extract a file name from the URL or default to 'download.pdf'
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = savedName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up the object URL after a short delay
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
    } catch (error) {
      console.error('Error downloading file:', url, error);
      toast.error(`${savedName} 下載不成功，請左則單個下載`, {
        duration: 60000,
      });
    }
  };

  // Trigger downloads sequentially, with a small delay between each
  const downloadFilesSequentially = async () => {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        for (const url of links) {
          await downloadFile(url);
          // Adding a slight delay (500ms) between downloads can sometimes help
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        reject(error);
      }

      resolve('done');
    });

    toast.promise(myPromise, {
      loading: '正在下載',
      success: `下載成功`,
    });
  };

  const handleClick = () => {
    downloadFilesSequentially();
  };

  return (
    <Button onClick={handleClick}>
      <ArrowDownToLine /> {language === 'chi' ? '下載' : 'Download'}
    </Button>
  );
};
