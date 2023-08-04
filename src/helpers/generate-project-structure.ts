import {Replacer} from '../utils';
import {Options} from '../types';



export const projectStructureGenerator = (options: Options) => {
    return new Replacer(options);
}