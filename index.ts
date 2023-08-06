import {projectStructureGenerator} from './src/helpers';
import {writeEntities} from './src/helpers/generate-entity';
import {writeRoutes} from './src/helpers/generate-route';
import {writeControllers} from './src/helpers/generate-controller';
import {writeServices} from './src/helpers/generate-service';
import {writeConstantBizLogics} from './src/helpers/generate-constant-biz-logic';
import {makeTypesConstantBizLogics} from './src/helpers/generate-types-constant-biz-logic';
import {writeSchemas} from './src/helpers/generate-schema';
import {projectConfig} from './src/templates/materials';

async function main() {
    const {replacer: {sourcePath, outputPath, replaceConfig, renameConfig, readFileIgnoreRules, replaceIgnoreRules, renameIgnoreRules}} = projectConfig;

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

main().then();



