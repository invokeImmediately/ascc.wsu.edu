/*!************************************************************************************************
 * jQuery.oue-custom.js: custom JS code common to all WSU Undergraduate Education websites        *
 **************************************************************************************************/

/**************************************************************************************************
 * TABLE OF CONTENTS                                                                              *
 * -----------------                                                                              *
 *   §1: ADDITION OF FUNCTIONS to jQuery......................................................48  *
 *     §1.1: jQuery.isJQueryObj...............................................................56  *
 *     §1.2: jQuery.logError..................................................................69  *
 *   §2: AFTER DOM IS READY excution section.................................................128  *
 *   §3: AFTER WINDOW LOADED event bindings..................................................285  *
 *   §4: WINDOW RESIZE event bindings........................................................331  *
 *   §5: FUNCTION DECLARATIONS...............................................................339  *
 *     §5.1: addA11yTabPressListener.........................................................349  *
 *     §5.2: addBlankTargetAttributes........................................................361  *
 *     §5.3: addDefinitionListButtons........................................................418  *
 *     §5.4: checkForLrgFrmtSingle...........................................................515  *
 *     §5.5: effectDropDownTogglePermanence..................................................529  *
 *     §5.6: finalizeLrgFrmtSideRight........................................................558  *
 *     §5.7: fixDogears......................................................................575  *
 *     §5.8: handleMouseClickForA11y.........................................................597  *
 *     §5.9: handleTabPressForA11y...........................................................603  *
 *     §5.10: initContentFlippers............................................................611  *
 *     §5.11: initDefinitionLists............................................................624  *
 *     §5.12: initDropDownToggles............................................................671  *
 *     §5.13: initFancyHrH2Motif.............................................................693  *
 *     §5.14: initFancyHrH3Motif.............................................................699  *
 *     §5.15: initHrH2Motif..................................................................705  *
 *     §5.16: initHrH3Motif..................................................................717  *
 *     §5.17: initQuickTabs..................................................................723  *
 *     §5.18: initReadMoreToggles............................................................783  *
 *     §5.19: initTocFloating................................................................800  *
 *     §5.20: initTriggeredByHover...........................................................874  *
 *     §5.21: initWelcomeMessage.............................................................890  *
 *     §5.22: resizeLrgFrmtSideRight.........................................................897  *
 *     §5.23: setupDropDownTogglePermanence..................................................902  *
 *     §5.24: showDefinitionListButtons......................................................934  *
 **************************************************************************************************/

