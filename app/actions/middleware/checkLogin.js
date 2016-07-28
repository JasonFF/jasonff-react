export default function(store) {
  return next => action => {
    let actionString = JSON.stringify(action)
    if (/("status":123)/gi.test(actionString)) {
      next({
        type: 'CHECKLOGIN',
        data: {
          status: 23333,
          href: window.location.href
        }
      })
    }else{
      next(action)
    }
  }
}
