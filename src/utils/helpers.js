export const getNameLetters = (name) => {
  console.log(name);
  const words = name.split(" ");
  let letters = "";
  for (let i = 0; i < 2; i++) {
    letters += words[i][0];
  }
  return letters.toUpperCase();
};

export const formatDate = (date) => {
  const formattedDate = new Date(date).toDateString();
  return formattedDate;
};
