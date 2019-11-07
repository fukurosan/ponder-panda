const _ = require('lodash');
const shuffleSeed = require('shuffle-seed');

export function parseFileToDataset(file) {
    if (file.type === "text/csv" || file.type === "application/vnd.ms-excel") {
        return parseCSVFileToDataset(file)
    }
    else {
        //File type not supported by parser
        return null
    }
}

export function parseCSVFileToDataset(file) {

    let data = file.data
    data = data.split('\n').map(row => row.split(','));
    data = data.map(row => _.dropRightWhile(row, val => val === ''));
    const headers = data.shift();
    data.pop()
    const rows = data

    //Create column objects
    const columns = headers.map((header, index) => {
        let column = {
            text: header,
            index: index
        }
        const columnData = data.map(row => { return row[index] })
        const valueSet = [...new Set(columnData)]
        column.valueSet = valueSet
        if (!valueSet.some(isNaN)) {
            //All values are numeric
            column.type = "numeric"
        }
        else if (valueSet.length < 3) {
            //Binary string values
            column.type = "binary"
        }
        else {
            //Multinomial string values
            column.type = "multinomial"
        }
        return column
    })

    //Create parsed dataset
    const parsedRows = rows.map(row => {
        return columns.map(column => {
            if (column.type === "numeric") {
                return parseFloat(row[column.index])
            }
            else if (column.type === "binary") {
                return column.valueSet.indexOf(row[column.index])
            }
            else {
                //Implement support for multi value string valueset
                return 0
            }
        })
    })

    const dataset = {
        name: file.name,
        type: file.type,
        columns: columns,
        originalRows: rows,
        rows: parsedRows
    }

    return dataset;
}

export function prepareRegressionDataset(dataset, labelIndex, featureIndexList, testSizePercent = 20) {

    let labels = extractColumns(dataset.rows, [labelIndex])
    let features = extractColumns(dataset.rows, featureIndexList)

    labels = shuffleSeed.shuffle(labels, 'phrase');
    features = shuffleSeed.shuffle(features, 'phrase');

    const trainSize = Math.floor((dataset.rows.length / 100) * testSizePercent)

    const result = {
        testFeatures: features.slice(0, trainSize),
        testLabels: labels.slice(0, trainSize),
        features: features.slice(trainSize),
        labels: labels.slice(trainSize)
    }

    return result
}

export function prepareSentimentDataset(dataset, labelIndex) {

    let labels = extractColumns(dataset.originalRows, [labelIndex])

    return labels.map(label => label[0])
}

function extractColumns(rows, indexes) {

    const extracted = rows.map(row => row.filter((cell, index) => indexes.indexOf(index) !== -1))

    return extracted;
}