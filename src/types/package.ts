// types/package.ts
export type Package = {
  no: number;
  name: string;
  invoiceNo: number;
  invoiceDate: string;
  amt: number;
  status: string;
  clientName: string; // Add clientName property
  date: string; // Add date property
  items: { total: number }[]; // Add items property with total property inside
  description: string;
  amount: number;
};
