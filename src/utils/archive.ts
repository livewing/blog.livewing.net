export interface YearMonth {
  year: number;
  month: number;
}

export interface YearMonthGroup {
  year: number;
  months: { month: number; count: number }[];
}

export interface DateRange {
  gte: string;
  lt: string;
}

export const convertYearMonth = (str: string): YearMonth => {
  const components = str.split('/');
  return {
    year: parseInt(components[0]),
    month: parseInt(components[1])
  };
};

export const groupYearMonth = (ym: YearMonth[]): YearMonthGroup[] => {
  return ym
    .sort((l, r) => {
      if (l.year !== r.year) return r.year - l.year;
      return r.month - l.month;
    })
    .reduce((acc, cur) => {
      const i = acc.findIndex(v => v.year === cur.year);
      if (i === -1) {
        return [
          ...acc,
          { year: cur.year, months: [{ month: cur.month, count: 1 }] }
        ];
      }

      const j = acc[i].months.findIndex(v => v.month === cur.month);
      if (j === -1) {
        acc[i] = {
          year: acc[i].year,
          months: [...acc[i].months, { month: cur.month, count: 1 }]
        };
        return acc;
      }

      acc[i].months[j].count += 1;
      return acc;
    }, [] as YearMonthGroup[]);
};

export const dateRange = (
  year: number,
  month?: number | undefined
): DateRange => {
  const d = (y: number, m: number): string =>
    `${y}-` + `${m}`.padStart(2, '0') + '-01T00:00:00.000Z';
  if (typeof month === 'undefined') {
    return {
      gte: d(year, 1),
      lt: d(year + 1, 1)
    };
  } else {
    return {
      gte: d(year, month),
      lt: month === 12 ? d(year + 1, 1) : d(year, month + 1)
    };
  }
};
