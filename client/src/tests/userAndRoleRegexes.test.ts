import {
  nameRegex,
  longTextRegex,
  addressTextRegex,
  phoneNumberTextRegex,
} from "../validation/userAndRoleRegexes";
import { UserDocument } from "../store/features/appState.types";
import emailToPath from "../app/utils/emailToPath";

const nameTestCases = [
  {
    case: "abc abc 1",
    result: true,
  },
  {
    case: "Abc1",
    result: true,
  },
  {
    case: "",
    result: false,
  },
  {
    case: "abc!",
    result: false,
  },
  {
    case: "abc ",
    result: false,
  },
  {
    case: " abc",
    result: false,
  },
  {
    case: "1abc",
    result: false,
  },
  {
    case: "d'Artagnan",
    result: true,
  },
  {
    case: "Konrad-Adenauer",
    result: true,
  },
  {
    case: "'Artagnan",
    result: true,
  },
  {
    case: "-Adenauer",
    result: false,
  },
  {
    case: "firma 'LEGO'",
    result: true,
  },
  {
    case: "Roga i Kpyta Ltd.",
    result: true,
  },
];

const longTextTestCases = [
  {
    case: "This is a very(,) long? text! This should be fine!",
    result: true,
  },
  {
    case: "This is a very(,) long? text! This should not be fine?",
    result: false,
  },
  {
    case: " This is a very(,) long? text! This should not be fine?",
    result: false,
  },
  {
    case: "This is a very(,) long? text! This should not be fine? ",
    result: false,
  },
  {
    case: "This is a very(,) long? text! This should be 'fine'",
    result: true,
  },
  {
    case: "This is a very(,) long/boring text! This should be 'fine'",
    result: true,
  },
  {
    case: "This is a very(,) long^boring text! This should be 'fine'",
    result: false,
  },
];

const addressTestCases = [
  {
    case: "Germany, 40231 Dusseldorf, Konrad-Adenauer-Str. 37",
    result: true,
  },
  {
    case: "Germany, 40231 Dusseldorf, Konrad-Adenauer-Str. 37!",
    result: false,
  },
  {
    case: " Germany, 40231 Dusseldorf, Konrad-Adenauer-Str. 37",
    result: false,
  },
  {
    case: "Germany, 40231 Dusseldorf, Konrad-Adenauer-Str. 37 ",
    result: false,
  },
  {
    case: "Germany, 40231 Dusseldorf^ Konrad-Adenauer-Str. 37",
    result: false,
  },
  {
    case: "Germany, 40231 Dusseldorf, 'Konrad'-Adenauer-Str. 37",
    result: true,
  },
  {
    case: "Germany, 40231 Dusseldorf, Konrad-Adenauer-Str. 37/1",
    result: true,
  },
];

const phoneNumberTestCases = [
  {
    case: "+49 171 109 87 65",
    result: true,
  },
  {
    case: "+49 171-109-87-65",
    result: true,
  },
  {
    case: "00491711098765",
    result: true,
  },
  {
    case: "491711098765",
    result: true,
  },
  {
    case: "+1 171 109 87 65 p 45",
    result: true,
  },
  {
    case: " 491711098765",
    result: false,
  },
  {
    case: "491711098765 ",
    result: false,
  },
  {
    case: "491711098765p",
    result: false,
  },
  {
    case: "491711f098765",
    result: false,
  },
  {
    case: "491711+098765",
    result: false,
  },
  {
    case: "abcdefg+45tyol",
    result: false,
  },
];

const emailToPathTestCases = [
  { case: { email: "a@b.com" } as UserDocument, result: "a" },
  { case: { email: "a.b@c.com" } as UserDocument, result: "a-b" },
  { case: { email: "A.b@c.com" } as UserDocument, result: "a-b" },
  { case: { email: "a_b@c.com" } as UserDocument, result: "a_b" },
  { case: { email: "a.b" } as UserDocument, result: "a-b" },
  { case: { email: "a.b!@c.com" } as UserDocument, result: "a-b" },
  { case: { email: "~#!@$%^&*()" } as UserDocument, result: "noname" },
  { case: undefined, result: "noname" },
];

describe("Regexes tests", () => {
  test("Name regex test", () => {
    for (let i = 0; i < nameTestCases.length; i++) {
      let result = nameRegex.test(nameTestCases[i].case);
      expect(result).toBe(nameTestCases[i].result);
    }
  });

  test("Long text regex test", () => {
    for (let i = 0; i < longTextTestCases.length; i++) {
      let result = longTextRegex.test(longTextTestCases[i].case);
      expect(result).toBe(longTextTestCases[i].result);
    }
  });

  test("Address regex test", () => {
    for (let i = 0; i < addressTestCases.length; i++) {
      let result = addressTextRegex.test(addressTestCases[i].case);
      expect(result).toBe(addressTestCases[i].result);
    }
  });

  test("Phone number regex test", () => {
    for (let i = 0; i < phoneNumberTestCases.length; i++) {
      let result = phoneNumberTextRegex.test(phoneNumberTestCases[i].case);
      expect(result).toBe(phoneNumberTestCases[i].result);
    }
  });
  test("email to path conversions", () => {
    for (let i = 0; i < emailToPathTestCases.length; i++) {
      let result = emailToPath(emailToPathTestCases[i].case);
      if (emailToPathTestCases[i].result) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result).toBe(emailToPathTestCases[i].result);
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result).toBeNull();
      }
    }
  });
});
