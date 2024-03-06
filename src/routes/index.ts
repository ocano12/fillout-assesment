import { Router } from 'express';
import { filterController } from '../controller/filterController';
import { constants } from 'http2';

const router = Router();

router.get('/:formID/filteredResponses', filterController);

export default router;
