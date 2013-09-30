# go-reveal

Turn Reveal presentations into shared events

### Here is what you need to do--not much

Your Reveal presentation will be a web page with the Reveal scripts added at the bottom of the HTML `</body>` tag.
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

### Collaborating is now easy

go-reveal alters the URL of your presentaiton to insert a query value. This value uniquely defines your shared presentation.
If you share this URL with somebody, that person can control your presentation and do the same things that you can do.
You can share presenting duties with as many other people as you want.

Go wild.
