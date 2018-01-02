/**************************************************************************************************\
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
