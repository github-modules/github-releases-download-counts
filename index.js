const assert = require('assert')
const {getPlatformFromFilename} = require('platform-utils')
const platforms = ['darwin', 'win32', 'linux']

module.exports = function count (releases) {
  assert(Array.isArray(releases), 'releases must be an array of release objects')
  const counts = {}
  const assets = releases.reduce((allAssets, release) => {
    if (release.assets) allAssets = allAssets.concat(release.assets)
    return allAssets
  }, [])

  // detect platform for every asset
  assets.forEach(asset => {
    asset.platform = getPlatformFromFilename(asset.name)
  })

  // get total download count for all assets
  counts.total = assets.reduce((acc, asset) => {
    acc += (asset.download_count || 0)
    return acc
  }, 0)

  platforms.forEach(platform => {
    counts[platform] = assets
      .filter(asset => asset.platform === platform)
      .reduce((acc, asset) => {
        acc += (asset.download_count || 0)
        return acc
      }, 0)
  })

  return counts
}
