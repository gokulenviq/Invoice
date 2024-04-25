import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import img from '../../Image/Enviq-Tech-solution-Logo-white.png';


interface InvoicePdfProps {
  invoiceNo: string;
  clientName: string;
  date:string;
  total:string;
  website:string;
  clientAddress:string;
  status:string;
}
const descriptionItems = [
  { description: "Default Description", amount: 10000 } // Provide default values
];

const styles = StyleSheet.create({
  doc: {},
  page: {
    color: 'black',
    width: '100%', // Set the width to 100%
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 300,
    height: 50,
    marginBottom: 10,
    marginLeft:60,
    backgroundColor: '#C7C5C5',
  },
  address: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    fontSize:12,
    marginRight:30,
    color: 'black',
    marginBottom:5
  },
  invoiceid: {},
  sectionid: {
    color: 'black',
  },
  invoiceiddiv: {
    backgroundColor: '#E6DCDC',
    padding: 5,
   
  marginLeft:55,
  marginRight:30
  },
  company: {
    marginLeft:55,
  },
  invoiceidtotal: {},
  descriptionTotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft:55,
    marginRight:30,
    paddingRight: 20,
    paddingLeft: 20
  },
  amt: {
    display: 'flex',
    justifyContent: 'flex-end'
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



const InvoicePdf: React.FC<InvoicePdfProps> = ({ invoiceNo,website, clientName ,total,status,clientAddress ,date }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
            <div style={{ transform: 'rotate(40deg)', textAlign: 'center' }}>
              <div style={{ backgroundColor: '#DC2727', borderColor: '#A40000', width: 300, height: 75, color: '#FFFFFF', borderTopWidth: '7px', borderBottomWidth: '7px', fontSize: '25px', padding: '20px' }}>
              {status}
              </div>
            </div>
          </View>
          <img style={styles.image} src={img} />
          
          <Text style={styles.address}>
            <br />
            <b style={{ fontSize: 15 }}> WebCube Technologies</b>
           <ul>  GN Mills post, Thudiyalur, Coimbatore – 641029</ul>
          <ul>Tamil Nadu</ul>
           <ul> www.websitecube.in</ul>
            <ul>  Support : +91 7373055669</ul>
          </Text>
         
          <div style={styles.invoiceiddiv}>
            <View style={styles.sectionid}>
              <Text style={styles.invoiceid}>
                <b style={{ fontSize: 20 }}> Invoice: {invoiceNo}</b>
                <br />
                Invoice Date:{date}
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
                <Text style={{ fontSize: 18 }}><b>Total</b></Text>
              </View>
            </View>
          </div>
          <View>
            {descriptionItems && descriptionItems.map((item, index) => (
              <View key={index} style={styles.descriptionTotalContainer}>
                <Text>{item.description}</Text>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>
            ))}
          </View>
          <br />
          <div style={styles.invoiceiddiv}>
            <View style={styles.amt}>
              <Text style={styles.invoiceid}>
                <b style={{ fontSize: 14 }}><span style={{ marginLeft: 90 }}> Sub Total:</span><span >{total}</span> </b>
                <br />
                <b style={{ fontSize: 14 }}> <span style={{ marginLeft: 65 }}>Total Amount:</span><span >{total}</span></b>
              </Text>
            </View>
          </div>
          <br /><br /><br />
          <View style={styles.site}>
            <Text style={styles.sitelink}>
              <b> www.Enviqtech.com</b>
            </Text>
          </View>
          <br /><br /><br />
        </View>
      </Page>
    </Document>
  );
};


export default InvoicePdf;
