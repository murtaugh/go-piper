# go-reveal

Turn [Reveal](https://github.com/hakimel/reveal.js) presentations into shared events

### Here is what you need to do--not much

Your [Reveal](https://github.com/hakimel/reveal.js) presentation will be a web page with the Reveal scripts added at the bottom of the HTML `</body>` tag.
It should look something like this:

```HTML
		<script src="lib/js/head.min.js"></script>
		<script src="js/reveal.min.js"></script>

		<script>
			Reveal.initialize({
			  ... configuration options ...
			});

		</script>
	</body>
```

All you have to do is add in the go-reveal script and you will now be able to collaborate while you are presenting.

```HTML
		<script src="lib/js/head.min.js"></script>
		<script src="js/reveal.min.js"></script>
		<!-- This is the line you need to add. That is all -->
		<script src="http://gordienoye.github.io/go-reveal/js/go-reveal.js"></script>

		<script>
			Reveal.initialize({
			  ... configuration options ...
			});

		</script>
	</body>
```

### Try it out

Want to see how a sample Reveal.js presentation works with go-reveal?
[**Try it out**](http://gordienoye.github.io/go-reveal/) and see how you can share a presentation between multiple browsers.

### Collaborating is now easy

go-reveal automatically makes your presentation multi-user. If you want to give another person access to your
presentation all you need to do is to share a special URL. If you move your mouse over the `Share` pop-out in the lower
left of the presentation you can copy the given URL and share it around.

Once you share this URL with somebody, that person can control your presentation and do the same things that you can do.
You can share presenting duties with as many other people as you want.

Go wild.
