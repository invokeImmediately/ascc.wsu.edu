var compiledCssSrcFileName = 'ascc-custom.css';
var compiledJsBuildName = "ascc-custom.js"
var minCssFileHeaderStr = '/* Built with the LESS CSS preprocessor [http://lesscss.org/]. Please\
 see [https://github.com/invokeImmediately/ascc.wsu.edu] for a repository of source code. */\r\n';
var gulp = require( 'gulp' );
var lessc = require( 'gulp-less' );
var gcmq = require( 'gulp-group-css-media-queries' );
var insertLines = require( 'gulp-insert-lines' );
var cleanCss = require( 'gulp-clean-css' );
var insert = require( 'gulp-insert' );
var extName = require( 'gulp-extname' );
var compiledJsBuildName = 'dsp-custom-build.js';
var replace = require( 'gulp-replace' );
var concat = require( 'gulp-concat' );

gulp.task( 'buildMinCss', function () {
	return gulp.src( [
			'./CSS/ascc-custom.less'
		] )
		.pipe( replace( /^\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm, '' ) )
		.pipe( lessc( {
			paths: ['./WSU-UE---CSS/']
		} ) )
		.pipe( gulp.dest( './CSS/' ) )
		.pipe( gcmq() )
		.pipe( insertLines( {
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════\
════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ######################\
################################################################################# ║\r\n*   ╚═══════\
═══════════════════════════════════════════════════════════════════════════════════════════════════\
═════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		} ) )
		.pipe( cleanCss() )
		.pipe( insert.prepend( minCssFileHeaderStr ) )
		.pipe( extName( '.min.css' ) )
		.pipe( gulp.dest( './CSS/' ) );
} );

gulp.task( 'buildMinJs', function () {
	return gulp.src( [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'../jquery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'./JS/ascc-specific.js'
		] )
		.pipe( replace( /^(\/\*)(?!!)/g, fixFileHeaderComments ) )
		.pipe( concat( compiledJsBuildName ) )
		.pipe( gulp.dest( './JS/' ) );
} );

function fixFileHeaderComments ( match, p1, offset, string ) {
	var replacementStr = match;
	if ( offset == 0 ) {
		replacementStr = '/*!';
	}
	return replacementStr;
}
