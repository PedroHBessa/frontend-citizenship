type NestedObject = {
  [key: string]: string | NestedObject | NestedObjectArray;
};

type NestedObjectArray = Array<string | NestedObject | NestedObjectArray>;

export function validateAndTrimStringProperties(
  obj: NestedObject | NestedObjectArray
): NestedObject | NestedObjectArray {
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (typeof item === 'string') {
        const trimmedItem = item.trim();

        if (trimmedItem.length === 0) {
          throw new Error(
            `An element in the array cannot be an empty string after trimming.`
          );
        }

        return trimmedItem;
      } else if (typeof item === 'object' && item !== null) {
        return validateAndTrimStringProperties(item);
      }

      return item;
    });
  } else {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (typeof value === 'string') {
        const trimmedValue = value.trim();

        if (trimmedValue.length === 0) {
          throw new Error(
            `Property '${key}' cannot be an empty string after trimming.`
          );
        }
        obj[key] = trimmedValue;
      } else if (typeof value === 'object' && value !== null) {
        obj[key] = validateAndTrimStringProperties(value);
      }
    });

    return obj;
  }
}
