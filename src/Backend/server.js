const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken'); // Add JWT module
const bcrypt = require('bcryptjs'); // Add bcrypt module

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

// Login endpoint with JWT token generation
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username exists in the database
    const user = await prisma.login.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches (without hashing)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Generate JWT token with expiration time
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// POST endpoint to create invoices
app.post('/api/invoices', async (req, res) => {
  try {
    const { invoiceNo, date, clientName, clientAddress, website, items, total, status } = req.body;

    const existingInvoice = await prisma.invoice.findUnique({
      where: {
        invoiceNo: invoiceNo,
      },
    });

    if (existingInvoice) {
      return res.status(400).json({ error: 'Invoice number already exists' });
    }

    const parsedDate = new Date(date);
    const isoDate = parsedDate.toISOString();

    const totalAsString = total.toString(); // Convert total to string
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo,
        date: isoDate,
        clientName,
        clientAddress,
        website,
        items: JSON.stringify(items),
        total: totalAsString, // Use the string representation
        status,

      },
    });
    res.status(201).json({ message: 'Invoice created successfully', invoice });

  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'An error occurred while creating the invoice' });
  }
});

// GET endpoint to fetch all invoices
app.get('/api/invoices', async (_, res) => {
  try {
    const invoices = await prisma.invoice.findMany();
    res.status(200).json(invoices);

  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'An error occurred while fetching invoices' });
  }
});


//DELETE endpoint to delete an invoice by invoice number
app.delete('/api/invoices/:invoiceNo', async (req, res) => {
  try {
    const { invoiceNo } = req.params;


    // Check if the invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: {
        invoiceNo: invoiceNo,
      },
    });

    if (!existingInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Delete the invoice
    await prisma.invoice.delete({
      where: {
        invoiceNo: invoiceNo,
      },
    });

    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'An error occurred while deleting the invoice' });
  }
});


// PATCH endpoint to update an invoice by invoice number
app.patch('/api/invoices/:invoiceNo', async (req, res) => {
  try {
    const { invoiceNo } = req.params;
    const { status, paidDate } = req.body;

    // Find the invoice by invoice number
    const invoice = await prisma.invoice.findUnique({
      where: {
        invoiceNo: invoiceNo,
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Update the status and paidDate fields
    const updatedInvoice = await prisma.invoice.update({
      where: {
        invoiceNo: invoiceNo,
      },
      data: {
        status: status,
        paidDate: paidDate ? new Date(paidDate) : null,
      },
    });

    res.status(200).json({ message: 'Invoice updated successfully', invoice: updatedInvoice });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'An error occurred while updating the invoice' });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
