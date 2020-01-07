import BaseService from './base.service';
import Listing from '../model/listing.model';
import * as moment from 'moment';
import { PAYCODE_INDEX_LENGTH } from '../constants/app.constants';

let baseService = new BaseService();

export default class ListingService {
  /**
   * Get all listing
   * @param return
   * @returns return to listingController
   **/
  public findAll = async (): Promise<any> => {
    const response = await baseService.findAll(Listing);
    return response;
  };

  /**
   * listing find by param
   * @param KEY
   * @param value
   * @param return
   * @returns return to listingController
   **/
  public findByParam = async (key: String, value: String): Promise<any> => {
    let params = { KEY: value };
    params = JSON.parse(JSON.stringify(params).replace('KEY', key.toString()));
    const response = await baseService.findByParam(Listing, params);
    return response;
  };

  /**
   * Create listing
   * @param body
   * @param return
   * @returns return to listingController
   **/
  public create = async (body: any): Promise<any> => {
    body.paycode = await generatePaycode(body);
    const response = await baseService.create(Listing, body);
    return response;
  };

  /**
   * find toplisting
   * @param return
   * @returns return to listingController
   **/
  public findTopListing = async (): Promise<any> => {
    let response = await Listing.find({
      createdAt: {
        $gte: moment().subtract(7, 'd'),
        $lte: moment(),
      },
    }).sort({ createdAt: -1 });
    if (!response) {
      return {
        statusCode: 404,
        data: `Not Found`,
      };
    } else {
      return {
        statusCode: 200,
        data: response,
      };
    }
  };

  /**
   * find listing count
   * @returns return to listingController
   **/
  public findListingsCount = async (): Promise<any> => {
    const response = await baseService.findAll(Listing);
    return response.data.length > 0
      ? { data: { count: response.data.length }, statusCode: 200 }
      : response;
  };

  /**
   * patch listing like
   * @param id
   * @returns return to listingController
   **/
  public patchListingLike = async (id: String): Promise<any> => {
    let listing = await baseService.findOne(Listing, { _id: id });
    listing.data.liked = !listing.data.liked;
    const response = await baseService.findOneAndUpdate(
      Listing,
      id,
      listing.data,
    );

    return response;
  };

  /**
   * patch listing request
   * @param id
   * @returns return to listingController
   **/
  public patchListingRequest = async (id: String): Promise<any> => {
    let listing = await baseService.findOne(Listing, { _id: id });
    if (listing.data.request_count) {
      listing.data.request_count++;
    } else {
      listing.data.request_count = 1;
    }
    const response = await baseService.findOneAndUpdate(
      Listing,
      id,
      listing.data,
    );
    return response;
  };
}

/**
 * generate listing paycode
 * @param listing
 **/
export const generatePaycode = async (listing: any): Promise<string> => {
  let paycode = '#';
  const firstThreeLettersOfTwitterHandle = listing.seller_twitter
    .substr(0, 3)
    .toUpperCase();

  let params = {
    paycode: {
      $regex: `#${firstThreeLettersOfTwitterHandle}\[0-9]{5}`,
      $options: 'i',
    },
  };
  let lastMatchingListing = await baseService.findByParam(Listing, params);

  lastMatchingListing = lastMatchingListing.data[0];
  paycode += firstThreeLettersOfTwitterHandle;
  if (lastMatchingListing && lastMatchingListing.paycode) {
    const lastPaycodeIndex: String = lastMatchingListing.paycode.slice(
      -PAYCODE_INDEX_LENGTH,
    );
    const newPaycodeIndex: Number = Number(lastPaycodeIndex) + 1;
    paycode += newPaycodeIndex.toString().padStart(PAYCODE_INDEX_LENGTH, '0');
  } else {
    paycode = paycode.padEnd(paycode.length + (PAYCODE_INDEX_LENGTH - 1), '0');
    paycode += '1';
  }
  return paycode;
};
