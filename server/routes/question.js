import { Router } from 'express';
import { create, remove } from '../controllers/question';

const questionRouter = Router();

// Create question
questionRouter.get('/:testId', create);

// Remove question
questionRouter.delete('/:testId', remove);