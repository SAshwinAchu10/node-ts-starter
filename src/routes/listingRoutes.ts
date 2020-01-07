import { Router } from 'express';
import Controller from '../controller/listing.controller';

const listing: Router = Router();
const controller = new Controller();

listing.get('/', controller.findAll);

listing.get('/q', controller.findByParam);

listing.post('/', controller.create);

listing.get('/top', controller.findTopListing);

listing.get('/count', controller.findListingsCount);

listing.patch('/:id/like', controller.patchListingLike);

listing.patch('/:id/request', controller.patchListingRequest);

export default listing;
