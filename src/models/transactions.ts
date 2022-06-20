export interface Transactions {
  approved: boolean;
  async_status: string;
  canceled: boolean;
  company_id: string;
  confirmed: boolean;
  currency: string;
  date_canceled: any;
  date_confirmed: string;
  date_fulfilled: any;
  date_matched: any;
  date_processed: any;
  date_received: any;
  date_released: any;
  fees: 0.0;
  fulfilled: false;
  is_premium: true;
  matched: false;
  number_of_recipients: 120;
  payment_type: string;
  payroll_id: string;
  received: false;
  released: false;
  subpayroll_ids: string[];
  time_created: string;
  volume_input_in_input_currency: number;
  id: string;
}

export interface iFilter {
  status: string;
  from: string;
  to: string;
  invoice: string;
}
