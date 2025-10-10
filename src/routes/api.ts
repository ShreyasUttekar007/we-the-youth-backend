import { Router } from "express";
import Registration from "../models/Registration";
import Subscription from "../models/Subscription";
import PriorityVote from "../models/PriorityVote";
import Leader from "../models/Leader";
const sgMail = require("@sendgrid/mail");

const router = Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route   POST api/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    // Save new registration
    const newRegistration = new Registration(req.body);
    await newRegistration.save();

    // Prepare welcome email
    const msg = {
      to: email,
      from: "wetheyouthinspire@gmail.com", // Must be verified in SendGrid
      subject: "🎉 Welcome to We The Youth!",
      text: "Welcome to We The Youth — we’re thrilled to have you on board!",
      html: `
        <p>Hi,</p>
        <p>Welcome to <b>We The Youth</b> — we’re thrilled to have you on board!</p>
        <p>You have just joined a growing community of young Indians who believe that our voices can and must shape the nation’s future. Here, we don’t wait for change — we create it.</p>
        <p>Over the coming weeks, you’ll receive:</p>
        <ul>
          <li>✅ Updates on youth-led discussions, campaigns, and surveys.</li>
          <li>✅ Opportunities to share your ideas and opinions on key issues.</li>
          <li>✅ Invitations to events, dialogues, and volunteer activities near you.</li>
        </ul>
        <p>Every opinion counts. Every idea matters. Together, we’re redefining what youth participation in India looks like.</p>
        <p>Stay tuned — and make sure you follow us on:<br/>
          Instagram: <a href="https://www.instagram.com/wetheyouth2025">wetheyouth2025</a><br/>
          Twitter (X): <a href="https://x.com/wethe_youth">wethe_youth</a><br/>
          YouTube: <a href="https://youtube.com/@wetheyouth2025?si=RstpulhTSXLGJlV2">We The Youth</a>
        </p>
        <p>Welcome to the movement.<br/>Warm regards,<br/><b>Team We The Youth</b></p>
        <p style="font-size:12px;color:#888;">
          You’re receiving this email because you registered with We The Youth.
          If this wasn’t you, please ignore or <a href="#">unsubscribe</a>.
        </p>
      `,
    };

    // Send email via SendGrid
    await sgMail.send(msg);

    // Send success response
    res
      .status(201)
      .json({ msg: "Registration successful. Welcome email sent!" });
  } catch (err: any) {
    console.error("Error during registration:", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Please enter a valid email" });
  }

  try {
    // Check if already subscribed
    let subscription = await Subscription.findOne({ email });
    if (subscription) {
      return res.status(400).json({ msg: "Email already subscribed" });
    }

    // Save new subscription
    subscription = new Subscription({ email });
    await subscription.save();

    // Prepare email message
    const msg = {
      to: email,
      from: "wetheyouthinspire@gmail.com",
      subject: "🎉 Welcome to We The Youth!",
      html: `
        <p>Hi,</p>
        <p>Welcome to <b>We The Youth</b> — we’re thrilled to have you on board!</p>
        <p>You have just joined a growing community of young Indians who believe that our voices can and must shape the nation’s future. Here, we don’t wait for change — we create it.</p>
        <p>Over the coming weeks, you’ll receive:</p>
        <ul>
          <li>✅ Updates on youth-led discussions, campaigns, and surveys.</li>
          <li>✅ Opportunities to share your ideas and opinions on key issues.</li>
          <li>✅ Invitations to events, dialogues, and volunteer activities near you.</li>
        </ul>
        <p>Every opinion counts. Every idea matters. Together, we’re redefining what youth participation in India looks like.</p>
        <p>Stay tuned — and make sure you follow us on:<br/>
          Instagram: <a href="https://www.instagram.com/wetheyouth2025">wetheyouth2025</a><br/>
          Twitter (X): <a href="https://x.com/wethe_youth">wethe_youth</a><br/>
          YouTube: <a href="https://youtube.com/@wetheyouth2025?si=RstpulhTSXLGJlV2">We The Youth</a>
        </p>
        <p>Welcome to the movement.<br/>Warm regards,<br/><b>Team We The Youth</b></p>
      `,
    };

    // Send email
    await sgMail.send(msg);

    // Respond success
    res
      .status(201)
      .json({ msg: "Subscription successful. Welcome email sent!" });
  } catch (err: any) {
    console.error("Error during subscription:", err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/priorities/votes
// @desc    Get all priority votes
// @access  Public
router.get("/priorities/votes", async (req, res) => {
  try {
    const votes = await PriorityVote.find();
    res.json(votes);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/priorities/vote
// @desc    Vote for a priority
// @access  Public
router.post("/priorities/vote", async (req, res) => {
  const { priority } = req.body;
  if (!priority) {
    return res.status(400).json({ msg: "Priority is required" });
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
    res.status(500).send("Server Error");
  }
});

// @route   GET api/leaders
// @desc    Get all leaders
// @access  Public
router.get("/leaders", async (req, res) => {
  try {
    const leaders = await Leader.find();
    res.json(leaders);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/leaders/:id/vote
// @desc    Vote for a leader
// @access  Public
router.post("/leaders/:id/vote", async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ msg: "Leader not found" });
    }
    leader.votes += 1;
    await leader.save();
    res.json(leader);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
