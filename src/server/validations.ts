const emailPattern =
	'((([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]' +
	'{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,})))';
const maskedIdPattern = '([\\w\\d\\-]+)';
const urlParamPattern = new RegExp('\\[([^#]+?)\\]', 'g');
// const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
// const tagOrComment = new RegExp(
// 	'<(?:' +
// 		'!--(?:(?:-*[^->])*--+|-?)' +
// 		'|script\\b' +
// 		tagBody +
// 		'>[\\s\\S]*?</script\\s*' +
// 		'|style\\b' +
// 		tagBody +
// 		'>[\\s\\S]*?</style\\s*' +
// 		'|/?[a-z]' +
// 		')>',
// 	'gi'
// );

export { emailPattern, maskedIdPattern, urlParamPattern };
