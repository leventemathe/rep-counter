class ErrorWithStatus {
  constructor(
    message,
    status,
    name = 'Error',
    stack,
  ) {
    this.message = message;
    this.status = status;
    this.name = name;
    this.stack = stack;
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}

export default ErrorWithStatus;
