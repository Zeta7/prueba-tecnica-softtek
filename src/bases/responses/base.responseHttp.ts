import { IResultResponse } from '../interfaces/result-response.interface';

export class BaseResponse implements IResultResponse {
  status: number
  data: any
  context: string

  constructor(status, data, context) {
    this.status = status
    this.data = data
    this.context = context
  }

  getObject() {
    return this
  }

  getStatus(): number {
    return this.status
  }

  getData(): any {
    return {
      status: this.status,
      context: this.context,
      data: this.data,
    }
  }
}
