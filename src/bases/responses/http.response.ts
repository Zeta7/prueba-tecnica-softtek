import { BaseResponse } from './base.responseHttp'

export namespace HttpResponse {
  const _context = 'HttpResponse'

  export class getSuccessful extends BaseResponse {
    _context = _context + 'GetSuccessful'
    public constructor(data: any) {
      super(200, data, _context)
    }
  }

  export class postSuccessful extends BaseResponse {
    _context = _context + 'PostSuccessful'
    public constructor(data: any) {
      super(201, data, _context)
    }
  }

  export class putSuccessful extends BaseResponse {
    _context = _context + 'PutSuccessful'
    public constructor(data: any) {
      super(201, data, _context)
    }
  }

  export class deleteSuccessful extends BaseResponse {
    _context = _context + 'DeleteSuccessful'
    public constructor() {
      super(204, {}, _context)
    }
  }
}
