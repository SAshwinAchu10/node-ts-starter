import { Request, Response } from 'express';
import ListingService from '../service/listing.service';

const listingService = new ListingService();

export default class ListingController {
  /**
   * Get find all listing
   * @param req
   * @param res
   * @posts listing to listingService
   **/
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      let response = await listingService.findAll();
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * Get find param by listing
   * @param req
   * @param res
   * @posts listing to listingService
   **/
  public findByParam = async (req: Request, res: Response): Promise<any> => {
    try {
      let response = await listingService.findByParam(
        Object.keys(req.query)[0],
        String(Object.values(req.query)[0]),
      );
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * Get create listing
   * @param req
   * @param res
   * @posts listing to listingService
   **/
  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      const response = await listingService.create(req.body);
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * Get find top listing
   * @param req
   * @param res
   * @posts listing to listingService
   **/
  public findTopListing = async (req: Request, res: Response): Promise<any> => {
    try {
      const response = await listingService.findTopListing();
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * Get find count listing
   * @param req
   * @param res
   * @posts listing to listingService
   **/
  public findListingsCount = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    try {
      const response = await listingService.findListingsCount();
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * Get patch listing like
   * @param req
   * @param res
   * @posts listing to listingService
   **/
  public patchListingLike = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    try {
      const response = await listingService.patchListingLike(req.param('id'));
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  /**
   * Get patch listing request
   * @param req
   * @param res
   * @posts listing to listingService
   **/
  public patchListingRequest = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    try {
      const response = await listingService.patchListingRequest(
        req.param('id'),
      );
      return res.status(response.statusCode).json(response.data);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}
