// Task 1
const arr1 = ["Vasya", "Petya", "Alexey", "Alexey", "Alexey"];
removeUser(arr1, 1);
console.log(arr1);

function removeUser(arr, index) {
  for (let i = 0; i < arr.length; i++) {
    if (i == index) {
      arr.splice(i, 1);
    }
  }
}

// Task 2
function getAllKeys(obj) {
  return console.log(Object.keys(obj));
}

let obj2 = { mark: "Mercedes", model: "C180" };
getAllKeys(obj2);

// Task 3
function getAllValues(obj) {
  return console.log(Object.values(obj));
}

const obj3 = { name: "Vasya", age: 1 };
getAllValues(obj3);

// Task 4
function insertIntoarr(obj, idInArr, arr) {
  for (let i = arr.length; i >= 0; i--) {
    if (idInArr == i) {
      return arr.splice(i - 1, 0, obj);
    }
  }
}
const obj4 = {
  _id: "5e216bc9a6059760578aefa4",
  index: 0,
  guid: "e325a387-e1f4-4c1a-8df8-f188b06e3a2a",
  isActive: true,
  balance: "$3,365.14",
  picture: "http://placehold.it/32x32",
  age: 34,
  eyeColor: "brown",
  name: "Bernice Walton",
  gender: "female",
  company: "EZENT",
  email: "bernicewalton@ezent.com",
  phone: "+1 (803) 433-2863",
  address: "229 Granite Street, Durham, Colorado, 6084",
  about:
    "Nisi cupidatat excepteur non in et ex consequat dolor. Esse exercitation id culpa non. Eiusmod cupidatat est esse dolor ex ex dolor labore exercitation. Reprehenderit dolor velit magna voluptate irure do nulla aliquip enim. Aute sit veniam tempor nulla irure sit culpa culpa excepteur labore nostrud cupidatat. Eu amet dolor culpa dolor pariatur ipsum labore. Minim ad qui qui culpa consequat amet id irure culpa tempor esse eu.\r\n",
  registered: "2015-11-05T05:14:05 -02:00",
  latitude: -31.58974,
  longitude: -174.55185,
  tags: ["quis", "ad", "amet", "Lorem", "et", "magna", "ut"],
  friends: [
    {
      id: 0,
      name: "Clayton Mccarthy",
    },
    {
      id: 1,
      name: "Odonnell Sharp",
    },
    {
      id: 2,
      name: "Marisol Olsen",
    },
    {
      id: 3,
      name: "Audrey Henson",
    },
    {
      id: 4,
      name: "Dickson Maxwell",
    },
    {
      id: 5,
      name: "Trudy Singleton",
    },
    {
      id: 6,
      name: "Tyson Ayala",
    },
    {
      id: 7,
      name: "Sharron Porter",
    },
    {
      id: 8,
      name: "Lenore Cleveland",
    },
    {
      id: 9,
      name: "Shelton Curtis",
    },
  ],
  greeting: "Hello, Bernice Walton! You have 4 unread messages.",
  favoriteFruit: "strawberry",
};

insertIntoarr(obj4, 6, condidateArr);
console.log(condidateArr);

// Task 5
class Condidate {
  constructor(candidate) {
    Object.assign(this, candidate);
  }
  state() {
    let Adr = this.address;
    return console.log(Adr.split(", ").slice(2, 3).join(""));
  }
}
const condidate = new Condidate(condidateArr[0]);
const condidate1 = new Condidate(condidateArr[1]);
condidate.state();
condidate1.state();

// Task 6
function getCompanyNames(arr) {
  let newArr = arr.map((el) => el.company);
  let uniqueArr = newArr.filter((element, index) => {
    return newArr.indexOf(element) === index;
  });
  return console.log(uniqueArr);
}

getCompanyNames(condidateArr);

// Task 7
function getUsersByYear(year) {
  let candidates = [];
  let newArr = condidateArr.map((el) => el.registered);
  let fullYear = newArr.map((el) => new Date(el).getFullYear());
  for (let i = 0; i < condidateArr.length; i++) {
    if (fullYear[i] === year) {
      candidates.push(condidateArr[i]._id);
    }
  }
  return console.log(candidates);
}

getUsersByYear(2015);

// Task 8
function getCondidatesByUnreadMsg(unread) {
  let newArr = [];
  let result = [];
  newArr = condidateArr.map((el) => el.greeting);
  for (let i = 0; i < condidateArr.length; i++) {
    if (parseInt(newArr[i].match(/\d+/)) === unread) {
      result.push(condidateArr[i]);
    }
  }
  return console.log(result);
}

getCondidatesByUnreadMsg(8);

// Task 9
function getCondidatesByGender(gender) {
  let result = [];
  for (let i = 0; i < condidateArr.length; i++) {
    if (condidateArr[i].gender === gender) {
      result.push(condidateArr[i]);
    }
  }
  return console.log(result);
}

getCondidatesByGender("female");
