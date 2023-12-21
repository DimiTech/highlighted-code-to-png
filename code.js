raw.split('\n').forEach(item => {
  if (!item) {
    return
  }

  const match = /\/home\/app\/hosting\/([^/]+)\/[^/]+\/[a-z]+_([0-9]+)\/[^:]+\:([0-9]+)\:\s+url="([^"]+)"/.exec(item)
  if (!match) {
    throw new Error(`Failed to match ${item}`)
  }

  const platform = match[1]
  const siteId = match[2]
  const url = match[4]

  const forPlatform = data[platform] || (data[platform] = {})
  const forSite = forPlatform[siteId] || (forPlatform[siteId] = {})
  const type = classify(url)
  forSite[type] = (forSite[type] || 0) + 1
})
