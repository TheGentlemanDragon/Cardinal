import { Path, PathValue, pb, UploadingFile, uploadingFiles, user } from "$lib";

const YEAR_IN_MS = 31_556_952_000;
const MONTH_IN_MS = 2_629_746_000;
const DAY_IN_MS = 86_400_000;
const HOUR_IN_MS = 3_600_000;
const MIN_IN_MS = 60_000;
const SEC_IN_MS = 1_000;

const b36Chars = "abcdefghijklmnopqrstuvwxyz0123456789";

/** Return a random base62 string */
export function generateId(length: number = 15) {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(randomNumber() * b36Chars.length);
    result += b36Chars[randIndex];
  }

  return result;
}

/** Get value at path */
export function get<T extends object, P extends Path<T>>(
  obj: T,
  path: P
): PathValue<T, P> | undefined {
  let acc: unknown = obj;

  for (const key of path.split(".")) {
    if (acc == null) return undefined;
    acc = (acc as any)[key];
  }

  return acc as PathValue<T, P> | undefined;
}

/** Load image to get dimensions and return record */
export async function getFilePayload(file: File): Promise<UploadingFile> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({
        data: file,
        height: img.height,
        id: generateId(),
        name: file.name,
        owner: user.value?.id,
        width: img.width,
      });
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  });
}

/** Given a list of string names and a base name, returns a unique name */
export function getUniqueName(names: string[], name: string) {
  let count = 1;
  let suffix = "0";

  while (names.includes(`${name}-${suffix}`)) {
    suffix = count.toString();
    count += 1;
  }

  return `${name}-${suffix}`;
}

/** Return the passed in value */
export function identity(value) {
  return value;
}

/** No operation */
export function noop() {
  return null;
}

/** Don't execute default input event */
export function preventDefault(event: Event) {
  return event.preventDefault();
}

/** Return random number between 0 and 1 */
export const randomNumber = () => {
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  return randomBytes[0] / (0xffffffff + 1);
};

/** Always return false */
export function stubFalse(arg?: any) {
  return false;
}

/** Return time since date occured, as human-readable string */
export function timeSince(date: Date) {
  const diff = Date.now() - date.getTime();
  if (diff > YEAR_IN_MS) {
    return `${Math.floor(diff / YEAR_IN_MS)}Y ago`;
  }
  if (diff > MONTH_IN_MS) {
    return `${Math.floor(diff / MONTH_IN_MS)}M ago`;
  }
  if (diff > DAY_IN_MS) {
    return `${Math.floor(diff / DAY_IN_MS)}d ago`;
  }
  if (diff > HOUR_IN_MS) {
    return `${Math.floor(diff / HOUR_IN_MS)}h ago`;
  }
  if (diff > MIN_IN_MS) {
    return `${Math.floor(diff / MIN_IN_MS)}m ago`;
  }
  if (diff > SEC_IN_MS) {
    return `${Math.floor(diff / SEC_IN_MS)}s ago`;
  }
  return "Just now";
}

/** Upload files */
export async function uploadFiles(files: FileList) {
  for await (const payload of Array.from(files).map(getFilePayload)) {
    uploadingFiles.value = {
      ...uploadingFiles.value,
      [payload.id]: { file: payload, percent: 0 },
    };

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) =>
      formData.append(key, value as any)
    );

    const request = new XMLHttpRequest();

    request.open(
      "POST",
      `${import.meta.env.VITE_DB_URL}api/collections/cardinal_assets/records`
    );

    request.setRequestHeader("Authorization", `Bearer ${pb.authStore.token}`);

    request.upload.addEventListener("progress", (event: ProgressEvent) => {
      const percent = Math.floor((event.loaded / event.total) * 100);
      uploadingFiles.value = {
        ...uploadingFiles.value,
        [payload.id]: {
          file: payload,
          percent,
        },
      };

      if (percent === 100) {
        setTimeout(() => {
          delete uploadingFiles.value[payload.id];
          uploadingFiles.value = { ...uploadingFiles.value };
        }, 3000);
      }
    });

    request.send(formData);
  }
}
