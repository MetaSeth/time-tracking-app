const express = require('express');
const router = express.Router();

const timeEntriesRouter = (db) => {
  // Create a time entry
  router.post('/', async (req, res) => {
    try {
      const { taskId, userId, entryDate, duration, comment } = req.body;

      const newTimeEntry = {
        taskId,
        userId,
        entryDate,
        duration,
        comment,
      };

      const entryRef = await db.collection('timeEntries').add(newTimeEntry);

      const createdEntry = { id: entryRef.id, ...newTimeEntry };

      res.status(201).json({ success: true, message: 'Time entry created', data: createdEntry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });

  // Get all time entries
  router.get('/', async (req, res) => {
    try {
      const snapshot = await db.collection('timeEntries').get();

      const entries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      res.status(200).json({ success: true, data: entries });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });

  return router;
};

module.exports = timeEntriesRouter;
