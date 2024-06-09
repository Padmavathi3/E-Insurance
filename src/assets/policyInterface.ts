export interface PolicyObj {
  policyId?:number,
  policyName?:string,
  description: string;
  policyType?: string;
  termLength?: number;
  coverageAmount:number;
  premium?: number;
  entryAge?: number;
}
