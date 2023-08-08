import {ProjectConfig} from '../../types';
import {toKebabCase, toSnakeCase} from '../../utils';

const projectName = 'generated-app';

export const projectConfig: ProjectConfig = {
    name: projectName,
    entities: [
        // {
        //     name: 'post',
        //     zhName: '博文',
        //     fields: {
        //         title: {
        //             type: ['varchar', 'string'],
        //             maxLength: 127,
        //             example: 'What is Node.js: A Comprehensive Guide'
        //         },
        //         content: {
        //             type: ['text', 'string'],
        //             nullable: true,
        //             minLength: 20,
        //             maxLength: 2047,
        //             example: 'Why Do We Use NodeJs?There are many reasons for which we prefer using NodeJs for the server side of our application, some of them are discussed in the following:NodeJs is built on Google Chrome’s V8 engine, and for this reason its execution time is very fast and it runs very quickly.There are more than 50,000 bundles available in the Node Package Manager and for that reason developers can import any of the packages any time according to their needed functionality for which a lot of time is saved.As NodeJs do not need to wait for an API to return data , so for building real time and data intensive web applications, it is very useful. It is totally asynchronous in nature that means it is totally non-blocking.The loading time for an audio or video is reduced by NodeJs because there is better synchronization of the code between the client and server for having the same code base.As NodeJs is open-source and it is nothing but a JavaScript framework , so for the developers who are already used to JavaScript, for them starting developing their projects with NodeJs is very easy.'
        //         },
        //         price: {
        //             type: ['decimal', 'number'],
        //             precision: 10,
        //             scale: 2,
        //             minimum: 0.01,
        //             maximum: 99999999.99,
        //             example: 168.98
        //         },
        //         image: {
        //             type: ['varchar', 'string'],
        //             nullable: true,
        //             maxLength: 511,
        //             example: 'https://i.imgur.com/QlRphfQ.jpg'
        //         }
        //     }
        // },
    ],
    replacer: {
        sourcePath:'src/templates/back-end',
        outputPath: `dist/${projectName}/back-end`,
        replaceConfig: {
            'bunny_rest': toSnakeCase(projectName),
            'bunny-rest': toKebabCase(projectName),
        },
        renameConfig: {
            'bunny_rest': toSnakeCase(projectName),
            'bunny-rest': toKebabCase(projectName),
        },
        readFileIgnoreRules:[
            '**/node_modules/**',
            '**/.DS_Store/**',
            '.git/**',
        ],
        replaceIgnoreRules: [
            // 'dir1/dir2/*.txt',
        ],
        renameIgnoreRules: [
            // 'dir1/dir2/*.ts',
        ]
    },
}