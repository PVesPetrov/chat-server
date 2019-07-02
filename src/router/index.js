import { Router } from "express";

const router = Router();
router.use("/ping", (req, res, next) => {
  res.send('You say "ping", I say "pong"');
});

export default router;
