var WebDeveloper = WebDeveloper || {};

WebDeveloper.Miscellaneous = WebDeveloper.Miscellaneous || {};

// Displays all hidden elements
WebDeveloper.Miscellaneous.displayHiddenElements = function(documents)
{
	var contentDocument = null;
	var inputElements		= null;
	var node						= null;
	var treeWalker			= null;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		contentDocument = documents[i];
		inputElements		= contentDocument.querySelectorAll("input[type=hidden]");
		treeWalker			= contentDocument.createTreeWalker(WebDeveloper.Common.getDocumentBodyElement(contentDocument), NodeFilter.SHOW_ELEMENT, WebDeveloper.Miscellaneous.hiddenNodeFilter, false);

		// Loop through the input elements
		for(var j = 0, m = inputElements.length; j < m; j++)
		{
			inputElements[j].removeAttribute("type");
		}

		// While the tree walker has more nodes
		while((node = treeWalker.nextNode()) !== null)
		{
			node.style.display = "";
		}
	}
};

// Filter for the hidden node tree walker
WebDeveloper.Miscellaneous.hiddenNodeFilter = function(node)
{
	// If the node is set and is not a Web Developer node
	if(node && (!node.hasAttribute("id") || node.getAttribute("id").indexOf("web-developer") !== 0))
	{
		var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node, null);

		// If the computed style is set
		if(computedStyle)
		{
			var display = computedStyle.getPropertyCSSValue("display");
			var tagName = node.tagName;

			// If this element has a display and tag name, the display is set to none and the tag name is not script
			if(display && tagName && display.cssText == "none")
			{
				return NodeFilter.FILTER_ACCEPT;
			}
		}
	}

	return NodeFilter.FILTER_SKIP;
};

// Linearizes the page
WebDeveloper.Miscellaneous.linearizePage = function(documents)
{
	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		WebDeveloper.Common.toggleStyleSheet("features/style-sheets/miscellaneous/linearize-page.css", "web-developer-linearize-page", documents[i], false);
	}
};

// Makes all frames resizable
WebDeveloper.Miscellaneous.makeFramesResizable = function(documents)
{
	var frame						= null;
	var frames					= null;
	var resizableFrames = 0;

	// Loop through the documents
	for(var i = 0, l = documents.length; i < l; i++)
	{
		frames = documents[i].getElementsByTagName("frame");

		// Loop through the frames
		for(var j = 0, m = frames.length; j < m; j++)
		{
			frame = frames[j];

			// If the frame has a no resize attribute
			if(frame.hasAttribute("noresize"))
			{
				frame.removeAttribute("noresize");

				resizableFrames++;
			}
		}
	}

	// If one frame was made resizable
	if(resizableFrames == 1)
	{
		WebDeveloper.Common.displayNotification("makeFramesResizableSingleResult");
	}
	else
	{
		WebDeveloper.Common.displayNotification("makeFramesResizableMultipleResult", [resizableFrames]);
	}
};