export class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message)
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export class NoDataError extends Error {
  constructor(message = 'No Data Error') {
    super(message)
    this.name = 'NoDataError'
    Object.setPrototypeOf(this, NoDataError.prototype)
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message)
    this.name = 'ForbiddenError'
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}

export class UnknownError extends Error {
  constructor(message = 'Unknown Error') {
    super(message)
    this.name = 'UnknownError'
    Object.setPrototypeOf(this, UnknownError.prototype)
  }
}
