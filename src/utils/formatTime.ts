export const formatTimeStampToDateString = (a: string | number) => {
  if (a == '0') {
    return '- - -';
  } else {
    const dt = new Date(Number(a) * 1000);
    return dt.toDateString();
  }
};

export const formatTimeStampToISOSString = (g: string): string => {
  if (g == '0') {
    return '--';
  } else {
    const a = new Date(Number(g) * 1000);
    const tt = a?.toLocaleDateString().split('/');
    let y = '';
    tt?.reverse().forEach((a, i) => {
      if (a.length == 1) {
        if (i == 0) {
          y += '0' + a;
        } else {
          y += '-0' + a;
        }
      } else {
        if (i == 0) {
          y += +a;
        } else {
          y += '-' + a;
        }
      }
    });
    return y;
  }
};
export const formateDateToTimeStamp = (a: Date): string => {
  return (a.getTime() / 1000).toString();
};

export const formatDateToDateString = (a: Date): string => {
  const tt = a?.toLocaleDateString().split('/');
  let y = '';
  tt?.reverse().forEach((a, i) => {
    if (a.length == 1) {
      if (i == 0) {
        y += '0' + a;
      } else {
        y += '-0' + a;
      }
    } else {
      if (i == 0) {
        y += +a;
      } else {
        y += '-' + a;
      }
    }
  });
  return y;
};
