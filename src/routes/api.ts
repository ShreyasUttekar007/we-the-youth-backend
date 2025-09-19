import { Router } from 'express';
import Registration from '../models/Registration';
import Subscription from '../models/Subscription';
import PriorityVote from '../models/PriorityVote';
import Leader from '../models/Leader';

const router = Router();

// @route   POST api/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json({ msg: 'Registration successful' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'Please enter a valid email' });
  }

  try {
    let subscription = await Subscription.findOne({ email });
    if (subscription) {
      return res.status(400).json({ msg: 'Email already subscribed' });
    }

    subscription = new Subscription({ email });
    await subscription.save();
    res.status(201).json({ msg: 'Subscription successful' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/priorities/votes
// @desc    Get all priority votes
// @access  Public
router.get('/priorities/votes', async (req, res) => {
  try {
    const votes = await PriorityVote.find();
    res.json(votes);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/priorities/vote
// @desc    Vote for a priority
// @access  Public
router.post('/priorities/vote', async (req, res) => {
  const { priority } = req.body;
  if (!priority) {
    return res.status(400).json({ msg: 'Priority is required' });
  }

  try {
    let priorityVote = await PriorityVote.findOne({ priority });
    if (priorityVote) {
      priorityVote.votes += 1;
      await priorityVote.save();
    } else {
      priorityVote = new PriorityVote({ priority, votes: 1 });
      await priorityVote.save();
    }
    res.status(201).json(priorityVote);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/leaders
// @desc    Get all leaders
// @access  Public
router.get('/leaders', async (req, res) => {
  try {
    const leaders = await Leader.find();
    res.json(leaders);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/leaders/:id/vote
// @desc    Vote for a leader
// @access  Public
router.post('/leaders/:id/vote', async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ msg: 'Leader not found' });
    }
    leader.votes += 1;
    await leader.save();
    res.json(leader);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
