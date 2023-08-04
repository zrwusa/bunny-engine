import {projectStructureGenerator} from './src/helpers';
import {writeEntities} from './src/helpers/generate-entity';
import {writeRoutes} from './src/helpers/generate-route';
import {writeControllers} from './src/helpers/generate-controller';
import {writeServices} from './src/helpers/generate-service';
import {writeConstantBizLogics} from './src/helpers/generate-constant-biz-logic';
import {makeTypesConstantBizLogics} from './src/helpers/generate-types-constant-biz-logic';
import {writeSchemas} from './src/helpers/generate-schema';
import {toKebabCase, toSnakeCase} from './src/utils';

async function main() {
    try {
        const projectName = 'my-app';

        // Source files directory
        const sourceDir = 'src/templates/back-end'; // The files in the directory need to be content replaced, renamed and written to the dist
        const outputDir = `dist/${projectName}/back-end`; // The directory for storing the content replaced, renamed and written files

        // Config of replacement
        const replaceConfig: { [key: string]: string } = {
            'bunny_rest': toSnakeCase(projectName),
            'bunny-rest': toKebabCase(projectName),
        };

        // Config of renaming files
        const renameConfig: { [key: string]: string } = {
            'bunny_rest': toSnakeCase(projectName),
            'bunny-rest': toKebabCase(projectName),
        };

        // Ignore rules of writing files
        const readFileIgnoreRules: string[] = [
            '**/node_modules/**',
            '**/.DS_Store/**',
            '.git/**',
        ];

        // Ignore rules of content replacement
        const replaceIgnoreRules: string[] = [
            // 'dir1/dir2/*.txt',
        ];

        // Ignore rules of renaming
        const renameIgnoreRules: string[] = [
            // 'dir1/dir2/*.ts',
        ];

        const generator = projectStructureGenerator({
            sourceDir,
            outputDir,
            replaceConfig,
            renameConfig,
            readFileIgnoreRules,
            replaceIgnoreRules,
            renameIgnoreRules
        });

        await generator.run();
        writeEntities(outputDir, 'src/entities/');
        writeRoutes(outputDir, 'src/routes/v1/');
        writeConstantBizLogics(outputDir, 'src/constants/biz-logic/');
        makeTypesConstantBizLogics(outputDir, 'src/types/constants/biz-logic/');
        writeControllers(outputDir, 'src/controllers/');
        writeSchemas(outputDir, 'src/schemas/');
        writeServices(outputDir, 'src/services/');
    } catch (err) {
        console.error(err);
    }
}

main().then();



