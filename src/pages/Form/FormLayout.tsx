import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const FormLayout = () => {
  const [rows, setRows] = useState([{ description: '', total: '' }]);
  const [successMessage, setSuccessMessage] = useState('');

  const addRow = () => {
    setRows([...rows, { description: '', total: '' }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Values:', {
      invoiceNo: event.target.invoiceNo.value,
      date: event.target.date.value,
      clientName: event.target.clientName.value,
      clientAddress: event.target.clientAddress.value,
      website: event.target.website.value,
      items: rows
    });
    setSuccessMessage('Form submitted successfully!');
    // Clear input fields
    event.target.reset();
    setRows([{ description: '', total: '' }]);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Invoice" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Invoice
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Invoice No
                  </label>
                  <input
                    type="text"
                    name="invoiceNo"
                    required
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    placeholder="date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    required
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Client Address
                  </label>
                  <input
                    type="text"
                    name="clientAddress"
                    required
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-5.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    required
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 mb-5 gap-9 sm:grid-cols-1">
                  <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedar bg-black">
                        <h3 className="font-medium text-white dark:text-white">
                          Create Invoice
                        </h3>
                      </div>
                      <div className="p-6.5">
                        {rows.map((row, index) => (
                          <div key={index}>
                            <div className="mb-4.5">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Description
                              </label>
                              <input
                                type="text"
                                name="description"
                                required
                                value={row.description}
                                onChange={(e) => handleInputChange(index, e)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                            </div>
                            <div className="mb-4.5">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Total
                              </label>
                              <input
                                type="text"
                                name="total"
                                required
                                value={row.total}
                                onChange={(e) => handleInputChange(index, e)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addRow}
                          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                        >
                          Add Row
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Show success message */}
      {successMessage && (
        <div className="fixed top-0 right-0 m-5 bg-green-500 text-white p-3 rounded-md">
          {successMessage}
        </div>
      )}
    </DefaultLayout>
  );
};

export default FormLayout;
