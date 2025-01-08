/**
 * Capitalize the first letter of a string
 * @param {string} str - The input string
 * @returns {string} The Capitalized string
 */

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a snake_case string into camelCase
 * @param {string} str - The input string
 * @returns {string} The camelCase string
 */

export function snakeToCamel(str) {
    return str
        .split('_')
        .map((word, index) => (index === 0 ? word : capitalize(word)))
        .join('');
}

/**
 * Convert a snake_case string into Title Case
 * @param {string} str - The input string
 * @returns {string} The Title Case string
 */

export function snakeToTitle(str) {
    return str
        .split('_')
        .map((word) => capitalize(word))
        .join(' ');
}

/**
 * Convert a snake_case string into kebab-case
 * @param {string} str - The input string
 * @returns {string} The kebab-case string
 */

export function snakeToKebab(str) {
    return str.replaceAll('_', '-');
}
