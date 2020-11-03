<SCRIPT TYPE="text/javascript">
	function popup (myLink, ObjectName) {
		if (! window.focus) return true;
		var href;
		if (typeof(myLink) == 'string')href = myLink;
		else href = mylink.href;
		window.open(href, ObjectName, 'width = 400, height = 200');
	}
</SCRIPT>

<A HREF = "/code-sample/popupexample/" onClick = "return popup(this, 'notes') " >my popup</A>


