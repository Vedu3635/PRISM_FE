/**
 * Shared request helper to normalize service responses and errors.
 * Keeps current behavior (returns response data) while ensuring a
 * predictable Error shape for UI handlers.
 */
export const request = async (promiseFactory) => {
  try {
    const response = await promiseFactory();
    return response?.data;
  } catch (error) {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Unexpected network error';

    const normalizedError = new Error(message);
    normalizedError.status = error?.response?.status;
    normalizedError.code = error?.code;
    normalizedError.details = error?.response?.data;
    throw normalizedError;
  }
};

