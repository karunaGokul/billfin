export enum BillingTypes {
  "AUM Advisory" = "AUM",
  "Non-AUM Subscriptions" = "NON-AUM",
}
export enum BillingFrequency {
  Monthly = "MONTHLY",
  Quarterly = "QUARTERLY",
  "Semi-Annually" = "SEMI_ANNUALLY",
  Annually = "ANNUALLY",
}
export enum DefaultBillingFrequency {
  Monthly = "MONTHLY",
  Quarterly = "QUARTERLY",
  "Semi-Annually" = "SEMI_ANNUALLY",
  Annually = "ANNUALLY",
  "Don't Default" = "NONE",
}
export enum BillingMethod {
  Advance = "ADVANCE",
  Arrears = "ARREARS",
}
export enum DefaultBillingMethod {
  Advance = "ADVANCE",
  Arrears = "ARREARS",
  "Don't Default" = "NONE",
}
export enum DefaultOffsetCycle {
  "Jan-Apr-Jul-Oct" = "JAN_APR_JUL_OCT",
  "Feb-May-Aug-Nov" = "FEB_MAY_AUG_NOV",
  "Mar-Jun-Sep-Dec" = "MAR_JUN_SEP_DEC",
  "Don't default" = "NONE",
}
export enum PayorType {
  INVESTOR_CLIENT,
  INSTITUTIONAL,
}
export enum ValuationMethodType {
  "Period End" = "PERIOD_END",
  "Average Daily Balance" = "AVERAGE_DAILY_BALANCE",
}
export enum DefaultValuationMethod {
  "Period End" = "PERIOD_END",
  "Average Daily Balance" = "AVERAGE_DAILY_BALANCE",
  "Don't default" = "NONE",
}
export enum InitialBillingValuationMethod {
  "Period End" = "PERIOD_END",
  "Billing Start Date" = "BILLING_START_DATE",
}
export enum ProrationMethodType {
  "Days in period divided by days in the year" = "STANDARD",
  "Divide by number of billing periods in the year" = "ACTUAL",
}
export enum ExpressRatesAs {
  "Basis Point" = "BASIS_POINT",
  "Percentage" = "PERCENTAGES",
}
export enum FlowThresholdType {
  "Dollar amount" = "DOLLAR_AMOUNT",
  "% of AUM" = "PERCENT",
  "None" = "NONE",
}
export enum CommitmentTerm {
  Annual = "ANNUAL",
  Monthly = "MONTHLY",
}
export enum PaymentMethod {
  "Credit Card" = "CREDIT_CARD",
  ACH = "ACH",
}
export enum CardPrimaryType {
  new = "NEW",
  primary = "PRIMARY",
}
export enum PlanActivate {
  "Effective Immediately" = "EFFECTIVE_NOW",
  "Next Billing Term" = "NEXT_TERM",
}
export enum TierType {
  Flat = "FLAT",
  "Tierd Blended" = "TIERED_BLENDED",
  "Tierd Unblended" = "TIERED_UNBLENDED",
}
export enum CurrencyCode {
  USD = "USD",
  CAD = "CAD",
}
