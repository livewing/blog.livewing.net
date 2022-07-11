import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const formatISOToZoned = (iso: string, f: string, tz = 'Asia/Tokyo') =>
  format(utcToZonedTime(parseISO(iso), tz), f);
