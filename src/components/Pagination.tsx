import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 6;
      } else if (currentPage + 3 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='flex flex-wrap items-center justify-center space-x-2 mt-8'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      {pageNumbers[0] > 1 && (
        <>
          <Button variant='outline' onClick={() => onPageChange(1)}>
            1
          </Button>
          {pageNumbers[0] > 2 && (
            <Button variant='outline' disabled>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          )}
        </>
      )}

      {pageNumbers.map(number => (
        <Button
          key={number}
          variant={currentPage === number ? 'default' : 'outline'}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <Button variant='outline' disabled>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          )}
          <Button variant='outline' onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
}
