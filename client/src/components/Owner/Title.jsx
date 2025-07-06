import React from 'react';

const Title = ({ title, subTitle }) => {
  return (
    <div className='flex flex-col justify-center items-start text-left w-full'>
      <h1 className='font-semibold text-4xl md:text-[40px]'>{title}</h1>
      <p className='text-sm md:text-base text-gray-500/90 mt-2 w-full md:max-w-[700px]'>
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
