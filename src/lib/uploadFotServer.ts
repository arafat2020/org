import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Handles file uploads by saving the file to the specified directory.
 *
 * @param {File} file - The file object to be uploaded.
 * @param {string} [uploadDir='public2/bin'] - The directory where the file will be uploaded.
 * @returns {Promise<{ success: boolean; url?: string; error?: string }>} - The result of the upload.
 */
export async function uploadForServer(
  file: File,
  uploadDir: string = 'public2/bin'
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Define the path to the upload directory
    const dirPath = join(process.cwd(), uploadDir);

    // Ensure the directory exists, creating it if necessary
    await mkdir(dirPath, { recursive: true });

    // Sanitize the file name
    const sanitizedFileName = file.name
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-zA-Z0-9.-]/g, ''); // Remove non-alphanumeric characters except dots and hyphens

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
