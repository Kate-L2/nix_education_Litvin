// Task 1
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

// Task 3
const sortCandidatesArr = (sortBy) => {
  let balanceArr = [];
  condidateArr.forEach((el) => {
    balanceArr.push(el.balance);
  });
  const onlyNum = balanceArr.map((el) => {
    return el.substring(1);
  });
  if (sortBy === "asc") {
    onlyNum.sort(function (a, b) {
      return Number(a) - Number(b);
    });
  } else if (sortBy === "desc") {
    onlyNum.sort(function (a, b) {
      return Number(b) - Number(a);
    });
  } else {
    return onlyNum;
  }

  console.log(onlyNum);
};

console.log(sortCandidatesArr("asc"));
console.log(sortCandidatesArr("desc"));
console.log(sortCandidatesArr());

// const sortCandidatesArr = (sortBy) => {
//   const copy = [...condidateArr];
//   for (let obj of copy) {
//     obj.balance = obj.balance.substring(1);
//   }
//   if (sortBy === "asc") {
//     copy.sort((a, b) => {
//       return Number(a.balance) - Number(b.balance);
//     });
//   } else if (sortBy === "desc") {
//     copy.sort((a, b) => {
//       return Number(b.balance) - Number(a.balance);
//     });
//   } else {
//     return copy;
//   }
//   console.log(copy);
// };
// sortCandidatesArr("asc");

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
