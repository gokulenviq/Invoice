import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import img from '../../Image/Enviq-Tech-Logo.png';


interface InvoicePdfProps {
  invoiceNo: string;
  clientName: string;
  date:string;
  total:string;
  website:string;
  clientAddress:string;
  status:string;
  items:string
  paidDate:string
}




const styles = StyleSheet.create({
  doc: {},
  page: {
    color: 'black',
    width: '100%', // Set the width to 100%
    fontFamily:'Arial, Helvetica, sans-serif'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    marginTop:5,
    marginBottom: 10,
    marginLeft:60,
   
  },
  address: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    fontSize:12,
    marginRight:38,
    color: 'black',
    marginBottom:5
  },
 
  sectionid: {
    color: 'black',
   
  },
  center:{
    paddingBottom:15,
    paddingTop:15,
    marginRight:10

  },
  invoiceiddiv: {
    backgroundColor: '#F2F2F2',
   
    marginLeft:30,
    marginRight:30
  },
  company: {
    marginLeft:30,
  },
  invoiceidtotal: {},
  descriptionTotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft:30,
    marginRight:30,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom:17,
    paddingTop:20
 
  },
  descriptionTotalContainerdiv:{
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft:10,
  
    marginRight:30,
    paddingRight: 20,
    paddingLeft: 20,
    
  },
  amt: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom:20,
    paddingTop:20
  },
  amount: {
    marginLeft: 50
  },
  site: {},
  sitelink: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  paid: {},
  paidamt: {
    borderRightColor: '#F91313'
  },
});




const InvoicePdf: React.FC<InvoicePdfProps> = ({ invoiceNo,website,paidDate,items, clientName ,total,status,clientAddress ,date }) => {
  const parsedItems = JSON.parse(items);
  const pdfDate = paidDate || date;
 
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
        <View>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
  {/* Image */}
  <img style={styles.image} src={img} alt="Logo" />

  {/* Status */}
  <div style={{ marginLeft: 'auto', textAlign: 'center', alignItems: 'flex-end' }}>
    <div style={{
      backgroundColor: status === 'paid' ? '#4CAF50' : status === 'unpaid' ? '#DC2727' : '#DC2727',
      borderColor: status === 'paid' ? '#2AA22E' : status === 'unpaid' ? '#A40000' : '#A40000',
      width: 300,
      height: 75,
      color: '#FFFFFF',
      borderTopWidth: '5px',
      borderBottomWidth: '5px',
      fontSize: '30px',
      padding: '20px'
    }}>
      <b>{status.toUpperCase()}</b>
    </div>
  </div>
</div>

</View>
          <Text style={styles.address}>
            <br />
            <b style={{ fontSize: 15 }}> ENVIQ TECH</b>
           <ul>  GN Mills post, Thudiyalur, Coimbatore – 641029</ul>
          <ul>Tamil Nadu</ul>
           <ul> www.enviqtech.com</ul>
            <ul>  Support : +91 7373055669</ul>
          </Text>
          <br />
          <div style={styles.invoiceiddiv}>
            <View style={styles.sectionid}>
              <Text >
               <div style={styles.center}>
               <b style={{ fontSize: 20 }}> Invoice #{invoiceNo}</b>
                <br />
                Invoice Date:{pdfDate}
               </div>
              </Text>
            </View>
          </div>
          <div style={styles.company}>
          <Text >
           
            <b style={{ fontSize: 15 }}> Invoiced To:</b><br />
     
            {clientName}
            <br />
            {clientAddress}
            <br />
            website:<b>{website}</b>
            <br />
          </Text>
          </div>
          <br />
          <div style={styles.invoiceiddiv}>
            <View style={styles.sectionid}>
              <View style={styles.descriptionTotalContainer}>
                <Text style={{ fontSize: 18 }}><b>Description</b></Text>
                <Text style={{ fontSize: 18 }}><b>Total </b></Text>
              </View>
            </View>
          </div>
          <View>
                         {parsedItems && parsedItems.map((item, index) => (
    <View key={index} style={styles.descriptionTotalContainerdiv}>
             <Text>{item.description}</Text>
      <Text style={styles.amount}>
        
        <span style={{}}> {item.amount} </span> &nbsp;
        <span style={{}}>INR</span>
      </Text>
    </View>
  ))}
</View>
          <br />
          <div style={styles.invoiceiddiv}>
            <View style={styles.amt}>
            <Text >
                <b style={{ fontSize: 14 }}><span style={{ marginLeft: 90 }}> Sub Total:</span> &nbsp; &nbsp;<span >Rs {total} INR</span> </b> &nbsp; &nbsp;
                <br />
                <b style={{ fontSize: 14 }}> <span style={{ marginLeft: 65 }}>Total Amount:</span> &nbsp; &nbsp;<span >Rs {total} INR</span></b> &nbsp; &nbsp;
              </Text>
            </View>
          </div>
          <br /><br />
          <View style={styles.site}>
            <Text style={styles.sitelink}>
              <b>www.enviqtech.com</b>
            </Text>
          </View>
        
        </View>
      </Page>
    </Document>
  );
};


export default InvoicePdf;
