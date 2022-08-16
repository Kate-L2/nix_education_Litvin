const searchCandidatesByPhoneNumber = (phone) => {
  let result = [];
  for (let i = 0; i < condidateArr.length; i++) {
    if (condidateArr[i].phone.includes(phone)) {
      result.push(condidateArr[i]);
    }
  }
  return result;
};

console.log(searchCandidatesByPhoneNumber("43"));
/// [Candidate, Candidate, Candidate ...]

console.log(searchCandidatesByPhoneNumber("+1 (869) 40"));
/// [Candidate, Candidate ...]

searchCandidatesByPhoneNumber("43");
/// [Candidate, Candidate, Candidate ...]

// Task 4

const result = {};

condidateArr.map((el) => {
  if (!result[el.eyeColor]) {
    result[el.eyeColor] = [el];
  } else {
    result[el.eyeColor].push(el);
  }
});

console.log(result);
