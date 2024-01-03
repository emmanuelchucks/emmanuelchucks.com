export function DarkModeScrollbars() {
	return (
		<>
			<p>
				Using JavaScript, it is possible to dynamically change parts of a page
				without requiring the entire page to reload — for instance, to update a
				list of search results on the fly, or to display a discreet alert or
				notification which does not require user interaction.
			</p>
			<p>
				While these changes are usually visually apparent to users who can see
				the page, they may not be obvious to users of assistive technologies.
				ARIA live regions fill this gap and provide a way to programmatically
				expose dynamic content changes in a way that can be announced by
				assistive technologies.
			</p>
			<p>
				Dynamic content which updates without a page reload is generally either
				a region or a widget. Simple content changes which are not interactive
				should be marked as live regions. A live region is explicitly denoted
				using the aria-live attribute.
			</p>
			<p>
				aria-live: The aria-live=POLITENESS_SETTING is used to set the priority
				with which screen reader should treat updates to live regions - the
				possible settings are: off, polite or assertive. The default setting is
				off. This attribute is by far the most important.
			</p>
			<p>
				Normally, only aria-live="polite" is used. Any region which receives
				updates that are important for the user to receive, but not so rapid as
				to be annoying, should receive this attribute. The screen reader will
				speak changes whenever the user is idle.
			</p>
			<p>
				aria-live="assertive" should only be used for time-sensitive/critical
				notifications that absolutely require the user's immediate attention.
				Generally, a change to an assertive live region will interrupt any
				announcement a screen reader is currently making. As such, it can be
				extremely annoying and disruptive and should only be used sparingly.
			</p>
			<p>
				As aria-live="off" is the assumed default for elements, it should not be
				necessary to set this explicitly, unless you're trying to suppress the
				announcement of elements which have an implicit live region role (such
				as role="alert").
			</p>
		</>
	)
}
