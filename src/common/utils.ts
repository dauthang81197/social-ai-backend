import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { I18nContext } from 'nestjs-i18n';
import * as path from 'path';
import { Readable } from 'typeorm/platform/PlatformTools';

import { MAX_LENGTH_IMPORT_FILE } from './constants';
import {
  AgeEnum,
  DEFAULT_ROLE,
  MODULE_NAME,
  PeriodTypeEnum,
  StatusEnum,
  UserGroupEnum,
  WorkOrderStatusEnum,
} from './enum';
import { HeaderOperationsExcelEnum } from './enum/operation.enum';

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const checkPermissionExits = (request: any, permissionCode: string) => {
  return (
    request?.user?.permissions &&
    request?.user?.permissions.length > 0 &&
    request?.user?.permissions
      .map((item) => item.code)
      .includes(`${process.env.PRODUCT_CODE}::${permissionCode}`) >= 0
  );
};

const documentFileFilter = (req: any, file, callback) => {
  const ext = path.extname(file.originalname);
  const extArrayRequred = ['.jpg', '.jpeg', '.png', '.pdf'];

  // Check type of File
  if (extArrayRequred.indexOf(ext) === -1) {
    return callback(new BadRequestException('file.INVALID_FILE_TYPE'), false);
  }

  return callback(null, true);
};

export const IMulterOptionsForRegisterUser: MulterOptions = {
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: documentFileFilter,
};

export const randomString = (len: number, charSet?: string) => {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

export const convertStringToIntArr = (rawString: string, comma: string) => {
  const stringArr = rawString.split(comma);
  return stringArr.map((item) => parseInt(item));
};

export const generateRandomPassword = (length: number) => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()-_+=<>?';

  // Include one random special character
  const randomSpecialChar = specialCharacters.charAt(
    Math.floor(Math.random() * specialCharacters.length),
  );

  // Use the rest of the characters for the password
  const remainingCharacters =
    uppercaseLetters +
    lowercaseLetters +
    numbers +
    specialCharacters.replace(randomSpecialChar, '');

  let password = randomSpecialChar;

  for (let i = 1; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
    password += remainingCharacters[randomIndex];
  }

  return password;
};

export const getUrlFrontEndPath = (userGroupAccepted: UserGroupEnum) => {
  switch (userGroupAccepted) {
    case UserGroupEnum.SYSTEM:
      return process.env.ADMIN_SITE_FE_ENDPOINT;
    case UserGroupEnum.ORGANIZATION:
      return '/';
    default:
      return '/';
  }
};

export const getUrlFrontEndEndPoint = (userGroupAccepted: UserGroupEnum) => {
  switch (userGroupAccepted) {
    case UserGroupEnum.SYSTEM:
      return process.env.ADMIN_SITE_FE_ENDPOINT;
    case UserGroupEnum.ORGANIZATION:
      return '';
    default:
      return '';
  }
};

export const getLastDayOfMonthReSub = (date?: Date) => {
  const currentDate = date || new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  if (date?.getDate()) {
    currentDate.setDate(date?.getDate());
  }

  return currentDate;
};

export const getLastDayOfMonthOfYearReSub = (date?: Date) => {
  const currentDate = date || new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  if (date?.getDate()) {
    currentDate.setDate(date?.getDate());
  }
  return currentDate;
};

export const addDaysFromNow = (days: number) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate;
};

export const addDays = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);
  return date;
};

export const getDaysBetweenDates = (startDate: Date, endDate: Date) => {
  const difference = endDate.getTime() - startDate.getTime();
  const days = difference / (1000 * 3600 * 24);
  return Math.abs(days);
};

export const calculateExpireDate = (
  date: Date,
  subscriptionType: PeriodTypeEnum,
) => {
  switch (subscriptionType) {
    case PeriodTypeEnum.MONTHLY: {
      let newMonth = date.getMonth() + 1;
      let newYear = date.getFullYear();
      if (newMonth > 11) {
        newMonth = 0; // January is 0 in JS Date
        newYear += 1;
      }

      // Handle the case where the next month has fewer days (e.g., going from Jan 31 to Feb 28/29)
      const nextMonthDate = new Date(newYear, newMonth + 1, 0); // Setting day as 0 goes to the last day of the previous month
      if (date.getDate() > nextMonthDate.getDate()) {
        date.setDate(nextMonthDate.getDate());
      }

      date.setMonth(newMonth);
      date.setFullYear(newYear);
      break;
    }

    case PeriodTypeEnum.ANNUAL:
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  // Format the date as DD MMM YYYY
  return date;
};

export function convertEnumToName<T extends object, U extends object>(
  enumNumber: number,
  fromEnum: T,
  toEnum: U,
): U[keyof U] | null {
  // Find the enum name by its value
  const enumName = (Object.keys(fromEnum) as Array<keyof T>).find(
    (key) => fromEnum[key] === enumNumber,
  );
  // Return the corresponding value from the toEnum using the found name
  if (enumName && enumName in toEnum) {
    return toEnum[enumName as unknown as keyof U];
  } else {
    return null; // or throw an error if preferred
  }
}

export const replaceAll = (str: string, find: string, replace: string) => {
  if (str) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
  return '';
};

export const replaceStringDownTheLine = (str: string) => {
  return replaceAll(str, '\n', '<br/>');
};

export const getFromDateAndToDateFromAge = (age: AgeEnum) => {
  const currentDate = new Date();
  let startDate: Date;
  let endDate: Date;
  switch (age) {
    case AgeEnum.ZERO_TO_FIFTEEN:
      endDate = currentDate;
      startDate = new Date(
        currentDate.getFullYear() - 15,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      break;
    case AgeEnum.SIXTEEN_TO_TWENTY_FOUR:
      endDate = new Date(
        currentDate.getFullYear() - 16,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      startDate = new Date(
        currentDate.getFullYear() - 24 - 16,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      break;
    case AgeEnum.TWENTY_FIVE_TO_THIRTY_SIX:
      endDate = new Date(
        currentDate.getFullYear() - 25,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      startDate = new Date(
        currentDate.getFullYear() - 36 - 25,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      break;
    case AgeEnum.THIRTY_SEVEN_TO_FIFTY_FIVE:
      endDate = new Date(
        currentDate.getFullYear() - 37,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      startDate = new Date(
        currentDate.getFullYear() - 55 - 37,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      break;
    case AgeEnum.FIFTY_SIX_TO_SIXTY_FIVE:
      endDate = new Date(
        currentDate.getFullYear() - 56,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      startDate = new Date(
        currentDate.getFullYear() - 65 - 65,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      break;
    default:
      endDate = new Date(
        currentDate.getFullYear() - 65,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      startDate = new Date(
        currentDate.getFullYear() - 65 - 65,
        currentDate.getMonth(),
        currentDate.getDate(),
      );
  }

  return { startDate, endDate };
};

export const calculateAge = (birthday: Date) => {
  const currentDate = new Date();
  const birthDate = new Date(birthday);

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const findCommonElements = (arrays: string[][]): string[] => {
  if (arrays.length === 0) return [];

  const sampleList = arrays[0];

  return sampleList.filter((element) =>
    arrays?.every((array) => array?.includes(element)),
  );
};

function validateFieldLength(
  fieldName: string,
  value: any,
  maxLength: number = MAX_LENGTH_IMPORT_FILE,
  i18n: I18nContext,
) {
  if (value && value?.toString().length > maxLength) {
    return i18n.t('common.INVALID_MAX_LENGTH', {
      args: {
        fieldName: fieldName.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase(),
      },
    });
  }
  return null;
}
