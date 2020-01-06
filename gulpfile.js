/*!*************************************************************************************************
 * gulpfile.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: Gulp automation task definition file for setting up tasks that build CSS and JS
 * files for use on the website of the Academic Success and Career Center at WSU.
 *
 * DESCRIPTION: This gulp automation task definition file is designed for use on the following
 *   project that is maintained on GitHub:
 *   https://github.com/invokeImmediately/ascc.wsu.edu
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 *
 * LICENSE: ISC - Copyright (c) 2020 Daniel C. Rieck.
 *
 *   Permission to use, copy, modify, and/or distribute this software for any purpose with or
 *   without fee is hereby granted, provided that the above copyright notice and this permission
 *   notice appear in all copies.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
 *   SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL
 *   DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY
 *   DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF
 *   CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *   PERFORMANCE OF THIS SOFTWARE.
 **************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
// §1: Gulp task dependencies..................................................................43
// §2: Specificiation of build settings .......................................................48
//   §2.1: getCssBuildSettings()...............................................................51
//   §2.2: getJsBuildSettings()...............................................................100
// §3: Entry point: Set up of build taks......................................................126
////////////////////////////////////////////////////////////////////////////////////////////////////


( function() {

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Gulp task dependencies

var gulpBuilder = require( './WSU-UE---JS/gulpBuilder.js' );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Specificiation of build settings 

////////
// §2.1: getCssBuildSettings()

/**
 * Get the settings for a gulp-mediated custom CSS build from Less source files.
 *
 * @return {object} - Instance of gulpBuilder.CssBuildSettings.
 */
function getCssBuildSettings() {
	var commentRemovalNeedle = /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm;
	var dependenciesPath = './WSU-UE---CSS/';
	var destFolder = './CSS/';
	var fontImportStr = '@import url(\'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,4\
00,400i,700,700i|Roboto+Condensed:400,400i,700,700i|PT+Serif:400,400i,700,700i|Roboto+Mono:400,400i\
,700,700i&display=swap\');\r\n';
	var insertingMediaQuerySectionHeader = {
			'before': /^@media/,
			'lineBefore': '/*! ====================================================================\
============================\r\n*** Media queries section\r\n*** ==================================\
==============================================================\r\n***   SUMMARY: Media queries buil\
t from precompiled CSS written in the Less language extension of\r\n***    CSS. Queries in this sec\
tion are a combination of those designed for use on DAESA websites***\r\n    and those intended spe\
cifically for use on the Academic Success and Career Center website.\r\n***\r\n***   DESCRIPTION: F\
ully documented, precompiled source code from which this section of the custom\r\n***    stylesheet\
 was built is developed and maintained on the following two GitHub projects:\r\n***    https://gith\
ub.com/invokeImmediately/WSU-UE---CSS/\r\n***    https://github.com/invokeImmediately/ascc.wsu.edu/\
\r\n***   AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)\r\n***\
\r\n***   LICENSE: ISC - Copyright (c) 2020 Daniel C. Rieck.\r\n***\r\n***     Permission to use, c\
opy, modify, and/or distribute this software for any purpose with or\r\n***     without fee is here\
by granted, provided that the above copyright notice and this permission\r\n***     notice appear i\
n all copies.\r\n***\r\n***     THE SOFTWARE IS PROVIDED "AS IS" AND DANIEL RIECK DISCLAIMS ALL WAR\
RANTIES WITH REGARD TO\r\n***     THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\
 AND FITNESS. IN NO EVENT\r\n***     SHALL DANIEL RIECK BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT\
, OR CONSEQUENTIAL DAMAGES OR\r\n***     ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR\
 PROFITS, WHETHER IN AN ACTION OF\r\n***     CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING\
 OUT OF OR IN CONNECTION WITH THE USE\r\n***     OR PERFORMANCE OF THIS SOFTWARE.\r\n*** ==========\
======================================================================================\r\n**/',
			'stopAfterFirstMatch': true
		};
	var minCssFileExtension = '.min.css';
	var minCssFileHeaderStr = '';
	var sourceFile = './CSS/ascc-custom.less';
	var staffAddinsFile = './CSS/ascc-custom_staff-addins.css';

	return new gulpBuilder.CssBuildSettings(commentRemovalNeedle, dependenciesPath,
		destFolder, fontImportStr, insertingMediaQuerySectionHeader, minCssFileExtension,
		minCssFileHeaderStr, sourceFile, staffAddinsFile);
}

////////
// §2.2: getJsBuildSettings()

/**
 * Get the settings for a gulp-mediated custom JS build.
 *
 * @return {object} - Simple collection of settings for JS builds.
 */
function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./WSU-UE---JS/jQuery.forms.js',
			'../jQuery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.textResize.js',
			'./JS/ascc-specific.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'ascc-custom.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: gulpBuilder.fixFileHeaderComments
	};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: Entry point: Set up of build taks

gulpBuilder.setUpCssBuildTask( getCssBuildSettings() );
gulpBuilder.setUpJsBuildTask( getJsBuildSettings() );

} )();
