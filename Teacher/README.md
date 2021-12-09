# recent-news-boxes
One of the most common components to any website is a section that displays a number of your most recent news articles. This helps keep your users engaged and provides the necessary real estate to showcase featured content.

Of course, there are multiple ways to display this type of content, from a vertical list to minimal textual information. An additional way to display recent news is through the use of a box and grid based system. Using this method, you can create the needed space to include a news entry's featured image, the article's posting date, and it's title.

In this tutorial, [Solodev](https://www.solodev.com/) will show you how create a stylized recent news section using boxes..

# Tutorials

For detailed instructions, view Solodev's [Adding Recent News Boxes to Your Website](http://www.solodev.com/blog/web-design/adding-recent-news-boxes-to-your-website.stml) article.

# Demo

Try out a working example on [JSFiddle](https://jsfiddle.net/solodev/Ljrdwfws/).

# HTML

The section for these recent news boxes contains the following basic HTML markup.

```
<section class="recentNews">
	<div class="container">
		<h2 class="news-title">
			Recent News
		</h2>
		<div class="row">
			<div class="ct-blog col-sm-6 col-md-4">
				<div class="inner">
					<div class="fauxcrop">
						<a href="#"><img alt="News Entry" src="https://www.solodev.com/assets/recent-news/news-entry-1.jpg"></a>
					</div>
					<div class="ct-blog-content">
						<div class="ct-blog-date">
							<span>March</span><strong>1</strong>
						</div>
						<h3 class="ct-blog-header">
							WebCorpCo Will Be Visiting a Number of Upcoming Conferences
						</h3>
					</div>
				</div>
			</div>
			<div class="ct-blog col-sm-6 col-md-4">
				<div class="inner">
					<div class="fauxcrop">
						<a href="#"><img alt="News Entry" src="https://www.solodev.com/assets/recent-news/news-entry-2.jpg"></a>
					</div>
					<div class="ct-blog-content">
						<div class="ct-blog-date">
							<span>February</span><strong>27</strong>
						</div>
						<h3 class="ct-blog-header">
							WebCorpCo Has Been Named to Inc. 5000
						</h3>
					</div>
				</div>
			</div>
			<div class="ct-blog col-sm-6 col-md-4">
				<div class="inner">
					<div class="fauxcrop">
						<a href="#"><img alt="News Entry" src="https://www.solodev.com/assets/recent-news/news-entry-3.jpg"></a>
					</div>
					<div class="ct-blog-content">
						<div class="ct-blog-date">
							<span>February</span><strong>25</strong>
						</div>
						<h3 class="ct-blog-header">
							7 Crtical Factors when Choosing a CMS
						</h3>
					</div>
				</div>
			</div>
			<div class="ct-blog col-sm-6 col-md-4">
				<div class="inner">
					<div class="fauxcrop">
						<a href="#"><img alt="News Entry" src="https://www.solodev.com/assets/recent-news/news-entry-4.jpg"></a>
					</div>
					<div class="ct-blog-content">
						<div class="ct-blog-date">
							<span>February</span><strong>23</strong>
						</div>
						<h3 class="ct-blog-header">
							The Best Ways to Leverage Data and Deliver on Your Investment
						</h3>
					</div>
				</div>
			</div>
			<div class="ct-blog col-sm-6 col-md-4">
				<div class="inner">
					<div class="fauxcrop">
						<a href="#"><img alt="News Entry" src="https://www.solodev.com/assets/recent-news/news-entry-5.jpg"></a>
					</div>
					<div class="ct-blog-content">
						<div class="ct-blog-date">
							<span>February</span><strong>20</strong>
						</div>
						<h3 class="ct-blog-header">
							Latest API Integrations Available through CMS 8
						</h3>
					</div>
				</div>
			</div>
			<div class="ct-blog col-sm-6 col-md-4">
				<div class="inner">
					<div class="fauxcrop">
						<a href="#"><img alt="News Entry" src="https://www.solodev.com/assets/recent-news/news-entry-6.jpg"></a>
					</div>
					<div class="ct-blog-content">
						<div class="ct-blog-date">
							<span>February</span><strong>16</strong>
						</div>
						<h3 class="ct-blog-header">
							WebCorpCo's Latest Release (CMS 8) Available Today
						</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="btn-news btn-contests">
			<a href="#">VIEW ALL NEWS</a>
		</div>
	</div>
</section>
```

# CSS

All required CSS is in recent-news-boxes.css

# External Includes

This tutorial includes the following third party resources.

```
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
```
