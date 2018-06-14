const countDownloads = require('.')
const fixture = require('./fixture.json')

test('is a function', () => {
  expect(typeof countDownloads).toBe('function')
})

test('expects an array of releases', () => {
  expect(() => {
    countDownloads('some/repo')
  }).toThrow('releases must be an array of release objects')
})

test('returns an object with total downloads and downloads by platform', () => {
  const counts = countDownloads(fixture)
  expect(Object.keys(counts)).toEqual(['total', 'darwin', 'win32', 'linux'])
  console.log(counts)
  expect(counts.total).toBeGreaterThan(0)
  expect(counts.darwin).toBeGreaterThan(0)
  expect(counts.win32).toBeGreaterThan(0)
  expect(counts.linux).toBeGreaterThan(0)
})
