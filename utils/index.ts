export const formatDateString = (
  date: Date,
  options: Intl.DateTimeFormatOptions[],
  separator: string,
): string => {
  const format = (option: Intl.DateTimeFormatOptions): string => {
    const formatter = new Intl.DateTimeFormat('en', option);

    return formatter.format(date);
  };

  const resultDateString: string = options.map(format).join(separator);

  return resultDateString;
};
