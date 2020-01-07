import BaseService from './base.service';
import Transaction from '../model/transaction.model';

let baseService = new BaseService();

export default class TransactionService {
  /**
   * Get all transaction
   * @param return
   * @returns return to transactionController
   **/
  public findAll = async (): Promise<any> => {
    const response = await baseService.findAll(Transaction);
    return response;
  };

  /**
   * transaction find by param
   * @param KEY
   * @param value
   * @param return
   * @returns return to transactionController
   **/
  public findByParam = async (key: String, value: String): Promise<any> => {
    let params = { KEY1: value };
    params = JSON.parse(JSON.stringify(params).replace('KEY1', key.toString()));
    const response = await baseService.findByParam(Transaction, params);
    return response;
  };

  /**
   * find list transaction count of user
   * @param userId
   * @param listingId
   * @param return
   * @returns return to transactionController
   **/
  public findListingTransactionsCountOfUser = async (
    listingId: String,
    userId: String,
  ): Promise<any> => {
    let params = { buyer_id: userId, listingId: listingId };
    const response = await baseService.findByParam(Transaction, params);
    return response.data.length > 0
      ? { data: { count: response.data.length }, statusCode: 200 }
      : response;
  };

  /**
   * create transaction
   * @param body
   * @param return
   * @returns return to transactionController
   **/
  public create = async (body: any): Promise<any> => {
    const response = await baseService.create(Transaction, body);
    return response;
  };
}
