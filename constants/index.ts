export const fullDateOptions = [
  { year: 'numeric' } as const,
  { month: '2-digit' } as const,
  { day: '2-digit' } as const,
];

export const yearMonthOptions = [{ year: 'numeric' } as const, { month: '2-digit' } as const];

export const addressFieldsMaxLength = {
  city: 40,
  postCode: 15,
  houseNumber: 10,
  staircase: 10,
  floor: 10,
  door: 10,
};
