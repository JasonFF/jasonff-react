export default (data) => {
    return data.replace(/\<[^\<]+[^\>]+\>/ig,'')
}
