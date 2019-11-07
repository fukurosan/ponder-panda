import * as Sentiment from 'sentiment'

export default class SentimentTools {
  constructor(textArray) {

    this.textArray = textArray
    this.sentiment = new Sentiment()

  }

  analyze() {
    const comparativeValues = this.textArray.map(text => {
      return this.sentiment.analyze(text).comparative
    })

    const comparativeTotal = comparativeValues.reduce((totalSentiment, compValue) => {
      return totalSentiment += compValue
    }, 0)
  
    this.comparative = (comparativeTotal / comparativeValues.length)

  }

}