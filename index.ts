import {existsSync, mkdirSync, readdirSync, statSync, readFile,writeFile, renameSync} from 'fs';
import type {Stats} from 'fs';
import * as path from 'path';
const sourceDir = 'bunny-back-end-tpl'; // origin dir

// exclude dirs
function shouldExcludeDirectory(directory: string): boolean {
    console.log(directory);
    // So far, just ignore the directory, no copying no replacement no rename.
    const excludedDirectories: string[] = ['node_modules', '.git', 'src/libs'];
    return excludedDirectories.includes(directory);
}

// replace and rename
function replaceContentAndRename(directoryPath: string, searchStrings: string[], replacements: string[], outputDir: string): void {

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    const files: string[] = readdirSync(directoryPath);

    files.forEach((file: string) => {
        const filePath: string = path.join(directoryPath, file);
        const stats: Stats = statSync(filePath);

        if (stats.isDirectory()) {
            console.log('---', directoryPath);
            if (shouldExcludeDirectory(file)) {
                console.log(`Skipping directory: ${filePath}`);
                return;
            }

            replaceContentAndRename(filePath, searchStrings, replacements, path.join(outputDir, file));
        } else {
            readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading the file: ${err}`);
                    return;
                }

                let updatedData: string = data;
                for (let i = 0; i < searchStrings.length; i++) {
                    const searchString: string = searchStrings[i];
                    const replacement: string = replacements[i];
                    const regex = new RegExp(searchString, 'g');
                    updatedData = updatedData.replace(regex, replacement);
                }

                const outputPath: string = path.join(outputDir, file);

                writeFile(outputPath, updatedData, 'utf8', (err) => {
                    if (err) {
                        console.error(`Error writing to the file: ${err}`);
                        return;
                    }

                    // console.log(`File ${outputPath} content replaced successfully.`);


                    let newFileName: string = file;
                    for (let i = 0; i < searchStrings.length; i++) {
                        const searchString: string = searchStrings[i];
                        const replacement: string = replacements[i];
                        const regex = new RegExp(searchString, 'g');
                        newFileName = newFileName.replace(regex, replacement);
                    }

                    const newFilePath: string = path.join(outputDir, newFileName);
                    renameSync(outputPath, newFilePath);
                    // console.log(`File ${outputPath} renamed to ${newFileName}.`);
                });
            });
        }
    });
}


const projectName = 'dog-raise-app';

const outputDir = `dist/${projectName}`;
const replaceConfig = {
    "bunny_back_end_tpl": "dog_raise_app",
    "bunny-back-end-tpl": "dog-raise-app",
}

replaceContentAndRename(sourceDir, Object.keys(replaceConfig), Object.values(replaceConfig), outputDir);
