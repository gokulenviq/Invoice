import React from 'react';
import ChartTwo from '../../components/Charts/ChartTwo';
import MapOne from '../../components/Maps/MapOne';
import DefaultLayout from '../../layout/DefaultLayout';

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
     
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo />
        <MapOne />
       
        <div className="col-span-12 xl:col-span-8">    
        </div>
           </div>
          
    </DefaultLayout>
  );
};

export default ECommerce;
