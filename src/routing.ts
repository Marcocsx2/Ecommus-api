import express from 'express';
import fname from './middleware/fname';
import fn from './functions';

const router = express();

router.post('/', fname, fn);

export default router;
