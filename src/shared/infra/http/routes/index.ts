
import { expenseRouter } from '@modules/expenses/infra/http/routes/expense.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import { Router } from 'express';

const router = Router();

router.use('/user', userRouter);
router.use('/sessions', sessionRouter);
router.use('/expenses', expenseRouter);

export default router;
