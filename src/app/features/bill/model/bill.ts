export type BillType = 'FIXED' | 'VARIABLE';

export type Bill = {
  id: string;
  title: string;
  owner: string;
  amount: number | null;
  categoryId: string;
  description: string;
  finishAt: Date | number;
  type: BillType;
};
