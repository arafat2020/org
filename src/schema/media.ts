import { z } from "zod";
import { zfd } from "zod-form-data";

export const mediaSchema = zfd.formData({
    name: z.string().min(1),
    bucketId: z.string().min(1),
    file: zfd.file()
})