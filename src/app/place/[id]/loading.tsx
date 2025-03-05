export default function PlaceDetailsSkeleton() {
  return (
    <div className='container mx-auto px-4 py-8 pt-12 border-x border-dashed'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          {/* Header Section */}
          <div className='space-y-4 mb-8'>
            <div className='h-8 bg-gray-200 rounded-md w-3/4 animate-pulse' />
            <div className='flex items-center space-x-2'>
              <div className='h-6 bg-gray-200 rounded w-16 animate-pulse' />
              <div className='h-6 bg-gray-200 rounded w-24 animate-pulse' />
            </div>
          </div>

          {/* Tabs */}
          <div className='flex space-x-8 border-b'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='h-12 bg-gray-200 rounded w-24 animate-pulse mb-4'
              />
            ))}
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
            {/* Left Content */}
            <div className='md:col-span-2 space-y-6'>
              {/* Description */}
              <div className='space-y-3'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='h-8 bg-gray-200 rounded w-full animate-pulse'
                  />
                ))}
              </div>

              {/* General Info */}
              <div className='space-y-4'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='flex items-center space-x-4'>
                    <div className='h-6 w-6 bg-gray-200 rounded-full animate-pulse' />
                    <div className='h-6 bg-gray-200 rounded w-48 animate-pulse' />
                  </div>
                ))}
              </div>

              {/* Image Section */}
              <div className='aspect-video bg-gray-200 rounded-lg animate-pulse' />
            </div>
          </div>
        </div>

        <div>
          {/* Right Sidebar */}
          <div className='space-y-4'>
            <div className='h-14 bg-gray-200 rounded w-36 animate-pulse' />
            {/* Related Items */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex space-x-3'>
                <div className='h-16 w-16 bg-gray-200 rounded animate-pulse' />
                <div className='flex-1 space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
                  <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
