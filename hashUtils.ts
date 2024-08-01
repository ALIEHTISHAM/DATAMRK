import { keccak256, toUtf8Bytes } from 'ethers';

// Hashing function using ethers v6
export const hashEmail = (email: string): string => {
  return keccak256(toUtf8Bytes(email));
};

export const hashPassword = (password: string): string => {
  return keccak256(toUtf8Bytes(password));
};
