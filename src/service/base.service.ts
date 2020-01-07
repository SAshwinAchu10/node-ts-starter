export default class BaseService {
  /**
   * Get all generic model
   * @param schema
   **/
  public findAll = async (schema: any): Promise<any> => {
    try {
      const users = await schema.find().sort({ createdAt: -1 });
      if (!users) {
        return {
          data: [],
          statusCode: 404,
        };
      }
      return {
        statusCode: 200,
        data: users,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  };

  /**
   * find by param generic for model
   * @param schema
   * @param params
   **/
  public findByParam = async (schema: any, params: any): Promise<any> => {
    try {
      const user = await schema.find(params).sort({ createdAt: -1 });
      if (!user) {
        return {
          statusCode: 404,
          data: `${schema.toString()} not found`,
        };
      }

      return {
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  };

  /**
   * find one generic by model
   * @param schema
   * @param params
   **/
  public findOne = async (schema: any, params: any): Promise<any> => {
    try {
      const user = await schema.findOne(params);
      if (!user) {
        return {
          statusCode: 404,
          data: `${schema.toString()} not found`,
        };
      }

      return {
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  };

  /**
   * create genric model
   * @param schema
   * @param body
   **/
  public create = async (schema: any, body: any): Promise<any> => {
    try {
      const user = await schema.create(body);
      if (!user) {
        return {
          statusCode: 400,
          data: `Error saving ${schema.toString()}`,
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  };

  /**
   * find one and update generic model
   * @param schema
   * @param id
   * @param body
   **/
  public findOneAndUpdate = async (
    schema: any,
    id: String,
    body: any,
  ): Promise<any> => {
    try {
      const user = await schema.findOneAndUpdate(
        { _id: id },
        {
          $set: body,
        },
        { upsert: true, new: true, runValidators: true, context: 'query' },
        function(err: any, result: any) {
          if (err) {
            return {
              statusCode: 400,
              data: err,
            };
          } else {
            return {
              statusCode: 200,
              data: result,
            };
          }
        },
      );
      if (!user) {
        return {
          statusCode: 400,
          data: `Error saving ${schema.toString()}`,
        };
      }

      return {
        success: true,
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      return {
        statusCode: 500,
        data: err,
      };
    }
  };
}
