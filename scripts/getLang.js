const fs = require('fs')
const path = require('path')


class GetLang {
    languages = ['ar', 'en']
    files = []
    strings = []

    // constractor to fire functions
    constructor () {
        this.getAllFiles()
        this.getAllLangFromFiles()
        this.addParamsToEachLang()
    }

    // get all files in folder
    getFolderFiles (path) {
        // loop in all files in folder
        const files =  fs.readdirSync(path)

        files.forEach((file) => {
            // if type == file push
            if (fs.lstatSync(path + '/' + file).isFile()) {
                this.files.push(path + '/' + file)
            } 
            // else call folder fliels again
            else if (fs.lstatSync(path + '/' + file).isDirectory()) {
                this.getFolderFiles(path + '/' + file)
            }
        })
    }


    // get all files content from src
    getAllFiles () {
        // get path to files
        const fullPath = path.join(__dirname, '../src')
        // get all folder files
        this.getFolderFiles(fullPath)
    }

    // get all lang params from files
    getAllLangFromFiles () {
        this.files.forEach((file) => {
            // read file data
            const fileData = fs.readFileSync(file).toString()
            // get data from file
            let regexp = /\$t\(\'[a-zA-Z0-9_ ]*\'\)/g;

            let matches = fileData.matchAll(regexp);
            // push it to our file
            for (const match of matches) {
                const string = match[0].slice(4, -2)
                if (!this.strings.includes(string)) this.strings.push(string)
            }

            // get data from file
            regexp = /\$t\(\"[a-zA-Z0-9_ ]*\"\)/g;

            matches = fileData.matchAll(regexp);
            // push it to our file
            for (const match of matches) {
                const string = match[0].slice(4, -2)
                if (!this.strings.includes(string)) this.strings.push(string)
            }

            // get data from file
            regexp = /text: \"[a-zA-Z0-9_ ]*\"/g;

            matches = fileData.matchAll(regexp);
            // push it to our file
            for (const match of matches) {
                const string = match[0].slice(7, -1)
                if (!this.strings.includes(string)) this.strings.push(string)
            }

            // get data from file
            regexp = /text: \'[a-zA-Z0-9_ ]*\'/g;

            matches = fileData.matchAll(regexp);
            // push it to our file
            for (const match of matches) {
                const string = match[0].slice(7, -1)
                if (!this.strings.includes(string)) this.strings.push(string)
            }

            // get data from file
            regexp = /title: \'[a-zA-Z0-9_ ]*\'/g;

            matches = fileData.matchAll(regexp);
            // push it to our file
            for (const match of matches) {
                const string = match[0].slice(8, -1)
                if (!this.strings.includes(string)) this.strings.push(string)
            }

            // get data from file
            regexp = /title: \"[a-zA-Z0-9_ ]*\"/g;

            matches = fileData.matchAll(regexp);
            // push it to our file
            for (const match of matches) {
                const string = match[0].slice(8, -1)
                if (!this.strings.includes(string)) this.strings.push(string)
            }

            // get data from file
            regexp = /helpers.withMessage\(\"[a-zA-Z0-9_ ]*\"\,/g;
            
            matches = fileData.matchAll(regexp);
            // push it to our file
            for (const match of matches) {
                const string = match[0].slice(21, -2)
                if (!this.strings.includes(string)) this.strings.push(string)
            }

            // get data from file
            regexp = /helpers.withMessage\(\'[a-zA-Z0-9_ ]*\'\,/g;
            
            matches = fileData.matchAll(regexp);
            // push it to our file
            for (const match of matches) {
                const string = match[0].slice(21, -2)
                if (!this.strings.includes(string)) this.strings.push(string)
            }

            
        })
    }

    // add all params to each lang fill
    addParamsToEachLang () {
        // loop in languages
        this.languages.forEach(lang => {
            // get file name
            const file =  __dirname + '/../src/plugins/i18n/locales/' + lang + '.json'
            // get language params
            const langData = JSON.parse(fs.readFileSync(file).toString())
            // loop in strings 
            this.strings.forEach(string => {
                // if string not exist add to file
                if (typeof langData[string] == 'undefined') langData[string] = ""
            })
            // add data to file
            if (lang != "en") {
                this.addToFile(file, langData)
            } else {
                this.addToFileKeyVal(file, langData)
            }
            
        })
    }

    addToFile (file, langData) {
        // start string
        let stringData = "{\n"
        // loop in object and build string
        let counter = 1
        for (var k in langData) {
            stringData+=`   "${k}": "${langData[k]}"${counter < Object.keys(langData).length ? "," : ""}\n`
            counter++
        }

        // end string
        stringData+= "}"
        // add string to file
        fs.writeFileSync(file, stringData);
    }


    addToFileKeyVal(file, langData) {
        // start string
        let stringData = "{\n"
        // loop in object and build string
        let counter = 1
        for (var k in langData) {
            stringData+=`   "${k}": "${langData[k] ? langData[k] : k}"${counter < Object.keys(langData).length ? "," : ""}\n`
            counter++
        }

        // end string
        stringData+= "}"
        // add string to file
        fs.writeFileSync(file, stringData);
    }
    
}


new GetLang()