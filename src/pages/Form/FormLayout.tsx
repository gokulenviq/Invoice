import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

const FormLayout = () => {
  const [rows, setRows] = useState([{ description: '', amount: '' }]);
  const [successMessage, setSuccessMessage] = useState('');

  const addRow = () => {
    setRows([...rows, { description: '', amount: '' }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        invoiceNo: event.target.invoiceNo.value,
        date: event.target.date.value,
        clientName: event.target.clientName.value,
        clientAddress: event.target.clientAddress.value,
        website: event.target.website.value,
        status: event.target.status.value,
        items: rows
      };

      // Calculate total by summing up all item amounts
      let total = 0;
      rows.forEach(row => {
        total += parseFloat(row.amount);
      });

      // Format total amount with Indian numbering system
      const formattedTotal = total.toLocaleString('en-IN');

      formData.total = formattedTotal;

      // Make POST request to backend API

      const response = await axios.post('http://localhost:3000/api/invoices', formData);


      setSuccessMessage('Form submitted successfully!');

      // Clear input fields
      event.target.reset();
      setRows([{ description: '', amount: '' }]);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

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
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Client status
                  </label>
                  <select
                    name="status"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
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
                                Amount
                              </label>
                              <input
                                type="text"
                                name="amount"
                                required
                                value={row.amount}
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
