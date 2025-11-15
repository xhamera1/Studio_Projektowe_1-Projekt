export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw await response.json();
  }
  return response.json();
};
