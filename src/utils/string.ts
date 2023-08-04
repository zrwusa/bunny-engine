import _ from 'lodash';

/**
 * @return camelCase
 * @param str
 */
export const toCamelCase = function (str: string) {
    return _.camelCase(str);
}

/**
 * @return snake_case
 * @param str
 */
export const toSnakeCase = function (str: string) {
    return _.snakeCase(str);
}

/**
 * @return PascalCase
 * @param str
 */
export const toPascalCase = function (str: string) {
    return _.startCase(_.camelCase(str)).replace(/ /g, '');
}

/**
 * @return CONSTANT_CASE
 * @param str
 */
export const toConstantCase = function (str: string) {
    return _.upperCase(str).replace(/ /g, '_');
}

/**
 * @return kebab-case
 * @param str
 */
export const toKebabCase = function (str: string) {
    return _.kebabCase(str);
}

/**
 * @return lowercase
 * @param str
 */
export const toLowerCase = function (str: string) {
    return _.lowerCase(str).replace(/ /g, '');
}

/**
 * @return Title Case
 * @param str
 */
export const toTitleCase = function (str: string) {
    return _.startCase(_.camelCase(str));
}

/**
 * @return Sentence case
 * @param str
 */
export const toSentenceCase = function (str: string) {
    return _.upperFirst(_.lowerCase(str));
}

/**
 * @return path/case
 * @param str
 */
export const toPathCase = function (str: string) {
    return _.lowerCase(str).replace(/ /g, '/');
}

/**
 * @return dot.case
 * @param str
 */
export const toDotCase = function (str: string) {
    return _.lowerCase(str).replace(/ /g, '.');
}
