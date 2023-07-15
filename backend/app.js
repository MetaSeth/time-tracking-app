const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const timeEntriesRouter = require('./routes/TimeEntries');

const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Create a Firestore database instance
const db = admin.firestore();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/time-entries', timeEntriesRouter);

// Routes
app.post('/api/time-entries', async (req, res) => {
    try {
      const { taskId, userId, entryDate, duration, comment } = req.body;
  
      // Create the time entry document in Firestore
      const entryRef = await db.collection('timeEntries').add({
        taskId,
        userId,
        entryDate,
        duration,
        comment,
      });
  
      res.status(201).json({ entryId: entryRef.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  app.get('/api/time-entries', async (req, res) => {
    try {
      // Retrieve all time entries from Firestore
      const snapshot = await db.collection('timeEntries').get();
  
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      res.status(200).json({ entries });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
