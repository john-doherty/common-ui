define('parse-iso-local-date', [], () =>
    /**
     * Returns a new Date constructed from a UTC local date String e.g. 2010-05-22T16:00:00.
     * As JavaScript does not have a concept of floating date-times, the returned object will be a date in the client timezone matching the local date-time.
     * However, this is adequate for display purposes.
     *
     * @param {string} isoString the date in ISO local date-time format
     * @return {Date} a JS Date initialised with the local date-time. Note that this is not a true floating date-time so can't be reliably manipulated in any way.
     */
    function parseIsoLocalDate(isoString) {
        // This was a fix WEM-1218 on 10/Aug/16 but it was rejected by Sharath therefore in migrating I have reverted to previous version.
        // return new Date(isoString);
        const localDate = new Date(isoString);
        return new Date(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate(), localDate.getUTCHours(), localDate.getUTCMinutes(), localDate.getUTCSeconds());
    }
);
