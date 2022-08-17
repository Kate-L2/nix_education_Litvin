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

// Task 2
// const getCandidateById = id => {
//   for(let i = 0; i < condidateArr.length; i++) {
//     if(condidateArr[i]._id === id) {
//       condidateArr[i].registered = new Date()
//     }
//   }

// }
const getCandidateById = (id) => {
  let foundUser = condidateArr.find((el) => el._id === id);
  foundUser.registered = new Date(foundUser.registered);
  foundUser.registered = [
    foundUser.registered.getDate(),
    foundUser.registered.getMonth() + 1,
    foundUser.registered.getFullYear(),
  ].join("/");
  console.log(foundUser);
};

getCandidateById("5e216bc9f51c08c39c3ed006");
// {

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
