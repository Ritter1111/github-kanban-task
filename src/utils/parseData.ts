export const daysUnlitNow = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - createdDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (daysDifference === 0) {
    return 'Today';
  }

  if (daysDifference === 1) {
    return 'Yesterday';
  }

  if (daysDifference > 1 && daysDifference <= 365) {
    return `opened ${daysDifference} days ago`;
  }
};
