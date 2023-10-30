interface ValidationData {
  key: string;
  value: string;
  pattern: (value: string) => boolean;
  errorMsg: string;
}

export interface InvalidField {
  key: string;
  isValid: boolean;
  errorMsg: string;
}


export class Validation {
  public invalidFieldsList: InvalidField[];

  constructor() {
    this.invalidFieldsList = [];
  }

  public addField(data: ValidationData | ValidationData[]) {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        this.validate(item)
      })
    } else {
      this.validate(data)
    }
  }

  private validate(data: ValidationData) {
    const { errorMsg, key, pattern, value} = data;
    if (!pattern(value)) {
      this.invalidFieldsList.push({
        key,
        isValid: pattern(value),
        errorMsg
      })
    }
  }
}