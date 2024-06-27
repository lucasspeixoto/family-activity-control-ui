export type BillType = 'FIXED' | 'VARIABLE';

export type Bill = {
  id: string;
  title: string;
  owner: string;
  amount: number;
  category: string;
  description: string;
  finishAt: string;
  type: BillType;
};
