import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Invoice Manager" />

      <div className="flex flex-col gap-10">
       
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
