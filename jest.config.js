/** @type { import('jest').Config } */

const config = {
    verbose: true,
    testTimeout: 30000,
    reporters: [
      'default',
      [
        'jest-html-reporters',
        {
          filename: 'relatoriojestAPI.html',
          openReport: true
        }
      ]
    ]
  }
  
  module.exports = config