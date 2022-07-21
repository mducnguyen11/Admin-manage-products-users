export const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getErrorMessageResponse = (response: any): string => {
  if (typeof response == 'object' && response.errors && typeof response.errors == 'object') {
    const xx = Object.values(response.errors)[0];
    if (typeof xx == 'string') {
      return xx;
    } else {
      return '';
    }
  } else {
    return '';
  }
};
