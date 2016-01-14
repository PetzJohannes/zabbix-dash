define([], function () {
    return {
        searcher: function (searchText) {
            var searchHost = undefined,
                searchDescription = undefined,
                hostRegex = /([H|h]ost:)[^,]+/,
                descriptionRegex = /([D|d]escription:)[^,]+/,
                testHost = /([Hh]ost:)/.test(searchText),
                testDescription = /([Dd]escription)/.test(searchText);
            // if any regex match, build the search with params, else searching for description
            if ( testHost || testDescription ) {
                if ( testHost ) {
                    var hostValue = hostRegex.exec(searchText);
                    if ( hostValue !== null ) {
                        searchHost = (hostValue[0]).replace(/([Hh]ost:)/, "");
                    }
                }
                if ( testDescription ) {
                    var descriptionValue = descriptionRegex.exec(searchText);
                    if ( descriptionValue !== null ) {
                        searchDescription = (descriptionValue[0]).replace(/[D|d]escription:/, "");
                    }
                }
            } else {
                searchDescription = searchText;
            }

            var searchData = {
                host: searchHost,
                description: searchDescription
            };
            return searchData;
        },
        host: function (searchText) {
            var regexObj = /([Hh]ost:)[^,]+/,
                regexTest = /([Hh]ost:)/;
            return this.excluder(regexObj, regexTest, searchText);
            
        },
        description: function (searchText) {
            var regexObj = /([D|d]escription:)[^,]+/,
                regexTest = /([Dd]escription)/;
            return this.excluder(regexObj, regexTest, searchText);
        },
        excluder: function (regexObj, regexTest, searchText) {
            var retText = undefined;
            if ( regexTest.test(searchText)) {
                var value = regexObj.exec(searchText);
                if ( value !== null ) {
                    retText = (value[0]).replace(regexTest, "");
                }
            }
            return retText;
        }
    }
});