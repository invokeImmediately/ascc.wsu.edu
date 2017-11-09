/* NODE.JS - Build Production JavaScript File */
var concat = require('../../../../AppData/Roaming/npm/node_modules/concat-files');
concat([
	'../WSU-UE---JS/jQuery.oue-custom.js',
	'../../jquery.AreYouSure/jquery.are-you-sure.js',
	'../WSU-UE---JS/jQuery.are-you-sure.js',
	'../WSU-UE---JS/jQuery.textResize.js',
	'./ascc-specific.js'
], './ascc-custom.js', function() {
	console.log('Concatenation complete.');     
});
 