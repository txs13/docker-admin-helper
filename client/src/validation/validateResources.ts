
import { ZodSchema } from "zod";

export const validateResoucesAsync = async (schema: ZodSchema, objectToCheck: Object) => {
    try {
        // checking input data against schema
        await schema.parseAsync(objectToCheck);
        // return null if everething is OK
        return null;
    } catch(e: any) {
        // return array of errors if it is not
        return e.errors;
    }
}