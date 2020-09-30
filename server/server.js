require('dotenv').config();
// Import 3rd party packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pusher = require('pusher');

// Local imports
const messagesRoutes = require('./routes/messages');

// Variables
const app = express();
const port = process.env.PORT || 9000;
const mogno_uri = process.env.MONGO_URI;
const pusher = new Pusher({
  appId: '1082521',
  key: '1127e3079bb622dfb4a1',
  secret: '935df0ba091224d2fc7f',
  cluster: 'eu',
  encrypted: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('DB IS CONNECTED');

  const msgCollections = db.collection('messages');
  const changeStream = msgCollections.watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log('Error');
    }
  });
});

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', messagesRoutes);

// DB connection
mongoose.connect(mogno_uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure server
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
