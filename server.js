import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3001;
const uri = 'mongodb+srv://maaliehtisham:me2232002@datamark.nsbz5lg.mongodb.net/?retryWrites=true&w=majority&appName=DATAMARK';
const client = new MongoClient(uri);

let dbInstance;

const getDb = async () => {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db('DATAMARK');
  }
  return dbInstance;
};

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  console.log('Received registration request:', req.body); // Debugging log
  try {
    const { emailHash, passwordHash, walletAddress } = req.body;

    if (!emailHash || !passwordHash || !walletAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Proceed to store user data in database
    const db = await getDb();
    const existingUser = await db.collection('users').findOne({ emailHash });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const result = await db.collection('users').insertOne({ emailHash, passwordHash, walletAddress });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in /api/register:', error);
    res.status(500).json({ error: `Failed to register user: ${error.message}` });
  }
});

app.post('/api/login', async (req, res) => {
  console.log('Received login request:', req.body); // Debugging log
  try {
    const { emailHash, passwordHash } = req.body;

    if (!emailHash || !passwordHash) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = await getDb();
    const user = await db.collection('users').findOne({ emailHash });
    if (user && user.passwordHash === passwordHash) {
      res.status(200).json({ success: true, walletAddress: user.walletAddress });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error in /api/login:', error);
    res.status(500).json({ error: `Failed to login user: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
