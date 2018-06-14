# github-releases-download-counts 

> Gather download stats by platform (win32, darwin, linux) from GitHub Releases data

Use this module to answer these questions:

- How many times has your macOS app been downloaded?
- How many times has your Windows app been downloaded?
- How many times has your Linux app been downloaded?

## Installation

```sh
npm install github-releases-download-counts
```

## Usage

This module exports a single function that expects an array of release objects.

```js
const count = require('github-releases-download-counts')
const releases = [{}, {}, {}] // releases data from the GitHub API
const counts = count(releases)
```

The result looks like this:

```js
{
  total: 5494506,
  darwin: 668182,
  win32: 957265,
  linux: 1477074
}
```

It includes the total download count of all assets, as well as download counts 
by platform. See the [platform-utils](https://github.com/zeke/platform-utils#getplatformfromfilenamefilename)
 module to get a sense of how platform-specific assets are detected.

### Getting counts for a single release

If you want download counts for a specific release, just stick it in an array:

```js
const counts = count([releases[0]])
```

### Fetching data from GitHub

This module doesn't actually fetch release data from GitHub. Here's an example
of how you could do that:

```js
const octokit = require('@octokit/rest')()
const count = require('github-releases-download-counts')

async function main(owner, repo) {
  const {data: releases} = await octokit.repos.getReleases({
    owner, 
    repo, 
    per_page: 100
  })
  console.log(count(releases))
}

main()
```

## Tests

```sh
npm install
npm test
```


## License

MIT
