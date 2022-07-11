const { REVALIDATE_SECONDS: sec = '10' } = process.env;

export const REVALIDATE_SECONDS = Number.parseInt(sec);
