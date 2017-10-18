/***************************************************************************************************************************
 * jQuery.oue-custom.js: custom JavaScript code common to all WSU Undergraduate Education websites                         *
 ***************************************************************************************************************************/
"use strict";

(function ($) {
	var thisFileName = "jQuery.oue-custom.js";

	/*******************************************************************************************************************
	 * ADDITION OF FUNCTIONS to jQuery                                                                                 *
	 *******************************************************************************************************************/
	 
	/**
	 * jQuery.isJQueryObj
	 * DESCRIPTION: Checking function to verify that the passed parameter is a valid jQuery object.
	 */
	$.isJQueryObj = function ($obj) {
		return ($obj && ($obj instanceof $ || $obj.constructor.prototype.jquery));
	}
	
	/**
	 * jQuery.logError
	 * DESCRIPTION: Log an error using the browser console in JSON notation.
	 * PARAMETERS:
	 *   - fileName: the name of the JS source file wherein the error was encountered
	 *   - fnctnName: the name of the function that called $.logError
	 *   - fnctnDesc: a description of what the calling function is supposed to do
	 *   - errorMsg: the message that describes what went wrong within the calling function
	 */
	$.logError = function (fileName, fnctnName, fnctnDesc, errorMsg) {
		var thisFuncName = "jQuery.logError";
		var thisFuncDesc = "Log an error using the browser console in JSON notation.";
		var bitMask;
		
		bitMask = typeof fileName === "string";
		bitMask = (typeof fnctnName === "string") | (bitMask << 1);
		bitMask = (typeof fnctnDesc === "string") | (bitMask << 1);
		bitMask = (typeof errorMsg === "string") | (bitMask << 1);
		if (bitMask === 15) {
			console.log("error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName + "'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terrorMessage: '" + errorMsg + "'\n\t};");
		} else {
			var incorrectTypings;
			var bitMaskCopy;
			var newErrorMsg;
			
			// Determine how many incorrectly typed arguments were encountered
			for (var i=0, incorrectTypings = 0, bitMaskCopy = bitMask; i < 4; i++) {
				incorrectTypings += bitMaskCopy & 1;
				bitMaskCopy = bitMaskCopy >> 1;
			}
			
			// Construct a new error message
			if (incorrectTypings == 1) {
				newErrorMsg = "Unfortunately, a call to jQuery.error was made with an incorrectly typed argument."
			} else {
				newErrorMsg = "Unfortunately, a call to jQuery.error was made with incorrectly typed arguments."
			}
			newErrorMsg += "Here are the arguments that were passed to jQuery.logError:\n";
			newErrorMsg += "\t\tfileName = " + fileName + "\n";
			if (!(bitMask & 1)) {
				newErrorMsg = "\t\ttypeof filename = " + (typeof fileName) + "\n";
			}
			newErrorMsg += "\t\tfnctnName = " + fnctnName + "\n";
			if(!((bitMask & 2) >> 1)) {
				newErrorMsg = "\t\ttypeof fnctnName = " + (typeof fnctnName) + "\n";
			}
			newErrorMsg += "\t\tfnctnDesc = " + fnctnDesc + "\n";
			if(!((bitMask & 4) >> 2)) {
				newErrorMsg = "\t\ttypeof fnctnDesc = " + (typeof fnctnDesc) + "\n";
			}
			newErrorMsg += "\t\terrorMsg = " + errorMsg + "\n";
			if(!((bitMask & 8) >> 3)) {
				newErrorMsg = "\t\ttypeof errorMsg = " + (typeof errorMsg) + "\n";
			}

			// Recursively call jQuery.logError with the new error message.
			$.logError(
				thisFileName,
				thisFuncName,
				thisFuncDesc,
				newErrorMsg
			);
		}
	}

	/*******************************************************************************************************************
	 * Function calls made once the DOM IS READY                                                                       *
	 *******************************************************************************************************************/
    $(function () {
		var argsList = new Object(); // List of arguments that will be passed to functions
		var args;
		
		// Set up organized list of arguments to be passed to functions called during document initialization
		argsList.fixDogears = {
			slctrSiteNav: "#spine-sitenav",
			slctrDogeared: "li.current.active.dogeared",
			removedClasses: "current active dogeared"
		};
		argsList.addBlankTargetAttributes = {
			slctrSpine: "#spine",
			slctrExternalLinks: "a.external"
		};
		argsList.checkForLrgFrmtSingle = {
			slctrSingle: ".single.large-format-friendly",
			slctrMainHdr: "header.main-header",
			slctrHdrGroup: ".header-group",
			centeringClass: "centered"
		};
		argsList.initHrH2Motif = {
			slctrStandardH2: ".column > h2:not(.fancy), .column > section > h2:not(.fancy)",
			slctrPrevHr: "hr:not(.subSection)",
			h2ClassesAdded: "no-top-margin",
			hrClassesAdded: "narrow-bottom-margin dark-gray thicker",
			animAddDrtn: 250
		};
		argsList.initFancyHrH2Motif = {
			slctrFancyH2: ".column > h2.fancy, .column > section > h2.fancy",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "no-bottom-margin dark-gray thicker encroach-horizontal",
			animAddDrtn: 250
		};
		argsList.initHrH3Motif = {
			slctrStandardH3: ".column > h3:not(.fancy), .column > section > h3:not(.fancy)",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "narrow-bottom-margin crimson",
			animAddDrtn: 250
		};
		argsList.initFancyHrH3Motif = {
			slctrFancyH3: ".column > h3.fancy, .column > section > h3.fancy",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "no-bottom-margin crimson encroach-horizontal",
			animAddDrtn: 250
		};
		argsList.initDropDownToggles = {
			slctrToggle: ".drop-down-toggle",
			slctrWhatsToggled: ".toggled-panel",
			activatingClass: "activated",
			animDuration: 500
		};
		argsList.initReadMoreToggles = {
			slctrToggleIn: ".read-more-toggle-in-ctrl",
			slctrToggleOut: ".read-more-toggle-out-ctrl",
			slctrPanel: ".read-more-panel",
			animDuration: 500
		};
		argsList.initContentFlippers = {
			slctrCntntFlppr: ".content-flipper",
			slctrFlppdFront: ".flipped-content-front",
			slctrFlppdBack: ".flipped-content-back",
			animDuration: 500
		};
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
		argsList.addDefinitionListButtons = {
			slctrDefList: argsList.initDefinitionLists.slctrDefList,
			expandAllClass: "expand-all-button",
			collapseAllClass: "collapse-all-button",
			btnDisablingClass: "disabled",
			dtActivatingClass: argsList.initDefinitionLists.dtActivatingClass,
			ddRevealingClass: argsList.initDefinitionLists.ddRevealingClass,
			animSldDrtn: argsList.initDefinitionLists.animSldDrtn
		};
		argsList.initQuickTabs = {
			slctrQtSctn: "section.row.single.quick-tabs"
		};
		argsList.initTocFloating = {
			slctrToc: "p.vpue-jump-bar",
			slctrBackToToc: "p.vpue-jump-back"
		};
		argsList.initTriggeredByHover = {
			slctrTrggrdOnHvr: ".triggered-on-hover",
			slctrCntntRvld: ".content-revealed",
			slctrCntntHddn: ".content-hidden",
			animDuration: 200
		};
		
		// Call document initialization functions
		args = argsList.fixDogears;
        fixDogears(
			args.slctrSiteNav,
			args.slctrDogeared,
			args.removedClasses
		);
		
		args = argsList.addBlankTargetAttributes;
		addBlankTargetAttributes(
			args.slctrSpine,
			args.slctrExternalLinks
		);
		
		args = argsList.checkForLrgFrmtSingle;
        checkForLrgFrmtSingle(
			args.slctrSingle,
			args.slctrMainHdr,
			args.slctrHdrGroup,
			args.centeringClass
		);
		
		args = argsList.initHrH2Motif;
        initHrH2Motif(
			args.slctrStandardH2,
			args.slctrPrevHr,
			args.h2ClassesAdded,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initFancyHrH2Motif;
        initFancyHrH2Motif(
			args.slctrFancyH2,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initHrH3Motif;
        initHrH3Motif(
			args.slctrStandardH3,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initFancyHrH3Motif;
        initFancyHrH3Motif(
			args.slctrFancyH3,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initDropDownToggles;
        initDropDownToggles(
			args.slctrToggle,
			args.slctrWhatsToggled,
			args.activatingClass,
			args.animDuration
		);
		
		args = argsList.initReadMoreToggles;
        initReadMoreToggles(
			args.slctrToggleIn,
			args.slctrToggleOut,
			args.slctrPanel,
			args.animDuration
		);
		
		args = argsList.initContentFlippers;
        initContentFlippers(
			args.slctrCntntFlppr,
			args.slctrFlppdFront,
			args.slctrFlppdBack,
			args.animDuration
		);
		
		args = argsList.initDefinitionLists;
        initDefinitionLists(
			args.slctrDefList,
			args.slctrLrgFrmtSection,
			args.slctrColOne,
			args.slctrColTwo,
			args.dtActivatingClass,
			args.ddRevealingClass,
			args.animSldDrtn,
			args.animHghtDrtn
		);
		
		args = argsList.addDefinitionListButtons;
        addDefinitionListButtons(
			args.slctrDefList,
			args.expandAllClass,
			args.collapseAllClass,
			args.btnDeactivatingClass,
			args.dtActivatingClass,
			args.ddRevealingClass,
			args.animSldDrtn
		);
		
		args = argsList.initQuickTabs;
		initQuickTabs(
			args.slctrQtSctn
		);
		
		args = argsList.initTocFloating;
		initTocFloating(
			args.slctrToc,
			args.slctrBackToToc
		);

		args = argsList.initTriggeredByHover;
        initTriggeredByHover(
			args.slctrTrggrdOnHvr,
			args.slctrCntntRvld,
			args.slctrCntntHddn,
			args.animDuration
		);
		
		// TODO: initScrollingSidebars("...");
        
    });
    
	/*******************************************************************************************************************
	 * WINDOW LOAD event bindings                                                                                      *
	 *******************************************************************************************************************/
    $(window).on("load", function () {
		var params = new Object();
		var theseParams;
		
		// Set up parameters for functions called during the window load event
		params.finalizeLrgFrmtSideRight = {
			slctrSideRight: ".side-right.large-format-friendly",
			slctrColOne: ".column.one",
			slctrColTwo: ".column.two",
			trggrWidth: 1051,
			animDuration: 100
		};
		params.showDefinitionListButtons = {
			slctrDefList: "dl.toggled",
			expandAllClass: "expand-all-button",
			collapseAllClass: "collapse-all-button",
			animFadeInDrtn: 400
		};
		params.initWelcomeMessage = {
			slctrWlcmMsg: "#welcome-message",
			slctrPostWlcmMsg: "#post-welcome-message",
			msgDelay: 1000,
			fadeOutDuration: 500,
			fadeInDuration: 500
		};
		
		// Make calls to functions
		theseParams = params.finalizeLrgFrmtSideRight;
        finalizeLrgFrmtSideRight(
			theseParams.slctrSideRight,
			theseParams.slctrColOne,
			theseParams.slctrColTwo,
			theseParams.trggrWidth,
			theseParams.animDuration
		);
		theseParams = params.showDefinitionListButtons;
		showDefinitionListButtons(
			theseParams.slctrDefList,
			theseParams.expandAllClass,
			theseParams.collapseAllClass,
			theseParams.animFadeInDrtn
		);
		theseParams = params.initWelcomeMessage;
		initWelcomeMessage(
			theseParams.slctrWlcmMsg,
			theseParams.slctrPostWlcmMsg,
			theseParams.msgDelay,
			theseParams.fadeOutDuration,
			theseParams.fadeInDuration
		);
    });
    
	/*******************************************************************************************************************
	 * WINDOW RESIZE event bindings                                                                                    *
	 *******************************************************************************************************************/
    $(window).resize(function () {
        resizeLrgFrmtSideRight(".side-right.large-format-friendly", "div.column.one", "div.column.two",
         1051, 100);
    });
    
	/*******************************************************************************************************************
	 * DOCUMENT INITIALIZATION function definitions (designed to be called after DOM is ready)                         *
	 *******************************************************************************************************************/
	
	/**
	 * addBlankTargetAttributes
	 * DESCRIPTION: Adds missing blank target attributes to links within the WSU Spine as needed.
	 * PARAMETERS:
	 *   - slctrSpine: selector string for locating the spine object within the DOM
	 *   - slctrExternalLinks: selector string for locating links within the spine that lead to destination external to the domain
	 */
	function addBlankTargetAttributes(slctrSpine, slctrExternalLinks) {
		var thisFnctnName = "addBlankTargetAttributes";
		var thisFnctnDesc = "Adds missing blank target attributes to links within the WSU Spine as needed.";
		if (typeof slctrSpine === "string" && typeof slctrExternalLinks === "string") {
			var $spine = $(slctrSpine);
			if ($spine.length === 1) {
				var $links = $spine.find(slctrExternalLinks);
				$links.each(function () {
					var $thisLink = $(this);
					if ($thisLink.attr("target") != "_blank") {
						$thisLink.attr("target", "_blank");
						var relStr = $thisLink.attr("rel");
						if (relStr == undefined) {
							$thisLink.attr("rel", "noopener noreferrer");
						} else {
							if (relStr.search(/noopener/i) < 0) {
								relStr += " noopener";
							}
							if (relStr.search(/noreferrer/i) < 0) {
								relStr += " noreferrer";
							}
							$thisLink.attr("rel", relStr);
						}
					}
				});
			} else {
				$.logError(
					thisFileName, thisFnctnName, thisFnctnDesc,
					"I could not locate the WSU Spine element within the DOM."
				);
			}
		} else {
			$.logError(
				thisFileName, thisFnctnName, thisFnctnDesc,
				"I was passed one or more incorrectly typed parameters. Here's what I was passed:\n\ttypeof slctrSpine = " + (typeof slctrSpine) + "\n\ttypeof slctrExternalLinks = " + (typeof slctrExternalLinks)
			);
		}
	}
	
	/**
	 * addDefinitionListButtons
	 * DESCRIPTION: Automatically creates and binds events to expand/collapse all buttons designed for improving UX of OUE site definition lists.
	 * PARAMETERS:
	 *   - slctrDefList: selector string for locating definition list elements within the DOM that contain collapsible definitions
	 *   - expandAllClass: CSS class for controlling the layout of expand all buttons
	 *   - collapseAllClass: CSS class for controlling the layout of collapse all buttons
	 *   - btnDisablingClass: CSS class applied to disable expand/collapse all buttons
	 *   - dtActivatingClass: CSS class used to indicate an active/expanded state for definition terms
	 *   - ddRevealingClass: CSS class used to realize a revealed, visible state on definitions
	 */
    function addDefinitionListButtons(slctrDefList, expandAllClass, collapseAllClass, btnDisablingClass,
	 dtActivatingClass, ddRevealingClass, animSldDrtn) {
		var thisFuncName = "addDefinitionListButtons";
		var thisFuncDesc = "Automatically creates and binds events to expand/collapse all buttons designed for improving UX of OUE site definition lists";
		
		// Find and remove any pre-existing expand/collapse all buttons
		var $lists = $(slctrDefList);
		var $existingExpandAlls = $lists.children("." + expandAllClass);
		var $existingCollapseAlls = $lists.children("." + collapseAllClass);
		if ($existingExpandAlls.length > 0) {
			$existingExpandAlls.remove();
			$.logError(
				thisFileName, thisFuncName, thisFuncDesc,
				"Expand all buttons were already discovered in the DOM upon document initialization; please remove all buttons from the HTML source code to avoid wasting computational resources."
			);
		}
		if ($existingCollapseAlls.length > 0) {
			$existingCollapseAlls.remove();
			$.logError(
				thisFileName, thisFuncName, thisFuncDesc,
				"Collapse all buttons were already discovered in the DOM upon document initialization; please remove all buttons from the HTML source code to avoid wasting computational resources."
			);
		}
		
		// Add initially hidden (via CSS) expand/collapse all buttons to definition lists
		$lists.prepend('<div class="collapse-all-button">[-] Collapse All</div>');
		$lists.prepend('<div class="expand-all-button">[+] Expand All</div>');
		var slctrExpandAll = slctrDefList + " > ." + expandAllClass;
		var $expandAlls = $(slctrExpandAll);
		var slctrCollapseAll = slctrDefList + " > ." + collapseAllClass;
		var $collapseAlls = $(slctrCollapseAll);
		
		// Bind handling functions to button click events
		$expandAlls.click(function() {
			var $thisExpand = $(this);
			if (!$thisExpand.hasClass(btnDisablingClass)) {
				var $nextCollapse = $thisExpand.next("." + collapseAllClass);
				var $parentList = $thisExpand.parent(slctrDefList);
				if ($parentList.length == 1) {
					// TODO: Disable buttons
					var $defTerms = $parentList.children("dt");
					$defTerms.each(function() {
						var $thisDefTerm = $(this);
						if (!$thisDefTerm.hasClass(dtActivatingClass)) {
							$thisDefTerm.addClass(dtActivatingClass);
							var $thisDefTermNext = $thisDefTerm.next("dd");
							$thisDefTermNext.addClass(ddRevealingClass);
							$thisDefTermNext.stop().animate({
								maxHeight: $thisDefTermNext[0].scrollHeight
							}, animSldDrtn);
						}
					});
					// TODO: Enable buttons
				} else {
					$.logError(
						thisFileName, thisFuncName, thisFunDesc,
						"When trying to bind a click event on an expand all button to a handling function, could not locate the parental definition list within DOM."
					);
				}
			}
		});
		$collapseAlls.click(function() {
			var $thisCollapse = $(this);
			if (!$thisCollapse.hasClass(btnDisablingClass)) {
				var $prevExpand = $thisCollapse.prev("." + expandAllClass);
				var $parentList = $thisCollapse.parent(slctrDefList);
				if ($parentList.length == 1) {
					// TODO: Disable buttons
					var $defTerms = $parentList.children("dt");
					$defTerms.each(function() {
						var $thisDefTerm = $(this);
						if ($thisDefTerm.hasClass(dtActivatingClass)) {
							$thisDefTerm.removeClass(dtActivatingClass);
							var $thisDefTermNext = $thisDefTerm.next("dd");
							$thisDefTermNext.removeClass(ddRevealingClass);
							$thisDefTermNext.stop().animate({
								maxHeight: 0
							}, animSldDrtn);
						}
					});
					// TODO: Enable buttons
				} else {
					$.logError(
						thisFileName, thisFuncName, thisFunDesc,
						"When trying to bind a click event on collapse all button #" + $thisCollapse.index() + "to a handling function, could not locate the parental definition list within DOM."
					);
				}
			}
		});
    }
    
    function checkForLrgFrmtSingle(slctrSingle, slctrMainHdr, slctrHdrGroup, centeringClass) {
        var $lrgFrmtSnglSctns = $(slctrSingle);
        if ($lrgFrmtSnglSctns.length > 0) {
            var $mainHeader = $(slctrMainHdr);
            $mainHeader.addClass(centeringClass);
            var $mnHdrChldDiv = $mainHeader.find(slctrHdrGroup);
            $mnHdrChldDiv.addClass(centeringClass);
        }
    }
    
    function fixDogears(slctrSiteNav, slctrDogeared, removedClasses) {
        // Fix bug wherein the wrong items in the spine become dogeared
        var $dogearedItems = $(slctrSiteNav).find(slctrDogeared);
        if ($dogearedItems.length > 1) {
            var currentURL = window.location.href;
            var currentPage = currentURL.substring(currentURL.substring(0, currentURL.length - 1).lastIndexOf("/") + 1, currentURL.length - 1);
            $dogearedItems.each(function () {
                var $this = $(this);
                var $navLink = $this.children("a");
                if ($navLink.length == 1) {
                    var navLinkURL = $navLink.attr("href");
                    var navLinkPage = navLinkURL.substring(navLinkURL.substring(0, navLinkURL.length - 1).lastIndexOf("/") + 1, navLinkURL.length - 1);
                    if (navLinkPage != currentPage) {
                        $this.removeClass(removedClasses);
                    }
                }
            });
        }
    }

    function initContentFlippers(slctrCntntFlppr, slctrFlppdFront, slctrFlppdBack, animDuration) {
        $(slctrCntntFlppr).click(function () {
            var $this = $(this);
            $this.next(slctrFlppdFront).toggle(animDuration);
            $this.next(slctrFlppdFront).next(slctrFlppdBack).fadeToggle(animDuration);
        });
        $(slctrFlppdFront).click(function () {
            var $this = $(this);
            $this.toggle(animDuration);
            $this.next(slctrFlppdBack).fadeToggle(animDuration);
        });
    }
    
    function initDefinitionLists(slctrDefList, slctrLrgFrmtSection, slctrColOne, slctrColTwo,
     dtActivatingClass, ddRevealingClass, animHghtDrtn) {
		var $listDts = $(slctrDefList + " dt");
		$listDts.attr("tabindex", 0);
        $listDts.click(function() {
            var $this = $(this);
            $this.toggleClass(dtActivatingClass);
			var $thisNext = $this.next("dd");
            $thisNext.toggleClass(ddRevealingClass);
			if ($thisNext.hasClass(ddRevealingClass)) {
				$thisNext.stop().animate({
					maxHeight: $thisNext[0].scrollHeight
				});
			} else {
				$thisNext.stop().animate({
					maxHeight: 0
				});
			}
			var $parent = $this.parents(slctrLrgFrmtSection + ">" + slctrColOne);
			var $prntNxt = $parent.next(slctrColTwo);
			$prntNxt.delay(400).animate({height: $parent.css('height')}, animHghtDrtn);
        });
		$listDts.on("keydown", function(e) {
			var regExMask = /Enter| /g; // TODO: Divide and conquer
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(dtActivatingClass);
				var $thisNext = $this.next("dd");
				$thisNext.toggleClass(ddRevealingClass);
				if ($thisNext.hasClass(ddRevealingClass)) {
					$thisNext.stop().animate({
						maxHeight: $thisNext[0].scrollHeight
					});
				} else {
					$thisNext.stop().animate({
						maxHeight: 0
					});
				}
				var $parent = $this.parents(slctrLrgFrmtSection + ">" + slctrColOne);
				var $prntNxt = $parent.next(slctrColTwo);
				$prntNxt.delay(400).animate({height: $parent.css('height')}, animHghtDrtn);
			}
		});
        $(slctrDefList + " dd").removeClass(ddRevealingClass);
    }
    
    function initDropDownToggles(slctrToggle, slctrWhatsToggled, activatingClass, animDuration) {
		var $toggles =  $(slctrToggle);
		$toggles.attr("tabindex", 0);
		$toggles.addClass("no-anchor-highlighting");
		effectDropDownTogglePermanence($toggles, slctrWhatsToggled, activatingClass, animDuration);
        $toggles.click(function () {
            var $this = $(this);
			$this.blur();
            $this.toggleClass(activatingClass);
            $this.next(slctrWhatsToggled).toggle(animDuration);
			setupDropDownTogglePermanence($this, activatingClass);
        }); // TODO: change implementation to height + overflow based hiding approach
		$toggles.on("keydown", function(e) {
			var regExMask = /Enter| /g;
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(activatingClass);
				$this.next(slctrWhatsToggled).toggle(animDuration);
				setupDropDownTogglePermanence($this, activatingClass);
			}
		});
    }
	
	function effectDropDownTogglePermanence($toggles, slctrWhatsToggled, activatingClass, animDuration) {
		var thisFuncName = "effectDropDownTogglePermanence";
		var thisFuncDesc = "Upon page load, sets the expansion state of a drop down toggle element based on previous user interactions during the session.";
		if ($.isJQueryObj($toggles)) {
			$toggles.each(function() {
				var $this = $(this);
				if ($this[0].id) {
					try {
						var state = sessionStorage.getItem($this[0].id);
						if (state == "expanded") {
							$this.toggleClass(activatingClass);
							$this.next(slctrWhatsToggled).toggle(animDuration);							
						}
					} catch(e) {
						$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
					}
				} else {
					$.logError(thisFileName, thisFuncName, thisFuncDesc,
						"No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected.");
				}
			});
		} else {
			$.logError(thisFileName, thisFuncName, thisFuncDesc,
				"I was not passed a valid jQuery object.");
		}
	}
	
	function setupDropDownTogglePermanence($toggle, activatingClass) {
		var thisFuncName = "setupDropDownTogglePermanence";
		var thisFuncDesc = "Records the expansion state of a drop down toggle element in local storage to later effect permanence.";
		if ($.isJQueryObj($toggle)) {
			if ($toggle[0].id) {
				try {
					var state = $toggle.hasClass(activatingClass) ? "expanded" : "collapsed";
					sessionStorage.setItem($toggle[0].id, state);
				} catch(e) {
					$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
				}
			} else {
				$.logError(thisFileName, thisFuncName, thisFuncDesc,
					"No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected.");
			}
		} else {
			$.logError(thisFileName, thisFuncName, thisFuncDesc,
				"I was not passed a valid jQuery object.");
		}
	}
    
    function initFancyHrH2Motif(slctrFancyH2, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrFancyH2).each(function () {
                $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
    function initFancyHrH3Motif(slctrFancyH3, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrFancyH3).each(function () {
            $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
    function initHrH2Motif(slctrStandardH2, slctrPrevHr, h2ClassesAdded, hrClassesAdded, animAddDrtn) {
        $(slctrStandardH2).each(function () {
                var $this = $(this);
				var $prevElem = $this.prev(slctrPrevHr);
				if ($prevElem.length > 0) {
					$this.addClass(h2ClassesAdded);
					$prevElem.addClass(hrClassesAdded, animAddDrtn);
				}
        });
    }
    
    function initHrH3Motif(slctrStandardH3, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrStandardH3).each(function () {
            $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
	function initQuickTabs(slctrQtSctn) {
		var $qtSctn = $(slctrQtSctn);
		$qtSctn.each(function () {
			var $thisSctn = $(this);
			var $tabCntnr = $thisSctn.find("div.column > ul");
			var $tabs = $tabCntnr.find("li");
			var $panelCntnr = $thisSctn.find("table");
			var $panels = $panelCntnr.find("tbody:first-child > tr");
			if($tabs.length == $panels.length) {
				var idx;
				var jdx;
				for (idx = 0; idx < $tabs.length; idx++) {
					$tabs.eq(idx).click(function() {
						var $thisTab = $(this);
						var kdx = $tabs.index($thisTab);
						if (kdx == 0) {
							if ($thisTab.hasClass("deactivated")) {
								$thisTab.removeClass("deactivated");
								$panels.eq(kdx).removeClass("deactivated");
								for (jdx = 1; jdx < $tabs.length; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$("html, body").animate({
									scrollTop: $thisTab.offset().top
								}, 500);								
							}
						} else {
							if (!$thisTab.hasClass("activated")) {
								if (!$tabs.eq(0).hasClass("deactivated")) {
									$tabs.eq(0).addClass("deactivated");
									$panels.eq(0).addClass("deactivated");
								}
								for (jdx = 1; jdx < kdx; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$thisTab.addClass("activated");
								$panels.eq(kdx).addClass("activated");
								for (jdx = kdx + 1; jdx < $tabs.length; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$("html, body").animate({
									scrollTop: $thisTab.offset().top
								}, 500);								
							}
						}
					});
				}
			}
		});
	}

    function initReadMoreToggles(slctrToggleIn, slctrToggleOut, slctrPanel, animDuration) {
        $(slctrToggleIn).click(function () {
            var $this = $(this);
            var $next = $this.next(slctrPanel);
            $this.toggle(animDuration);
            $this.$next.toggle(animDuration);
            $this.$next.next(slctrToggleOut).toggle(animDuration);
        });
        $(slctrToggleOut).click(function () {
            var $this = $(this);
            var $next = $this.next(slctrPanel);
            $this.toggle(animDuration);
            $this.$next.toggle(animDuration);
            $this.$next.next(slctrToggleIn).toggle(animDuration);
        });
    }
	
	function initTocFloating(slctrToc, slctrBackToToc) {
		var $toc = $(slctrToc);
		var $backToToc = $(slctrBackToToc);
		var $linkToTop = $backToToc.first().children("a");
		var $mainHeader = $("header.main-header");
		if($toc.length === 1 && $mainHeader.length === 1) {
			var $window = $(window);
			var tocTrigger = $toc.offset().top + $toc.height() + 100;
			var $tocClone = $toc.clone().addClass("floating").removeAttr("id").insertAfter($toc);
			$tocClone.find("span.title + br").remove();
			$tocClone.find("span.title").remove();
			var counter = 1;
			$tocClone.find("br").each(function () {
				if (counter % 2 != 0) {
					$(this).before(" //");
				}
				$(this).remove();
				counter++;
			});
			if($linkToTop.length === 1) {
				var linkText = $linkToTop.text();
				var idxMatched = linkText.search(/\u2014Back to ([^\u2014]+)\u2014/);
				if(idxMatched != -1) {
					var $linkToTopClone = $linkToTop.clone();
					$linkToTopClone.text(linkText.replace(/\u2014Back to ([^\u2014]+)\u2014/, "$1"));
					$tocClone.prepend(" //&nbsp;");
					$linkToTopClone.prependTo($tocClone);
					$backToToc.remove();
				} else {
					$.logError("initTocFloating", "Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Did not find the correct textual pattern within the link back to the top of the page.' }");
				}
			} else {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Did not find a single hyperlink within the first link back to the top of the page.' }");
			}
			$window.scroll(function(e) {
				var windowScrollPos = $window.scrollTop();
				if(windowScrollPos > tocTrigger && !$tocClone.is(":visible")) {
					$tocClone.width($mainHeader.width() * .8);
					$tocClone.css({
						left: $mainHeader.offset().left + $mainHeader.width() / 2,
					});
					$tocClone.fadeIn(300);
				}
				else if(windowScrollPos <= tocTrigger && $tocClone.is(":visible")) {
					$tocClone.hide();
				}
			});
			$window.resize(function () {
				$tocClone.width($mainHeader.width() * .8);
				$tocClone.css({
					left: $mainHeader.offset().left + $mainHeader.width() / 2,
				});
			});
		}
		else {
			if($toc.length > 1) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Found more than one table of contents elements; this function only works with one table of contents.' }");
			}
			if($mainHeader.length === 0) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Could not find the main header  element within the DOM.' }");
			}
			else if($mainHeader.length > 1) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Found more than one table of contents elements; this function only works with one table of contents.' }");
			}
		}
	}
    
    function initTriggeredByHover(slctrTrggrdOnHvr, slctrCntntRvld, slctrCntntHddn, animDuration) {
        $(slctrTrggrdOnHvr).mouseenter(function () {
            var $this = $(this);
            var $rvldCntnt = $this.find(slctrCntntRvld);
            var $hddnCntnt = $this.find(slctrCntntHddn);
            $rvldCntnt.stop().show(animDuration);
            $hddnCntnt.stop().hide(animDuration);
        }).mouseleave(function () {
            var $this = $(this);
            var $rvldCntnt = $this.find(slctrCntntRvld);
            var $hddnCntnt = $this.find(slctrCntntHddn);
            $rvldCntnt.stop().hide(animDuration);
            $hddnCntnt.stop().show(animDuration);
        });
    }
    
    function initWelcomeMessage(slctrWlcmMsg, slctrPostWlcmMsg, msgDelay, fadeOutDuration,
     fadeInDuration) {
        $(slctrWlcmMsg).delay(msgDelay).fadeOut(fadeOutDuration, function () {
            $(slctrPostWlcmMsg).fadeIn(fadeInDuration);
        });
    }

	/*******************************************************************************************************************
	 * LOADED WINDOW FUNCTIONS                                                                                         * 
	 *******************************************************************************************************************/
    function finalizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration) {
        if($(window).width() >= trggrWidth) {
            $(slctrSideRight + ">" + slctrColTwo).each(function () {
                var $this = $(this);
                var $thisPrev = $this.prev(slctrColOne);
                if($this.height() != $thisPrev.height() ) {
                    $this.height($thisPrev.height());
                }
                var crrntOpacity = $this.css("opacity");
                if (crrntOpacity == 0) {
                    $this.animate({opacity: 1.0}, animDuration);
                }
            });
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
	function showDefinitionListButtons(slctrDefList, expandAllClass, collapseAllClass, animFadeInDrtn) {
		var thisFuncName = "addDefinitionListButtons";
		var thisFuncDesc = "Display expand/collapse all buttons, which were initially hidden";
		
		// Display expand/collapse all buttons
		var $lists = $(slctrDefList);
		var $expandAlls = $lists.children("." + expandAllClass);
		var $collapseAlls = $lists.children("." + collapseAllClass);
		$lists.animate({
			marginTop: "+=39px"
		}, animFadeInDrtn, function() {
			$expandAlls.fadeIn(animFadeInDrtn);
			$collapseAlls.fadeIn(animFadeInDrtn);
		});
	}
		
	/*******************************************************************************************************************
	 * WINDOW-RESIZE TRIGGERED FUNCTIONS                                                                               *
	 *******************************************************************************************************************/
    function resizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration) {
        finalizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration);
    }
	
})(jQuery);
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

      var $fields = $form.find(settings.fieldSelector);

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
        var $field = $(this);
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
        var $dirtyForms = $("form").filter('.' + settings.dirtyClass);
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
 * Application of jQuery Plugin to WSU OUE websites.
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Author:  danielcrieck@gmail.com
 * Version: 1.0.0
 */
(function($) {
$(function() {
	var $gForms = $("div.gform_wrapper > form");
	$gForms.areYouSure();
});
})(jQuery);
/**
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
// See [https://github.com/invokeImmediately/distinguishedscholarships.wsu.edu] for repository of source code
/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
(function ($) {
    "use strict";
    
	$(document).ready(function () {
        /**********************************************************************************************
         * Tweak HTML source to work around some quirks of WordPress setup                            *
         **********************************************************************************************/
        var siteURL = window.location.pathname;
        switch(siteURL) {
/*				case '/':
                $('#menu-item-35').remove();
                $('#spine-sitenav ul li').first().css('border-top', 'none');
                $('#spine-sitenav').addClass('homeless');
                break;*/
            case '/news/':
                $('div.column.one').first().parent('section').before('<section class="row single gutter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We and Our Students Have Accomplished</h3></div></section></div></section>');
                break;
        }
	});    
})(jQuery);
