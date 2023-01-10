/**
 * A debounce is a cousin of the throttle, and they both improve the performance
 * of web applications. However, they are used in different cases. A debounce
 * is utilized when you only care about the final state. For example, waiting until
 * a user stops typing to fetch typeahead search results. A throttle is best used
 * when you want to handle all intermediate states but at a controlled rate.
 * For example, track the screen width as a user resizes the window and rearrange page
 * content while it changes instead of waiting until the user has finished.
 *
 * Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)
 */

export default (func, wait) => {
    let timeout;

    /**
     * This is the function that is returned and will be executed many times
     * We spread (...args) to capture any number of parameters we want to pass
     */
    return function executedFunction(...args) {
        /**
         * The callback function to be executed after the debounce time has elapsed
         */
        const later = () => {
            /**
             * null timeout to indicate the debounce ended
             */
            timeout = null;

            /**
             * Execute the callback
             */
            func(...args);
        };

        /**
         * This will reset the waiting every function execution.
         * This is the step that prevents the function from
         * being executed because it will never reach the
         * inside of the previous setTimeout
         */
        clearTimeout(timeout);

        /**
         * Restart the debounce waiting period.
         * setTimeout returns a truthy value (it differs in web vs Node)
         */
        timeout = setTimeout(later, wait);
    };
};
