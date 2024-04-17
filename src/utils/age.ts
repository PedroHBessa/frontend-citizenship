export function calculateAge(birthDate: Date, currentDate: Date): number {
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth();

  // If the current month is before the birth month, or
  // it's the same month but the current day is before the birth day, decrease age by 1
  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
