export default class ValidationService {
  public static getValidatorErrorMessage(
    validatorName: string,
    propertyName: string,
    propertyValue?: any
  ) {
    const config: any = {
      required: `${
        propertyName == "Work email" ? "Email" : propertyName
      } is required`,
      numeric: "Please enter valid number",
      phone: "Please enter valid number",
      minLength: `Minimum ${propertyValue.min} characters`,
      maxLength: `Maximum ${propertyValue.max} characters`,
      phoneLength: `Phone number 10 or 12 charaters`,
      email: "Please enter a valid email address",
      domain: `Please enter your business email. Don't have one?`,
      number: "Please enter one number",
      special: `Please enter one special character: !@#$%&*`,
      letter: "Please enter one letter",
    };

    return config[validatorName];
  }
}
