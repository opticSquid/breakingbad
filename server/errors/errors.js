class response {
  constructor(message, pages, data) {
    this.message = message;
    this.pages = pages;
    this.data = data;
  }
  givenresponse() {
    return { message: this.message, pages: this.pages, data: this.data };
  }
}
class SuccessMessage extends response {
  constructor(message, pages, data) {
    super(message, pages, data);
  }
  responseMessege() {
    return super.givenresponse();
  }
}
class ErrorMessage extends response {
  constructor(message) {
    super(message, null, null);
  }
  responseMessege() {
    return super.givenresponse();
  }
}

const responseFactory = (message, pages, data) => {
  if (data === null) {
    return new ErrorMessage(message).responseMessege();
  } else {
    return new SuccessMessage(message, pages, data).responseMessege();
  }
};

module.exports = { responseFactory };
