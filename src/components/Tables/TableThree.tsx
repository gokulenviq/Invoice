import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package } from '../../types/package';
import ViewPdf from '../Pdf/ViewPdf';
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js';
import InvoicePdf from '../Pdf/InvoicePdf';
import Pagination from './Pagination';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  return formattedDate;
};

const TableThree = () => {
  const [invoices, setInvoices] = useState<Package[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(15);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/invoices');
        // Format dates in response data
        const formattedInvoices = response.data.map(invoice => ({
          ...invoice,
          date: formatDate(invoice.date),
          // paidDate: formatDate(invoice.paidDate) // Format paidDate as well
        }));
        setInvoices(formattedInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPdf = async (invoice) => {
    const { invoiceNo, clientName, total, date, website, clientAddress, status, items, paidDate } = invoice;

    try {
      const htmlContent = ReactDOMServer.renderToString(<InvoicePdf invoiceNo={invoiceNo} items={items} website={website} clientName={clientName} status={status} clientAddress={clientAddress} date={date} total={total} paidDate={paidDate} />);

      const element = document.createElement('div');
      element.innerHTML = htmlContent;

      // Use html2pdf to convert HTML content to PDF
      html2pdf(element, {
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleDelete = async (invoiceNo) => {

    try {
      // Perform the DELETE request to your server endpoint
      await axios.delete(`http://localhost:3000/api/invoices/${invoiceNo}`);
      // If the deletion is successful, remove the deleted invoice from the local state
      setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.invoiceNo !== invoiceNo));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      // Handle error if deletion fails
    }
  };


  const handleViewPdf = (invoice) => {
    const { invoiceNo, clientName, total, date, website, clientAddress, status, items, paidDate } = invoice;
    const htmlContent = ReactDOMServer.renderToString(
      <ViewPdf
        invoiceNo={invoiceNo}
        items={items}
        website={website}
        clientName={clientName}
        status={status}
        clientAddress={clientAddress}
        date={date}
        total={total}
        paidDate={paidDate}
      />
    );
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.title = 'Invoice Preview';
    }
  };

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (invoiceNo) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.invoiceNo === invoiceNo ? { ...invoice, editMode: !invoice.editMode } : invoice
    );
    setInvoices(updatedInvoices);
    setEditMode(prevEditMode => !prevEditMode);
  };

  const handleStatusChange = async (e, invoiceNo) => {
    try {
      const updatedStatus = e.target.value;
      // Call handleUpdateInvoice function with the updated status
      await handleUpdateInvoice(invoiceNo, { status: updatedStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePaidDateChange = async (e, invoiceNo) => {
    try {
      const updatedPaidDate = e.target.value;
      // Call handleUpdateInvoice function with the updated paid date
      await handleUpdateInvoice(invoiceNo, { paidDate: updatedPaidDate });
    } catch (error) {
      console.error('Error updating paid date:', error);
    }
  };
  const handleUpdateInvoice = async (invoiceNo, updatedData) => {
    try {
      // Send PATCH request to update invoice
      await axios.patch(`http://localhost:3000/api/invoices/${invoiceNo}`, updatedData);

      // Update the invoice data in the frontend
      const updatedInvoices = invoices.map((invoice) => {
        if (invoice.invoiceNo === invoiceNo) {
          return { ...invoice, ...updatedData };
        } else {
          return invoice;
        }
      });
      setInvoices(updatedInvoices);
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substring(0, 10); // Extract only the date part
    return formattedDate;
  };


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">S.No</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Invoice No</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Client Name</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Generated Date</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Amount</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Paid Date</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{index + 1}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{invoice.invoiceNo}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{invoice.clientName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{invoice.date}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{invoice.total}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
  {invoice.editMode ? (
    <input
      id={`paidDate-${invoice.invoiceNo}`}
      type="date"
      value={invoice.paidDate ? formatDateForDisplay(invoice.paidDate) : ''}
      onChange={(e) => handlePaidDateChange(e, invoice.invoiceNo)}
      className="text-black dark:text-white"
    />
  ) : (
    <p className="text-black dark:text-white">
      {invoice.paidDate ? formatDateForDisplay(invoice.paidDate) : 'N/A'}
    </p>
  )}
</td>




                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {/* Status */}
                  {invoice.editMode ? (
                    <select
                      value={invoice.status}
                      onChange={(e) => handleStatusChange(e, invoice.invoiceNo)}
                      className="text-black dark:text-white"
                      disabled={invoice.paidDateEditable} // Disable status when paid date is editable
                    >
                      <option value="paid" className=" text-success">Paid</option>
                      <option value="unpaid" className=" text-danger">Unpaid</option>
                    </select>
                  ) : (
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${invoice.status === 'paid'
                          ? 'bg-success text-success'
                          : invoice.status === 'unpaid'
                            ? 'bg-danger text-danger'
                            : 'bg-warning text-warning'
                        }`}
                    >
                      {invoice.status}
                    </p>
                  )}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => handleDownloadPdf(invoice)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary" onClick={() => handleViewPdf(invoice)}>
                      {/* */}
                      <svg fill="#000000" height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 80.794 80.794" >
                        <g>
                          <g>
                            <path d="M79.351,38.549c-0.706-0.903-17.529-22.119-38.953-22.119c-21.426,0-38.249,21.216-38.955,22.119L0,40.396l1.443,1.847
			c0.706,0.903,17.529,22.12,38.955,22.12c21.424,0,38.247-21.217,38.953-22.12l1.443-1.847L79.351,38.549z M40.398,58.364
			c-15.068,0-28.22-13.046-32.643-17.967c4.425-4.922,17.576-17.966,32.643-17.966c15.066,0,28.218,13.045,32.642,17.966
			C68.614,45.319,55.463,58.364,40.398,58.364z"/>
                            <path d="M40.397,23.983c-9.052,0-16.416,7.363-16.416,16.414c0,9.053,7.364,16.417,16.416,16.417s16.416-7.364,16.416-16.417
			C56.813,31.346,49.449,23.983,40.397,23.983z M40.397,50.813c-5.744,0-10.416-4.673-10.416-10.417
			c0-5.742,4.672-10.414,10.416-10.414c5.743,0,10.416,4.672,10.416,10.414C50.813,46.14,46.14,50.813,40.397,50.813z"/>
                          </g>
                        </g>
                      </svg>
                    </button>



                    <button className="hover:text-primary" onClick={() => handleDelete(invoice.invoiceNo)}>

                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.600                 	4 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>

                    <button className="hover:text-primary" onClick={() => handleEdit(invoice.invoiceNo)}>
  {editMode ? (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" >
      <path
        fill="currentColor"   // Save or tick icon
        fillRule="evenodd"
        d="M14.707 3L5.5 12.207.293 7 1 6.293l4.5 4.5 8.5-8.5.707.707z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"      // Edit icon
      width="1em"
    >
      <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z" />
    </svg>
  )}
</button>


                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          invoicesPerPage={invoicesPerPage}
          totalInvoices={invoices.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default TableThree;
