export class ApiError extends Error {
  status;
  errors;
  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }
  static authorizationError() {
    return new ApiError(401, "user not authorized");
  }

  static badRequest(message: string, error: any[] = []) {
    return new ApiError(401, message, error);
  }
}
