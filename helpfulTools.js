// helpful tools
module.exports = {
	// query builder for http requests
	buildQuery : (obj) => '?'+Object.keys(obj).map(elt => elt+'='+obj[elt]+'&').join('').slice(0,-1),
	emailRegex : /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$\b/
};