import { IParlor } from "@/interface/parlor";
import { IPost } from "@/interface/post";

export const compareByFullName = <T extends { firstName?: string; lastName?: string; middleName?: string; post:IPost; parlor:IParlor[] | undefined }>(
    a: T,
    b: T
  ) => {
    const fullNameA = `${a.firstName} ${a.lastName} ${a.middleName}`;
    const fullNameB = `${b.firstName} ${b.lastName} ${b.middleName}`;
    return fullNameA.localeCompare(fullNameB, 'ru');
  };