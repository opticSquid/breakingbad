class response {
  constructor(message, data) {
    this.message = message;
    this.data = data;
  }
  givenresponse() {
    return { message: this.message, data: this.data };
  }
}
class SuccessMessage extends response {
  constructor(message, data) {
    super(message, data);
    this.message = message;
    this.data = data;
  }
  responseMessege() {
    return super.givenresponse();
  }
}
class ErrorMessage extends response {
  constructor(message) {
    super(message, null);
    this.message = message;
  }
  responseMessege() {
    return super.givenresponse();
  }
}

const responseFactory = (message, data) => {
  if (data === null) {
    return new ErrorMessage(message).responseMessege();
  } else {
    return new SuccessMessage(message, data).responseMessege();
  }
};

module.exports = { responseFactory };
