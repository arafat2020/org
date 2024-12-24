import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Handles file uploads by saving the file to the specified directory.
 *
 * @param {File | Buffer} file - The file to be uploaded, either a `File` or `Buffer`.
 * @param {string} [uploadDir='public2/bin'] - The directory where the file will be uploaded.
 * @returns {Promise<{ success: boolean; url?: string; error?: string }>} - The result of the upload.
 */
export async function uploadForServer(
    file: File | Buffer,
    uploadDir: string = 'public2/bin'
): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        if (!(file instanceof Buffer || file instanceof File)) {
            return { success: false, error: 'Invalid file type provided' };
        }

        // Convert File to Buffer if necessary
        const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;

        // Define the path to the upload directory
        const dirPath = join(process.cwd(), uploadDir);

        // Ensure the directory exists, creating it if necessary
        await mkdir(dirPath, { recursive: true });

        // Sanitize the file name if it's a File
        const sanitizedFileName = file instanceof File
            ? file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '')
            : `buffer-upload`;

        // Generate a unique file name
        const uniqueFileName = `${uuidv4()}-${sanitizedFileName}`;
        const filePath = join(dirPath, uniqueFileName);

        // Write the file to the directory
        await writeFile(filePath, buffer);
        console.log(`File uploaded to ${filePath}`);

        // Generate the public URL
        const url = `/${uploadDir.split('/').slice(1).join('/')}/${uniqueFileName}`;

        return { success: true, url };
    } catch (error) {
        console.error('File upload failed:', error);
        return { success: false, error: 'File upload failed' };
    }
}
