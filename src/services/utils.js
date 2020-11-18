// Raw cast ID is in the format of "/name/nm(\d)*/". This function extracts the
// numeric ID.
export function extractCastID(rawCastID) {
  console.log(`Exacting cast ID from ${rawCastID}`);
  return rawCastID.substr(6, rawCastID.length() - 1);
}

export const IMAGE_SIZE = {
  xs: "w92",
  sm: "w154",
  md: "w185",
  lg: "w342",
  xl: "w500",
  original: "w780",
};

export function getPosterFullUrl(size, posterPath) {
  return `http://image.tmdb.org/t/p/${size}/${posterPath}`;
}
