import { Router } from 'express';
import { listSchedules, getSchedule, createSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController.js';

const router = Router();

router.get('/', listSchedules);
router.get('/:id', getSchedule);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;
