class response {
  constructor(message, error, data) {
    this.message = message;
    this.error = error;
    this.data = data;
  }
  givenresponse() {
    return { message: this.message, error: this.error, data: this.data };
  }
}
class SuccessMessage extends response {
  constructor(message, data) {
    super(message, null, data);
    this.message = message;
    this.data = data;
  }
  responseMessege() {
    return super.givenresponse();
  }
}
class ErrorMessage extends response {
  constructor(message, error) {
    super(message, error, null);
    this.message = message;
    this.error = error;
    let data = null;
  }
  responseMessege() {
    return super.givenresponse();
  }
}

const responseFactory = (message, error, data) => {
  if (error) {
    return new ErrorMessage(message, error).responseMessege();
  } else {
    return new SuccessMessage(message, data).responseMessege();
  }
};

module.exports = { responseFactory };
