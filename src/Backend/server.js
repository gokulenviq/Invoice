const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

// Login endpoint
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

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful' });
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
    console.log("response",res)
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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
