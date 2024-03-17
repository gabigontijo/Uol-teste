const ITEMS_PER_PAGE = 10

export const list = (fullList, index, itemsPerPage = ITEMS_PER_PAGE) => {
    const startPosition = itemsPerPage * (index - 1)
    const pageList = fullList.slice(startPosition, startPosition + itemsPerPage)
    return pageList
}