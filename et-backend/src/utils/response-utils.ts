export const sendResponse = (statusCode: number, message: string, data: any) => {
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST, GET",
    "Access-Control-Allow-Credentials": "true",
  };
  return {
    headers,
    statusCode,
    body: JSON.stringify({
      message,
      data,
    }),
  };
};
