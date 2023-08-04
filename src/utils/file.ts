import * as fs from 'fs';
import path from 'path';

export const insertIntoFile = (filePath: string, beforeOf: string, contentToInsert: string, after?: boolean) => {
    // /Users/revone/projects/bunny-engine/dist/dog-raise/back-end/src/routes/v1/router-v1.ts

    const data = fs.readFileSync(filePath, 'utf8');


    // Find the index of the line containing "export {routerV1};"
    const exportLineIndex = data.indexOf(beforeOf);
    if (exportLineIndex === -1) {
        console.error(`The line ${beforeOf} was not found in the file.`);
        return;
    }

    // Construct the new content with the insertion
    const newContent = data.slice(0, exportLineIndex) + contentToInsert + data.slice(exportLineIndex);

    // Write the new content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');

}
export const appendIntoFile = (filePath: string, contentToInsert: string, after?: boolean) => {
    // /Users/revone/projects/bunny-engine/dist/dog-raise/back-end/src/routes/v1/router-v1.ts

    const data = fs.readFileSync(filePath, 'utf8');


    // Construct the new content with the insertion
    const newContent = data +`
`+ contentToInsert;

    // Write the new content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');

}
