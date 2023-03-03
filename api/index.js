require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('../config/db');

const tourRoutes = require('../routes/tourRoutes');
const adminRoutes = require('../routes/adminRoutes');

const statisticsRoutes = require('../routes/statisticsRoutes');
const userRoutes = require('../routes/userRoutes');

const branchRoutes = require('../routes/branchRoutes');
const kassaRoutes = require('../routes/kassaRoutes');
const profitRoutes = require('../routes/profitRoutes');
const { isAuth, isAdmin } = require('../config/auth');

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
app.set('trust proxy', 1);

app.use(express.json({ limit: '4mb' }));
app.use(helmet());
app.use(cors());

//root route
app.get('/', (req, res) => {
  res.send('App works properly!');
});

//this for route will need for store front, also for admin dashboard

app.use('/api/branch/', branchRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/tour/', tourRoutes);
app.use('/api/kassa/', kassaRoutes);
app.use('/api/profit/', profitRoutes);
app.use('/api/statistics/', statisticsRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use('/api/admin/', adminRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