( function ( $ ) {

'use strict';

var thisFileName = "jQuery.oue-custom.js";

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: ADDITION OF FUNCTIONS to jQuery

// --- §1.1: jQuery.isJQueryObj
/**
 * Checking function to verify that the passed parameter is a valid jQuery object.
 *
 * @param $obj - Possible jQuery object; could be anything.
 */
$.isJQueryObj = function ( $obj ) {
	return ( $obj && ( $obj instanceof $ || $obj.constructor.prototype.jquery ) );
}

// --- §1.2: jQuery.logError
/**
 * Log an error using the browser console in JSON notation.
 * 
 * @param {string} fileName - Name of the JS source file wherein the error was encountered.
 * @param {string} fnctnName - Name of the function that called $.logError.
 * @param {string} fnctnDesc - Description of what the calling function is supposed to do.
 * @param {string} errorMsg - Message that describes what went wrong within the calling function.
 */
$.logError = function ( fileName, fnctnName, fnctnDesc, errorMsg ) {
	var thisFuncName = "jQuery.logError";
	var thisFuncDesc = "Log an error using the browser console in JSON notation.";
	var bitMask;
	
	bitMask = typeof fileName === "string";
	bitMask = ( typeof fnctnName === "string" ) | ( bitMask << 1 );
	bitMask = ( typeof fnctnDesc === "string" ) | ( bitMask << 1 );
	bitMask = ( typeof errorMsg === "string" || typeof errorMsg === "object" ) | ( bitMask << 1 );
	if ( bitMask === 15 ) {
		console.log( "error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName +
			"'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terrorMessage: '" + errorMsg + "'\n\t};" );
		if (typeof errorMsg === "object") {
			console.log( errorMsg );
		}
	} else {
		var incorrectTypings;
		var bitMaskCopy;
		var newErrorMsg;
		
		// Determine how many incorrectly typed arguments were encountered
		for ( var i=0, incorrectTypings = 0, bitMaskCopy = bitMask; i < 4; i++ ) {
			incorrectTypings += bitMaskCopy & 1;
			bitMaskCopy = bitMaskCopy >> 1;
		}
		
		// Construct a new error message
		if ( incorrectTypings == 1 ) {
			newErrorMsg = "Unfortunately, a call to jQuery.error was made with an incorrectly\
 typed argument.\n"
		} else {
			newErrorMsg = "Unfortunately, a call to jQuery.error was made with incorrectly typed\
 arguments.\n"
		}
		newErrorMsg += "Here are the arguments that were passed to jQuery.logError:\n";
		newErrorMsg += "\t\tfileName = " + fileName + "\n";
		if ( !( ( bitMask & 8 ) >> 3 ) ) {
			newErrorMsg += "\t\ttypeof filename = " + ( typeof fileName ) + "\n";
			fileName = thisFileName;
		}
		newErrorMsg += "\t\tfnctnName = " + fnctnName + "\n";
		if( !( ( bitMask & 4 ) >> 2 ) ) {
			newErrorMsg += "\t\ttypeof fnctnName = " + ( typeof fnctnName ) + "\n";
			fnctnName = thisFuncName;
		}
		newErrorMsg += "\t\tfnctnDesc = " + fnctnDesc + "\n";
		if( !( ( bitMask & 2 ) >> 1 ) ) {
			newErrorMsg += "\t\ttypeof fnctnDesc = " + ( typeof fnctnDesc ) + "\n";
			fnctnDesc = thisFuncDesc;
		}
		newErrorMsg += "\t\terrorMsg = " + errorMsg + "\n";
		if( !( bitMask & 1 ) ) {
			newErrorMsg += "\t\ttypeof errorMsg = " + ( typeof errorMsg ) + "\n";
		}
		console.log(newErrorMsg);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: AFTER DOM IS READY excution section

$( function () {
	var argsList = new Object(); // List of arguments that will be passed to functions
	var args; // List of arguments currently being utilized
	
	argsList.fixDogears = {
		slctrSiteNav: "#spine-sitenav",
		slctrDogeared: "li.current.active.dogeared",
		removedClasses: "current active dogeared"
	};
	args = argsList.fixDogears;
	fixDogears( args.slctrSiteNav, args.slctrDogeared, args.removedClasses );

	argsList.addBlankTargetAttributes = {
		slctrSpine: "#spine",
		slctrExternalLinks: "a.external"
	};
	args = argsList.addBlankTargetAttributes;
	addBlankTargetAttributes( args.slctrSpine, args.slctrExternalLinks );

	argsList.checkForLrgFrmtSingle = {
		slctrSingle: ".single.large-format-friendly",
		slctrMainHdr: "header.main-header",
		slctrHdrGroup: ".header-group",
		centeringClass: "centered"
	};
	args = argsList.checkForLrgFrmtSingle;
	checkForLrgFrmtSingle( args.slctrSingle, args.slctrMainHdr, args.slctrHdrGroup, 
		args.centeringClass );

	argsList.initHrH2Motif = {
		slctrStandardH2: ".column > h2:not(.fancy), .column > section > h2:not(.fancy)",
		slctrPrevHr: "hr:not(.subSection)",
		h2ClassesAdded: "no-top-margin",
		hrClassesAdded: "narrow-bottom-margin dark-gray thicker",
		animAddDrtn: 250
	};
	args = argsList.initHrH2Motif;
	initHrH2Motif( args.slctrStandardH2, args.slctrPrevHr, args.h2ClassesAdded, 
		args.hrClassesAdded, args.animAddDrtn );

	argsList.initFancyHrH2Motif = {
		slctrFancyH2: ".column > h2.fancy, .column > section > h2.fancy",
		slctrPrevHr: "hr:not(.subSection)",
		hrClassesAdded: "no-bottom-margin dark-gray thicker encroach-horizontal",
		animAddDrtn: 250
	};
	args = argsList.initFancyHrH2Motif;
	initFancyHrH2Motif( args.slctrFancyH2, args.slctrPrevHr, args.hrClassesAdded, 
		args.animAddDrtn );

	argsList.initHrH3Motif = {
		slctrStandardH3: ".column > h3:not(.fancy), .column > section > h3:not(.fancy)",
		slctrPrevHr: "hr:not(.subSection)",
		hrClassesAdded: "narrow-bottom-margin crimson",
		animAddDrtn: 250
	};
	args = argsList.initHrH3Motif;
	initHrH3Motif( args.slctrStandardH3, args.slctrPrevHr, args.hrClassesAdded, args.animAddDrtn );

	argsList.initFancyHrH3Motif = {
		slctrFancyH3: ".column > h3.fancy, .column > section > h3.fancy",
		slctrPrevHr: "hr:not(.subSection)",
		hrClassesAdded: "no-bottom-margin crimson encroach-horizontal",
		animAddDrtn: 250
	};
	args = argsList.initFancyHrH3Motif;
	initFancyHrH3Motif( args.slctrFancyH3, args.slctrPrevHr, args.hrClassesAdded, 
		args.animAddDrtn );

	argsList.initDropDownToggles = {
		slctrToggle: ".drop-down-toggle",
		slctrWhatsToggled: ".toggled-panel",
		activatingClass: "activated",
		animDuration: 500
	};
	args = argsList.initDropDownToggles;
	initDropDownToggles( args.slctrToggle, args.slctrWhatsToggled, args.activatingClass, 
		args.animDuration );

	argsList.initReadMoreToggles = {
		slctrToggleIn: ".read-more-toggle-in-ctrl",
		slctrToggleOut: ".read-more-toggle-out-ctrl",
		slctrPanel: ".read-more-panel",
		animDuration: 500
	};
	args = argsList.initReadMoreToggles;
	initReadMoreToggles( args.slctrToggleIn, args.slctrToggleOut, args.slctrPanel, 
		args.animDuration );

	argsList.initContentFlippers = {
		slctrCntntFlppr: ".content-flipper",
		slctrFlppdFront: ".flipped-content-front",
		slctrFlppdBack: ".flipped-content-back",
		animDuration: 500
	};
	args = argsList.initContentFlippers;
	initContentFlippers( args.slctrCntntFlppr, args.slctrFlppdFront, args.slctrFlppdBack, 
		args.animDuration );

	argsList.initDefinitionLists = {
		slctrDefList: "dl.toggled",
		slctrLrgFrmtSection: ".large-format-friendly",
		slctrColOne: ".column.one",
		slctrColTwo: ".column.two",
		dtActivatingClass: "activated",
		ddRevealingClass: "revealed",
		animSldDrtn: 400,
		animHghtDrtn: 100
	};
	args = argsList.initDefinitionLists;
	initDefinitionLists( args.slctrDefList, args.slctrLrgFrmtSection, args.slctrColOne, 
		args.slctrColTwo, args.dtActivatingClass, args.ddRevealingClass, args.animSldDrtn, 
		args.animHghtDrtn );

	argsList.addDefinitionListButtons = {
		slctrDefList: argsList.initDefinitionLists.slctrDefList,
		expandAllClass: "expand-all-button",
		collapseAllClass: "collapse-all-button",
		btnDisablingClass: "disabled",
		dtActivatingClass: argsList.initDefinitionLists.dtActivatingClass,
		ddRevealingClass: argsList.initDefinitionLists.ddRevealingClass,
		animSldDrtn: argsList.initDefinitionLists.animSldDrtn
	};
	args = argsList.addDefinitionListButtons;
	addDefinitionListButtons( args.slctrDefList, args.expandAllClass, args.collapseAllClass, 
		args.btnDeactivatingClass, args.dtActivatingClass, args.ddRevealingClass, 
		args.animSldDrtn );

	argsList.initQuickTabs = {
		slctrQtSctn: "section.row.single.quick-tabs"
	};
	args = argsList.initQuickTabs;
	initQuickTabs( args.slctrQtSctn );

	argsList.initTocFloating = {
		slctrToc: "p.vpue-jump-bar",
		slctrBackToToc: "p.vpue-jump-back"
	};
	args = argsList.initTocFloating;
	initTocFloating( args.slctrToc, args.slctrBackToToc );

	argsList.initTriggeredByHover = {
		slctrTrggrdOnHvr: ".triggered-on-hover",
		slctrCntntRvld: ".content-revealed",
		slctrCntntHddn: ".content-hidden",
		animDuration: 200
	};
	args = argsList.initTriggeredByHover;
	initTriggeredByHover( args.slctrTrggrdOnHvr, args.slctrCntntRvld, args.slctrCntntHddn, 
		args.animDuration );
	
	// TODO: initScrollingSidebars("...");
} );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §3: AFTER WINDOW LOADED event bindings

$( window ).on( "load", function () {
	var argsList = new Object();
	var args;

	argsList.finalizeLrgFrmtSideRight = {
		slctrSideRight: ".side-right.large-format-friendly",
		slctrColOne: ".column.one",
		slctrColTwo: ".column.two",
		trggrWidth: 1051,
		animDuration: 100
	};
	args = argsList.finalizeLrgFrmtSideRight;
	finalizeLrgFrmtSideRight( args.slctrSideRight, args.slctrColOne, args.slctrColTwo, 
		args.trggrWidth, args.animDuration );

	argsList.showDefinitionListButtons = {
		slctrDefList: "dl.toggled",
		expandAllClass: "expand-all-button",
		collapseAllClass: "collapse-all-button",
		animFadeInDrtn: 400
	};
	args = argsList.showDefinitionListButtons;
	showDefinitionListButtons( args.slctrDefList, args.expandAllClass, args.collapseAllClass,
		args.animFadeInDrtn );

	argsList.initWelcomeMessage = {
		slctrWlcmMsg: "#welcome-message",
		slctrPostWlcmMsg: "#post-welcome-message",
		msgDelay: 1000,
		fadeOutDuration: 500,
		fadeInDuration: 500
	};
	args = argsList.initWelcomeMessage;
	initWelcomeMessage( args.slctrWlcmMsg, args.slctrPostWlcmMsg, args.msgDelay, 
		args.fadeOutDuration, args.fadeInDuration );

	argsList.addA11yTabPressListener = {
		listenerCallback: handleTabPressForA11y
	}
	args = argsList.addA11yTabPressListener;
	addA11yTabPressListener( args.listenerCallback );
} );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §4: WINDOW RESIZE event bindings

$( window ).resize( function () {
	resizeLrgFrmtSideRight( ".side-right.large-format-friendly", "div.column.one",
		"div.column.two", 1051, 100 );
} );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §5: FUNCTION DECLARATIONS

// --- §5.1: addA11yTabPressListener
/**
 * Add an event listener to handle for keyboard navigation implied by tab presses. 
 *
 * Intended to support accessibility design.
 *
 * @param {function} listenerCallback - Function callback triggered on keydown event.
 */
function addA11yTabPressListener( listenerCallback ) {
	window.addEventListener( "keydown", listenerCallback );
}

// --- §5.2: addBlankTargetAttributes
/**
 * Adds missing blank target attributes to links within the WSU Spine as needed.
 * 
 * @param {string} slctrSpine - Selector string for locating the spine object within the DOM.
 * @param {string} slctrExternalLinks - Selector string for locating links within the spine that
 *     lead to destination external to the domain.
 */
function addBlankTargetAttributes( slctrSpine, slctrExternalLinks ) {
	var thisFnctnName = "addBlankTargetAttributes";
	var thisFnctnDesc = "Adds missing blank target attributes to links within the WSU Spine as \
needed.";
	if ( typeof slctrSpine === "string" && typeof slctrExternalLinks === "string" ) {
		var $spine = $( slctrSpine );
		if ( $spine.length === 1 ) {
			var $links = $spine.find( slctrExternalLinks );
			$links.each( function () {
				var $thisLink = $( this );
				if ( $thisLink.attr( "target" ) != "_blank" ) {
					$thisLink.attr( "target", "_blank" );
					var relStr = $thisLink.attr( "rel" );
					if ( relStr == undefined ) {
						$thisLink.attr( "rel", "noopener noreferrer" );
					} else {
						if ( relStr.search( /noopener/i ) < 0 ) {
							relStr += " noopener";
						}
						if ( relStr.search( /noreferrer/i ) < 0 ) {
							relStr += " noreferrer";
						}
						$thisLink.attr( "rel", relStr );
					}
				}
			} );
		} else {
			$.logError( 
				thisFileName, thisFnctnName, thisFnctnDesc,
				"I could not locate the WSU Spine element within the DOM."
			);
		}
	} else {
		$.logError( 
			thisFileName, thisFnctnName, thisFnctnDesc,
			"I was passed one or more incorrectly typed parameters. Here's what I was \
passed:\n\ttypeof slctrSpine = " + ( typeof slctrSpine ) + "\n\ttypeof slctrExternalLinks = " +
				( typeof slctrExternalLinks )
		);
	}
}

// --- §5.3: addDefinitionListButtons
/**
 * Automatically creates and binds events to expand/collapse all buttons designed for improving UX
 * of OUE site definition lists.
 *
 * @param {string} slctrDefList - Selector string for locating definition list elements within the
 *     DOM that contain collapsible definitions.
 * @param {string} expandAllClass - CSS class for controlling the layout of expand all buttons.
 * @param {string} collapseAllClass - CSS class for controlling the layout of collapse all buttons.
 * @param {string} btnDisablingClass - CSS class applied to disable expand/collapse all buttons.
 * @param {string} dtActivatingClass - CSS class used to indicate an active/expanded state for
 *     definition terms.
 * @param {string} ddRevealingClass - CSS class used to realize a revealed, visible state on
 *     definitions.
 */
function addDefinitionListButtons( slctrDefList, expandAllClass, collapseAllClass, 
		btnDisablingClass, dtActivatingClass, ddRevealingClass, animSldDrtn ) {
	var thisFuncName = "addDefinitionListButtons";
	var thisFuncDesc = "Automatically creates and binds events to expand/collapse all buttons \
designed for improving UX of OUE site definition lists";
	
	// Find and remove any pre-existing expand/collapse all buttons
	var $lists = $( slctrDefList );
	var $existingExpandAlls = $lists.children( "." + expandAllClass );
	var $existingCollapseAlls = $lists.children( "." + collapseAllClass );
	if ( $existingExpandAlls.length > 0 ) {
		$existingExpandAlls.remove();
		$.logError( 
			thisFileName, thisFuncName, thisFuncDesc,
			"Expand all buttons were already discovered in the DOM upon document initialization; \
please remove all buttons from the HTML source code to avoid wasting computational resources."
		);
	}
	if ( $existingCollapseAlls.length > 0 ) {
		$existingCollapseAlls.remove();
		$.logError( 
			thisFileName, thisFuncName, thisFuncDesc,
			"Collapse all buttons were already discovered in the DOM upon document initialization; \
please remove all buttons from the HTML source code to avoid wasting computational resources."
		);
	}
	
	// Add initially hidden ( via CSS ) expand/collapse all buttons to definition lists
	$lists.prepend( '<div class="collapse-all-button">[-] Collapse All</div>' );
	$lists.prepend( '<div class="expand-all-button">[+] Expand All</div>' );
	var slctrExpandAll = slctrDefList + " > ." + expandAllClass;
	var $expandAlls = $( slctrExpandAll );
	var slctrCollapseAll = slctrDefList + " > ." + collapseAllClass;
	var $collapseAlls = $( slctrCollapseAll );
	
	// Bind handling functions to button click events
	$expandAlls.click( function() {
		var $thisExpand = $( this );
		if ( !$thisExpand.hasClass( btnDisablingClass ) ) {
			var $nextCollapse = $thisExpand.next( "." + collapseAllClass );
			var $parentList = $thisExpand.parent( slctrDefList );
			if ( $parentList.length == 1 ) {
				// TODO: Disable buttons
				var $defTerms = $parentList.children( "dt" );
				$defTerms.each( function() {
					var $thisDefTerm = $( this );
					if ( !$thisDefTerm.hasClass( dtActivatingClass ) ) {
						$thisDefTerm.addClass( dtActivatingClass );
						var $thisDefTermNext = $thisDefTerm.next( "dd" );
						$thisDefTermNext.addClass( ddRevealingClass );
						$thisDefTermNext.stop().animate( {
							maxHeight: $thisDefTermNext[0].scrollHeight
						}, animSldDrtn );
					}
				} );
				// TODO: Enable buttons
			} else {
				$.logError( 
					thisFileName, thisFuncName, thisFunDesc,
					"When trying to bind a click event on an expand all button to a handling \
function, could not locate the parental definition list within DOM."
				);
			}
		}
	} );
	$collapseAlls.click( function() {
		var $thisCollapse = $( this );
		if ( !$thisCollapse.hasClass( btnDisablingClass ) ) {
			var $prevExpand = $thisCollapse.prev( "." + expandAllClass );
			var $parentList = $thisCollapse.parent( slctrDefList );
			if ( $parentList.length == 1 ) {
				// TODO: Disable buttons
				var $defTerms = $parentList.children( "dt" );
				$defTerms.each( function() {
					var $thisDefTerm = $( this );
					if ( $thisDefTerm.hasClass( dtActivatingClass ) ) {
						$thisDefTerm.removeClass( dtActivatingClass );
						var $thisDefTermNext = $thisDefTerm.next( "dd" );
						$thisDefTermNext.removeClass( ddRevealingClass );
						$thisDefTermNext.stop().animate( {
							maxHeight: 0
						}, animSldDrtn );
					}
				} );
				// TODO: Enable buttons
			} else {
				$.logError( 
					thisFileName, thisFuncName, thisFunDesc,
					"When trying to bind a click event on collapse all button #" + 
						$thisCollapse.index() + "to a handling function, could not locate the \
parental definition list within the DOM."
				);
			}
		}
	} );
}

function checkForLrgFrmtSingle( slctrSingle, slctrMainHdr, slctrHdrGroup, centeringClass ) {
	var $lrgFrmtSnglSctns;
	var $mainHeader;
	var $mnHdrChldDiv;

	$lrgFrmtSnglSctns = $( slctrSingle );
	if ( $lrgFrmtSnglSctns.length > 0 ) {
		$mainHeader = $( slctrMainHdr );
		$mainHeader.addClass( centeringClass );
		$mnHdrChldDiv = $mainHeader.find( slctrHdrGroup );
		$mnHdrChldDiv.addClass( centeringClass );
	}
}

function effectDropDownTogglePermanence( $toggles, slctrWhatsToggled, activatingClass, 
		animDuration ) {
	var thisFuncName = "effectDropDownTogglePermanence";
	var thisFuncDesc = "Upon page load, sets the expansion state of a drop down toggle element \
based on previous user interactions during the session.";
	if ( $.isJQueryObj( $toggles ) ) {
		$toggles.each( function() {
			var $this = $( this );
			if ( $this[0].id ) {
				try {
					var state = sessionStorage.getItem( $this[0].id );
					if ( state == "expanded" ) {
						$this.toggleClass( activatingClass );
					}
				} catch( e ) {
					$.logError( thisFileName, thisFuncName, thisFuncDesc, e.message );
				}
			} else {
				$.logError( thisFileName, thisFuncName, thisFuncDesc,
					"No ID was set for this drop down toggle element; thus, expansion state \
permanence cannot be effected." );
			}
		} );
	} else {
		$.logError( thisFileName, thisFuncName, thisFuncDesc,
			"I was not passed a valid jQuery object." );
	}
}

function finalizeLrgFrmtSideRight( slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, 
		animDuration ) {
	if( $( window ).width() >= trggrWidth ) {
		$( slctrSideRight + ">" + slctrColTwo ).each( function () {
			var $this = $( this );
			var $thisPrev = $this.prev( slctrColOne );
			if( $this.height() != $thisPrev.height() ) {
				$this.height( $thisPrev.height() );
			}
			var crrntOpacity = $this.css( "opacity" );
			if ( crrntOpacity == 0 ) {
				$this.animate( {opacity: 1.0}, animDuration );
			}
		} );
	}
}

function fixDogears( slctrSiteNav, slctrDogeared, removedClasses ) {
	// Fix bug wherein the wrong items in the spine become dogeared
	var $dogearedItems = $( slctrSiteNav ).find( slctrDogeared );
	if ( $dogearedItems.length > 1 ) {
		var currentURL = window.location.href;
		var currentPage = currentURL.substring( currentURL.substring( 0, currentURL.length -
 1 ).lastIndexOf( "/" ) + 1, currentURL.length - 1 );
		$dogearedItems.each( function () {
			var $this = $( this );
			var $navLink = $this.children( "a" );
			if ( $navLink.length == 1 ) {
				var navLinkURL = $navLink.attr( "href" );
				var navLinkPage = navLinkURL.substring( navLinkURL.substring( 0, navLinkURL.length -
 1 ).lastIndexOf( "/" ) + 1, navLinkURL.length - 1 );
				if ( navLinkPage != currentPage ) {
					$this.removeClass( removedClasses );
				}
			}
		} );
	}
}

function handleMouseClickForA11y( e ) {
	$( "body" ).removeClass( "user-is-tabbing" )
	window.removeEventListener( "mousedown", handleMouseClickForA11y )
	window.addEventListener( "keydown", handleTabPressForA11y )
}

function handleTabPressForA11y( e ) {
	if ( e.keyCode === 9 ) {
		$( "body" ).addClass( "user-is-tabbing" )
		window.removeEventListener( "keydown", handleTabPressForA11y )
		window.addEventListener( "mousedown", handleMouseClickForA11y )
	}
}

function initContentFlippers( slctrCntntFlppr, slctrFlppdFront, slctrFlppdBack, animDuration ) {
	$( slctrCntntFlppr ).click( function () {
		var $this = $( this );
		$this.next( slctrFlppdFront ).toggle( animDuration );
		$this.next( slctrFlppdFront ).next( slctrFlppdBack ).fadeToggle( animDuration );
	} );
	$( slctrFlppdFront ).click( function () {
		var $this = $( this );
		$this.toggle( animDuration );
		$this.next( slctrFlppdBack ).fadeToggle( animDuration );
	} );
}

function initDefinitionLists( slctrDefList, slctrLrgFrmtSection, slctrColOne, slctrColTwo,
 dtActivatingClass, ddRevealingClass, animHghtDrtn ) {
	var $listDts = $( slctrDefList + " dt" );
	$listDts.attr( "tabindex", 0 );
	$listDts.click( function() {
		var $this = $( this );
		$this.toggleClass( dtActivatingClass );
		var $thisNext = $this.next( "dd" );
		$thisNext.toggleClass( ddRevealingClass );
		if ( $thisNext.hasClass( ddRevealingClass ) ) {
			$thisNext.stop().animate( {
				maxHeight: $thisNext[0].scrollHeight
			} );
		} else {
			$thisNext.stop().animate( {
				maxHeight: 0
			} );
		}
		var $parent = $this.parents( slctrLrgFrmtSection + ">" + slctrColOne );
		var $prntNxt = $parent.next( slctrColTwo );
		$prntNxt.delay( 400 ).animate( {height: $parent.css( 'height' )}, animHghtDrtn );
	} );
	$listDts.on( "keydown", function( e ) {
		var regExMask = /Enter| /g; // TODO: Divide and conquer
		if ( regExMask.exec( e.key ) != null ) {
			e.preventDefault();
			var $this = $( this );
			$this.toggleClass( dtActivatingClass );
			var $thisNext = $this.next( "dd" );
			$thisNext.toggleClass( ddRevealingClass );
			if ( $thisNext.hasClass( ddRevealingClass ) ) {
				$thisNext.stop().animate( {
					maxHeight: $thisNext[0].scrollHeight
				} );
			} else {
				$thisNext.stop().animate( {
					maxHeight: 0
				} );
			}
			var $parent = $this.parents( slctrLrgFrmtSection + ">" + slctrColOne );
			var $prntNxt = $parent.next( slctrColTwo );
			$prntNxt.delay( 400 ).animate( {height: $parent.css( 'height' )}, animHghtDrtn );
		}
	} );
	$( slctrDefList + " dd" ).removeClass( ddRevealingClass );
}

function initDropDownToggles( slctrToggle, slctrWhatsToggled, activatingClass, animDuration ) {
	var $toggles =  $( slctrToggle );
	$toggles.attr( "tabindex", 0 );
	$toggles.addClass( "no-anchor-highlighting" );
	effectDropDownTogglePermanence( $toggles, slctrWhatsToggled, activatingClass, animDuration );
	$toggles.click( function () {
		var $this = $( this );
		$this.blur();
		$this.toggleClass( activatingClass );
		setupDropDownTogglePermanence( $this, activatingClass );
	} );
	$toggles.on( "keydown", function( e ) {
		var regExMask = /Enter| /g;
		if ( regExMask.exec( e.key ) != null ) {
			e.preventDefault();
			var $this = $( this );
			$this.toggleClass( activatingClass );
			setupDropDownTogglePermanence( $this, activatingClass );
		}
	} );
}

function initFancyHrH2Motif( slctrFancyH2, slctrPrevHr, hrClassesAdded, animAddDrtn ) {
	$( slctrFancyH2 ).each( function () {
			$( this ).prev( slctrPrevHr ).addClass( hrClassesAdded, animAddDrtn );
	} );
}

function initFancyHrH3Motif( slctrFancyH3, slctrPrevHr, hrClassesAdded, animAddDrtn ) {
	$( slctrFancyH3 ).each( function () {
		$( this ).prev( slctrPrevHr ).addClass( hrClassesAdded, animAddDrtn );
	} );
}

function initHrH2Motif( slctrStandardH2, slctrPrevHr, h2ClassesAdded, hrClassesAdded,
		animAddDrtn ) {
	$( slctrStandardH2 ).each( function () {
			var $this = $( this );
			var $prevElem = $this.prev( slctrPrevHr );
			if ( $prevElem.length > 0 ) {
				$this.addClass( h2ClassesAdded );
				$prevElem.addClass( hrClassesAdded, animAddDrtn );
			}
	} );
}

function initHrH3Motif( slctrStandardH3, slctrPrevHr, hrClassesAdded, animAddDrtn ) {
	$( slctrStandardH3 ).each( function () {
		$( this ).prev( slctrPrevHr ).addClass( hrClassesAdded, animAddDrtn );
	} );
}

function initQuickTabs( slctrQtSctn ) {
	var $qtSctn = $( slctrQtSctn );
	$qtSctn.each( function () {
		var $thisSctn = $( this );
		var $tabCntnr = $thisSctn.find( "div.column > ul" );
		var $tabs = $tabCntnr.find( "li" );
		var $panelCntnr = $thisSctn.find( "table" );
		var $panels = $panelCntnr.find( "tbody:first-child > tr" );
		if( $tabs.length == $panels.length ) {
			var idx;
			var jdx;
			for ( idx = 0; idx < $tabs.length; idx++ ) {
				$tabs.eq( idx ).click( function() {
					var $thisTab = $( this );
					var kdx = $tabs.index( $thisTab );
					if ( kdx == 0 ) {
						if ( $thisTab.hasClass( "deactivated" ) ) {
							$thisTab.removeClass( "deactivated" );
							$panels.eq( kdx ).removeClass( "deactivated" );
							for ( jdx = 1; jdx < $tabs.length; jdx++ ) {
								if ( $tabs.eq( jdx ).hasClass( "activated" ) ) {
									$tabs.eq( jdx ).removeClass( "activated" );
									$panels.eq( jdx ).removeClass( "activated" );
								}
							}
							$( "html, body" ).animate( {
								scrollTop: $thisTab.offset().top
							}, 500 );								
						}
					} else {
						if ( !$thisTab.hasClass( "activated" ) ) {
							if ( !$tabs.eq( 0 ).hasClass( "deactivated" ) ) {
								$tabs.eq( 0 ).addClass( "deactivated" );
								$panels.eq( 0 ).addClass( "deactivated" );
							}
							for ( jdx = 1; jdx < kdx; jdx++ ) {
								if ( $tabs.eq( jdx ).hasClass( "activated" ) ) {
									$tabs.eq( jdx ).removeClass( "activated" );
									$panels.eq( jdx ).removeClass( "activated" );
								}
							}
							$thisTab.addClass( "activated" );
							$panels.eq( kdx ).addClass( "activated" );
							for ( jdx = kdx + 1; jdx < $tabs.length; jdx++ ) {
								if ( $tabs.eq( jdx ).hasClass( "activated" ) ) {
									$tabs.eq( jdx ).removeClass( "activated" );
									$panels.eq( jdx ).removeClass( "activated" );
								}
							}
							$( "html, body" ).animate( {
								scrollTop: $thisTab.offset().top
							}, 500 );								
						}
					}
				} );
			}
		}
	} );
}

function initReadMoreToggles( slctrToggleIn, slctrToggleOut, slctrPanel, animDuration ) {
	$( slctrToggleIn ).click( function () {
		var $this = $( this );
		var $next = $this.next( slctrPanel );
		$this.toggle( animDuration );
		$this.$next.toggle( animDuration );
		$this.$next.next( slctrToggleOut ).toggle( animDuration );
	} );
	$( slctrToggleOut ).click( function () {
		var $this = $( this );
		var $next = $this.next( slctrPanel );
		$this.toggle( animDuration );
		$this.$next.toggle( animDuration );
		$this.$next.next( slctrToggleIn ).toggle( animDuration );
	} );
}

function initTocFloating( slctrToc, slctrBackToToc ) {
	var thisFuncName = "initTocFloating";
	var thisFuncDesc = "Cause the table of contents element to float after scrolling past a \
certain point";
	var $toc = $( slctrToc );
	var $backToToc = $( slctrBackToToc );
	var $linkToTop = $backToToc.first().children( "a" );
	var $mainHeader = $( "header.main-header" );
	if ( $toc.length === 1 && $mainHeader.length === 1 ) {
		var $window = $( window );
		var tocTrigger = $toc.offset().top + $toc.height() + 100;
		var $tocClone = $toc.clone().addClass( "floating" ).removeAttr( "id" ).insertAfter( $toc );
		$tocClone.find( "span.title + br").remove();
		$tocClone.find( "span.title").remove();
		var counter = 1;
		$tocClone.find( "br").each( function () {
			if ( counter % 2 != 0 ) {
				$( this ).before( " //");
			}
			$( this ).remove();
			counter++;
		} );
		if ( $linkToTop.length === 1 ) {
			var linkText = $linkToTop.text();
			var idxMatched = linkText.search( /\u2014Back to ([^\u2014]+)\u2014/ );
			if ( idxMatched != -1 ) {
				var $linkToTopClone = $linkToTop.clone();
				$linkToTopClone.text( linkText.replace( /\u2014Back to ([^\u2014]+)\u2014/,
					"$1" ) );
				$tocClone.prepend( " //&nbsp;" );
				$linkToTopClone.prependTo( $tocClone );
				$backToToc.remove();
			} else {
				$.logError( thisFileName, thisFuncName, thisFuncDesc, "Did not find the correct \
textual pattern within the link back to the top of the page." );
			}
		} else {
			console.log( thisFileName, thisFuncName, thisFuncDesc,  "Did not find a single \
hyperlink within the first link back to the top of the page." );
		}
		$window.scroll( function( e ) {
			var windowScrollPos = $window.scrollTop();
			if ( windowScrollPos > tocTrigger && !$tocClone.is( ":visible" ) ) {
				$tocClone.width( $mainHeader.width() * .8 );
				$tocClone.css( {
					left: $mainHeader.offset().left + $mainHeader.width() / 2,
				} );
				$tocClone.fadeIn( 300 );
			}
			else if ( windowScrollPos <= tocTrigger && $tocClone.is( ":visible" ) ) {
				$tocClone.hide();
			}
		} );
		$window.resize( function () {
			$tocClone.width( $mainHeader.width() * .8 );
			$tocClone.css( {
				left: $mainHeader.offset().left + $mainHeader.width() / 2,
			} );
		} );
	} else {
		if ( $toc.length > 1 ) {
			console.log( thisFileName, thisFuncName, thisFuncDesc, "Found more than one table of \
contents elements; this function only works with one table of contents." );
		}
		if ( $mainHeader.length === 0 ) {
			console.log( thisFileName, thisFuncName, thisFuncDesc, "Could not find the main header \
element within the DOM." );
		} else if ( $mainHeader.length > 1 ) {
			console.log( thisFileName, thisFuncName, thisFuncDesc, "Found more than one table of \
contents elements; this function only works with one table of contents.' }" );
		}
	}
}

function initTriggeredByHover( slctrTrggrdOnHvr, slctrCntntRvld, slctrCntntHddn, animDuration ) {
	$( slctrTrggrdOnHvr ).mouseenter( function () {
		var $this = $( this );
		var $rvldCntnt = $this.find( slctrCntntRvld );
		var $hddnCntnt = $this.find( slctrCntntHddn );
		$rvldCntnt.stop().show( animDuration );
		$hddnCntnt.stop().hide( animDuration );
	} ).mouseleave( function () {
		var $this = $( this );
		var $rvldCntnt = $this.find( slctrCntntRvld );
		var $hddnCntnt = $this.find( slctrCntntHddn );
		$rvldCntnt.stop().hide( animDuration );
		$hddnCntnt.stop().show( animDuration );
	} );
}

function initWelcomeMessage( slctrWlcmMsg, slctrPostWlcmMsg, msgDelay, fadeOutDuration, 
		fadeInDuration ) {
	$( slctrWlcmMsg ).delay( msgDelay ).fadeOut( fadeOutDuration, function () {
		$( slctrPostWlcmMsg ).fadeIn( fadeInDuration );
	} );
}

function resizeLrgFrmtSideRight( slctrSideRight, slctrColOne, slctrColTwo, trggrWidth,
		animDuration ) {
	finalizeLrgFrmtSideRight( slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration );
}

function setupDropDownTogglePermanence( $toggle, activatingClass ) {
	var thisFuncName = "setupDropDownTogglePermanence";
	var thisFuncDesc = "Records the expansion state of a drop down toggle element in local storage \
to later effect permanence.";
	if ( $.isJQueryObj( $toggle ) ) {
		if ( $toggle[0].id ) {
			try {
				var state = $toggle.hasClass( activatingClass ) ? "expanded" : "collapsed";
				sessionStorage.setItem( $toggle[0].id, state );
			} catch( e ) {
				$.logError( thisFileName, thisFuncName, thisFuncDesc, e.message );
			}
		} else {
			$.logError( thisFileName, thisFuncName, thisFuncDesc,
				"No ID was set for this drop down toggle element; thus, expansion state permanence \
cannot be effected." );
		}
	} else {
		$.logError( thisFileName, thisFuncName, thisFuncDesc,
			"I was not passed a valid jQuery object." );
	}
}

/**
 * showDefinitionListButtons
 * DESCRIPTION: Display expand/collapse all buttons, which were initially hidden
 * PARAMETERS:
 *   += slctrDefList: selector string for locating definition list elements within the DOM that contain collapsible definitions
 *   += expandAllClass: CSS class for controlling the layout of expand all buttons
 *   += collapseAllClass: CSS class for controlling the layout of collapse all buttons
 *   += animFadeInDrtn: the animation speed by which definitions fade into view
 */
function showDefinitionListButtons( slctrDefList, expandAllClass, collapseAllClass,
		animFadeInDrtn ) {
	var thisFuncName = "addDefinitionListButtons";
	var thisFuncDesc = "Display expand/collapse all buttons, which were initially hidden";
	
	// Display expand/collapse all buttons
	var $lists = $( slctrDefList );
	var $expandAlls = $lists.children( "." + expandAllClass );
	var $collapseAlls = $lists.children( "." + collapseAllClass );
	$lists.animate( {
		marginTop: "+=39px"
	}, animFadeInDrtn, function() {
		$expandAlls.fadeIn( animFadeInDrtn );
		$collapseAlls.fadeIn( animFadeInDrtn );
	} );
}
	
} )( jQuery );

/*!*
 * jQuery.forms.js
 * -------------------------------------------------------------------------------------------------
 * SUMMARY: Enhancements, intended for OUE websites, mediated by jQuery to dynamic behavior of
 * Gravity Forms.
 *
 * AUTHOR: Daniel Rieck [daniel.rieck@wsu.edu] (https://github.com/invokeImmediately)
 *
 * REPOSITORY: https://github.com/invokeImmediately/WSU-UE---JS
 *
 * LICENSE: ISC - Copyright (c) 2018 Daniel C. Rieck.
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
 */


////////////////////////////////////////////////////////////////////////////////////////////////////
// TABLE OF CONTENTS
// -----------------
// §1: Gravity Forms enhancement modules........................................................56
//     §1.1: EmailConfirmations class...........................................................59
//         §1.1.1: Public properties............................................................84
//         §1.1.2: Public methods..............................................................100
//     §1.2: GfCheckboxValidators class........................................................132
//         §1.2.1: Private properties..........................................................150
//         §1.2.2: Public properties...........................................................155
//         §1.2.3: Privileged methods..........................................................160
//         §1.2.4: Constructor's main execution section........................................176
//         §1.2.5: Public methods..............................................................182
//     §1.3: OueGFs class......................................................................310
//         §1.3.1: Public properties...........................................................328
//         §1.3.2: Public methods..............................................................357
//         §1.3.3: Lexically scoped supporting functions.......................................384
//     §1.4: WsuIdInputs class.................................................................411
//         §1.4.1: Public properties...........................................................431
//         §1.4.2: Public methods..............................................................446
//         §1.4.3: Lexically scoped supporting functions.......................................543
// §2: Application of OUE-wide Gravity Forms enhancements......................................568
//     §2.1: Application of OueGFs module......................................................574
//     §2.2: Document ready bindings...........................................................582
//     §2.3: Binding of Handlers to Window Load................................................603
//     §2.4: Window Load Event Bindings........................................................615
//     §2.5: Function declarations.............................................................622
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// §1: Gravity Forms enhancement modules

////////////////////////////////////////////////////////////////////////////////////////////////
// §1.1: EmailConfirmations class

/**
 * Gravity Forms enhancement module for preventing the user from pasting input into email
 * confirmation fields.
 *
 * Keeps users from being lazy and circumventing the mistake prevention effects of having to
 * explicitly enter emails twice.
 *
 * @class
 */

var EmailConfirmations = ( function( $ ) {

	"use strict";

	/**
	 * Constructor for EmailConfirmations.
	 *
	 * @param {string} selGField - Selects the Gravity Form field containing the input in which the
	 *     email and its confirmation will be entered.
	 */
	function EmailConfirmations( selGfield ) {

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.1.1: Public properties

		/**
		 * The collection of selectors used to find inputs accepting emails and email confirmations
		 * in the DOM.
		 *
		 * @public
		 */
		this.sels = {
			gform: '.gform_wrapper',
			gfield: selGfield,
			inputs: ".ginput_right input[type='text']"
		};
	}

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.1.2: Public methods

	/**
	 * Initializes the event handling that will prevent misuse of the email confirmation field.
	 *
	 * @public
	 */
	EmailConfirmations.prototype.init = function () {
		var $forms = $( this.sels.gform );
		var inputSel = this.sels.gfield + ' ' + this.sels.inputs;

		if ( $forms.length ) {	
			$forms.on( 'paste', inputSel, this.onPaste );
		}
	};

	/**
	 * Handler for paste events triggered in inputs accepting email confirmations.
	 *
	 * @public
	 *
	 * @param {Event} e - Contains information about the paste event.
	 */
	EmailConfirmations.prototype.onPaste = function ( e ) {
		e.stopPropagation();
		e.preventDefault();
	};

	return EmailConfirmations;
} )( jQuery );

////////////////////////////////////////////////////////////////////////////////////////////////
// §1.2: GfCheckboxValidators

/**
 * Gravity Forms enhancement module for validating checkbox input containers wherein all checkboxes
 * must be checked.
 *
 * Links the state of a Gravity Forms checkbox field to a subsequent (and ideally hidden) validator
 * field. Currently, all of the checkboxes must be selected for the field to be validated.
 *
 * @class
 */
var GfCheckboxValidators = ( function( $ ) {
	
	"use strict";

	function GfCheckboxValidators( sels ) {

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.2.1: Private properties

		var _$form;

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.2.2: Public properties

		this.sels = sels;

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.2.3: Privileged methods

		this.get$form = function () {
			return _$form;
		}

		this.findForm = function () {
			if ( this.IsObjValid() ) {
				_$form = $ ( this.sels.formContainer )
			} else {
				console.log( "Object wasn't valid." );
				_$form = $( [] );
			}
		}

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.2.4: Constructor's main execution section

		this.findForm();
	}

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.2.5: Public methods

	/**
	 * Finish the process of hiding validator fields from the user.
	 *
	 * Removes tab indexing from the field so that JavaScript can safely automate population of the
	 * validator field with input based on the state of the preceding checkbox field.
	 *
	 * @access public
	 *
	 * @memberof GfCheckboxValidators
	 */
	GfCheckboxValidators.prototype.finishHidingValidators = function () {
		var $form;
		var $field;
		var $validator;
		var $validator_input;

		$form = this.get$form();
		if ( this.IsObjValid() && $form.length) {
			// Isolate validator and its target field in the DOM.
			$field = $form.find( this.sels.validatedField );
			$validator = $field.next( this.sels.validator );

			// Disable tab indexing to form validators.
			if ( $field.length && $validator.length ) {
				$validator_input = $validator.find( "input" );
				$validator_input.attr( 'tabindex', '-1' );
			}
		}
	};

	/**
	 * Initialize validation of validated checkbox fields by their subsequent validator fields.
	 *
	 * The validator's input element will be set to "validated" if all checkboxes are checked,
	 * otherwise it will be set to an empty string.
	 *
	 * @access public
	 *
	 * @memberof GfCheckboxValidators
	 *
	 * @throws {Error} Member function IsObjValid will automatically be called and must return true.
	 * @throws {Error} The specified validated and validator fields must be found within the form,
	 *     and each validated field must be followed by a validator field as a sibling.
	 * @throws {Error} Validated fields must contain checkbox input elements, and validator fields
	 *     must contain a single input element.
	 */
	GfCheckboxValidators.prototype.initValidation = function() {
		var $form;
		var sels = this.sels;
		var stillValid;

		stillValid = this.IsObjValid();
		if ( !stillValid ) {
			throw Error( "Object properties did not pass validity check." );
		} else {
			// Find the form appropriate fields within the form.
			$form = this.get$form();
			$form.on('change', sels.validatedField + " :checkbox", function () {
				var $checkBoxes;
				var $parentField;
				var $this;
				var $validator_input;
				var allChecked = true;
				var stillValid = true;

				$this = $( this );
				$parentField = $this.parents( sels.validatedField );
				$checkBoxes = $parentField.find( " :checkbox" );
				$validator_input = $parentField.next( sels.validator ).find( "input" );
				stillValid = $validator_input.length === 1;
				try {
					if ( !stillValid ) {
						throw Error( "Found a validated field in the DOM that was not followed by a\
 matching, properly formed validator sibling; checkbox state cannot be properly validated." );
					} else {
						// Check the state of all the checkbox inputs within the validated field.
						$checkBoxes.each( function () {
							if ( allChecked && !this.checked) {
								allChecked = false;
							}
						} );

						// Appropriately set the state of the validator's input element.
						if ( allChecked && $validator_input.val() != "validated" ) {
							$validator_input.val( "validated" );
						} else if ( $validator_input.val() != "" ) {
							$validator_input.val( "" );
						}
					}
				} catch ( err ) {
					console.log(err.name + ": " + err.message);
				}
			} );
		}
	};

	/**
	 * Check the validity of the instance based on the types and values of its members.
	 *
	 * @return {boolean} Returns true if members are properly typed and their values conform to
	 *     expectations. Returns false otherwise.
	 */
	GfCheckboxValidators.prototype.IsObjValid = function() {
		var stillValid = true;
		var selsProps;

		if ( !( typeof this.sels === 'object' ) ) {
			stillValid = false
		} else if ( stillValid ) {
			selsProps = Object.getOwnPropertyNames( this.sels );
		}
		if ( stillValid && !( selsProps.length === 3 &&
				selsProps.find( function( elem ) { return elem === 'formContainer'; } ) &&
				selsProps.find( function( elem ) { return elem === 'validatedField'; } ) &&
				selsProps.find( function( elem ) { return elem === 'validator'; } ) ) ) {
			stillValid = false;
		}
		// TODO: Check for properly formed selector strings.

		return stillValid;
	};

	return GfCheckboxValidators;
} )( jQuery );

////////////////////////////////////////////////////////////////////////////////////////////
// §1.3: OueGFs

/**
 * Module for adding enhancements to Gravity Forms found on OUE websites.
 *
 * @class
 */

var OueGFs = ( function( $ ) {
	
	"use strict";

	/**
	 * Constructor for OueGFs.
	 */
	function OueGFs() {

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.3.1: Public properties

		/**
		 * Collection of selectors used to find form elements in the DOM.
		 *
		 * @public
		 */
		this.selectors = {
			gforms: '.gform_wrapper',
			wsuIds: '.gf-is-wsu-id',
			emailConfirmations: '.ginput_container_email'
		};

		/**
		 * Module for enhancing form inputs that accept WSU ID numbers.
		 *
		 * @public
		 */
		this.wsuIds = null;

		/**
		 * Module for enhancing to form inputs that accept WSU ID numbers.
		 *
		 * @public
		 */
		this.emailConfirmations = null;
	}

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.3.2: Public methods

	/**
	 * Initialize Gravity Forms found on the page.
	 *
	 * @public
	 */
	OueGFs.prototype.init = function () {
		this.completeDomLoadedTasks();
	};

	/**
	 * Perform Gravity Forms intialization steps that should take place once the DOM has loaded.
	 *
	 * @public
	 */
	OueGFs.prototype.completeDomLoadedTasks = function () {
		var instance = this;
		$( function () {
			if ( $( instance.selectors.gforms ).length ) {
				initEmailConfirmations( instance );
				initWsuIdInputs( instance );
			}
		} );
	};

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.3.3: Lexically scoped supporting functions

	/**
	 * Initialize inputs accepting WSU ID numbers.
	 *
	 * @param {OueGFs} obj - An OueGFs instance that needs to be initialized.
	 */
	function initEmailConfirmations( obj ) {
		obj.emailConfirmations = new EmailConfirmations( obj.selectors.emailConfirmations );
		obj.emailConfirmations.init();
	}

	/**
	 * Initialize inputs accepting WSU ID numbers.
	 *
	 * @param {OueGFs} obj - An OueGFs instance that needs to be initialized.
	 */
	function initWsuIdInputs( obj ) {
		obj.wsuIds = new WsuIdInputs( obj.selectors.wsuIds );
		obj.wsuIds.init();
	}

	return OueGFs;

} )( jQuery );

////////////////////////////////////////////////////////////////////////////////////////////////
// §1.4: WsuIdInputs

/**
 * Provides RegEx mediated validation of gravity form inputs that accept WSU ID numbers.
 *
 * @class
 */
var WsuIdInputs = ( function ( $ ) {
	
	"use strict";

	/**
	 * Constructor for WsuIdInputs class.
	 *
	 * @param {string} selGField - Selects the Gravity Form field containing the input in which the
	 *     WSU ID number will be entered.
	 */
	function WsuIdInputs( selGfield ) {

		////////////////////////////////////////////////////////////////////////////////////////////
		// §1.4.1: Public properties

		/**
		 * The collection of selectors used to find inputs accepting WSU ID numbers in the DOM.
		 *
		 * @public
		 */
		this.sels = {
			gform: '.gform_wrapper',
			gfield: selGfield,
			inputs: "input[type='text']"
		};
	}

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.4.2: Public methods

	/**
	 * Initializes RegEx mediated validation of inputs accepting WSU ID numbers.
	 *
	 * @public
	 */
	WsuIdInputs.prototype.init = function () {
		var $forms = $( this.sels.gform );
		var inputSel = this.sels.gfield + ' ' + this.sels.inputs;

		$forms.on( 'blur', inputSel, this.onBlur );
		$forms.on( 'keydown', inputSel, this.onKeydown );
		$forms.on( 'paste', inputSel, this.onPaste );
	};

	/**
	 * Handler for blur events triggered in inputs accepting WSU ID numbers.
	 *
	 * @private
	 *
	 * @param {Event} e - Contains information about the blur event.
	 */

	WsuIdInputs.prototype.onBlur = function( e ) {
		var $this = $( this );
		var inputText = $this.val();
		var frep = getFinalRegExPattern();

		if ( inputText != '' ) {
			if ( frep.exec( inputText ) == null ) {
				$this.val( '' );
				alert( 'The WSU ID you entered did not follow the correct pattern; please try again\
. When the leading zero is included, WSU ID numbers are 9 digits long. You can also drop the leadin\
g zero and enter in 8 digits.' );
			}
		}
	};

	/**
	 * Handler for keydown events triggered in inputs accepting WSU ID numbers.
	 *
	 * @public
	 *
	 * @param {Event} e - Contains information about the keydown event.
	 */
	WsuIdInputs.prototype.onKeydown = function ( e ) {
		var $this = $( this );
		var inputText = $this.val();
		var akc = getAcceptableKeyCodes();

		if ( ( e.keyCode < 48 || ( e.keyCode > 57 && e.keyCode < 96 ) || e.keyCode > 105 )
				&& !~akc.indexOf( e.keyCode ) && !( e.keyCode == 86 && e.ctrlKey ) ) {
			e.preventDefault();
		} else if ( !~akc.indexOf( e.keyCode ) && inputText.length >= 9 ) {
			e.preventDefault();
			alert( 'Note: WSU ID numbers are no greater than nine (9) digits in length.' );
		}
	};

	/**
	 * Handler for paste events triggered in inputs accepting WSU ID numbers.
	 *
	 * @public
	 *
	 * @param {Event} e - Contains information about the paste event.
	 */
	WsuIdInputs.prototype.onPaste = function ( e ) {
		var $this = $( this );
		var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
		var inputText = clipboardData.getData( 'Text' );
		var regExMask = /[^0-9]+/g;

		if ( regExMask.exec( inputText ) != null ) {
			var errorMsg = 'Note: WSU ID numbers can only contain digits.';
			e.stopPropagation();
			e.preventDefault();
			$this.val( inputText.replace( regExMask, '' ) );
			inputText = $this.val();
			if ( inputText.length > 9 ) {
				$this.val( inputText.slice( 0, 9 ) );
				errorMsg += ' Also, they must be no greater than nine (9) digits in length.';
			}
			errorMsg += ' What you pasted will automatically be corrected; please check the result \
to see if further corrections are needed.';
			alert( errorMsg );
		} else if ( inputText.length > 9 ) {
			e.stopPropagation();
			e.preventDefault();
			$this.val( inputText.slice( 0,9 ) );
			alert( 'WSU ID numbers are no greater than nine (9) digits in length. What you pasted w\
ill automatically be corrected. Please check the result to see if further corrections are needed.'
				);
		}
	};

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.4.3: Lexically scoped supporting functions

	/**
	 * Obtains the regular expression pattern representing valid complete or incomple WSU ID input.
	 *
	 * @return {RegExp}
	 */
	function getFinalRegExPattern() {
		return /(?:^[0-9]{8}$)|(?:^0[0-9]{8}$)/;
	}

	/**
	 * Obtains the list of key codes for acceptable keystrokes when a WSU ID input has focus.
	 *
	 * @return {Array}
	 */
	function getAcceptableKeyCodes() {
		return [ 8, 9, 20, 35, 36, 37, 39, 46, 110, 144 ];
	}

	return WsuIdInputs;

} )( jQuery );

////////////////////////////////////////////////////////////////////////////////////////////////////
// §2: Application of OUE-wide Gravity Forms enhancements

( function ( $ ) {
	"use strict";

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.1: Application of OueGFs module

	var oueGfs;

	oueGfs = new OueGFs();
	oueGfs.init();

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.2: Document ready bindings

	$( function () {
		var $requiredFields;
		if ( $( '.gform_body' ).length > 0 ) {
			setupActvtrChckbxs( '.oue-gf-actvtr-checkbox' );
			setupActvtrChain( '.oue-gf-actvtr-chain' );
			setupUploadChain( '.oue-gf-upload-chain' );
			
			// TODO: streamline functions by querying all ul.gform_fields li.gfield, then determine
			//   how to handle object by finding div children with gfield_container_class. Best to
			//   implement as a class.
			$requiredFields =  $( 'li.gfield_contains_required' );
			hghlghtRqrdInpts( $requiredFields.find( 'input' ) );
			hghlghtRqrdChckbxs( $requiredFields.find( 'ul.gfield_checkbox, ul.gfield_radio' ) );
			hghlghtRqrdTxtAreas( $requiredFields.find( 'textarea' ) );
			hghlghtRqrdSelects( $requiredFields.find( 'select' ) );
		}
	} );

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.3: Binding of Handlers to Window Load

	$( document ).on( 'gform_post_render', function () {
		var $requiredFields =  $( 'li.gfield_contains_required' );

		checkRqrdInpts( $requiredFields.find( 'input' ) );
		checkRqrdChckbxs( $requiredFields.find( 'ul.gfield_checkbox, ul.gfield_radio' ) );
		checkRqrdTxtAreas( $requiredFields.find( 'textarea' ) );
	} );


	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.4: Window Load Event Bindings

	$( window ).load( function () {
		hghlghtRqrdRchTxtEdtrs( $( '.gfield_contains_required.uses-rich-editor' ) );
	} );

	////////////////////////////////////////////////////////////////////////////////////////////////
	// §2.5: Function declarations

	/**
	 * Check each input element within a required gravity form field to determine if an entry has
	 * already made by the user and highlight the input if not.
	 *
	 * @param {jQuery} $inputs - The set of input elements contained in required gravity form
	 *     fields.
	 */
	function checkRqrdInpts ( $inputs ) {
		if ( $.isJQueryObj( $inputs ) ) {
			$inputs.each( function () {
				var $thisInput = $( this );
				if ( $thisInput.val() == '' ) {
					$thisInput.removeClass( 'gf-value-entered' );
				} else {
					$thisInput.addClass( 'gf-value-entered' );
				}
			} );
		}
	}
	
	/**
	 * Highlight input elements within required gravity form fields until a value has been properly
	 * entered by the user.
	 *
	 * @param {jQuery} $inputs - The set of input elements contained in required gravity form
	 *     fields.
	 */
	function hghlghtRqrdInpts ( $inputs ) {
		if ( $.isJQueryObj( $inputs ) ) {
			$inputs.each( function () {
				var $thisInput = $( this );
				$thisInput.blur( function () {
					if ( $thisInput.val() == '' ) {
						$thisInput.removeClass( 'gf-value-entered' );
					} else {
						$thisInput.addClass( 'gf-value-entered' );
					}
				} );
			} );
		}
	}

	/**
	 * Check each checkbox list within required gravity form checkbox fields to determine if at
	 * least one checkbox has already been checked by the user and highlight the list if not.
	 *
	 * @param {jQuery} $lists - The set of list elements wrapping checkbox inputs and contained in
	 *     required gravity form fields.
	 */
	function checkRqrdChckbxs ( $lists ) {
		if ( $.isJQueryObj( $lists ) ) {
			$lists.each(function () {
				var $this = $( this );
				var $inputs = $this.find( 'input' );
				var inputReady = false;
				$inputs.each( function () {
					if ( $( this ).prop( 'checked' ) == true && !inputReady ) {
						inputReady = true;
					}
				} );
				if ( inputReady ) {
					$this.addClass( 'gf-value-entered' );
				} else {
					$this.removeClass( 'gf-value-entered' );
				}
			} );
		}
	}

	/**
	 * Highlight required gravity form fields containing checkbox elements until at least one box is
	 * checked by the user.
	 *
	 * @param {jQuery} $lists - The set of list elements wrapping checkbox inputs and contained in
	 *     required gravity form fields.
	 */
	function hghlghtRqrdChckbxs ( $lists ) {
		if ( $.isJQueryObj( $lists ) ) {
			$lists.each( function () {
				var $inputs;
				var $this;

				$this = $( this );
				$inputs = $this.find( 'input' );
				$inputs.each( function () {
					var $thisChild = $( this );
					$thisChild.change( function () {
						var $parentsInputs;
						var $thisParent;
						var inputReady = false;

						$thisParent = $thisChild.parents( 'ul.gfield_checkbox, ul.gfield_radio' );
						$parentsInputs = $thisParent.find( 'input' );
						$parentsInputs.each(function () {
							if ( $( this ).prop( 'checked' ) == true && !inputReady ) {
								inputReady = true;
							}
						} );
						if ( inputReady ) {
							$thisParent.addClass( 'gf-value-entered' );
						} else {
							$thisParent.removeClass( 'gf-value-entered' );
						}
					} );
				} );
			} );
		}
	}

	/**
	 * Check each text area element within a required gravity form field to determine if an entry
	 * has already made by the user and highlight the element if not.
	 *
	 * @param {jQuery} $textAreas - The set of text area elements contained in required gravity form
	 *     fields.
	 */
	function checkRqrdTxtAreas ( $textAreas ) {
		checkRqrdInpts( $textAreas );
	}

	/**
	 * Highlight text area elements within required gravity form fields until a value has been
	 * entered by the user.
	 *
	 * @param {jQuery} $textAreas - The set of text arewa elements contained in required gravity
	 *     form fields.
	 */
	function hghlghtRqrdTxtAreas ( $textAreas ) {
		hghlghtRqrdInpts( $textAreas );
	}

	/**
	 * Highlight rich text editors within required gravity form fields until a value has been
	 * entered by the user.
	 *
	 * @param {jQuery} $fields - The set of rich text editor fields that are also required gravity
	 *     form fields.
	 */
	function hghlghtRqrdRchTxtEdtrs( $fields ) {
		if ( $.isJQueryObj( $fields ) && $fields.length > 0 ) {
			$fields.each( function () {
				var $editorForm = $( this ).find( 'iframe' );
				$editorForm.each( function () {
					var $editorBody = $( this ).contents().find( '#tinymce' );
					$editorBody.css( {
						 backgroundColor: 'rgba(255,0,0,0.1)',
						 fontFamily: '"Open sans", sans-serif'
					} );
					$editorBody.focus( function () {
						$( this ).css( 'background-color', 'rgba(255,255,255,1)' );
					} );
					$editorBody.blur( function () {
						var $this = $( this );
						if ( $this.text().replace( /\n|\uFEFF/g, '' ) == '' ) {
							$this.css( 'background-color', 'rgba(255,0,0,0.1)' );
						}
					} );
				} );
			} );
		}
	}

	/**
	 * Highlight select elements within required gravity form fields until a value has been selected
	 * by the user.
	 *
	 * @param {jQuery} $selects - The set of text arewa elements contained in required gravity
	 *     form fields.
	 */
	function hghlghtRqrdSelects ( $selects ) {
		if ( $.isJQueryObj( $selects ) ) {
			$selects.each( function () {
				var $thisInput = $( this );
				var $childSlctdOptn = $thisInput.find( 'option:selected' );
				var optionVal = $childSlctdOptn.text();
				if ( optionVal != '' ) {
					$thisInput.addClass( 'gf-value-entered' );
				} else {
					$thisInput.removeClass( 'gf-value-entered' );
				}
				$thisInput.change( function () {
					$childSlctdOptn = $thisInput.find( 'option:selected' );
					optionVal = $childSlctdOptn.text();
					if ( optionVal != '' ) {
						$thisInput.addClass( 'gf-value-entered' );
					} else {
						$thisInput.removeClass( 'gf-value-entered' );
					}
				} );
			} );
		}
	}

	/**
	 * Set up activator checkboxes that disappear once one is selected.
	 *
	 * @param {string} selector - String for selecting from the DOM gravity form fields designated
	 *     as activator checkboxes.
	 */
	function setupActvtrChckbxs ( selector ) {
		if ( $.type( selector ) === 'string' ) {
			$( '.gform_body' ).on( 'change', selector + ' input', function () {
				var $thisChild = $( this );
				var $thisParent = $thisChild.parents( selector );
				$thisParent.addClass( 'gf-activated' );
			} );
		}
	}

	/**
	 * Setup a chain of activator checkboxes, wherein once a checkbox is activated/deactivated, only
	 * its closest previous sibling is hidden/shown.
	 *
	 * @param {string} selector - String for selecting gravity form fields from the DOM that are
	 *     designated as chained activator checkboxes.
	 */
	function setupActvtrChain ( selector ) {
		if ( $.type( selector ) === 'string' ) {
			$( '.gform_body' ).on( 'change', selector + ' input', function () {
				var $thisChild = $( this );
				var $thisParent = $thisChild.parents( selector );
				var $parentPrevSblngs = $thisParent.prevAll( selector );
				if ( $thisChild.prop( 'checked' ) ) {
					$parentPrevSblngs.first().addClass( 'gf-hidden' );
				} else {
					$parentPrevSblngs.first().removeClass( 'gf-hidden' );
				}
			} );
		}
	}

	/**
	 * Setup a chain of file uploading inputs, wherein only the left-most input in the tree is
	 * visible. As the user uploads files in sequence, the next nearest neighbor is unveiled.
	 *
	 * @param {string} selector - String for selecting gravity form fields from the DOM that are
	 *     designated as part of an upload chain.
	 */
	function setupUploadChain ( selector ) {
		if ( $.type( selector ) === 'string' ) {

			// TODO: CHECK IF UPLOADS ALREADY EXIST:
			//  It is possible to arrive at this point in execution after the user has submitted a
			//  form containing errors that also already contains transcripts uploaded to input
			//  fields that will be hidden by default. The following blocks of code resolve this
			//  situation by showing such fields, as well as their nearest neighbors.
			var $inputs = $( selector + " input[type='file']" );
			$inputs.each( function () {
				var $thisInput = $( this );
				var $nextDiv = $thisInput.nextAll( 'div[id]' ).first();
				if ( $nextDiv.length > 0 ) {
					$thisInput.addClass( 'gf-value-entered' );
					var $parentOfInput = $thisInput.parents( selector ).first();
					$parentOfInput.removeClass( 'gf-hidden' );
					var $parentNextSblngs = $parentOfInput.nextAll( selector ).first();
					$parentNextSblngs.removeClass( 'gf-hidden' );
				}
			} );

			// TODO: Break up this long, complicated execution sequence  into additional functions.
			$( '.gform_body' ).on( 'change', selector + " input[type='file']", function () {
				var $thisInput = $( this );
				if ( $thisInput.prop( 'files' ) != null && $thisInput.prop( 'files' ).length > 0 ) {
					var valuePassed = true;
					var $parentOfInput = $thisInput.parents( selector ).first();
					var $parentNextSblngs = $parentOfInput.nextAll( selector );
					var $parentPrevSblngs = $parentOfInput.prevAll( selector );
					if ( $parentNextSblngs.length != 0 || $parentPrevSblngs.length != 0 ) {
						var originalFileName = $thisInput.prop( 'files' ).item( 0 ).name;
						$parentPrevSblngs.each( function () {
							if ( valuePassed ) {
								var $thisSblng = $( this );
								var $thisSblngInput =
									$thisSblng.find( "input[type='file']" ).first();
								if ( $thisSblngInput.prop( 'files' ) != null &&
										$thisSblngInput.prop( 'files' ).length > 0 ) {
									var thisFileName = $thisSblngInput.prop( 'files' ).item( 0 ).name;
									valuePassed = originalFileName != thisFileName;
								}
							}
						} );
						$parentNextSblngs.each( function () {
							if ( valuePassed ) {
								var $thisSblng = $( this );
								var $thisSblngInput = $thisSblng.find( "input[type='file']" ).first();
								if ( $thisSblngInput.prop( 'files' ) != null &&
										$thisSblngInput.prop( 'files' ).length > 0) {
									var thisFileName = $thisSblngInput.prop( 'files' ).item(0).name;
									valuePassed = originalFileName != thisFileName;
								}
							}
						});
					}
					if ( valuePassed ) {
						$thisInput.addClass( 'gf-value-entered' );
						$parentNextSblngs.first().removeClass( 'gf-hidden' );
					} else {
						alert('A file with the same name has already been uploaded; please choose a\
 different file.');
						$thisInput.get(0).value = '';
					}
				} else {
					$thisChild.removeClass( 'gf-value-entered' );
				}
			} );
		}
	}
} )( jQuery );

/*!
 * jQuery Plugin: Are-You-Sure (Dirty Form Detection)
 * https://github.com/codedance/jquery.AreYouSure/
 *
 * Copyright (c) 2012-2014, Chris Dance and PaperCut Software http://www.papercut.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Author:  chris.dance@papercut.com
 * Version: 1.9.0
 * Date:    13th August 2014
 */
(function($) {
  
  $.fn.areYouSure = function(options) {
      
    var settings = $.extend(
      {
        'message' : 'You have unsaved changes!',
        'dirtyClass' : 'dirty',
        'change' : null,
        'silent' : false,
        'addRemoveFieldsMarksDirty' : false,
        'fieldEvents' : 'change keyup propertychange input',
        'fieldSelector': ":input:not(input[type=submit]):not(input[type=button])"
      }, options);

    var getValue = function($field) {
      if ($field.hasClass('ays-ignore')
          || $field.hasClass('aysIgnore')
          || $field.attr('data-ays-ignore')
          || $field.attr('name') === undefined) {
        return null;
      }

      if ($field.is(':disabled')) {
        return 'ays-disabled';
      }

      var val;
      var type = $field.attr('type');
      if ($field.is('select')) {
        type = 'select';
      }

      switch (type) {
        case 'checkbox':
        case 'radio':
          val = $field.is(':checked');
          break;
        case 'select':
          val = '';
          $field.find('option').each(function(o) {
            var $option = $(this);
            if ($option.is(':selected')) {
              val += $option.val();
            }
          });
          break;
        default:
          val = $field.val();
      }

      return val;
    };

    var storeOrigValue = function($field) {
      $field.data('ays-orig', getValue($field));
    };

    var checkForm = function(evt) {

      var isFieldDirty = function($field) {
        var origValue = $field.data('ays-orig');
        if (undefined === origValue) {
          return false;
        }
        return (getValue($field) != origValue);
      };

      var $form = ($(this).is('form')) 
                    ? $(this)
                    : $(this).parents('form');

      // Test on the target first as it's the most likely to be dirty
      if (isFieldDirty($(evt.target))) {
        setDirtyStatus($form, true);
        return;
      }

      $fields = $form.find(settings.fieldSelector);

      if (settings.addRemoveFieldsMarksDirty) {              
        // Check if field count has changed
        var origCount = $form.data("ays-orig-field-count");
        if (origCount != $fields.length) {
          setDirtyStatus($form, true);
          return;
        }
      }

      // Brute force - check each field
      var isDirty = false;
      $fields.each(function() {
        $field = $(this);
        if (isFieldDirty($field)) {
          isDirty = true;
          return false; // break
        }
      });
      
      setDirtyStatus($form, isDirty);
    };

    var initForm = function($form) {
      var fields = $form.find(settings.fieldSelector);
      $(fields).each(function() { storeOrigValue($(this)); });
      $(fields).unbind(settings.fieldEvents, checkForm);
      $(fields).bind(settings.fieldEvents, checkForm);
      $form.data("ays-orig-field-count", $(fields).length);
      setDirtyStatus($form, false);
    };

    var setDirtyStatus = function($form, isDirty) {
      var changed = isDirty != $form.hasClass(settings.dirtyClass);
      $form.toggleClass(settings.dirtyClass, isDirty);
        
      // Fire change event if required
      if (changed) {
        if (settings.change) settings.change.call($form, $form);

        if (isDirty) $form.trigger('dirty.areYouSure', [$form]);
        if (!isDirty) $form.trigger('clean.areYouSure', [$form]);
        $form.trigger('change.areYouSure', [$form]);
      }
    };

    var rescan = function() {
      var $form = $(this);
      var fields = $form.find(settings.fieldSelector);
      $(fields).each(function() {
        var $field = $(this);
        if (!$field.data('ays-orig')) {
          storeOrigValue($field);
          $field.bind(settings.fieldEvents, checkForm);
        }
      });
      // Check for changes while we're here
      $form.trigger('checkform.areYouSure');
    };

    var reinitialize = function() {
      initForm($(this));
    }

    if (!settings.silent && !window.aysUnloadSet) {
      window.aysUnloadSet = true;
      $(window).bind('beforeunload', function() {
        $dirtyForms = $("form").filter('.' + settings.dirtyClass);
        if ($dirtyForms.length == 0) {
          return;
        }
        // Prevent multiple prompts - seen on Chrome and IE
        if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
          if (window.aysHasPrompted) {
            return;
          }
          window.aysHasPrompted = true;
          window.setTimeout(function() {window.aysHasPrompted = false;}, 900);
        }
        return settings.message;
      });
    }

    return this.each(function(elem) {
      if (!$(this).is('form')) {
        return;
      }
      var $form = $(this);
        
      $form.submit(function() {
        $form.removeClass(settings.dirtyClass);
      });
      $form.bind('reset', function() { setDirtyStatus($form, false); });
      // Add a custom events
      $form.bind('rescan.areYouSure', rescan);
      $form.bind('reinitialize.areYouSure', reinitialize);
      $form.bind('checkform.areYouSure', checkForm);
      initForm($form);
    });
  };
})(jQuery);

/*!
 * jQuery.are-you-sure.js: Application of Are-You-Sure jQuery Plugin to WSU OUE websites. Please see
 *     https://github.com/codedance/jquery.AreYouSure/ for more details.
 * Author:  Daniel Rieck (danielcrieck@gmail.com) [https://github.com/invokeImmediately]
 * Version: 2.0.0
 *
 * Published under the MIT license.
 * https://opensource.org/licenses/MIT
 */
( function( $ ) {

var thisFileName = 'jquery.are-you-sure.js';

// Code executed after the browser loads the DOM.
$( function() {
	var thisFuncName = 'DOM loaded';
	var thisFuncDesc = 'Code executed after the DOM has loaded';
	var $gForms;
	
	try {
		assertAreYouSureLoaded();
		$gForms = $( '.gform_wrapper > form' );
		$gForms.areYouSure();		
	} catch (errorMsg) {
		$.logError( thisFileName, thisFuncName, thisFuncDesc, errorMsg );
	}
} );

function assertAreYouSureLoaded() {
	if ( !$.fn.areYouSure ) {
		throw 'The Are-You-Sure jQuery plugin is missing; please verify that you included it as a build dependency.';
	}
}

} )( jQuery );

/*!*
 * jQuery.textResize.js
 * Released under GNU GPLv2
 *
 * Based on FitText.js 1.2 (https://github.com/davatron5000/FitText.js) by Dave Rupert
 *  (http://daverupert.com).
 */
(function($){
    $.fn.textResize = function( scalingFactor, options ) {
        // Set up default options in case the caller passed no attributes
        var scalingAmount = scalingFactor || 1,
            settings = $.extend({
                "minFontSize" : Number.NEGATIVE_INFINITY,
                "maxFontSize" : Number.POSITIVE_INFINITY,
				"againstSelf" : true
            }, options);
        return this.each(function () {
            var $this = $(this);
			var $parent = undefined;
			if (!settings.againstSelf) {
				$parent = $this.parents(".column").first();
			}
          
            // Resizer() keeps font-size proportional to object width as constrainted by the user
            var resizer = function () {
				if(!settings.againstSelf) {
					$this.css("font-size", Math.max(Math.min($parent.innerWidth() / (scalingAmount*10),
						parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
				}
				else {
					$this.css("font-size", Math.max(Math.min($this.width() / (scalingAmount*10),
						parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
				}
            };
          
            // Call once to set the object's font size based on current window size, then call as resize or orientation-change events are triggered.
            resizer();
            $(window).on("resize.textresize orientationchange.textresize", resizer);
        });
    };
})(jQuery);

// Now use the plugin on the WSU Undergraduate education website (i.e. delete or modify the following statement if you are going to utilize this plugin on your own site).
(function($){
	var clmnWidth = 926; // px - default column width
	var dfltSpineWidth = 198; // px - default width of spine
	
    $(document).ready(function () {
		initArticleHeaderText();
		initTextAutoResizers(".auto-fits-text");
    });

	function initArticleHeaderText() {
		//TODO: Refactor to rely on auto
		var $columns = $(".column");
        $columns.find(".article-header .header-content h1").each(function () {
            $(this).textResize(1.277142857142857, {"minFontSize" : "34.8"});
        });
        $columns.find(".article-header .header-content h2").each(function () {
            $(this).textResize(1.847840465639262, {"minFontSize" : "24.0"});
        });
        $columns.find(".article-header .header-content h3").each(function () {
            $(this).textResize(4.110097222222222, {"minFontSize" : "10.7"});
        });
	}
	
	function initTextAutoResizers(cssClass) {
		var $textAutoResizers = new TextAutoResizers(cssClass, dfltSpineWidth);
		$textAutoResizers.initTextAutoResizing();
	}
	
	function TextAutoResizers(cssClass, spineWidth) {	
		var $resizers = $(cssClass);
		
		this.initTextAutoResizing = function () {
			$resizers.each(function() {
				var textAutoResizer = new TextAutoResizingElem($(this), spineWidth);
			});
		}		
		
		function TextAutoResizingElem($jqObj, spineWidth) {
			var $this = $jqObj;
			initTextAutoResizing();
			
			function initTextAutoResizing() {
				if ($.isJQueryObj($this)) {
					var fontSz = parseFloat($this.css("font-size"));
					var scalingAmt = calculateScalingAmount(fontSz);
					if ($this.hasClass("has-max-size")) {
						$this.textResize(scalingAmt, {"minFontSize" : "10.7px", "maxFontSize" : fontSz, "againstSelf" : 0});
					} else {
						$this.textResize(scalingAmt, {"minFontSize" : "10.7px", "againstSelf" : 0});
					}					
				}
			}
			
			function calculateScalingAmount(fontSz) {
				var maxColumnWidth = findMaxColumnWidth();
				return maxColumnWidth / (fontSz * 10);
			}
			
			function findMaxColumnWidth() {
				var $parentCol = $this.parents(".column").first();
				var maxColWidth = findMaxColWidth($parentCol);
				return maxColWidth;
			}
			
			function findMaxColWidth($parentCol) {
				var maxRowWidth = 990; // Sets the default max row width.
				var maxWidthCss = $parentCol.css("max-width"); // In case the max width was explicitly set for the parental column...
				if (maxWidthCss != "none") {
					maxRowWidth = parseFloat(maxWidthCss);
				} else {
					maxRowWidth = findMaxRowWidthFromBinder(maxRowWidth); // In case the max width was implicitly set...
				}
				return divideUpMaxRowWidth(maxRowWidth, $parentCol); // Return the max column width by dividing up the max row width as needed.
			}
			
			function findMaxRowWidthFromBinder(dfltMaxRowWidth) {
				var maxRowWidth = dfltMaxRowWidth;
				var maxCssWidth = findBindersMaxWidthCss();
				if (maxCssWidth != "none") {
					maxRowWidth = parseFloat(maxCssWidth) - spineWidth; // The binder's max width includes the spine's fixed width, so subtract it off to achieve actual max width of row.
				}
				return maxRowWidth; // i.e., returns the max width in numerical form.
			}
			
			function findBindersMaxWidthCss() {
				var maxWidthCss = "none";
				var $binder = $("#binder");
				if ($binder.length == 1) {
					if ($binder.hasClass("max-1188")) {
						maxWidthCss = "1188";
					} else if ($binder.hasClass("max-1386")) {
						maxWidthCss = "1386";						
					} else if ($binder.hasClass("max-1584")) {
						maxWidthCss = "1584";						
					} else if ($binder.hasClass("max-1782")) {
						maxWidthCss = "1782";						
					} else if ($binder.hasClass("max-1980")) {
						maxWidthCss = "1980";						
					}
				}
				return maxWidthCss; // i.e., returns a string containing the parental binder's max width as specified in CSS
			}
			
			function divideUpMaxRowWidth(maxRowWidth, $parentCol) {
				var maxColWidth = maxRowWidth;
				var $parentRow = ($.isJQueryObj($parentCol)) ? $parentCol.parent(".row") : undefined;
				if ($parentCol.css("max-width") == "none" && $.isJQueryObj($parentRow)) {
					if ($parentRow.hasClass("halves")) {
						maxColWidth /= 2;
					} else if ($parentRow.hasClass("thirds")) {
						maxColWidth /= 3;
					} else if ($parentRow.hasClass("quarters")) {
						maxColWidth /= 4;
					}
				}
				return maxColWidth;
			}
		}
	}
})(jQuery);

/*!*************************************************************************************************\
| CUSTOM JQUERY-BASED DYNAMIC CONTENT                                                              |
\**************************************************************************************************/
(function ($) {
"use strict";

var thisFileName = 'ascc-specific.js';
    
$( function () {
	setupCeaContactForm( '.page.cea', '#contact-us', '#contact-form-wrapper', 'shown', 
		'#close-contact-form' );
} );

$(window).on("load", function(e) {
	changeRichTextFontFamily( $( '.gfield_contains_required.uses-rich-editor' ) );
});

function setupCeaContactForm( slctrPage, slctrContactUsButton, slctrFormWrapper, 
		formActivationClass, slctrCloseButton ) {
	var thisFuncName = 'setupCeaContactForm';
	var thisFuncDesc = 'Initializes user interactivity for the CEA page\'s "contact us" form.';
	var $ceaPage;
	var $contactUsButton;
	var $formWrapper;
	var $closeButton;
	try {
		$ceaPage = findCeaPage( slctrPage );
		$contactUsButton = findContactUsButton( $ceaPage, slctrContactUsButton );
		$formWrapper = findContactForm( $ceaPage, slctrFormWrapper );
		$closeButton = findCloseButton( $formWrapper, slctrCloseButton );
		resetFormTabIndices( $formWrapper );
		initFormInteractivity( $contactUsButton, $formWrapper, formActivationClass, $closeButton );
	} catch( errorMsg ) {
		$.logError( thisFileName, thisFuncName, thisFuncDesc, errorMsg );
	}

	function findCeaPage( slctrPage ) {
		var $ceaPage = $( slctrPage );
		if ( $ceaPage.length > 1 ) {
			throw 'More than one CEA page element was encountered.';
		}
		return $ceaPage;
	}

	function findContactUsButton( $ceaPage, slctrContactUsButton ) {
		var $contactUsButton = undefined;
		if ( $.isJQueryObj( $ceaPage ) ) {
			$contactUsButton = $ceaPage.find( slctrContactUsButton );
		} else {
			throw 'Sub-function findContactUsButton was passed an non-jQuery object as its first '
				+ 'argument.';
		}
		if ( $contactUsButton.length > 1 ) {
			throw 'More than one "Contact Us" button was found on the CEA page.';
		}
		return $contactUsButton;
	}

	function findContactForm( $ceaPage, slctrFormWrapper ) {
		var $formWrapper = undefined;
		if ( $.isJQueryObj( $ceaPage ) ) {
			$formWrapper = $ceaPage.find( slctrFormWrapper );
		} else {
			throw 'Sub-function findContactForm was passed an non-jQuery object as its first '
				+ 'argument.';
		}
		if ( $formWrapper.length > 1 ) {
			throw 'More than one "Contact Us" form was found on the CEA page.';
		}
		return $formWrapper;
	}

	function findCloseButton( $formWrapper, slctrCloseButton ) {
		var $closeButton = undefined;
		if ( $.isJQueryObj( $formWrapper ) ) {
			$closeButton = $formWrapper.find( slctrCloseButton );
		} else {
			throw 'Sub-function findCloseButton was passed an non-jQuery object as its first '
				+ 'argument.';
		}
		if ( $closeButton.length > 1 ) {
			throw 'More than one close button for the "Contact Us" form was found within the CEA '
				+ 'page.';
		} else if ( $formWrapper.length == 1 && $closeButton.length == 0 ) {
			throw 'No close button was found within the "Contact Us" form on the CEA page.';
		}
		return $closeButton;
	}

	function resetFormTabIndices( $formWrapper ) {
		var $form;
		var $formFields;
		if ( $.isJQueryObj( $formWrapper ) && $formWrapper.length == 1 ) {
			$form = $formWrapper.find( 'form' );
			$formFields = $form.find( 'input, select, textArea' );
			$formFields.each( function() {
				var $this = $( this );
				$this.attr('tabindex', '0');
			} );
		}
	}

	function initFormInteractivity( $contactUsButton, $formWrapper, formActivationClass, 
			$closeButton ) {
		if ( $contactUsButton.length == 1 && $formWrapper.length == 1 && 
				$closeButton.length == 1 ) {
			$contactUsButton.click( handleContactUsButtonClick );
			$contactUsButton.on( 'keydown', handleContactUsButtonKeydown );
			$closeButton.click( handleCloseButtonClick );
			$closeButton.on( 'keydown', handleCloseButtonKeydown );
		}

		function handleContactUsButtonClick( e ) {
			e.preventDefault();
			$formWrapper.addClass( formActivationClass );			
		}

		function handleContactUsButtonKeydown ( e ) {
			if ( wereTriggerKeysPressed ( e ) ) {
				e.preventDefault();
				$formWrapper.addClass( formActivationClass );
			}
		}

		function wereTriggerKeysPressed ( e ) {
			var regExMask = /Enter| /g;
			return regExMask.exec( e.key ) != null;
		}

		function handleCloseButtonClick( e ) {
			e.preventDefault();
			$formWrapper.removeClass( formActivationClass );			
		}

		function handleCloseButtonKeydown ( e ) {
			if ( wereTriggerKeysPressed ( e ) ) {
				e.preventDefault();
				$formWrapper.removeClass( formActivationClass );
			}
		}
	}
}

function changeRichTextFontFamily( $fields ) {
    if ( $.isJQueryObj($fields) && $fields.length > 0 ) {
        $fields.each( function () {
			var $edtrFrm = $( this ).find( 'iframe' );
			$edtrFrm.each( function () {
				var $edtrBdy = $( this ).contents().find( '#tinymce' );
				$edtrBdy.css( {
					 fontFamily: '"Open sans", sans-serif'
				} );
			} );
		} );
	}
}

} )( jQuery );
