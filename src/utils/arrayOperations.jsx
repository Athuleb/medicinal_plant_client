export const findHighFrequencyElemet = (arr)=>{
        const frequency = {};

  // Variable to keep track of the element with the highest frequency
  let maxElement = arr[0];
  let maxFrequency = 1;

  // Iterate through the array and update the frequency count
  for (const element of arr) {
    if (frequency[element] === undefined) {
      frequency[element] = 1;
    } else {
      frequency[element]++;
      if (frequency[element] > maxFrequency) {
        maxElement = element;
        maxFrequency = frequency[element];
      }
    }
  }
   return maxElement
}