import { format } from "date-fns";

export const formatDate = (date?: string | Date | number) => {
  return date ? format(new Date(date), "dd.MM.yyyy HH:mm:ss") : null;
};
