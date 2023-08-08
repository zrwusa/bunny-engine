import {
    makeTypesConstantBizLogics,
    projectStructureGenerator,
    writeConstantBizLogics,
    writeControllers,
    writeEntities,
    writeRoutes,
    writeSchemas,
    writeServices
} from './src/helpers';
import {projectConfig} from './src/templates/materials';

function main() {
    const {
        replacer: {
            sourcePath,
            outputPath,
            replaceConfig,
            renameConfig,
            readFileIgnoreRules,
            replaceIgnoreRules,
            renameIgnoreRules
        }
    } = projectConfig;

    try {
        const generator = projectStructureGenerator({
            sourcePath,
            outputPath,
            replaceConfig,
            renameConfig,
            readFileIgnoreRules,
            replaceIgnoreRules,
            renameIgnoreRules
        });

        generator.run();
        writeEntities(outputPath, 'src/entities/');
        writeRoutes(outputPath, 'src/routes/v1/');
        writeConstantBizLogics(outputPath, 'src/constants/biz-logic/');
        makeTypesConstantBizLogics(outputPath, 'src/types/constants/biz-logic/');
        writeControllers(outputPath, 'src/controllers/');
        writeSchemas(outputPath, 'src/schemas/');
        writeServices(outputPath, 'src/services/');
    } catch (err) {
        console.error(err);
    }
}

main();



