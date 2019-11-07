import { prepareRegressionDataset, prepareSentimentDataset } from '../Parser'
import LinearRegression from './Gradient Descent/LinearRegression'
import LogisticRegression from './Gradient Descent/LogisticRegression'
import MultinomialLogisticRegression from './Gradient Descent/MultinominalLogisticRegression'
import SentimentTools from './Sentiment/SentimentTools'

export function init(algorithm, ...args) {
    switch (algorithm) {
        case "Gradient Descent":
            return initGradientDescent(...args)
        case "K Nearest Neighbor":
            return initKNearestNeighbor(...args)
        case "Sentiment Analysis":
            return initSentimentAnalysis(...args)
        default:
            return null
    }
}

export function initGradientDescent(dataset, labelIndex, featureIndexList, testSizePercent = 20, learningRate = 1, iterations = 1, batchSize = 1) {

    const { features, labels, testFeatures, testLabels } = prepareRegressionDataset(dataset, labelIndex, featureIndexList, testSizePercent)

    let regression = null

    const labelType = dataset.columns[labelIndex].type
    if (labelType === "numeric") {
        regression = new LinearRegression(features, labels, {
            learningRate: learningRate,
            iterations: iterations,
            batchSize: batchSize
        });
    }
    else if (labelType === "binary") {
        regression = new LogisticRegression(features, labels, {
            learningRate: learningRate,
            iterations: iterations,
            batchSize: batchSize
        });
    }
    else if (labelType === "multinomial") {
        //So-so supported. Algorithm works but needs a bit more fiddling with how to format the dataset input
        regression = new MultinomialLogisticRegression(features, labels, {
            learningRate: learningRate,
            iterations: iterations,
            batchSize: batchSize
        });
    }

    regression.train()
    regression.test(testFeatures, testLabels)

    return regression

}

export function initKNearestNeighbor(dataset, labelIndex, featureIndexList, testSizePercent = 20) {

}

export function initSentimentAnalysis(dataset, labelIndex) {
    const labels = prepareSentimentDataset(dataset, labelIndex)
    
    console.log(labels)

    const sentimentTools = new SentimentTools(labels)
    sentimentTools.analyze()

    return sentimentTools

}
