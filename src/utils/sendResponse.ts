import { Response } from 'express';

type TResponse<T> = {
   statusCode: number,
   success: boolean,
   message: string,
   data?: T,
   meta?: Record<string, any>
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
   const {statusCode, success, message, data: dataResponse, meta } = data

   res.status(statusCode).json({
      success,
      message,
      data: dataResponse,
      meta
   })
}

export default sendResponse;