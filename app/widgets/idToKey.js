export default (id,blogs) => {
    let str = JSON.stringify(blogs);
    let reg = eval("/\{[^\}]+"+id+"[^\}]+\}/");
    let _sobj = reg.exec(str)[0];
    let _keyv = /"_key":\d+\,/.exec(_sobj)[0];
    let key = /\d+/.exec(_keyv)[0]
    let length = blogs.length;
    return length - 1 - key
}
