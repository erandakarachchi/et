export const sendResponse = (
  statusCode: number,
  message: string,
  data: any
) => {
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
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
