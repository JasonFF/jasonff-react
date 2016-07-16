export function getFormValue(form){
  let formvalue = {};
  for (var i = 0; i < form.length; i++) {
    if (form[i].name) {
      formvalue[`${form[i].name}`] = form[i].value
    }
  }
  return formvalue
}
