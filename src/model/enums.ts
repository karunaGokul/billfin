export enum Types {
    "AUM Advisory" = "AUM", 
    "Non-AUM(e.g., subscriptions, one-time)" = "NON-AUM"
}
export enum BillingTypes {
    "AUM Advisory" = "AUM_ADVISORY", 
    "Subscription" = "SUBSCRIPTION"
}
export enum BillingFrequency {
    Monthly = "MONTHLY",
    Quarterly = "QUARTERLY",
    "Semi-Annually" =  "SEMI_ANNUALLY",
    Annually = "ANNUALLY"
}
export enum defaultBillingFrequency {
    Monthly = "MONTHLY",
    Quarterly = "QUARTERLY",
    "Semi-Annually" =  "SEMI_ANNUALLY",
    Annually = "ANNUALLY",
    "Don't Default"= "DONT_DEFAULT"
}
export enum billingMethod {
    Advance = "ADVANCE",
    Arrears = "ARREARS"
}
export enum defaultBillingMethod {
    Advance = "ADVANCE",
    Arrears = "ARREARS",
    "Don't Default"= "DONT_DEFAULT",
}
export enum defaultOffsetCycle {
    "Jan-Apr-Jul-Oct" = "JAN_APR_JUL_OCT",
    "Feb-May-Aug-Nov" = "FEB_MAY_AUG_NOV",
    "Mar-Jun-Seb-Dec" = "MAR_JUN_SEP_DEC",
    "Don't default" = "DONT_DEFAULT"
}
export enum PayorType {
	INVESTOR_CLIENT,INSTITUTIONAL
}
export enum ValuationMethodType {
    "Period End" = "PERIOD_END",
    "Average Daily Balance" = "AVERAGE_DAILY_BALANCE"
}
export enum defaultValuationMethod {
    "Period End" = "PERIOD_END",
    "Average Daily Balance" = "AVERAGE_DAILY_BALANCE",
    "Don't default" = "DONT_DEFAULT"
}
export enum initialBillingValuationMethod {
    "Period End" = "PERIOD_END", 
    "Billing Start Date" = "BILLING_START_DATE"
}
export enum ProrationMethodType {
	"Days in period divided by days in the year" = "STANDARD",
    "Divide by number of billing periods in the year" = "ACTUAL"
}
export enum expressRatesAs {
    "Basis Point" = "BASIS_POINT",
    "Percentages" = "PERCENTAGES"
}
export enum feeScheduleRateType {
    "Dollar amount" = "DOLLAR_AMOUNT", 
    "% of AUM" = "PERCENTAGES", 
    "None" = "NONE"
}