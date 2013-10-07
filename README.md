# go-reveal

## [**Try it out**](http://gordienoye.github.io/go-reveal/)

Want to see how a sample Reveal.js presentation works with go-reveal?
[**Check out**](http://gordienoye.github.io/go-reveal/) how adding one line of HTML allows multiple browsers to
share and control your presentation.

### Want to make *your* Reveal.js presentation multi-user?

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

### Collaborating is now easy

go-reveal automatically makes your presentation multi-user. If you want to give another person access to your
presentation all you need to do is to share a special URL. If you move your mouse over the `Share` pop-out in the lower
left of the presentation you can copy the given URL and share it around.

Once you share this URL with somebody, that person can control your presentation and do the same things that you can do.
You can share presenting duties with as many other people as you want.

The built in widgets display who is currently sharing your presentation. You will be notified as people come and go and
have a user list of all the current collaborators. You will even be able to see where they are clicking.

Go wild.

### go-reveal is powered by GoInstant

<a href="http://goinstant.com">GoInstant</a> is an API for integrating realtime, multi-user functionality into your app.
You can check it out and <a href="https://goinstant.com/signup">sign up for free</a>.

### License

MIT licensed

Copyright (C) 2013 Gordie Noye


