export const isAtLeast18YearsOld = (dateString: string): boolean => {
 // the input date string
 const inputDate = new Date(dateString);

 // Get today's date
 const today = new Date();

 // Calculate years
 let age = today.getFullYear() - inputDate.getFullYear();
 const m = today.getMonth() - inputDate.getMonth();

 if (m < 0 || (m === 0 && today.getDate() < inputDate.getDate())) {
      age--;
 }

 // Check if the age is at least 18 and no more than 100
 return age >= 18 && age <= 100;
}
